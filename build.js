const { chromium } = require('playwright');

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

    console.log(activitiesURL);
    console.log(menuURL);
    await browser.close();
}

main();