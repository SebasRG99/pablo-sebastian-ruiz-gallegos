import { Request, Response } from 'express';
import { IProducts } from '../interfaces/Products';
import { 
    getAll, 
    getByIds,
    post, 
     //patch, 
    remove, 
    put, 
    removeAll } from '../db/Products';

// Obtener Todos Los Productos
export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await getAll();
        res.status(200).json({
            ok: true,
            message: 'Productos obtenidos exitosamente.',
            data: products
        });
    } catch (error) {
        console.error('Error obteniendo todos los productos:', error);
        res.status(500).json({
            ok: false,
            message: 'Error obteniendo los productos.',
            error: error
        });
    }
};

// Obtener múltiples productos por una lista de IDs (Batch GET)
export const getProductsByIds = async (req: Request, res: Response): Promise<void> => {

    const ids = req.query.ids as string; // deben llegar en la forma 1,2,3,4,5,...n

    if (!ids) {
        res.status(400).json({
            ok: false,
            message: 'Debes proporcionar una lista de IDs en la query string.'
        });
        return;
    }

    const idsArray = ids.split(','); // Aqui convertimos la cadena en un array de IDs

    try {
        const products = await getByIds(idsArray);
        res.status(200).json({
            ok: true,
            message: 'Productos obtenidos exitosamente.',
            data: products
        });
    } catch (error) {
        console.error('Error obteniendo productos por IDs:', error);
        res.status(500).json({
            ok: false,
            message: 'Error obteniendo los productos por IDs.',
            error: error
        });
    }
};

// Crear múltiples productos (Batch POST)
export const postBatchProducts = async (req: Request, res: Response): Promise<void> => {
    const newProducts: IProducts[] = req.body;

    try {
        const createdProducts = await Promise.all(newProducts.map(product => post(product)));
        res.status(201).json({
            ok: true,
            message: 'Productos creados correctamente.',
            data: createdProducts
        });
    } catch (error) {
        console.error('Error creando productos en batch:', error);
        res.status(500).json({
            ok: false,
            message: 'Error creando productos.',
            error: error
        });
    }
};

// Actualizamos múltiples productos (Batch PUT)
export const putBatchProducts = async (req: Request, res: Response): Promise<void> => {
    const productsToReplace: IProducts[] = req.body;

    try {
        const updatedProducts = await Promise.all(
            productsToReplace.map(product => put(product.id, product))
        );
        res.status(200).json({
            ok: true,
            message: 'Productos actualizados correctamente.',
            data: updatedProducts
        });
    } catch (error) {
        console.error('Error actualizando productos en batch:', error);
        res.status(500).json({
            ok: false,
            message: 'Error actualizando productos.',
            error: error
        });
    }
};

// Eliminar múltiples productos por IDs (Batch DELETE)
export const deleteBatchProducts = async (req: Request, res: Response): Promise<void> => {
    const ids: string[] = req.body.ids;
    if (ids.length === 0 || ids === undefined) {
        res.status(400).json({
            ok: false,
            message: 'Debes proporcionar una lista de IDs en el body.'
        });
        return;
    }

    try {
        const result = await remove(ids);
        res.status(200).json({
            ok: true,
            message: 'Productos eliminados con éxito.',
            data: result
        });
    } catch (error) {
        console.error('Error eliminando productos en batch:', error);
        res.status(500).json({
            ok: false,
            message: 'Error eliminando productos.',
            error: error
        });
    }
};

// Eliminar todos los productos
export const deleteAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        await removeAll();
        res.status(200).json({
            ok: true,
            message: 'Todos los productos fueron borrados con éxito.'
        });
    } catch (error) {
        console.error('Error eliminando todos los productos:', error);
        res.status(500).json({
            ok: false,
            message: 'Error eliminando todos los productos.',
            error: error
        });
    }
};