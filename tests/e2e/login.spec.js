const {test, expect} = require('@playwright/test');
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

test('deve logar como administrador', async ({page}) =>{

    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', 'pwd123')
    await moviesPage.isLoggedIn()
})

test('não deve logar com senha incorreta', async ({page}) =>{

    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', 'abc123')

    const message = "Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente."

    await toast.HaveText(message)
})
test('não deve logar com email invalido', async ({page}) =>{

    await loginPage.visit()
    await loginPage.submit('jhons.com.br', 'abc123')
    await loginPage.alertHaveText('Email incorreto')
})

test('não deve logar com email vazio', async ({page}) =>{

    await loginPage.visit()
    await loginPage.submit('', 'abc123')
    await loginPage.alertHaveText('Campo obrigatório')
})

test('não deve logar quando a senha estiver vazia', async ({page}) =>{

    await loginPage.visit()
    await loginPage.submit('JhonDoe@gmail.com', '')
    await loginPage.alertHaveText('Campo obrigatório')
})

test('não deve logar quando email e senha estiverem vazios', async ({page}) =>{

    await loginPage.visit()
    await loginPage.submit('', '')
    await loginPage.alertHaveText(['Campo obrigatório','Campo obrigatório'])
})

