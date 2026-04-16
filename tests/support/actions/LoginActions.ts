import { expect, Page } from '@playwright/test'

export class LoginActions {
    constructor(private page: Page) { }

    get loginTitle() {
        return this.page.getByRole('heading', { level: 1 })
    }

    get linkToSignup() {
        return this.page.locator('a[data-testid="cadastrar"]')
    }

    async loginFormIsVisible() {
        await expect(this.loginTitle).toHaveText('Login')
    }

    async visit() {
        await this.page.goto('https://front.serverest.dev/')
        await expect(this.page).toHaveTitle(/Front - ServeRest/)
    }

    async goToSignupForm() {
        await this.linkToSignup.click()
    }
}