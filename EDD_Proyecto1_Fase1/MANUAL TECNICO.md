# MANUAL TÉCNICO 💻


## Descripción de la solución ⚙️ 

#### ***archivosPrueba***:
Acá se almacenan todos los archivos para la prueba del programa, en este caso para la carga masiva de archivos

#### ***db***:
Para la solución se utilizó una base de datos en la cual se hace el manejo de todas las estructuras y así tener más comodidad y orden al tratar con la información

#### ***estructuras***:
En este apartado se encuentran todas las estructuras utilizadas como: ListaDoblemente Enlazada, Pila, Cola, etc.

#### ***reportes***:
Esta sección se encuentra todo lo relacionado con la información representada de forma grafica, con su respectivo archivo de generación .dot así como el archivo JSON de estudiante.

___

## Requerimientos del Entorno de Desarrollo 🔧
* Versión de Go: go1.20

* IDE utilizada: Visual Studio Code 1.56.0

* Espacio en memoria: 100 MB como mínimo

___

## db[métodos] 📖
Estas son algunas de las funciones más importantes usadas en la base de datos de programa.

| Función                       |   Definición  |
| ------------------------------|:-------------:|
| `Clean`                         | Para la limpieza de consola      |
| `formato_hora`                  | retorna la fecha en formato dd/mm/yyyy hh:mm:ss      |
| `AgregarEstudiante`             | Agrega al estudiante a la cola de espera      |
| `AprobarEstudiante`             | Ingresa a lista doblemente enlazada al estudiante      |
| `RechazarEstudiante`            | sacá de la cola de espera a este estudiante      |
| `ListaDeEstudiantesRegistrados` | ingresa a los estudiantes aceptados por el administrador      |

## estructuras[tipos] 📖
Estas son las estructuras utilizadas para la realización de la primera fase.

| Estructura  | Definición |
| ------------- |:-------------:|
| `Lista Doblemente Enlazada`       | Esta fue utilizada para el almacenamiento de todos los estudiantes aceptados      |
|     `Cola`  | Acá se llevaba el registro de todos los estudiantes esperando a ser aceptados o rechazados      |
| `PilaAdministrador`       | Se lleva registró de todos los movimientos realizados durante su sesión      |
| `PilaEstudiante`    | registra todos los inicios de sesión en el sistema      |

___
## imports 📦
Todas las importaciones utilizadas a lo largo de todo el proceso de realización de la Fase 1
~~~
	"fmt"
	"os"
	"io"
	"os/exec"
	"strconv"
	"time"
	"strings"
	"encoding/csv"
~~~

~~~
Universidad San Carlos de Guatemala 2023
Programador: Harry Aaron Gómez Sanic
Carné: 202103718
~~~