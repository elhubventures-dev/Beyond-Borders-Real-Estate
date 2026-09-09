from PIL import Image
import os

def generate_favicons():
    # 1. Load the high-res 1400x1080 Main-Logo
    logo_path = "wp-content/uploads/2022/10/Main-Logo.png"
    im_main = Image.open(logo_path).convert("RGBA")
    
    # 2. Extract the emblem cleanly
    # In Main-Logo.png, the emblem is in the left region:
    emblem_crop = im_main.crop((58, 209, 480, 739))
    bbox = emblem_crop.getbbox()
    trimmed_emblem = emblem_crop.crop(bbox)
    print(f"Trimmed high-res emblem: {trimmed_emblem.size}")

    # 3. Create a 512x512 master square icon
    # Give it ~8% padding for aesthetic balance in circles and squares
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

    # 4. Generate multi-resolution .ico file
    ico_sizes = [(16, 16), (24, 24), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]
    ico_images = []
    for s in ico_sizes:
        resized = master_icon.resize(s, Image.Resampling.LANCZOS)
        ico_images.append(resized)

    # Save favicon.ico to web/app/favicon.ico and web/public/favicon.ico
    # PIL saves .ico with all sizes if provided in append_images
    ico_images[0].save(
        "web/app/favicon.ico",
        format="ICO",
        sizes=ico_sizes,
        append_images=ico_images[1:]
    )
    ico_images[0].save(
        "web/public/favicon.ico",
        format="ICO",
        sizes=ico_sizes,
        append_images=ico_images[1:]
    )
    print("Saved web/app/favicon.ico and web/public/favicon.ico with multi-resolution frames:", ico_sizes)

    # 5. Save standard PNG icons
    # 512x512
    master_icon.save("web/app/icon.png", "PNG", optimize=True)
    master_icon.save("web/public/icon.png", "PNG", optimize=True)
    master_icon.save("web/public/media/favicon.png", "PNG", optimize=True)
    
    # 180x180 (Apple touch icon)
    apple_icon = master_icon.resize((180, 180), Image.Resampling.LANCZOS)
    apple_icon.save("web/app/apple-icon.png", "PNG", optimize=True)
    apple_icon.save("web/public/apple-touch-icon.png", "PNG", optimize=True)

    # 32x32 and 16x16
    icon_32 = master_icon.resize((32, 32), Image.Resampling.LANCZOS)
    icon_32.save("web/public/favicon-32x32.png", "PNG", optimize=True)
    icon_32.save("web/public/media/favicon-32x32.png", "PNG", optimize=True)

    icon_16 = master_icon.resize((16, 16), Image.Resampling.LANCZOS)
    icon_16.save("web/public/favicon-16x16.png", "PNG", optimize=True)
    icon_16.save("web/public/media/favicon-16x16.png", "PNG", optimize=True)

    # 192x192
    icon_192 = master_icon.resize((192, 192), Image.Resampling.LANCZOS)
    icon_192.save("web/public/icon-192.png", "PNG", optimize=True)

    print("All favicon PNGs and ICO files successfully created.")

if __name__ == "__main__":
    generate_favicons()
