// @ts-check
import { test, expect } from '@playwright/test';

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  await page.goto('http://localhost:3000');

  //await page.click('//button[text()="Aperte o play... se tiver coragem"]')

  //await page.getByRole('button', {name: 'Aperte o play... se tiver coragem'}).click()

  await page.getByRole('button', {name: /Aperte o play/}).click()

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera')
  
  //apenas funciona para data-testid
  //await page.getByTestId('name').fill('Jhon Doe')
  // selecionar por id
  await page.locator('#name').fill('Jhon Doe')
  //selecionar por name
  await page.locator('input[name=email]').fill('jhondoe@gmail.com')
  //selecionar por placeholder
  //await page.locator('input[placeholder="Seu email principal"]').fill('jhondoe@gmail.com')
  //await page.getByPlaceholder('Seu email principal').fill('jhondoe@gmail.com')

  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click()

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