#!/usr/bin/env python3
"""Extract Beyond Borders WP content from UpdraftPlus SQL dump into JSON."""
from __future__ import annotations

import json
import re
import html
from pathlib import Path

DUMP = Path("backup_2026-09-09-1051_Beyond_Borders_70ac72014670-db")
OUT = Path("docs/migration/extracted")


def unescape_sql(s: str) -> str:
    out = []
    i = 0
    while i < len(s):
        if s[i] == "\\" and i + 1 < len(s):
            nxt = s[i + 1]
            mapping = {"n": "\n", "r": "\r", "t": "\t", "0": "\0"}
            out.append(mapping.get(nxt, nxt))
            i += 2
            continue
        out.append(s[i])
        i += 1
    return "".join(out)


def extract_table_values(text: str, table: str) -> list[tuple]:
    """Find all INSERT INTO `table` and parse VALUES rows (semicolon-safe)."""
    needle = f"INSERT INTO `{table}` VALUES"
    rows: list[tuple] = []
    start = 0
    while True:
        idx = text.find(needle, start)
        if idx < 0:
            break
        i = idx + len(needle)
        while i < len(text) and text[i] in " \n\r\t":
            i += 1
        # parse until semicolon outside strings/parens at depth 0 after closing a row
        depth = 0
        in_str = False
        fields: list = []
        field_buf: list[str] = []
        current_row_fields: list = []
        mode = "seek"  # seek row, field, string

        while i < len(text):
            ch = text[i]
            if in_str:
                if ch == "\\" and i + 1 < len(text):
                    field_buf.append(text[i : i + 2])
                    i += 2
                    continue
                if ch == "'":
                    if i + 1 < len(text) and text[i + 1] == "'":
                        field_buf.append("''")
                        i += 2
                        continue
                    in_str = False
                    fields.append(unescape_sql("".join(field_buf).replace("''", "'")))
                    field_buf = []
                    i += 1
                    continue
                field_buf.append(ch)
                i += 1
                continue

            if ch == "'":
                in_str = True
                field_buf = []
                i += 1
                continue

            if ch == "(":
                if depth == 0:
                    fields = []
                depth += 1
                i += 1
                continue

            if ch == ")":
                depth -= 1
                if depth == 0:
                    # flush bare field if any
                    if field_buf:
                        raw = "".join(field_buf).strip()
                        fields.append(None if raw == "NULL" else raw)
                        field_buf = []
                    rows.append(tuple(fields))
                    fields = []
                i += 1
                continue

            if depth == 0 and ch == ";":
                i += 1
                break

            if depth == 1:
                if ch == ",":
                    if field_buf:
                        raw = "".join(field_buf).strip()
                        if raw:
                            fields.append(None if raw == "NULL" else raw)
                        field_buf = []
                    i += 1
                    continue
                if ch in " \n\r\t":
                    i += 1
                    continue
                # bare token (NULL / number)
                if text.startswith("NULL", i) and (i + 4 >= len(text) or text[i + 4] in ",)"):
                    fields.append(None)
                    i += 4
                    continue
                j = i
                while j < len(text) and text[j] not in ",)":
                    j += 1
                token = text[i:j].strip()
                if token:
                    fields.append(token)
                i = j
                continue

            i += 1

        start = i

    return rows


def extract_vc_text(content: str) -> dict:
    content = html.unescape(content or "")
    headings = re.findall(r'\[vc_custom_heading[^\]]*text="([^"]+)"', content)
    # also text=&quot;
    headings += re.findall(r"\[vc_custom_heading[^\]]*text=&quot;([^&]+)&quot;", content)
    features = []
    for block in re.findall(r"\[vc_column_text\](.*?)\[/vc_column_text\]", content, re.DOTALL | re.IGNORECASE):
        lines = re.findall(r"<p[^>]*>(.*?)</p>", block, re.DOTALL)
        for line in lines:
            clean = re.sub(r"<[^>]+>", "", line).strip()
            if clean:
                features.append(html.unescape(clean))
        if not lines:
            clean = re.sub(r"<[^>]+>", "", block).strip()
            if clean:
                features.extend([x.strip() for x in clean.split("\n") if x.strip()])
    image_ids = re.findall(r'\[vc_single_image[^\]]*image="(\d+)"', content)
    image_ids += re.findall(r"\[vc_single_image[^\]]*image=&quot;(\d+)&quot;", content)
    return {"headings": headings, "features": features, "image_ids": image_ids}


