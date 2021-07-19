# apireadexcel

## Description

Un codigo simple que lee una hoja de calculo en microsoft excel y graba o guarda sus datos en una base de datos Mariadb.

Se crea un servidor con express.. el codigo es muy simple.

El archivo excel se encuentra dentro del direcctoria /data y los datos o campos ya se encuentran predeterminados dentro del archivo readexcel.js que retorna un JSON con los datos de la tabla.

Por otro lado solo en archivo database mantenine la connecion al servidor de base de datos MariaDb.

## Creacion del contenedor docker Mariadb

```bash
# Crear contenedor de Mariadb, previamente debe estar descargada la imagen. mariadb/server:10.4

$ docker run --name mariadbsrv -it --restart always -p 127.0.0.1:3306:3306  -e MARIADB_ROOT_PASSWORD=my-secret-pw -d mariadb/server:10.4

# Guida de node Docker
  https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

# Entrar a un contenedor
  $ docker exec -i -t contenedorId /bin/bash #
  $ docker exec -i -t contenedorId /bin/sh # <= alpine

# Extraer la base datos del contenedor
  $ docker cp contenedorId:/app/logisticadb.sqlite  .

# Copiar archivo al contenedor
  $ docker cp nombredelarchivo  contenedorId:/rutadestino
```

## Comandos basicos de SQL p/MariaDb

```bash
# Comandos Mariadb - Entrar en base de datos.
  $ mysql -u root -p

# Visualizar las bases de datos en nuestro servidor.
  > show databases;

# Crear una base de datos nueva.
  > CREATE DATABASE empresa CHARACTER SET utf8 COLLATE utf8_spanish_ci;

# Cambiar a base de datos.
  > use empresa;

# Crear una tabla y añadirle contenido.
  > CREATE TABLE trabajadores (id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, nombre VARCHAR(20) NOT NULL, cedula INT UNSIGNED NOT NULL UNIQUE, RUC BIGINT(13) UNSIGNED NOT NULL UNIQUE, fecha_de_nacimiento DATE NOT NULL,salario_mensual DECIMAL(7, 2) UNSIGNED NOT NULL);

  > CREATE TABLE ivproser (id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, CODPRO VARCHAR(20),DESCRIP1 VARCHAR(100), CODFABRICANTE VARCHAR(20), GRUPOINV VARCHAR(20), COSTOACT DECIMAL(12, 2) SIGNED NOT NULL, COSTOPRO DECIMAL(12, 2) SIGNED NOT NULL, EXISTENCIA INT SIGNED NOT NULL,  PRECIO1 DECIMAL(12, 2) SIGNED NOT NULL, PRECIO2 DECIMAL(12, 2) SIGNED NOT NULL, PRECIO3 DECIMAL(12, 2) SIGNED NOT NULL, UTILPRECIO1 INT SIGNED NOT NULL, UTILPRECIO2 INT SIGNED NOT NULL, UTILPRECIO3 INT SIGNED NOT NULL);

  > INSERT INTO trabajadores (id, nombre, cedula, RUC, fecha_de_nacimiento, salario_mensual) VALUES (NULL, "David", 1753664866, 1753664866001, "1983-01-01", 5316.50);

  > SELECT * FROM trabajadores;

  > SELECT * FROM trabajadores ORDER BY nombre ASC;

# Mostrar la tablas dentro de una base de datos
  > show full tables from mydatabase;

# Mostrar la esctructura dentro de una tabla
  > Describe trabajadores;

# Eliminar fila de una tabla
  > SELECT * FROM trabajadores;

  > DELETE FROM trabajadores WHERE id = 1;

  > SELECT * FROM trabajadores;

# Borrar una tabla.
  > drop table if exists trabajadores;

```

## kill process active

```bash
# Primero, querrá saber qué proceso está utilizando el puerto 3000
$ sudo lsof -i :3000

# Esto enumerará todos los PID que escuchan en este puerto, una vez que tenga el PID puede terminarlo:
$ kill -9 {PID}
```

## License

Pedro Obando is [MIT licensed](LICENSE).
