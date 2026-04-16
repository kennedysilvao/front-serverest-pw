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
    expect(response.ok()).toBeTruthy();

    return await response.json();
}

export async function getUserByEmail(request: APIRequestContext, email: string) {
    const response = await request.get('https://serverest.dev/usuarios', {
        params: {
            email: email,
        },
    });
    expect(response.ok()).toBeTruthy();
    const body = await response.json();

    if (body.usuarios.length === 0) {
        console.log('Usuário não encontrado, nada para deletar');
        return;
    }
    const userId = body.usuarios[0]._id;

    return userId;
}

export async function deleteUserByID(request: APIRequestContext, email: string) {
    const userId = await getUserByEmail(request, email)

    const response = await request.delete(`https://serverest.dev/usuarios/${userId}`);
    expect(response.ok()).toBeTruthy();

    return await response.json();
}