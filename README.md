<center>

# **PROYECTO DESARROLLO DE APLICACIONES MULTIPLATAFORMA**  

</center>

<center> 

  <img src="../LOGO%20DEPARTAMENTO.png"/>

</center>


<center>

**JUAN MARÍA NOLASCO ROMERO**  
**CURSO 2021/2022**

</center>  

<center>

  # **ÍNDICE**

</center>  

- [**PROYECTO DESARROLLO DE APLICACIONES MULTIPLATAFORMA**](#proyecto-desarrollo-de-aplicaciones-multiplataforma)
- [**ÍNDICE**](#índice)
- [**INTRODUCCIÓN**](#introducción)
- [**REQUISITOS**](#requisitos)
  - [**Funcionales**](#funcionales)
  - [**No funcionales**](#no-funcionales)
- [**TECNOLOGÍAS**](#tecnologías)
  - [<img src="https://skillicons.dev/icons?i=js"/> **JavaScript**](#-javascript)
  - [<img src="https://skillicons.dev/icons?i=mysql"/> **MySQL**](#-mysql)
  - [<img src="https://skillicons.dev/icons?i=nodejs,express"/> **NodeJS/Express**](#-nodejsexpress)
  - [<img src="https://skillicons.dev/icons?i=docker"/> **Docker**](#-docker)
  - [<img src="https://skillicons.dev/icons?i=react"/> **React Native**](#-react-native)
  - [<img src="https://skillicons.dev/icons?i=css"/> **CSS**](#-css)
  - [<img src="https://skillicons.dev/icons?i=gitlab"/> **Gitlab**](#-gitlab)
  - [<img src="https://skillicons.dev/icons?i=vscode"/> **Visual Studio Code**](#-visual-studio-code)
- [**DISEÑO**](#diseño)
  - [**Tabla REST**](#tabla-rest)
  - [**Diagrama entidad-relación**](#diagrama-entidad-relación)
  - [**Aclaraciones sobre el código**](#aclaraciones-sobre-el-código)
- [**CONCLUSIÓN**](#conclusión)
  - [✅ **Objetivos implementados**](#-objetivos-implementados)
  - [❌ **Objetivos por implementar**](#-objetivos-por-implementar)
  - [⬆️ **Aspectos a mejorar**](#️-aspectos-a-mejorar)
  - [📜 **Opinión personal**](#-opinión-personal)

<center>

  # **INTRODUCCIÓN**

</center>  

'Read it!' es una aplicación móvil desarrollada con la intención de facilitar a los profesores la gestión de la lectura de libros por parte de los alumnos de un centro educativo.

Todos los años en muchos cursos de primaria, ESO o Bachillerato, los alumnos deben leer una serie de libros que el profesor asigna durante el curso. Pueden ser libros de cualquier materia, aunque si es cierto que normalmente los libros se asignan desde la asignatura de lengua.

&nbsp;

La lectura es algo fundamental en el desarrollo personal e intelectual del alumno, y esta app es una oportunidad para conseguir una mejor gestión de esa lectura de forma digital e intuitiva tanto para el profesor como para los alumnos. De este modo, los profesores pueden asignar libros a los alumnos a través de itinerarios (grupos de libros)

Este proyecto consta de un frontend (React Native) y un backend (NodeJS y MySQL):
- [Aplicación móvil (Frontend)](https://gitlab.iesvirgendelcarmen.com/Nola/programa-lector "Read It App")
- [Base de datos (Backend)](https://gitlab.iesvirgendelcarmen.com/Nola/read-it-backend "Read It Backend").

<center>

  # **REQUISITOS**

</center> 

Esta aplicación consta de una pantalla para iniciar sesión (acción obligatoria para acceder a la aplicación) y una pantalla de registro. Para iniciar sesión se necesita estar previamente registrado y acceder con un correo electrónico y contraseña válidos. Una vez dentro, según el rol del usuario activo, se podrán realizar diferentes acciones:

## **Funcionales**

  1. Alumnos:
      - Consultar los itinerarios que les han sido asignados (creados por los profesores). Pueden hacerlo desde el menú 'Itinerarios' o desde el menú 'Inicio' donde se muestra un calendario con la fecha en la que finaliza cada itinerario.
      - Filtrar itinerarios por nombre y departamento.
      - Consultar los libros que contiene cada itinerario.
      - Filtrar libros por isbn, nombre o autor.
      - Consultar su perfil con información básica (nombre completo y correo electrónico).

  2. Profesores:
      - Crear, consultar, actualizar y eliminar itinerarios (CRUD). Sólo se mostrarán los itinerarios que ha creado el profesor que está identificado en la app en ese momento.
      - Crear, consultar, actualizar y eliminar libros (CRUD). Se mostrarán todos los libros registrados en la base de datos.
      - Consultar la lista de alumnos registrados.
      - Filtrar alumnos por nombre.
      - Consultar su perfil con información básica (nombre completo y correo electrónico).
  
  3. Administrador:
      - Crear, consultar, actualizar y eliminar cualquier itinerario (CRUD).
      - Crear, consultar, actualizar y eliminar cualquier libro (CRUD).
      - Crear, consultar, actualizar y eliminar cualquier usuario (CRUD) , ya sea alumno o profesor.
      - Crear, consultar, actualizar y eliminar grupos (CRUD).

&nbsp;

## **No funcionales**
  
  1. Mostrar un mensaje informativo al usuario cuando se realiza alguna acción contra la base de datos o se produce algún error (ToastAndroid).
  
  2. Sólo existen usuarios con rol profesor o alumno. No existe un usuario administrador, es el administrador de la base de datos quien tiene todo el control sobre la misma. De este modo el orden de permisos de mayor a menor sería: administrador de la base de datos > profesor > alumno.
  
  3. Algunas de las funciones exclusivas del administrador son la modificación de usuarios y de grupos (CRUD).

  4. La base de datos debe implementarse con MySQL y NodeJS.

<center>

# **TECNOLOGÍAS**

</center> 

<center>
  <img src="https://skillicons.dev/icons?i=js,mysql,nodejs,express,docker,react,css,gitlab,vscode" />
</center>

## <img src="https://skillicons.dev/icons?i=js"/> **JavaScript** 
- JavaScript (JS) es un lenguaje de programación ligero, interpretado, o compilado justo-a-tiempo (just-in-time) con funciones de primera clase.

- Es un lenguaje que me gusta mucho, aunque el principal motivo de su elección es que el framework que he utilizado (React Native) trabaja con JavaScript.

- Para más información puedes visitar la [documentación oficial](https://developer.mozilla.org/es/docs/Web/JavaScript "Documentación JavaScript")

&nbsp;


## <img src="https://skillicons.dev/icons?i=mysql"/> **MySQL**

- El principal motivo por el que he escogido MySQL como sistema gestor de base de datos es que para la estructura de mi proyecto necesito una base de datos relacional. Además, para gestionar la base de datos utilizo phpMyAdmin, una herramienta para manejar la administración de MySQL utilizando un navegador web. Es una herramienta que también he utilizado en mis estudios y me parece muy práctica.

- Para más información sobre MySQL y phpMyAdmin puedes visitar la documentación oficial:
  - [MySQL](https://www.mysql.com/ "Web MySQL")
  - [PhpMyAdmin](https://www.phpmyadmin.net/ "Web PhpMyAdmin")

&nbsp;

&nbsp;

## <img src="https://skillicons.dev/icons?i=nodejs,express"/> **NodeJS/Express**

- NodeJS es un entorno que trabaja en tiempo de ejecución, de código abierto, multi-plataforma, que permite a los desarrolladores crear toda clase de herramientas de lado servidor y aplicaciones en JavaScript.
  
- Express es el framework web más popular de Node, y es la librería subyacente para un gran número de otros frameworks web de Node populares.

- Node es una tecnología que hemos trabajado al final del segundo trimestre en este curso, y el principal motivo de su uso en este proyecto es que me parecía mas práctico que otras tecnologías que conozco como, por ejemplo, Spring Boot. Esto se debe principalmente al lenguaje de programación en el que trabaja (JavaScript), el cual también he aprendido este pasado curso y me ha atraido más.

&nbsp;

## <img src="https://skillicons.dev/icons?i=docker"/> **Docker**

- Docker es un proyecto de código abierto que automatiza el despliegue de aplicaciones dentro de contenedores de software, proporcionando una automatización de virtualización de aplicaciones en múltiples sistemas operativos

- Aunque no conozco todo sobre Docker, desde mi experiencia me ha parecido una herramienta super útil para poder desarrollas mi backend de manera rápida y sencilla.

- Para más información puedes visitar la [documentación oficial](https://www.docker.com/ "Documentación Docker")

&nbsp;

## <img src="https://skillicons.dev/icons?i=react"/> **React Native**

- React Native es un framework JavaScript para crear aplicaciones nativas para iOS y Android, basado en la librería de JavaScript React para la creación de componentes visuales, cambiando el propósito de los mismos para, en lugar de ser ejecutados en un navegador, correr directamente sobre las plataformas móviles nativas, en este caso iOS y Android.

- He utilizado esta tecnología porque la he conocido en este curso y, aunque no la ví tan a fondo como React, son similares (como he comentado anteriormente), solo que se adapta para ejecutarse en plataformas móviles nativas. Además, me ha llamado la atención por la variedad de posibilidades que ofrece y el lenguaje de programación que trabaja (JavaScript), que es uno de mis favoritos. Por esto he decidido estudiar este framework más a fondo y desarrollar mi aplicación con él.
  
- Para más información puedes visitar la [documentación oficial](https://reactnative.dev/ "Documentación React Native"). 

&nbsp;

&nbsp;

## <img src="https://skillicons.dev/icons?i=css"/> **CSS**

- CSS, en español «Hojas de estilo en cascada», es un lenguaje de diseño gráfico para definir y crear la presentación de un documento estructurado escrito en un lenguaje de marcado.

- Dentro de React Native he usado CSS para diseñar el estilo en el que se ven los componentes de cada pantalla, sobre todo con la propiedad flex.
  
- Para más información puedes visitar la [documentación oficial](https://developer.mozilla.org/es/docs/Web/CSS "Documentación CSS").

&nbsp;

## <img src="https://skillicons.dev/icons?i=gitlab"/> **Gitlab**

- Gitlab es un servicio web para control de versiones y DevOps basado en Git.

- He utilizado este servicio para guardar mi código en dos repositorios distintos, uno para front y otro para back, y así llevar un mejor control de mis cambios.
  
- Para más información puedes visitar la [documentación oficial](https://about.gitlab.com/ "Documentación Gitlab").

&nbsp;

## <img src="https://skillicons.dev/icons?i=vscode"/> **Visual Studio Code**

- Visual Studio Code es un editor de código fuente desarrollado por Microsoft. Incluye soporte para la depuración, control integrado de Git, resaltado de sintaxis, finalización inteligente de código, fragmentos y refactorización de código.

- Desde practicamente el inicio de mis estudios he utilizado Visual Studio Code para programar y desarrollar mis proyectos. Su diseño y su integración con Git son los puntos que más me gustan.
  
- Para más información puedes visitar la [documentación oficial](https://code.visualstudio.com/ "Documentación VSCode").


<center>

# **DISEÑO**

</center>

## **Tabla REST**

<center> 

  <img src="../restTable1.png"/>
  <img src="../restTable2.png"/>

</center>

## **Diagrama entidad-relación**

<center> 

  <img src="../Diagrama%20E-R.jpeg"/>

</center>

## **Aclaraciones sobre el código**

- **Knexjs**
  - Knex.js es un generador de consultas SQL para diferentes bases de datos como PostgreSQL, MariaDB, Oracle, MySQL (mi caso), etc. 
  - El fin de usar esta herramienta es facilitar la tarea de consultar datos con una estructura más legible y sencilla, reduciendo el número de líneas de código para crear una consulta. 
  - Para más informacion puedes consultar la [documentación oficial](http://knexjs.org/ "Documentación Knex.js").

- **React Native Paper**
  - React Native Paper es una colección de componentes personalizables para React Native, siguiendo las pautas de 'Google’s Material Design'
  - Para más información puedes consultar la [documentación oficial](https://callstack.github.io/react-native-paper/ "Documentación React Native Paper").

- **React Native Image Picker**
  - React Native Image Picker es un módulo que te permite seleccionar una foto o vídeo desde la galería o la cámara del dispositivo.
  - Para más información puedes consultar la [documentación oficial](https://github.com/react-native-image-picker/react-native-image-picker "Documentación React Native Image Picker").

- **React Native Calendars**
  - React Native Calendars es un módulo que incluye varios componentes de calendario personalizables.
  - En este proyecto he implementado un calendario del tipo 'Expandable Calendar' (Calendario expansible) para que en la pantalla de inicio tanto alumnos como profesores puedan ver los itinerarios que han creado o tienen asignados respectivamente.
  - Para más información puedes consultar la [documentación oficial](https://wix.github.io/react-native-calendars/ "Documentación React Native Calendars").
  
- **React Native Calendar Picker**
  - Es algo parecido al módulo anterior (aunque este es un solo componente) porque también es un calendario. La diferencia es que cuando el usuario selecciona un día, podemos obtener esa fecha y guardar su valor para futuras funcionalidades, en mi caso para guardar la fecha en la que acaba un itinerario.
  - Para más información puedes consultar la [documentación oficial](https://www.npmjs.com/package/react-native-calendar-picker "Documentación React Navive Calendar Picker").

<center>

# **CONCLUSIÓN**

</center>

En conclusión, he creado una aplicación con las funcionalidades necesarias para llevar una buena gestión de itinerarios y libros que un profesor crea y un alumno debe leer, estableciendo un diseño sencillo y elegante.

## ✅ **Objetivos implementados**

- ✅ Crear una pantalla de login y registro.  

- ✅ Crear una autenticación con JWT y protección de rutas.

- ✅ Crear una 'pila' para la navegación (Stack Navigation).
  
- ✅ Crear una pantalla de inicio con un calendario para consultar los itinerarios y su fecha de finalización.
  
- ✅ Crear una pantalla para mostrar los itinerarios del usuario activo.
  
- ✅ Crear una pantalla para mostrar los libros. En el caso del profesor se muestran todos los libros de la base de datos, en el caso del alumno solo se muestras los libros que tiene asignados.

- ✅ Crear una pantalla con información sobre el usuario activo (perfil).

- ✅ Crear una pantalla con una lista de todos los alumnos.

- ✅ Implementar un formulario para crear un nuevo itinerario y guardarlo.
  
- ✅ Implementar un formulario para crear un nuevo libro y guardarlo.
  
- ✅ Implementar la edición de un itinerario.
  
- ✅ Implementar la edición de un libro.
  
- ✅ Implementar el borrado de un itinerario.
  
- ✅ Implementar el borrado de un libro.

- ✅ Mostrar mensajes al usuario cuando se realiza una acción para mejorar el feedback.

- ✅ Validar formularios.

- ✅ Insertar imágenes desde la cámara o la galería del usuario.

  
## ❌ **Objetivos por implementar**

- ❌ Como profesor, ver el progreso de cada alumno en cada itinerario.

- ❌ Como alumno, ver el progreso de cada itinerario asignado y marcarlo como completado una vez terminado.

- ❌ Inicio se sesión con un pin.

## ⬆️ **Aspectos a mejorar**

- ⬆️ Mejorar el feedback del usuario añadiendo más mensajes con información más precisa de lo que está ocurriendo.

- ⬆️ Mejorar el tiempo de carga del calendario en la pantalla de inicio.

- ⬆️ Implementar un apartado de personalización de la aplicación en el perfil del usuario que permita cambiar los colores por defecto.

## 📜 **Opinión personal**

- En resumen, el proyecto me ha gustado bastante. La idea original era hacer una aplicación para gestionar la lectura de los alumnos del centro (IES Virgen del Carmen), pero finalmente se ha desarrollado con la intención de utilizarla no solo aquí, sino en cualquier contexto educativo.

- He aprendido cosas nuevas sobre las tecnologías que he empleado en este proyecto a pesar de que ya las conocía. En general, de lo que más he aprendido es de la experiencia de desarrollar un proyecto más grande desde cero, y mejorar la estructura del código y los ficheros.




