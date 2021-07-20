const fs = require('fs-extra');
const { actualizarBDAsync, insertDbClienteAsync, insertDbProvAsync } = require('../util/util');

const collectionName = 'uploads';

const dataEntity = (valueEnt) => {
  return {
    fieldname: valueEnt.fieldname !== undefined ? valueEnt.fieldname : null,
    originalname: valueEnt.originalname !== undefined ? valueEnt.originalname : null,
    encoding: valueEnt.encoding !== undefined ? valueEnt.encoding : null,
    mimetype: valueEnt.mimetype !== undefined ? valueEnt.mimetype : null,
    destination: valueEnt.destination !== undefined ? valueEnt.destination : '',
    filename: valueEnt.filename !== undefined ? valueEnt.filename : '',
    path: valueEnt.path !== undefined ? valueEnt.path : '',
    category: valueEnt.category !== undefined ? valueEnt.category : null,
    comentary: valueEnt.comentary !== undefined ? valueEnt.comentary : null,
  };
};

const updateInvent = async (req) => {
  let retAccion = { status: 200, data: [] };
  try {
    const dataObject = dataEntity(req.file);
    // Creacion de la categoria
    const category = req.body.category || 'nocategory';
    // Constantes de ubicacion
    const dirOrigen = dataObject.path;
    const dirDestino = `${dataObject.destination}`;
    // const dirDestino = `${dataObject.destination}/${category}`;
    const fileExtension = dataObject.originalname.split('.').pop();
    const fileDestino = `${dirDestino}/${dataObject.filename}.${fileExtension}`;

    console.log(fileDestino);
    // verificacion si existe el direcctorio origen
    if (!fs.exists(dirDestino)) {
      await fs.mkdir(dirDestino);
    }
    // mover el archivo del origen al direcctorio destino
    await fs.move(dirOrigen, fileDestino);

    const resultado = await actualizarBDAsync(fileDestino);

    retAccion = { status: 200, data: resultado };
  } catch (error) {
    // throw Error(`${error} in createEntity()`);
    retAccion = { status: 400, data: 0 };
  }
  return retAccion;
};

const insertClientes = async (req) => {
  let retAccion = { status: 200, data: [] };
  try {
    const dataObject = dataEntity(req.file);
    const category = req.body.category || 'nocategory';
    const dirOrigen = dataObject.path;
    const dirDestino = `${dataObject.destination}`;
    const fileExtension = dataObject.originalname.split('.').pop();
    const fileDestino = `${dirDestino}/${dataObject.filename}.${fileExtension}`;

    if (!fs.exists(dirDestino)) {
      await fs.mkdir(dirDestino);
    }
    await fs.move(dirOrigen, fileDestino);

    const resultado = await insertDbClienteAsync(fileDestino);
    retAccion = { status: 201, data: resultado };
  } catch (error) {
    // throw Error(`${error} in createEntity()`);
    retAccion = { status: 400, data: 0 };
  }
  return retAccion;
};

const insertProveedores = async (req) => {
  let retAccion = { status: 200, data: [] };
  try {
    const dataObject = dataEntity(req.file);
    const category = req.body.category || 'nocategory';
    const dirOrigen = dataObject.path;
    const dirDestino = `${dataObject.destination}`;
    const fileExtension = dataObject.originalname.split('.').pop();
    const fileDestino = `${dirDestino}/${dataObject.filename}.${fileExtension}`;

    if (!fs.exists(dirDestino)) {
      await fs.mkdir(dirDestino);
    }
    await fs.move(dirOrigen, fileDestino);

    const resultado = await insertDbProvAsync(fileDestino);
    retAccion = { status: 201, data: resultado };
  } catch (error) {
    // throw Error(`${error} in createEntity()`);
    retAccion = { status: 400, data: 0 };
  }
  return retAccion;
};

module.exports = { updateInvent, insertProveedores, insertClientes };
