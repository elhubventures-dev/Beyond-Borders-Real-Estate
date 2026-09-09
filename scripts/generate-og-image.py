from PIL import Image, ImageDraw, ImageFont
import os

# Target dimensions for Open Graph
WIDTH = 1200
HEIGHT = 630

# Colors
BG_OBSIDIAN = (11, 15, 23)      # #0B0F17
BG_SLATE = (17, 24, 39)         # #111827
GOLD_PRIMARY = (197, 160, 89)   # #C5A059
GOLD_LIGHT = (216, 180, 110)    # #D8B46E
TEXT_WHITE = (255, 255, 255)
TEXT_MUTED = (160, 174, 192)    # Slate 400
TEXT_BRONZE = (216, 180, 110)

def create_og_image():
    # 1. Base image with vertical luxury gradient
    base = Image.new("RGBA", (WIDTH, HEIGHT), BG_OBSIDIAN + (255,))
    draw = ImageDraw.Draw(base)
    
    # Gradient background
    for y in range(HEIGHT):
        ratio = y / HEIGHT
        r = int(BG_OBSIDIAN[0] + (BG_SLATE[0] - BG_OBSIDIAN[0]) * ratio)
        g = int(BG_OBSIDIAN[1] + (BG_SLATE[1] - BG_OBSIDIAN[1]) * ratio)
        b = int(BG_OBSIDIAN[2] + (BG_SLATE[2] - BG_OBSIDIAN[2]) * ratio)
        draw.line([(0, y), (WIDTH, y)], fill=(r, g, b, 255))

    # Ambient radial gold glow in the center-top
    glow = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    cx, cy = WIDTH // 2, 220
    for radius in range(350, 0, -5):
        alpha = int((1 - radius / 350) * 22)
        glow_draw.ellipse([cx - radius, cy - radius, cx + radius, cy + radius], fill=GOLD_PRIMARY + (alpha,))
    base = Image.alpha_composite(base, glow)
    draw = ImageDraw.Draw(base)

    # 2. Architectural hairline border with corner notches
    inset = 28
    draw.rectangle([inset, inset, WIDTH - inset, HEIGHT - inset], outline=GOLD_PRIMARY + (70,), width=1)
    
    # Corner accent marks
    corner_len = 20
    # Top-left
    draw.line([(inset, inset), (inset + corner_len, inset)], fill=GOLD_LIGHT + (200,), width=2)
    draw.line([(inset, inset), (inset, inset + corner_len)], fill=GOLD_LIGHT + (200,), width=2)
    # Top-right
    draw.line([(WIDTH - inset - corner_len, inset), (WIDTH - inset, inset)], fill=GOLD_LIGHT + (200,), width=2)
    draw.line([(WIDTH - inset, inset), (WIDTH - inset, inset + corner_len)], fill=GOLD_LIGHT + (200,), width=2)
    # Bottom-left
    draw.line([(inset, HEIGHT - inset), (inset + corner_len, HEIGHT - inset)], fill=GOLD_LIGHT + (200,), width=2)
    draw.line([(inset, HEIGHT - inset - corner_len), (inset, HEIGHT - inset)], fill=GOLD_LIGHT + (200,), width=2)
    # Bottom-right
    draw.line([(WIDTH - inset - corner_len, HEIGHT - inset), (WIDTH - inset, HEIGHT - inset)], fill=GOLD_LIGHT + (200,), width=2)
    draw.line([(WIDTH - inset, HEIGHT - inset - corner_len), (WIDTH - inset, HEIGHT - inset)], fill=GOLD_LIGHT + (200,), width=2)

    # 3. Load official high-res logo
    logo_path = "wp-content/uploads/2022/10/Main-Logo.png"
    im_logo = Image.open(logo_path).convert("RGBA")
    bbox = im_logo.getbbox()
    trimmed_logo = im_logo.crop(bbox)
    
    # We want the logo to be prominent in the upper-middle area
    target_logo_w = 540
    logo_scale = target_logo_w / trimmed_logo.width
    target_logo_h = int(trimmed_logo.height * logo_scale)
    scaled_logo = trimmed_logo.resize((target_logo_w, target_logo_h), Image.Resampling.LANCZOS)
    
    logo_x = (WIDTH - target_logo_w) // 2
    logo_y = 110
    base.paste(scaled_logo, (logo_x, logo_y), scaled_logo)

    # 4. Typography
    # Fonts
    font_serif = ImageFont.truetype("C:/Windows/Fonts/georgiab.ttf", 36)
    font_sans_sub = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 20)
    font_badge = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 13)
    font_url = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 15)

    # Eyebrow tag above logo
    eyebrow = "ABUJA • FEDERAL CAPITAL TERRITORY"
    bbox_eye = draw.textbbox((0, 0), eyebrow, font=font_badge)
    eye_w = bbox_eye[2] - bbox_eye[0]
    draw.text(((WIDTH - eye_w) // 2, 68), eyebrow, fill=GOLD_LIGHT + (220,), font=font_badge)

    # Tagline headline under logo
    tagline = "Smart & Luxury Homes in Abuja"
    bbox_tag = draw.textbbox((0, 0), tagline, font=font_serif)
    tag_w = bbox_tag[2] - bbox_tag[0]
    draw.text(((WIDTH - tag_w) // 2, logo_y + target_logo_h + 38), tagline, fill=TEXT_WHITE, font=font_serif)

    # Pillar features / Subtitle
    subtext = "Master-Planned Communities  •  Luxury Residences  •  Titled Land Holdings"
    bbox_sub = draw.textbbox((0, 0), subtext, font=font_sans_sub)
    sub_w = bbox_sub[2] - bbox_sub[0]
    draw.text(((WIDTH - sub_w) // 2, logo_y + target_logo_h + 90), subtext, fill=TEXT_MUTED, font=font_sans_sub)

    # 5. Bottom Badges Bar
    badge_y = HEIGHT - 82
    badges = [
        "100% AGIS & FCDA Compliant",
        "4 Master-Planned Estates",
        "8M+ Sq. Ft. Portfolio",
        "www.beyondborders.ng"
    ]
    
    # Calculate widths for badge items
    items_total_w = 0
    item_boxes = []
    for b in badges:
        bb = draw.textbbox((0, 0), b, font=font_badge)
        bw = bb[2] - bb[0] + 28
        item_boxes.append((b, bw))
        items_total_w += bw
    
    gap = 20
    total_bar_w = items_total_w + gap * (len(badges) - 1)
    start_x = (WIDTH - total_bar_w) // 2

    cur_x = start_x
    for b, bw in item_boxes:
        is_url = "www." in b
        # Badge background pill
        pill_rect = [cur_x, badge_y, cur_x + bw, badge_y + 30]
        if is_url:
            draw.rectangle(pill_rect, fill=GOLD_PRIMARY + (40,), outline=GOLD_PRIMARY + (180,), width=1)
            b_color = GOLD_LIGHT
        else:
            draw.rectangle(pill_rect, fill=(255, 255, 255, 12), outline=(255, 255, 255, 30), width=1)
            b_color = (200, 210, 225)
            
        bb = draw.textbbox((0, 0), b, font=font_badge)
        text_w = bb[2] - bb[0]
        text_h = bb[3] - bb[1]
        draw.text((cur_x + (bw - text_w) // 2, badge_y + (30 - text_h) // 2 - 2), b, fill=b_color, font=font_badge)
        cur_x += bw + gap

    # Ensure output directories exist
    os.makedirs("web/public", exist_ok=True)
    os.makedirs("web/public/media", exist_ok=True)
    os.makedirs("web/app", exist_ok=True)

    # Save to standard locations:
    # 1. web/public/og-image.png
    base.save("web/public/og-image.png", "PNG", optimize=True)
    # 2. web/public/media/og-image.png
    base.save("web/public/media/og-image.png", "PNG", optimize=True)
    # 3. web/app/opengraph-image.png (Next.js automatically discovers this!)
    base.save("web/app/opengraph-image.png", "PNG", optimize=True)
    
    print("Successfully generated og-image.png (1200x630) at:")
    print(" - web/public/og-image.png")
    print(" - web/public/media/og-image.png")
    print(" - web/app/opengraph-image.png")

if __name__ == "__main__":
    create_og_image()