BUSINESS_SLUGS = {
    "home-version-2",
    "our-company",
    "our-history",
    "company-overview",
    "our-locations",
    "estates",
    "houses",
    "lands",
    "lands-2",
    "lands-2-2",
    "our-projects",
    "houses-white-city-idu",
    "houses-white-court-dakwo",
    "houses-white-city-kuje",
    "houses-white-city-giri",
    "white-coutry-gardens-lugbe",
    "white-country-gardens-lugbe",
    "lands-white-city-idu",
    "lands-white-city-kuje",
    "lands-white-city-giri",
    "schedule-an-inspection",
    "contact-us",
    "architectural-design",
    "general-construction",
    "interior-design",
    "flooring-roofing",
    "int-ext-painting",
    "blog",
    "faqs",
    "career",
    "portfolio",
    "team",
    "case-studies",
    "testimonials",
    "management",
    "work-process",
}


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    text = DUMP.read_text(encoding="utf-8", errors="replace")
    print("Parsing posts...")
    post_rows = extract_table_values(text, "wpew_posts")
    print(f"Raw post rows: {len(post_rows)}")

    posts = []
    for r in post_rows:
        if len(r) < 22:
            continue
        posts.append(
            {
                "id": str(r[0]),
                "date": r[2],
                "content": r[4],
                "title": r[5],
                "excerpt": r[6],
                "status": r[7],
                "slug": r[11],
                "modified": r[14],
                "parent": str(r[17]),
                "guid": r[18],
                "menu_order": r[19],
                "type": r[20],
                "mime": r[21],
            }
        )

    published_pages = [p for p in posts if p["type"] == "page" and p["status"] == "publish"]
    published_posts = [p for p in posts if p["type"] == "post" and p["status"] == "publish"]
    attachments = [p for p in posts if p["type"] == "attachment"]
    type_counts: dict[str, int] = {}
    for p in posts:
        type_counts[p["type"]] = type_counts.get(p["type"], 0) + 1
    print("Type counts:", json.dumps(type_counts, indent=2))
    print(f"Pages: {len(published_pages)}, Posts: {len(published_posts)}, Attachments: {len(attachments)}")

    media_map = {}
    for a in attachments:
        guid = a.get("guid") or ""
        m = re.search(r"/wp-content/uploads/(.+)$", guid)
        path = m.group(1) if m else guid
        media_map[a["id"]] = {
            "id": a["id"],
            "title": a["title"],
            "slug": a["slug"],
            "mime": a["mime"],
            "path": path,
            "guid": guid,
        }

    full_biz = []
    for p in published_pages:
        if p["slug"] not in BUSINESS_SLUGS:
            continue
        parsed = extract_vc_text(p["content"] or "")
        images = [media_map[i] for i in parsed["image_ids"] if i in media_map]
        full_biz.append({**p, "parsed": parsed, "images": images})

    option_keys = ["blogname", "blogdescription", "siteurl", "home", "admin_email"]
    options = {}
    for key in option_keys:
        m = re.search(rf",\s*'{re.escape(key)}',\s*'((?:\\.|[^'\\])*)'", text)
        if m:
            options[key] = unescape_sql(m.group(1))

    summary = {
        "counts": {
            "all_rows": len(posts),
            "published_pages": len(published_pages),
            "published_posts": len(published_posts),
            "attachments": len(attachments),
            "type_counts": type_counts,
            "business_pages": len(full_biz),
        },
        "options": options,
    }

    (OUT / "summary.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")
    (OUT / "all-page-slugs.json").write_text(
        json.dumps(
            [{"id": p["id"], "slug": p["slug"], "title": p["title"]} for p in published_pages],
            indent=2,
        ),
        encoding="utf-8",
    )
    (OUT / "business-content.json").write_text(json.dumps(full_biz, indent=2), encoding="utf-8")
    posts_out = [
        {
            "id": p["id"],
            "title": p["title"],
            "slug": p["slug"],
            "date": p["date"],
            "content": p["content"],
            "excerpt": p["excerpt"],
        }
        for p in published_posts
        if p["slug"] != "hello-world"
    ]
    (OUT / "posts.json").write_text(json.dumps(posts_out, indent=2), encoding="utf-8")
    (OUT / "media-map.json").write_text(json.dumps(media_map, indent=2), encoding="utf-8")
    print("Wrote", OUT)
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
