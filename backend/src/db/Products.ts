import { IProducts } from "../interfaces/Products";
import { prismaClient } from "../prisma/client";

//Obtener todos los productos
export async function getAll(){
    return prismaClient.products.findMany()
}

//Obtener productos por id
export async function getByIds(ids: string[]) {
    return prismaClient.products.findMany({
        where: { id: { in: ids } }
    });
}

//Crear un producto
export async function post(product: IProducts){
    return prismaClient.products.create({
        data:{
            name: product.name,
            description: product.description,
            width: product.width,
            height: product.height,
            length: product.length
        }
    })
}

//Modificar una parte del producto
export async function patch(id: string, data: Partial<IProducts>) {
    return prismaClient.products.update({
        where: { id },
        data, //Prisma solo actualizara lo necesario, ya que usamos el Partial y solo recibimos los campos necesarios
    });
}

// Reemplazar completamente un producto
export async function put(id: string, product: IProducts) {
    return prismaClient.products.update({
        where: { id },
        data: {
            name: product.name,
            description: product.description,
            width: product.width,
            height: product.height,
            length: product.length
        }
    });
}

// Eliminar múltiples productos usando deleteMany
export async function remove(ids: string[]) {
    return prismaClient.products.deleteMany({
        where: { id: { in: ids } }
    });
}
//Elimina TODOS LOS PRODUCTOS
export async function removeAll(){
    return prismaClient.products.deleteMany()
}