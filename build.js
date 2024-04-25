const fs = require('fs');
const { chromium } = require('playwright');
const cheerio = require('cheerio');

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

    const $ = cheerio.load(fs.readFileSync('index.html'));
    $('#activities').attr('src', activitiesURL);
    $('#menu').attr('src', menuURL);

    fs.mkdirSync('out');
    fs.writeFileSync('out/index.html', $.html());
}

main();