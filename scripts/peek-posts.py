import json
import re
from pathlib import Path
from html import unescape

posts = json.loads(
    Path(r"F:\PROJECTS\Away\Beyond Borders Real Estate\docs\migration\extracted\posts.json").read_text(
        encoding="utf-8"
    )
)
for p in posts:
    if "overdraft" in p["slug"] or True:
        raw = p.get("content") or ""
        text = unescape(raw)
        text = re.sub(r"<[^>]+>", "\n", text)
        text = re.sub(r"\n+", "\n", text).strip()
        print("=" * 60)
        print(p["slug"])
        print(p["title"], p["date"])
        print("LEN", len(text))
        print(text[:2000])
        print()
