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
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});

theRouter.post('/cliente', async (req, res) => {
  try {
    const result = await insertClientes(req);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});

theRouter.post('/proveedor', async (req, res) => {
  try {
    const result = await insertProveedores(req);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});

theRouter.delete('/:id', async (req, res) => {
  try {
    const result = await removeEntity(req);
    res.status(result.status).json(result.deletedCount);
  } catch (error) {
    console.log(error);
  }
});

module.exports = theRouter;
