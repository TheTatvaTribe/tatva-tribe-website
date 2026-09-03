// Generate favicon set from public/images/logo-favicon-source.png:
// detect content bbox, pad to square, mask with anti-aliased circle,
// then resize to 32 / 180 / 192. Run with: node scripts/gen-favicon.cjs
const sharp = require('sharp');
const fs = require('fs');

const SRC = 'public/images/logo-favicon-source.png';
const ALPHA_THRESHOLD = 16;
const WHITE_THRESHOLD = 240;

async function main() {
    // 1. Read raw pixels and find bbox of "content" (non-transparent, non-white)
    const { data, info } = await sharp(SRC).raw().toBuffer({ resolveWithObject: true });
    const { width, height, channels } = info;

    let minX = width, minY = height, maxX = -1, maxY = -1;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const i = (y * width + x) * channels;
            const a = channels === 4 ? data[i + 3] : 255;
            if (a <= ALPHA_THRESHOLD) continue;
            const r = data[i], g = data[i + 1], b = data[i + 2];
            const isBackground = r > WHITE_THRESHOLD && g > WHITE_THRESHOLD && b > WHITE_THRESHOLD;
            if (isBackground) continue;
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
        }
    }
    const cw = maxX - minX + 1;
    const ch = maxY - minY + 1;
    const size = Math.max(cw, ch);
    console.log(`content bbox ${minX},${minY}-${maxX},${maxY} (${cw}x${ch}) → square ${size}`);

    // 2. Crop to bbox and pad to square (centered)
    const padLeft = Math.floor((size - cw) / 2);
    const padRight = size - cw - padLeft;
    const padTop = Math.floor((size - ch) / 2);
    const padBottom = size - ch - padTop;

    const squared = await sharp(SRC)
        .extract({ left: minX, top: minY, width: cw, height: ch })
        .extend({
            left: padLeft, right: padRight, top: padTop, bottom: padBottom,
            background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .png()
        .toBuffer();

    // 3. Build a raw RGBA circle mask exactly matching the squared buffer.
    //    Soft 1-pixel AA at the edge for smoother resize.
    const mask = Buffer.alloc(size * size * 4);
    const center = (size - 1) / 2;
    const r = size / 2;
    const rIn = r - 1;
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            const dx = x - center;
            const dy = y - center;
            const dist = Math.sqrt(dx * dx + dy * dy);
            let alpha;
            if (dist <= rIn) alpha = 255;
            else if (dist >= r) alpha = 0;
            else alpha = Math.round(255 * (r - dist));
            const i = (y * size + x) * 4;
            mask[i] = 255; mask[i + 1] = 255; mask[i + 2] = 255; mask[i + 3] = alpha;
        }
    }
    const maskBuf = await sharp(mask, { raw: { width: size, height: size, channels: 4 } })
        .png().toBuffer();

    // 4. Composite (dest-in keeps source pixels where mask alpha is high)
    const masked = await sharp(squared)
        .composite([{ input: maskBuf, blend: 'dest-in' }])
        .png()
        .toBuffer();

    // 5. Resize to favicon sizes
    const targets = [
        [32, 'favicon-32.png'],
        [180, 'apple-touch-icon.png'],
        [192, 'favicon-192.png'],
    ];
    for (const [px, file] of targets) {
        await sharp(masked)
            .resize(px, px, { kernel: 'lanczos3' })
            .png({ compressionLevel: 9 })
            .toFile('public/' + file);
        const kb = (fs.statSync('public/' + file).size / 1024).toFixed(1);
        console.log(`${file}: ${kb} KB`);
    }
}

main().catch(e => { console.error(e); process.exit(1); });
