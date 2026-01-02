from PIL import Image
import sys
import collections

def get_dominant_color(image_path):
    try:
        img = Image.open(image_path)
        img = img.resize((150, 150))
        colors = img.getcolors(150 * 150)
        most_common = sorted(colors, key=lambda x: x[0], reverse=True)[0]
        rgb = most_common[1]
        hex_color = '#{:02x}{:02x}{:02x}'.format(rgb[0], rgb[1], rgb[2])
        print(f"Dominant Color: {hex_color}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        get_dominant_color(sys.argv[1])
    else:
        print("Please provide an image path.")
