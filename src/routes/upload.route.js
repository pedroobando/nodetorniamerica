const { Router } = require('express');
const {
  updateInvent,
  insertClientes,
  insertProveedores,
} = require('../controllers/upload.controller');

const theRouter = Router();

theRouter.get('/', async (req, res) => {
  try {
    res.status(200).json('ok');
  } catch (error) {
    console.log(error);
  }
});

theRouter.post('/', async (req, res) => {
  try {
    res.status(201).json('Data Upload');
  } catch (error) {
    console.log(error);
  }
});

theRouter.post('/inv', async (req, res) => {
  try {
    const result = await updateInvent(req);
    // console.log(result)
    res
      .status(200)
      .send(
        `<h2>Actualizado Productos</h2><h3>Productos Actualidos ${result.data.contadorUpdate}</h3><h3>Productos Insertados ${result.data.contadorInsert}</h3> <hr/><a href='/'>Volver</a>`
      );
  } catch (error) {
    console.log(error);
  }
});

theRouter.post('/cliente', async (req, res) => {
  try {
    const result = await insertClientes(req);
    res
      .status(200)
      .send(
        `<h2>Actualizado Clientes</h2> <h3>Clientes Actualidos ${result.data.contadorUpdate}</h3> <h3>Clientes Insertados ${result.data.contadorInsert}</h3><hr/><a href='/'>Volver</a>`
      );
  } catch (error) {
    console.log(error);
  }
});

theRouter.post('/proveedor', async (req, res) => {
  try {
    const result = await insertProveedores(req);
    res
      .status(200)
      .send(
        `<h2>Actualizado</h2> <h3>Proveedores Actualidos ${result.data.contadorUpdate}</h3> <h3>Proveedores Insertados ${result.data.contadorInsert}</h3><hr/><a href='/'>Volver</a>`
      );
  } catch (error) {
    console.log(error);
  }
});

module.exports = theRouter;
