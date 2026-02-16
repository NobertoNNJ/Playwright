const {test} = require('@playwright/test')

const data = require('../support/fixtures/movies.json')
const {executeSQL} = require('../support/fixtures/database')

const {Login} = require ('../actions/login');
const {Toast} = require('../actions/Components')
const {Movies} = require('../actions/Movies')

let login
let toast
let movies

test.beforeEach(({page}) => {
    login = new Login(page)
    toast = new Toast(page)
    movies = new Movies(page)
})


test('deve poder cadastrar um novo filme', async ({page}) => {
    const movie = data.movie_4

    await executeSQL(`DELETE from movies WHERE title = '${movie.title}';`)

    await login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await movies.create(movie)
    await toast.HaveText('Cadastro realizado com sucesso!')
})

test('não deve poder cadastrar um filme ja cadastrado', async ({page}) => {
    const movie = data.movie_5

    await executeSQL(`DELETE from movies WHERE title = '${movie.title}';`)

    await login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await movies.create(movie)
    await toast.HaveText('Cadastro realizado com sucesso!')

    await movies.create(movie)
    await toast.HaveText('Este conteúdo já encontra-se cadastrado no catálogo')
})

test('não deve cadastrar quando os campos obrigatorios não são preenchidos', async ({page}) => {

    await login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await movies.goForm()
    await movies.submit()

    await movies.alertHaveText([
        'Por favor, informe o título.',
        'Por favor, informe a sinopse.',
        'Por favor, informe a empresa distribuidora.',
        'Por favor, informe o ano de lançamento.'
    ])
})