import { IAccessToken } from "../interfaces/AccessToken";
import { prismaClient } from "../prisma/client";

export async function createAccessToken(token: string, id: string){
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + 1) //Con esto tambien hacemos que el token se elimine en una hora de la bd
    await prismaClient.accessTokens.create({
        data: {
            token,
            user_id: id,
            expiresAt
        },
    });
}