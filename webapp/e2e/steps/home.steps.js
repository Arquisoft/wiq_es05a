const puppeteer = require('puppeteer');
const { defineFeature, loadFeature }=require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions
const feature = loadFeature('../features/home.feature');

let page;
let browser;

defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false, slowMo: 100 });
    page = await browser.newPage();
    //Way of setting up the timeout
    setDefaultOptions({ timeout: 10000 })

    await page
      .goto("http://localhost:3000", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });

  test('A registered user enters the app', ({given,when,then}) => {
    
    let username;
    let password;

    given('A user that is logged in the application', async () => {
      username = "pablo"
      password = "pabloasw"
      await expect(page).toClick("button", { text: "INICIA SESIÓN" });
    });

    when('I navigate to the Home page', async () => {
      await expect(page).toFill('input[name="username"]', username);
      await expect(page).toFill('input[name="password"]', password);
      await expect(page).toClick('button', { text: 'Login' })

      await expect(page).toClick('a[href="/"]', { text: 'WIQ 5A' });
      await page.waitForNavigation();
       
    });

    then('I should be able to interact with the app', async () => {
        await expect(page).toMatchElement("button", { text: "JUGAR" });
        await expect(page).toMatchElement("button", { text: "ESTADÍSTICAS" });
    });
  })

  afterAll(async ()=>{
    browser.close()
  })

});