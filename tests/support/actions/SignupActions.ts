import { expect, Page } from '@playwright/test'

export class SignupActions {
    constructor(private page: Page) {}


    get titleSignup() {
        return this.page.getByRole('heading', { level: 2 })
    }

    get inputName() {
        return this.page.getByPlaceholder('Digite seu nome')
    }

    get inputEmail() {
        return this.page.locator('input[data-testid="email"]')
    }

    get inputPassword() {
        return this.page.locator('input[name="password"]')
    }

    get checkboxAdministrator() {
        return this.page.locator('#administrador')
    }

    get buttonSignup() {
        return this.page.getByRole('button', { name: 'Cadastrar' })
    }

    // get messageSuccess() {
    //     return this.page.getByText('Cadastro realizado com sucesso')
    // }

    message(text: string) {
        return this.page.getByText(text) 
    }

    async titleSignupIsVisible() {
        await expect(this.titleSignup).toHaveText('Cadastro')
    }

    async fillCredentials(name: string, email: string, password: string) {
        await this.inputName.fill(name)
        await this.inputEmail.fill(email)
        await this.inputPassword.fill(password)
    }

    async checkAdministrator() {
        await this.checkboxAdministrator.click()
    }

    async submitForm() {
        await this.buttonSignup.click()
    }

    async validateMessage(message: string) {
        await expect(this.message(message)).toBeVisible()
    }
}