import { IAccessToken } from "../interfaces/AccessToken";
import { prismaClient } from "../prisma/client";

//Aqui hacemos que el token se elimine en una hora de la bd
export async function createAccessToken(token: string, id: string){
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + 1) //Y aqui establecemos el tiempo
    await prismaClient.accessTokens.create({
        data: {
            token,
            user_id: id,
            expiresAt
        },
    });
}