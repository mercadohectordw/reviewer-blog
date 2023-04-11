# The Reviewer Blog

Un blog donde los autores pueden publicar sus reseñas de cualquier genero, tema o categoría, para que lo vean y comenten los demás usuarios.

![image description](https://mercadohectordw.github.io/portfolio/assets/proyectos/The%20Reviewer%20Blog.png)

## Demo

[The Reviewer Blog - DEMO](https://mercadohectordw.github.io/reviewer-blog/home)

## Correr Localmente

*Antes añade el archivo .env como se explica en la sección de variables de entorno.

Clona el proyecto

```bash
  git clone https://github.com/mercadohectordw/reviewer-blog.git my-proyect
  cd my-project
```

Ve a los dos directorios (backend y frontend) e instala sus dependencias 

```bash
  cd backend
  npm install
  cd ..
  cd frontend
  npm install
```

Para levantar los proyectos hay que ingresar a ambas carpetas y ejecutar los siguientes comandos:

/backend
```bash
  npm run start
```

/frontend
```bash
  ng serve
```

El proyecto estará en `http://localhost:4200/`
## Variables de Entorno

Para correr este proyecto, primero hay que crear un archivo .env en la carpeta "backend" e ingresarle las siguientes variables:

```
PORT=3000
MONGO_URI=`URI de tu base de datos MongoDB`
JWT_KEY=`string para la creación de tokens`
```
## Autor

Mercado Hector

Github: [@mercadohectordw](https://www.github.com/mercadohectordw)

