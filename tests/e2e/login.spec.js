const {test, expect} = require('@playwright/test');
const {LoginPage} = require ('../pages/loginPage');

let loginPage

test.beforeEach(({page}) => {
    loginPage = new LoginPage(page)
})

test('deve logar como administrador', async ({page}) =>{

    await loginPage.visit()
})