const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    // Manejo de errores de Prisma
    if (err.code === 'P2002') { // Violación de restricción única
      return res.status(400).json({ mensaje: 'Valor duplicado detectado' });
    }
  
    res.status(500).json({
      mensaje: 'Error del servidor',
      error: err.message,
    });
  };
  
  module.exports = errorHandler;
  