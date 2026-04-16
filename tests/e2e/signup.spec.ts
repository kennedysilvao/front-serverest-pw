import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { HomeActions } from '../support/actions/HomeActions';
import { LoginActions } from '../support/actions/LoginActions';
import { SignupActions } from '../support/actions/SignupActions';

let loginActions: LoginActions
let signupActions: SignupActions
let homeActions: HomeActions

test.beforeEach('', async({ page }) => {
    loginActions = new LoginActions(page)
    signupActions = new SignupActions(page)
    homeActions = new HomeActions(page)
})

test('Should be registered with success', async ({ page }) => {
    const user = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: 'pwd123' 
    }
    await loginActions.visit()
    await loginActions.loginFormIsVisible()
    await loginActions.goToSignupForm()

    await signupActions.fillCredentials(user.name, user.email, user.password)
    await signupActions.checkAdministrator()
    await signupActions.submitForm()
    await signupActions.messageSuccessIsVisible()

    await homeActions.userIsLogged(user.name)
})