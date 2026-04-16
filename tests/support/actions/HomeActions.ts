import { expect, Page } from '@playwright/test'

export class HomeActions {

    constructor(private page: Page) {}

    userLogged(name: string) {
        return this.page.getByText(name)
    }

    async userIsLogged(name: string) {
        await expect(this.userLogged(name)).toBeVisible()
    }
}