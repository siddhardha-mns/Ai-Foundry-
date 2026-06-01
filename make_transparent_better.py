from PIL import Image

def process_image(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()

    newData = []
    for item in datas:
        r, g, b, a = item
        # Calculate alpha based on how far the pixel is from white
        min_c = min(r, g, b)
        
        # Invert min_c to get opacity (white has min_c = 255 -> alpha = 0)
        alpha = 255 - min_c
        
        # Boost alpha slightly to retain solidity of light colors like yellow
        alpha = int(alpha * 1.5)
        
        if alpha > 255:
            alpha = 255
            
        # Threshold for compression artifacts
        if alpha < 15:
            alpha = 0
            
        newData.append((r, g, b, alpha))

    img.putdata(newData)
    img.save(output_path, "PNG")

process_image("logo_ai_foundry.jpeg", "public/new_logo.png")
