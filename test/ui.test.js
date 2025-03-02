const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('UI Testing using Selenium', function() {
    this.timeout(30000); // Menetapkan timeout pada seluruh suite pengujian

    let driver;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function() {
        await driver.quit();
    });

    it('should load the login page', async function() {
        await driver.get('file:///C:/Users/Nadia/prak-PPMPL/prak-ppmpl-4/selenium-ui-test/login.html');
        const title = await driver.getTitle();
        expect(title).to.equal('Login Page');
    });

    it('should input username and password', async function() {
        await driver.findElement(By.id('username')).sendKeys('testuser');
        await driver.findElement(By.id('password')).sendKeys('password123');

        const usernameValue = await driver.findElement(By.id('username')).getAttribute('value');
        const passwordValue = await driver.findElement(By.id('password')).getAttribute('value');

        expect(usernameValue).to.equal('testuser');
        expect(passwordValue).to.equal('password123');
    });

    it('should click the login button', async function() {
        await driver.findElement(By.id('loginButton')).click();
        // Lakukan validasi tambahan jika diperlukan (misalnya: validasi pesan sukses/gagal login)
    });

    it('should show error on invalid login', async function() {
        this.timeout(5000); // Timeout spesifik untuk pengujian ini
        await driver.findElement(By.id('username')).sendKeys('wronguser');
        await driver.findElement(By.id('password')).sendKeys('wrongpassword');
        await driver.findElement(By.id('loginButton')).click();

        // Tunggu hingga elemen errorMessage muncul
        const errorMessageElement = await driver.wait(until.elementLocated(By.id('errorMessage')), 5000);
        const errorMessage = await errorMessageElement.getText();
        
        expect(errorMessage).to.equal('Invalid username or password.');
        await driver.findElement(By.id('username')).clear();
        await driver.findElement(By.id('password')).clear();
    });

    it('should input username and password using CSS and XPath', async function() {
        await driver.findElement(By.css('#username')).sendKeys('testuser');
        await driver.findElement(By.xpath('//*[@id="password"]')).sendKeys('password123');

        const usernameValue = await driver.findElement(By.css('#username')).getAttribute('value');
        const passwordValue = await driver.findElement(By.xpath('//*[@id="password"]')).getAttribute('value');

        expect(usernameValue).to.equal('testuser');
        expect(passwordValue).to.equal('password123');
    });

    it('should validate that login button is visible', async function() {
        const isDisplayed = await driver.findElement(By.id('loginButton')).isDisplayed();
        expect(isDisplayed).to.be.true;
    });
});
