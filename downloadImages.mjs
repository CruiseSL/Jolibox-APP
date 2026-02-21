import fs from 'fs';
import path from 'path';
import gplay from 'google-play-scraper';
import https from 'https';

const appIds = {
    "subway-surfers": "com.kiloo.subwaysurf",
    "roblox": "com.roblox.client",
    "genshin-impact": "com.miHoYo.GenshinImpact",
    "candy-crush": "com.king.candycrushsaga",
    "brawl-stars": "com.supercell.brawlstars",
    "pubg-mobile": "com.tencent.ig",
    "clash-of-clans": "com.supercell.clashofclans",
    "among-us": "com.innersloth.spacemafia",
    "monopoly-go": "com.scopely.monopolygo",
    "royal-match": "com.dreamgames.royalmatch",
    "pokemon-go": "com.nianticlabs.pokemongo",
    "stumble-guys": "com.scopely.stumbleguys"
};

const outputDir = path.join(process.cwd(), 'public', 'games');

async function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode === 200 || res.statusCode === 302 || res.statusCode === 301) {
                if (res.headers.location) {
                    return downloadImage(res.headers.location, dest).then(resolve).catch(reject);
                }
                const file = fs.createWriteStream(dest);
                res.pipe(file);
                file.on('finish', () => {
                    file.close(resolve);
                });
            } else {
                console.error(`Status ${res.statusCode} for ${url}`);
                // Let's fallback with simple 512x512 from icon horse if google play fails
                reject(new Error(`Status ${res.statusCode}`));
            }
        }).on('error', reject);
    });
}

async function run() {
    for (const [id, appId] of Object.entries(appIds)) {
        try {
            console.log(`Scraping play store for ${id}...`);
            const app = await gplay.app({ appId });
            let iconUrl = app.icon;

            // Clean up google tracking / crop params to get raw full image
            iconUrl = iconUrl.split('=')[0];

            console.log(`Downloading icon for ${id} from ${iconUrl}`);
            const dest = path.join(outputDir, `${id}.png`);
            await downloadImage(iconUrl, dest);
            console.log(`Saved ${dest}`);
        } catch (e) {
            console.error(`Failed to process ${id}:`, e.message);

            // Fallback
            console.log(`Attempting fallback download for ${id}...`);
            const dest = path.join(outputDir, `${id}.png`);
            const fallbackUrl = `https://unavatar.io/googleplay/${appId}`;
            try {
                await downloadImage(fallbackUrl, dest);
                console.log(`Saved fallback for ${dest}`);
            } catch (e2) {
                console.error(`Fallback failed for ${id}`);
            }
        }
    }
}

run();
