// @ts-check
import { test, expect } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage';
const { faker } = require('@faker-js/faker');

// @ts-ignore
/*
let landingPage

test.beforeEach(async ({page}) => {
  landingPage = new LandingPage(page)
})*/


test('deve cadastrar um lead na fila de espera', async ({page}) => {
  const landingPage = new LandingPage(page)
  const leadName = faker.person.firstName()
  const leadEmail = faker.internet.email()

  await landingPage.visit()
  await landingPage.openLeadModal()
  // @ts-ignore
  await landingPage.submitLeadForm(leadName, leadEmail)

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  
  await landingPage.toastHaveTest(message)

})

test('não deve cadastrar um lead na fila de espera com email ja cadastrado', async ({page, request}) => {
  const landingPage = new LandingPage(page)
  const leadName = faker.person.firstName()
  const leadEmail = faker.internet.email()

  //pré cadastra os dados na api
  const newLead =  await request.post('http://localhost:3333/leads', {
    data:{
      name: leadName,
      email: leadEmail
    }
  })
  //retorna status code de sucesso
  expect(newLead.ok()).toBeTruthy()

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm(leadName, leadEmail)

  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'
  
  await landingPage.toastHaveTest(message)

})

test('não deve cadastrar com email invalido', async ({ page }) => {
  const landingPage = new LandingPage(page)

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Jhon Doe', 'jhondoe.com')

  await landingPage.alertHaveText('Email incorreto')
})

test('não deve cadastrar com nome vazio', async ({ page }) => {
  const landingPage = new LandingPage(page)

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('', 'jhondoe@gmail.com')

  await landingPage.alertHaveText('Campo obrigatório')
})

test('não deve cadastrar com email vazio', async ({ page }) => {
  const landingPage = new LandingPage(page)

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Jhon Doe', '')

  await landingPage.alertHaveText('Campo obrigatório')
})

test('não deve cadastrar com campos em branco', async ({ page }) => {
  const landingPage = new LandingPage(page)

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('', '')

  await landingPage.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ])
})
/*

test('deve cadastrar um lead na fila de espera', async ({ page }) => {

  //visit
  await page.goto('http://localhost:3000');

  //await page.click('//button[text()="Aperte o play... se tiver coragem"]')

  //await page.getByRole('button', {name: 'Aperte o play... se tiver coragem'}).click()
  //open LeadModal
  await page.getByRole('button', {name: /Aperte o play/}).click()

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera')
  
  //apenas funciona para data-testid
  //await page.getByTestId('name').fill('Jhon Doe')
  // selecionar por id
  //submit lead form
  await page.locator('#name').fill('Jhon Doe')
  //selecionar por name
  await page.locator('input[name=email]').fill('jhondoe@gmail.com')
  //selecionar por placeholder
  //await page.locator('input[placeholder="Seu email principal"]').fill('jhondoe@gmail.com')
  //await page.getByPlaceholder('Seu email principal').fill('jhondoe@gmail.com')

  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click()

  // toast have test
  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'

  await expect(page.locator('.toast')).toHaveText(message)

  await expect(page.locator('.toast')).toBeHidden({timeout: 5000})

  await page.waitForTimeout(3000)
});

test('não deve cadastrar com email invalido', async ({ page }) => {
  
  await page.goto('http://localhost:3000');

  await page.getByRole('button', {name: /Aperte o play/}).click()

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera')
  
  await page.locator('#name').fill('Jhon Doe')
  await page.locator('input[name=email]').fill('jhondoe.com')

  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click()

  await expect(page.locator('.alert')).toHaveText('Email incorreto')

  await page.waitForTimeout(3000)
});


test('não deve cadastrar com nome vazio', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('button', {name: /Aperte o play/}).click()

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera')
  
  await page.locator('input[name=email]').fill('jhondoe@gmail.com')

  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click()

  await expect(page.locator('.alert')).toHaveText('Campo obrigatório')

  await page.waitForTimeout(3000)
});


test('não deve cadastrar com email não preenchido', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('button', {name: /Aperte o play/}).click()

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera')
  
  await page.locator('#name').fill('Jhon Doe')

  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click()

  await expect(page.locator('.alert')).toHaveText('Campo obrigatório')

  await page.waitForTimeout(3000)
});

test('não deve cadastrar com campos não preenchidos', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('button', {name: /Aperte o play/}).click()

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera')

  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click()

  await expect(page.locator('.alert')).toHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ])

  await page.waitForTimeout(3000)
});*/