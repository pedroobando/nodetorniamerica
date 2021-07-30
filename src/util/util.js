const chalk = require('chalk');
const pool = require('./cnnmssql');
const { readExcel } = require('./readexcel');

const insertDbClienteAsync = async (xlsfileName) => {
  const tableName = 'SACLIE';
  const data = readExcel(xlsfileName);

  const conn = await pool.getConnection();
  const NoAplica = '#N/D';

  try {
    let query2 = '';
    let rowsfind = undefined;
    let contadorUpdate = 0;
    let contadorInsert = 0;

    for (const xrow of data) {
      rowsfind = await conn.query(
        `SELECT CodClie, Descrip FROM SACLIE where CodClie='${xrow.codigo}' `
      );
      if (xrow.codigo !== undefined && rowsfind.recordset[0] == undefined) {
        const query2 = `INSERT INTO SACLIE(CodClie, Descrip, ID3, TipoID3, TipoID, Activo,DescOrder, Direc1, Telef,FechaE, TipoCli, TipoReg, TipoPVP) VALUES ('${xrow.codigo
          .toString()
          .replace('C I', 'V-')
          .replace('C.I', 'V-')}','${xrow.nombre.toString().trim()}','${xrow.codigo
          .toString()
          .trim()}',1, 0, 1,'1234','${xrow.direccion ? xrow.direccion : ''}', '${
          xrow.telefono ? xrow.telefono : ''
        }','2021-06-07', 1,0,1)`;
        const consulta = await conn.query(query2);
        console.log(chalk.yellowBright(`[INSERTADO] => Codigo ${xrow.codigo} - ${xrow.nombre}`));
        contadorInsert++;
      }
    }
    return { contadorUpdate, contadorInsert };
  } catch (error) {
    console.log(error);
    throw new Error('Error Controlado');
  }
};

const insertDbProvAsync = async (xlsfileName) => {
  const tableName = 'SACLIE';
  const data = readExcel(xlsfileName);

  const conn = await pool.getConnection();
  const NoAplica = '#N/D';

  try {
    let query2 = '';
    let rowsfind = '';
    let contadorUpdate = 0;
    let contadorInsert = 0;

    for (const xrow of data) {
      rowsfind = await conn.query(
        `SELECT CodProv, Descrip FROM SAPROV where CodProv='${xrow.codigo}' `
      );
      if (xrow.codigo !== undefined && rowsfind.recordset[0] == undefined) {
        const query2 = `INSERT INTO SAPROV(CodProv, Descrip, Direc1, Telef,Movil,Email, Activo, FechaE, Pais, esMoneda, esReten, TipoID,ID3) VALUES ('${xrow.codigo
          .toString()
          .trim()}','${xrow.nombre.toString().trim()}','${
          xrow.direccion ? xrow.direccion : ''
        }', '${xrow.telefono ? xrow.telefono : ''}','${xrow.movil ? xrow.movil : ''}','${
          xrow.email ? xrow.email : ''
        }' ,1,'2021-07-07',1,1,1,1,'${xrow.codigo.toString().trim()}')`;
        const consulta = await conn.query(query2);
        console.log(chalk.yellowBright(`[INSERTADO] => Codigo ${xrow.codigo} - ${xrow.nombre}`));
        contadorInsert++;
      }
    }
    return { contadorUpdate, contadorInsert };
  } catch (error) {
    console.log(error);
    throw new Error('Error Controlado');
  }
};

const sqlUpdateSAPROD = (xrow, NoAplica, vPrecio01, vPrecio02) => {
  let query2 = '';
  if (xrow.Existencia !== undefined && xrow.Existencia !== NoAplica)
    query2 = `UPDATE SAPROD SET CostAct=${xrow.CostoActual}, CostPro=${xrow.CostoActual}, Existen=${xrow.Existencia}, Precio1=${vPrecio01}, Precio2=${vPrecio02}, Precio3=${vPrecio01}, PrecioIU1=50, PrecioIU2=60, PrecioIU3=50  WHERE CodProd='${xrow.Codigo}'`;
  else
    query2 = `UPDATE SAPROD SET CostAct=${xrow.CostoActual}, CostPro=${xrow.CostoActual}, Precio1=${vPrecio01}, Precio2=${vPrecio02}, Precio3=${vPrecio01}, PrecioIU1=50, PrecioIU2=60, PrecioIU3=50  WHERE CodProd='${xrow.Codigo}'`;
  return query2;
};

