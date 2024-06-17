const fs = require('fs');
const { chromium } = require('playwright');
const { Readable } = require('stream');
const { finished } = require('stream/promises');

async function main() {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1080, height: 1024 });

    await page.goto('https://www.baerlis.ch/activities/');
    const activities = await page.waitForSelector(`[href*='-2b'].bwg-a`);
    const activitiesURL = await activities.getAttribute('href');

    await page.goto('https://www.baerlis.ch/menu/');
    const menu = await page.waitForSelector(`[href*='menu-e'].bwg-a`);
    const menuURL = await menu.getAttribute('href');

    await browser.close();
    
    fs.mkdirSync('out');
    fs.copyFileSync('index.html', 'out/index.html');
    await finished(Readable.fromWeb((await fetch(activitiesURL)).body).pipe(fs.createWriteStream('out/activities.jpg')));
    await finished(Readable.fromWeb((await fetch(menuURL)).body).pipe(fs.createWriteStream('out/menu.jpg')));
}

main();