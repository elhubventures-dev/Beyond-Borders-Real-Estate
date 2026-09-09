#!/usr/bin/env python3
"""Archive essential legacy WordPress assets into a single zip file."""
import os
import sys
import zipfile
from pathlib import Path

BASE_DIR = Path(".").resolve()
ZIP_PATH = BASE_DIR / "legacy-wordpress-backup.zip"

ITEMS_TO_ARCHIVE = [
    ("wp-content/uploads", "uploads"),
    ("wp-content/themes/brixel", "themes/brixel"),
    ("wp-content/themes/brixel.zip", "themes/brixel.zip"),
    ("backup_2026-09-09-1051_Beyond_Borders_70ac72014670-db", "database/backup_Beyond_Borders_db.sql"),
    ("wp-config.php", "config/wp-config.php"),
]

def main():
    print(f"Creating archive at: {ZIP_PATH}")
    count = 0
    total_bytes = 0

    with zipfile.ZipFile(ZIP_PATH, mode="w", compression=zipfile.ZIP_DEFLATED, compresslevel=6) as zf:
        for rel_src, rel_dst in ITEMS_TO_ARCHIVE:
            src_path = BASE_DIR / rel_src
            if not src_path.exists():
                print(f"Skipping missing: {rel_src}")
                continue

            if src_path.is_file():
                zf.write(src_path, arcname=rel_dst)
                count += 1
                total_bytes += src_path.stat().st_size
                print(f"Added file: {rel_src} -> {rel_dst}")
            elif src_path.is_dir():
                print(f"Archiving directory: {rel_src} ...")
                for root, dirs, files in os.walk(src_path):
                    for file in files:
                        full_p = Path(root) / file
                        arc_name = Path(rel_dst) / full_p.relative_to(src_path)
                        zf.write(full_p, arcname=str(arc_name).replace("\\", "/"))
                        count += 1
                        total_bytes += full_p.stat().st_size
                        if count % 200 == 0:
                            print(f"  Archived {count} files ({total_bytes / (1024*1024):.1f} MB)...")

    zip_size_mb = ZIP_PATH.stat().st_size / (1024 * 1024)
    raw_size_mb = total_bytes / (1024 * 1024)
    print(f"\n[DONE] Successfully created {ZIP_PATH.name}!")
    print(f"Total files archived: {count}")
    print(f"Uncompressed size: {raw_size_mb:.2f} MB")
    print(f"Archive file size: {zip_size_mb:.2f} MB")

if __name__ == "__main__":
    main()