const sqlInsertSAPROD = (xrow, NoAplica, vPrecio01, vPrecio02) => {
  let query2 = '';
  const xreferencia = xrow.Referencia !== NoAplica ? xrow.Referencia : xrow.Codigo;
  if (xrow.Existencia !== undefined && xrow.Existencia !== NoAplica)
    query2 = `INSERT INTO SAPROD(CodProd, Descrip, Descrip2, Refere, Existen, CostAct, CostPro, Precio1, Precio2, Precio3,  PrecioIU1, PrecioIU2, PrecioIU3,CodInst, Activo) VALUES ('${
      xrow.Codigo
    }','${xrow.Descripcion.toString().slice(0, 40)}','${xrow.Descripcion.toString().slice(
      35
    )}', '${xreferencia}',${xrow.Existencia},${xrow.CostoActual}, ${
      xrow.CostoActual
    }, ${vPrecio01},${vPrecio02},${vPrecio01},50,60,50,1,1)`;
  else
    query2 = `INSERT INTO SAPROD(CodProd, Descrip, Descrip2, Refere, CostAct, CostPro, Precio1, Precio2, Precio3,  PrecioIU1, PrecioIU2, PrecioIU3, CodInst, Activo) VALUES ('${
      xrow.Codigo
    }','${xrow.Descripcion.toString().slice(0, 40)}','${xrow.Descripcion.toString().slice(
      35
    )}', '${xreferencia}',${xrow.CostoActual}, ${
      xrow.CostoActual
    }, ${vPrecio01},${vPrecio02},${vPrecio01},50,60,50,1,1)`;

  return query2;
};

const actualizarBDAsync = async (xlsfileName) => {
  const tableName = 'SAPROD';
  const data = readExcel(xlsfileName);

  const conn = await pool.getConnection();
  const NoAplica = '#N/D';

  try {
    let query2 = '';
    let rowsfind = '';
    let contadorUpdate = 0;
    let contadorInsert = 0;

    let util01 = 1;
    let vPrecio01 = 0;
    let util02 = 1.5;
    let vPrecio02 = 0;

    for (const xrow of data) {
      rowsfind = await conn.query(
        `SELECT CodProd, Descrip FROM ${tableName} where CodProd='${xrow.Codigo}' `
      );
      if (xrow.CostoActual !== undefined) {
        vPrecio01 = xrow.CostoActual * util01 + xrow.CostoActual;
        vPrecio02 = xrow.CostoActual * util02 + xrow.CostoActual;

        if (rowsfind.recordset[0] !== undefined) {
          const consulta = await conn.query(sqlUpdateSAPROD(xrow, NoAplica, vPrecio01, vPrecio02));
          console.log(
            chalk.blueBright(`[ACTUALIZADO] => Codigo ${xrow.Codigo} - ${xrow.Descripcion}`)
          );
          contadorUpdate++;
        } else {
          const consulta = await conn.query(sqlInsertSAPROD(xrow, NoAplica, vPrecio01, vPrecio02));
          console.log(
            chalk.yellowBright(`[INSERTADO] => Codigo ${xrow.Codigo} - ${xrow.Descripcion}`)
          );
          contadorInsert++;
        }
        if (xrow.Existencia !== undefined && xrow.Existencia !== NoAplica)
          await actualizarExistencia(conn, xrow);
        await actualizarImpuesto(conn, 'SATAXPRD', xrow);
        await actualizarCodigoBarra(conn, 'SACODBAR', xrow);
      }
    }
    return { contadorUpdate, contadorInsert };
  } catch (error) {
    console.log(error);
    throw new Error('Error Controlado');
  }
};

