import { APIRequestContext, expect } from '@playwright/test';

type User = {
    name?: string;
    email: string;
    password?: string;
};

export async function createUser(request: APIRequestContext, user: User) {
    const response = await request.post('https://serverest.dev/usuarios', {
        data: {
            nome: user.name,
            email: user.email,
            password: user.password ?? 'pwd123',
            administrador: 'true'
        },
    });

    const body = await response.json();
    console.log('STATUS:', response.status());
    console.log('BODY:', body);
    expect(response.ok()).toBeTruthy();

    return await response.json();
}