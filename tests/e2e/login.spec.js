const {test, expect} = require('@playwright/test');
const {Login} = require ('../actions/login');
const {Toast} = require('../actions/Components')

let login
let toast

test.beforeEach(({page}) => {
    login = new Login(page)
    toast = new Toast(page)
})

test('deve logar como administrador', async ({page}) =>{

    await login.visit()
    await login.submit('admin@zombieplus.com', 'pwd123')
    await login.isLoggedIn('Admin')
})

test('não deve logar com senha incorreta', async ({page}) =>{

    await login.visit()
    await login.submit('admin@zombieplus.com', 'abc123')

    const message = "Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente."

    await toast.HaveText(message)
})
test('não deve logar com email invalido', async ({page}) =>{

    await login.visit()
    await login.submit('jhons.com.br', 'abc123')
    await login.alertHaveText('Email incorreto')
})

test('não deve logar com email vazio', async ({page}) =>{

    await login.visit()
    await login.submit('', 'abc123')
    await login.alertHaveText('Campo obrigatório')
})

test('não deve logar quando a senha estiver vazia', async ({page}) =>{

    await login.visit()
    await login.submit('JhonDoe@gmail.com', '')
    await login.alertHaveText('Campo obrigatório')
})

test('não deve logar quando email e senha estiverem vazios', async ({page}) =>{

    await login.visit()
    await login.submit('', '')
    await login.alertHaveText(['Campo obrigatório','Campo obrigatório'])
})

