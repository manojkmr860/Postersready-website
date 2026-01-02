import { Jimp } from 'jimp';

async function getDominantColor(imagePath) {
    try {
        const image = await Jimp.read(imagePath);
        image.resize({ w: 150, h: 150 });

        let r_total = 0, g_total = 0, b_total = 0, count = 0;

        for (let x = 0; x < image.bitmap.width; x++) {
            for (let y = 0; y < image.bitmap.height; y++) {
                const color = image.getPixelColor(x, y);

                // Manual Int to RGBA
                const r = (color >> 24) & 255;
                const g = (color >> 16) & 255;
                const b = (color >> 8) & 255;

                r_total += r;
                g_total += g;
                b_total += b;
                count++;
            }
        }

        const avg_r = Math.round(r_total / count);
        const avg_g = Math.round(g_total / count);
        const avg_b = Math.round(b_total / count);

        // Convert to hex
        const toHex = (c) => {
            const hex = c.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };

        const hexColor = `#${toHex(avg_r)}${toHex(avg_g)}${toHex(avg_b)}`;
        console.log(`Dominant Color: ${hexColor}`);

    } catch (err) {
        console.error('Error details:', err);
    }
}

const args = process.argv.slice(2);
if (args.length > 0) {
    getDominantColor(args[0]);
} else {
    console.log('Please provide an image path.');
}
