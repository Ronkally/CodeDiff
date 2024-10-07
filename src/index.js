import { express } from "express";
import authRoutes from "./routes/authRoutes";
import dotenv from "dotenv";
import prisma from "./config/prisma";

const app = express();
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);

// Middleware de manejo de errores
app.use(errorHandler);

// Configuración de variables de entorno
dotenv.config();

const startServer = async () => {
    try {
      // Verificar la conexión a la base de datos
      await prisma.$connect();
      console.log('Conectado a la base de datos con Prisma');
  
      // Iniciar el servidor
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
      });
  
      // Manejar cierre del servidor
      process.on('SIGINT', async () => {
        await prisma.$disconnect();
        process.exit(0);
      });
  
      process.on('SIGTERM', async () => {
        await prisma.$disconnect();
        process.exit(0);
      });
    } catch (error) {
      console.error('Error al iniciar el servidor:', error);
      process.exit(1);
    }
  };
  
  startServer();