const actualizarExistencia = async (conn, xrow) => {
  try {
    let query2 = '';
    let rowsfind = '';
    let contadorUpdate = 0;
    let contadorInsert = 0;

    rowsfind = await conn.query(`SELECT CodProd FROM SAEXIS where CodProd='${xrow.Codigo}' `);
    if (rowsfind.recordset[0] !== undefined) {
      query2 = `UPDATE SAEXIS SET Existen=${
        xrow.Existencia
      } WHERE CodProd='${xrow.Codigo.toString()}'`;
      const consulta = await conn.query(query2);
      console.log(
        chalk.blueBright(`[ACTUALIZADO - INV] => Codigo ${xrow.Codigo} - ${xrow.Descripcion}`)
      );
      contadorUpdate++;
    } else {
      const query2 = `INSERT INTO SAEXIS(CodSucu, CodProd, CodUbic, PuestoI, Existen) VALUES ('00000', '${xrow.Codigo}','001','01',${xrow.Existencia})`;
      const consulta = await conn.query(query2);
      console.log(
        chalk.yellowBright(`[INSERTADO - INV] => Codigo ${xrow.Codigo} - ${xrow.Descripcion}`)
      );
      contadorInsert++;
    }
  } catch (error) {
    console.log(error);
    throw new Error('Error Controlado');
  }
};

const actualizarImpuesto = async (conn, tableName, xrow) => {
  try {
    let query2 = '';
    let rowsfind = '';
    let contadorUpdate = 0;
    let contadorInsert = 0;
    rowsfind = await conn.query(
      `SELECT CodProd FROM ${tableName} where CodProd='${xrow.Codigo}' and CodTaxs='IVA'`
    );
    if (rowsfind.recordset[0] !== undefined) {
      query2 = `UPDATE ${tableName} SET CodTaxs='IVA', Monto=16, EsPorct=1  WHERE CodProd='${xrow.Codigo.toString()}' and CodTaxs='IVA'`;
      const consulta = await conn.query(query2);
      console.log(
        chalk.blueBright(`[ACTUALIZADO - IVA] => Codigo ${xrow.Codigo} - ${xrow.Descripcion}`)
      );
      contadorUpdate++;
    } else {
      const query2 = `INSERT INTO ${tableName}(CodProd, CodTaxs, Monto, EsPorct) VALUES ('${xrow.Codigo}', 'IVA', 16, 1)`;
      const consulta = await conn.query(query2);
      console.log(
        chalk.yellowBright(`[INSERTADO - IVA] => Codigo ${xrow.Codigo} - ${xrow.Descripcion}`)
      );
      contadorInsert++;
    }
  } catch (error) {
    console.log(error);
    throw new Error('Error Controlado');
  }
};

const actualizarCodigoBarra = async (conn, tableName, xrow) => {
  try {
    let query2 = '';
    let rowsfind = '';
    let contadorUpdate = 0;
    let contadorInsert = 0;

    rowsfind = await conn.query(
      `SELECT CodProd, CodAlte FROM ${tableName} WHERE CodProd = '${xrow.Codigo.toString()}'`
    );
    if (rowsfind.recordset[0] !== undefined) {
      query2 = `UPDATE ${tableName} SET CodAlte='${xrow.Codigo.toString()}' WHERE CodProd='${xrow.Codigo.toString()}'`;
      const consulta = await conn.query(query2);
      console.log(chalk.blueBright(`[ACTUALIZADO - CODIGO BARRA] => Codigo ${xrow.Codigo}`));
      contadorUpdate++;
    } else {
      const query2 = `INSERT INTO ${tableName}(CodProd, CodAlte) VALUES ('${xrow.Codigo.toString()}', '${xrow.Codigo.toString()}')`;
      const consulta = await conn.query(query2);
      console.log(chalk.yellowBright(`[INSERTADO - CODIGO BARRA] => Codigo ${xrow.Codigo}`));
      contadorInsert++;
    }
  } catch (error) {
    console.log(error);
    throw new Error('Error Controlado - codigo barra');
  }
};

module.exports = { actualizarBDAsync, insertDbClienteAsync, insertDbProvAsync };
