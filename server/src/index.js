import express from "express";
import authRoutes from "./routes/authRoutes.js";
import pullRequestRoutes from "./routes/pullRequestRoutes.js";
import adminRoutes from "./routes/adminRoutes.js"
import dotenv from "dotenv";
import prisma from "./config/prisma.js";
import errorHandler from "./middlewares/errorHandler.js";
import cors from "cors";

const app = express();

// Configurar CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/code', pullRequestRoutes);
app.use('/api/admin', adminRoutes);

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