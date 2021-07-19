const express = require('express');
const path = require('path');
const uploadRoutes = require('./upload.route');

const rutaFileStatic = path.join(__dirname, '../../public/uploads');
const rutaRaizStatic = path.join(__dirname, '../../public');

const rutaError404 = (req, res) => {
  res.status(404).send(`Error 404 - No logro encontrar la ruta. `);
};

const routes = (app) => {
  // routes apps

  // console.log(__dirname);
  app.use('/api/file', uploadRoutes);

  app.use('/', express.static(rutaRaizStatic));
  app.use('/public', express.static(rutaFileStatic));

  app.use(rutaError404);
};

module.exports = routes;
