const { chromium } = require('playwright');

const whatsappUrl = "http://web.whatsapp.com/";
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
};

const contact = "+591 78002780";
const message = "Hola Raiden, es un mensaje de prueba desde playwright";


// https://ichi.pro/es/cree-una-api-para-enviar-y-recibir-mensajes-de-whatsapp-37877962075126
(async () => {
    const browser = await chromium.launch({ headless: false });
    // const context = await browser.newContext();

    const page = await browser.newPage();
    await page.goto(whatsappUrl);

    await page.waitForSelector('._1Jn3C div[role="textbox"]');
    await page.fill('._1Jn3C div[role="textbox"]', contact);

    await page.waitForSelector(`span[title="${contact}"]`);
    await page.click(`span[title="${contact}"]`);

    // await page.waitForSelector('._1UWac._1LbR4');
    // await sleep(1500);
    // await page.type('._1UWac._1LbR4', message);

    // await page.click('span[data-icon="send"]');

    await page.waitForSelector('span[data-icon="clip"]');
    await page.click('span[data-icon="clip"]');


    // https://www.youtube.com/watch?v=e8jfjV71E6Q
    page.on('filechooser', async (fileChooser) => {
        await fileChooser.setFiles('example.png');
    });
    await page.screenshot({ path: 'example.png' });

    await page.waitForSelector('span[data-icon="attach-image"]');
    await page.click('span[data-icon="attach-image"]', "example.png");
    // // https://playwright.dev/docs/input/#upload-files
    // await page.waitForSelector('span[data-icon="attach-image"] + input');
    // await page.setInputFiles('span[data-icon="attach-image"] + input', "example.png");
    
    await page.waitForSelector('div.nBIOd div[role="textbox"]');
    await sleep(1500);
    await page.type('div.nBIOd div[role="textbox"]', message);

    await page.click('span[data-icon="send"]');

    await sleep(500000);

    await browser.close();
})();