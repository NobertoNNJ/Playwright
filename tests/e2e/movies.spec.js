const {test} = require('@playwright/test')

const {LoginPage} = require ('../pages/loginPage');
const {Toast} = require('../pages/Components')
const {MoviesPage} = require('../pages/MoviesPage')

let loginPage
let toast
let moviesPage

test.beforeEach(({page}) => {
    loginPage = new LoginPage(page)
    toast = new Toast(page)
    moviesPage = new MoviesPage(page)
})

test('deve poder cadastrar um  novo filme', async ({page}) => {
    //login é necessario
    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', 'pwd123')
    await moviesPage.isLoggedIn()

    
})