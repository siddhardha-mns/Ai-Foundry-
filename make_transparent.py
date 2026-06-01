from PIL import Image

def make_transparent(input_path, output_path):
    img = Image.open(input_path)
    img = img.convert("RGBA")
    datas = img.getdata()

    newData = []
    # Using a threshold to make white/light pixels transparent
    for item in datas:
        # Check if the pixel is bright enough to be considered white background
        if item[0] > 220 and item[1] > 220 and item[2] > 220:
            # Change all white (also shades of whites)
            # pixels to transparent
            newData.append((255, 255, 255, 0))
        else:
            # Keep original pixel, but we can also multiply it against the background 
            # Or just keep it as is
            newData.append(item)

    img.putdata(newData)
    img.save(output_path, "PNG")

make_transparent("logo_ai_foundry.jpeg", "public/new_logo.png")
