from PIL import Image
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def generate_favicons():
    emblem_path = os.path.join(ROOT, "web", "public", "media", "logo-mark.png")
    trimmed_emblem = Image.open(emblem_path).convert("RGBA")
    bbox = trimmed_emblem.getbbox()
    if bbox:
        trimmed_emblem = trimmed_emblem.crop(bbox)
    print(f"Trimmed high-res emblem: {trimmed_emblem.size}")

    CANVAS_SIZE = 512
    PADDING = 40
    avail_size = CANVAS_SIZE - 2 * PADDING

    ew, eh = trimmed_emblem.size
    scale = avail_size / max(ew, eh)
    new_w, new_h = int(ew * scale), int(eh * scale)
    scaled_emblem = trimmed_emblem.resize((new_w, new_h), Image.Resampling.LANCZOS)

    master_icon = Image.new("RGBA", (CANVAS_SIZE, CANVAS_SIZE), (0, 0, 0, 0))
    paste_x = (CANVAS_SIZE - new_w) // 2
    paste_y = (CANVAS_SIZE - new_h) // 2
    master_icon.paste(scaled_emblem, (paste_x, paste_y), scaled_emblem)

    ico_sizes = [(16, 16), (24, 24), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]
    ico_images = []
    for s in ico_sizes:
        ico_images.append(master_icon.resize(s, Image.Resampling.LANCZOS))

    app_dir = os.path.join(ROOT, "web", "app")
    public_dir = os.path.join(ROOT, "web", "public")
    media_dir = os.path.join(public_dir, "media")
    os.makedirs(app_dir, exist_ok=True)
    os.makedirs(public_dir, exist_ok=True)
    os.makedirs(media_dir, exist_ok=True)

    ico_images[0].save(
        os.path.join(app_dir, "favicon.ico"),
        format="ICO",
        sizes=ico_sizes,
        append_images=ico_images[1:],
    )
    ico_images[0].save(
        os.path.join(public_dir, "favicon.ico"),
        format="ICO",
        sizes=ico_sizes,
        append_images=ico_images[1:],
    )
    print("Saved favicon.ico with multi-resolution frames:", ico_sizes)

    master_icon.save(os.path.join(app_dir, "icon.png"), "PNG", optimize=True)
    master_icon.save(os.path.join(public_dir, "icon.png"), "PNG", optimize=True)
    master_icon.save(os.path.join(media_dir, "favicon.png"), "PNG", optimize=True)

    apple_icon = master_icon.resize((180, 180), Image.Resampling.LANCZOS)
    apple_icon.save(os.path.join(app_dir, "apple-icon.png"), "PNG", optimize=True)
    apple_icon.save(os.path.join(public_dir, "apple-touch-icon.png"), "PNG", optimize=True)

    icon_32 = master_icon.resize((32, 32), Image.Resampling.LANCZOS)
    icon_32.save(os.path.join(public_dir, "favicon-32x32.png"), "PNG", optimize=True)
    icon_32.save(os.path.join(media_dir, "favicon-32x32.png"), "PNG", optimize=True)

    icon_16 = master_icon.resize((16, 16), Image.Resampling.LANCZOS)
    icon_16.save(os.path.join(public_dir, "favicon-16x16.png"), "PNG", optimize=True)
    icon_16.save(os.path.join(media_dir, "favicon-16x16.png"), "PNG", optimize=True)

    icon_192 = master_icon.resize((192, 192), Image.Resampling.LANCZOS)
    icon_192.save(os.path.join(public_dir, "icon-192.png"), "PNG", optimize=True)

    print("All favicon PNGs and ICO files successfully created.")


if __name__ == "__main__":
    generate_favicons()
