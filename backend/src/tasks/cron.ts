import cron from 'node-cron';
import { prismaClient } from '../prisma/client';

// Tarea programada: Cada minuto se ejecuta para eliminar tokens expirados
console.log("Running Cron ⏰")
cron.schedule('* * * * *', async () => {
    console.log('Verificando y eliminando tokens expirados...');
    const now = new Date();
    try {
        await prismaClient.accessTokens.deleteMany({
            where: {
                expiresAt: { lt: now },
            },
        });
        console.log('Tokens expirados eliminados.');
    } catch (error) {
        console.error('Error eliminando tokens expirados:', error);
    }
});