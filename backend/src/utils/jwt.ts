import jwt from 'jsonwebtoken';

export async function createJWT(id:string, JWT_SECRET:string, duration:string){
    const newJWT = jwt.sign({ id }, JWT_SECRET, { expiresIn: duration });
    return newJWT
}