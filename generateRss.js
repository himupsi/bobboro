const puppeteer = require('puppeteer');
const fs = require('fs');

const LAST_POST_ID_FILE = 'last_post_id';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36");

  await page.goto('https://www.instagram.com/delightfood_3', {
    waitUntil: 'networkidle2',
  });
  const lastPost = await page.$$('article > div:nth-child(1) img');
  if (lastPost) {
    console.log(lastPost);
    const src = await lastPost.getProperty('src');
    console.log(src);
    await page.goto(src, { waitUntil: 'networkidle2' });
    await page.screenshot({ path: `bobs/${+new Date()}.png`})
  }
  await browser.close();

})();