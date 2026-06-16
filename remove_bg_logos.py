from PIL import Image
import os

def remove_white_bg(input_path, output_path, threshold=30):
    """Remove white/near-white background from an image."""
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()

    newData = []
    for item in datas:
        r, g, b, a = item
        # How "white-like" is this pixel? White = high R, G, B all close
        whiteness = min(r, g, b)
        
        # If pixel is very light (close to white), make transparent
        if whiteness > (255 - threshold):
            # Near-white: scale alpha based on distance from pure white
            alpha = int((255 - whiteness) / threshold * 255)
            if alpha < 20:
                alpha = 0
            newData.append((r, g, b, alpha))
        else:
            # Non-white pixel: keep fully opaque
            newData.append((r, g, b, 255))

    img.putdata(newData)
    img.save(output_path, "PNG")
    print(f"  ✓ {os.path.basename(input_path)} → {os.path.basename(output_path)}")


logos = [
    ("public/logo_beacon.jpeg",       "public/logo_beacon.png"),
    ("public/logo_devcatalyst.jpeg",  "public/logo_devcatalyst.png"),
    ("public/logo_gdg.jpeg",          "public/logo_gdg.png"),
    ("public/logo_yanc.jpeg",         "public/logo_yanc.png"),
    ("public/logo_codecrafters.jpeg", "public/logo_codecrafters.png"),
    ("public/logo_mobbin.jpeg",       "public/logo_mobbin.png"),
    ("public/logo_studenttribe.jpeg", "public/logo_studenttribe.png"),
    ("public/logo_csxia.jpeg",        "public/logo_csxia.png"),
    ("public/logo_thestudentspot.jpeg","public/logo_thestudentspot.png"),
]

print("Removing backgrounds from partner logos...")
for inp, out in logos:
    remove_white_bg(inp, out)

print("\nAll done! Transparent PNGs saved to public/")
