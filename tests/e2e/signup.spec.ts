import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { HomeActions } from '../support/actions/HomeActions';
import { LoginActions } from '../support/actions/LoginActions';
import { SignupActions } from '../support/actions/SignupActions';
import { createUser } from '../support/apiHelper/apiHelper';

let loginActions: LoginActions
let signupActions: SignupActions
let homeActions: HomeActions

test.beforeEach('', async ({ page }) => {
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
    await signupActions.submitForm()
    await signupActions.validateMessage('Cadastro realizado com sucesso')

    await homeActions.userIsLogged('Serverest Store')
})

test('Should be registered like admin with success', async ({ page }) => {
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
    await signupActions.validateMessage('Cadastro realizado com sucesso')

    await homeActions.userIsLogged(user.name)
})

test('Required fields', async ({ page }) => {
    const user = {
        name: '',
        email: '',
        password: ''
    }

    await loginActions.visit()
    await loginActions.loginFormIsVisible()
    await loginActions.goToSignupForm()

    await signupActions.fillCredentials(user.name, user.email, user.password)
    await signupActions.submitForm()
    await signupActions.validateMessage('Nome é obrigatório')
    await signupActions.validateMessage('Email é obrigatório')
    await signupActions.validateMessage('Password é obrigatório')
})

test('Should not be accept invalid email', async ({ page }) => {
    const user = {
        name: faker.person.fullName(),
        email: 'teste@edas',
        password: 'pwd123'
    }

    await loginActions.visit()
    await loginActions.loginFormIsVisible()
    await loginActions.goToSignupForm()

    await signupActions.fillCredentials(user.name, user.email, user.password)
    await signupActions.checkAdministrator()
    await signupActions.submitForm()
    await signupActions.validateMessage('Email deve ser um email válido')
})

test('Should not be registered with email duplicated', async ({ page, request }) => {
    const user = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: 'pwd123'
    }

    await createUser(request, user)

    await loginActions.visit()
    await loginActions.loginFormIsVisible()
    await loginActions.goToSignupForm()

    await signupActions.fillCredentials(user.name, user.email, user.password)
    await signupActions.checkAdministrator()
    await signupActions.submitForm()
    await signupActions.validateMessage('Este email já está sendo usado')
})