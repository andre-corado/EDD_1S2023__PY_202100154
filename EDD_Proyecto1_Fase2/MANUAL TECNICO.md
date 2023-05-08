# MANUAL TÉCNICO 💻


## Descripción de la solución ⚙️ 

#### ***pagAdmin[carpeta]***:
Acá se realiza todas las operaciones de administrador que se basa en la carga de archivos de entrada y visualización de estudiantes con diferentes tipos de orden, así como el grafo de los estudiantes dentro del sistema.

#### ***pagUsuario[carpeta]***:
Se tienen las opciones de crear, eliminar y cargar archivos. Utilizando localStorage para almacenar toda la información.

#### ***img[carpeta]***:
Acá se encuentran todas las imágenes que se usan en todo el sistema, tanto de usuario como de administrador. 

___

## Requerimientos del Entorno de Desarrollo 🔧
* lenguaje de programación: Javascript

* IDE utilizada: Visual Studio Code 1.56.0

* Espacio en memoria: 100 MB como mínimo

___

## Estructuras utilizadas 📦

- **Árbol AVL**: Usuarios que estén en el sistema ya aceptados.

- **Matriz Dispersa**: Se utilizará para manejar permisos en las carpetas del
directorio actual.

- **Árbol Multicamino o N-ario**: se usará para el manejo de los sistemas de
archivos.

- **Lista Circular**: Manejo de logs, creación o eliminación de carpetas o archivos
ligados a cada usuario


## Árbol AVL[métodos] 📖
Se utilizó para el almacenamiento de todos los alumnos.

| Función                       |   Definición  |
| ------------------------------|:-------------:|
| `addArbolN`                         | Se creará una carpeta por medio de una ruta y verificará si existe o no. Si ya existe la carpeta se creará una copia      |
| `addMatrizD`                  | Se ingresará al arbol N-ario del estudiante y se agregará los archivos cargados a la matriz      |
| `eliminarCarpeta`             | Por medio de la ruta recorré el árbol para eliminar la carpeta       |
| `returnNodo`            | Tiene como entrada el carnet del estudiante y retorna el nodo del arbol AVL      |
| `recorridoPreorden` | Retorna una cadena con el código graphviz de recorrido Preorden      |
| `recorridoInorden` | Retorna una cadena con el código graphviz de recorrido Inorden      |
| `grafica_arbol` | gráfica un arbol general de todos los estudiantes cargados en el sistema.     |
| `eliminarTodo` | elimina todos los nodos del árbol AVL      |

## Árbol N-aria[métodos] 📖
Se utilizó para el almacenamiento de las carpetas que el estudiante almacene.

| Estructura  | Definición |
| ------------- |:-------------:|
| `BuscarCarpeta`       | Por medio de la ruta y nombre de carpeta recorrerá el árbol.      |
|     `tablaCarpetas`  | Con la ruta buscará todas las carpetas  asi como los archivos      |
| `returnNodoCarpeta`    | Retornará el nodo de la carpeta recorriendo todo el árbol      |
| `MatrizEstudiante`    | Se buscará la carpeta para poder ingresar los archivos subidos      |
| `BuscarCarpetaV2`    | Toma la ruta ingresada y buscará la última carpeta colocada      |

## Matriz Dispersa[métodos] 📖
Se utilizó para el almacenamiento de los archivos cargados como textos planos, imágenes y pdf´s.

| Estructura  | Definición |
| ------------- |:-------------:|
| `insertarArchivo`       | Ingresará el archivo a la matriz del estudiante.      |
|     `colocarPermiso`  | Podrá darle permiso a otros usuario para podes controlar archivos y eso se agregará a la matriz del estudiante      |
| `reporte`       | Retorna el código graphviz de la matriz para poder graficarla      |
| `tablaArchivos`    | Subirá los archivos a la interfaz.      |

___
## imports 📦
Todas las importaciones utilizadas a lo largo de todo el proceso de realización de la Fase 1
~~~
	"Bootstrap 5"
	"datatables"
~~~

~~~
Universidad San Carlos de Guatemala 2023
Programador: Harry Aaron Gómez Sanic
Carné: 202103718
~~~