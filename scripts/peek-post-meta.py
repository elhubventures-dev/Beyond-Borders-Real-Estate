import json
from pathlib import Path

posts = json.loads(Path("docs/migration/extracted/posts.json").read_text(encoding="utf-8"))
for p in posts:
    print(p["id"], p["slug"], p["date"][:10])

ups = list(Path("wp-content/uploads/2018/04").glob("Blog*"))
print("blog images", [u.name for u in ups])
