<p align="center">
  <a href="https://www.sofka.com.co/es/inicio/" target="blank"><img src="https://media.glassdoor.com/sqll/3788784/sofka-technologies-squareLogo-1668095593025.png" width="200" alt="Sofka Logo" /></a>
</p>

# Reto Sofka API

# Pasos para Ejecutar el Proyecto

1.  Clonar el proyecto
2.  ```yarn install```
3.  Renombrar el archivo ```.env.template``` como: ```.env```
4.  Cambiar las varibles de entorno que se encuentran en el archivo ```.env``` 
5.  Levantar la base de datos
```
docker-compose up -d 
```
6.  Correr la app: ```yarn start:dev```

# Validaciones Realizadas.

1.  La cantidad de productos en inventario, no supere la cantidad de productos solicitados en la compra.
2.  La cantidad de productos minimo que se permite comprar, no sea menor a la cantidad de productos solicitados en la compra.
3.  La cantidad de productos maximo que se permite comprar, no sea mayor a la cantidad de productos soliciatados en la compra.
4.  Disponibilidad del producto, es decir la cantidad de productos en inventario sea mayor a 0.
5.  La cantidad de productos minimo que se permite comprar sea menor o igual a la cantidad de productos maximo que se permite comprar.
