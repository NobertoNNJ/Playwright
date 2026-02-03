const {test} = require('@playwright/test')

const data = require('../support/fixtures/movies.json')
const {executeSQL} = require('../support/fixtures/database')

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
    const movie = data.movie_4

    await executeSQL(`DELETE from movies WHERE title = '${movie.title}';`)
    //login é necessario
    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', 'pwd123')
    
    await moviesPage.isLoggedIn()
    await moviesPage.create(movie.title, movie.overview, movie.company, movie.release_year)
 
    await toast.HaveText('Cadastro realizado com sucesso!')


})