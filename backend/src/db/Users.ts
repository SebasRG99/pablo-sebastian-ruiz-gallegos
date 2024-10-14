import { IUser } from "../interfaces/User";
import { prismaClient } from "../prisma/client";

//Buscar usuarios por telefono
export async function searchUserByPhone(phone: string) {
    return await prismaClient.users.findFirst({where: {phone}});
}

// Crear un nuevo usuario
export async function createNewUser(user: IUser) {
    return prismaClient.users.create({
        data: {
            name: user.name,
            phone: user.phone,
            img_profile: user.img_profile,
            password: user.password,
        },
    });
}
