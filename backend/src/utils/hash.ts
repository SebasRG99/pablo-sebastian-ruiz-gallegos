import bcrypt from 'bcrypt'

// Generamos un hash para la contraseña
export async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // es el numero de veces que se aplicara el algoritmo de hashing
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

// Aqui verificamos si la contraseña proporcionada coincide con el hash almacenado en la BD
export async function verifyPassword(
    password: string,
    hashedPassword: string
): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
}