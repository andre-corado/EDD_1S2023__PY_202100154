package packEstudiantes

import (
	"EDD_1S2023_PY_202103718/estructuras/packPila"
	"EDD_1S2023_PY_202103718/reportes/graphviz"
	"fmt"
	"strconv"
)

// ESTRUCTURA DE UNA LISTA DOBLEMENTE ENLAZADA
type ListaDoble struct {
	Inicio *Nodo
	Final  *Nodo
	Size   int
}

// FUNCIONES PARA VERIFICAR SI ESTA VACIA LA LISTA
func (l *ListaDoble) isEmpty() bool {
	if l.Size == 0 {
		fmt.Println(" ")
		return true
	}
	return false
}

// FUNCIONES PARA LA CREACION DE LOS NUEVOS NODOS PARA LAS LISTAS
func (l *ListaDoble) newNodo(estudiante *Estudiante) *Nodo {
	return &Nodo{estudiante, nil, nil}
}

// PARA AGREAGAR ESTUDIANTES
func (l *ListaDoble) AddEstudiante(nombre string, apellido string, carnet string, pass string) {
	newEstudiante := &Estudiante{nombre, apellido, carnet, pass, &packPila.Pila{Primero: nil, Size: 0}}
	if l.isEmpty() {
		nuevoNodo := l.newNodo(newEstudiante)
		l.Inicio = nuevoNodo
		l.Final = nuevoNodo
		l.Size++
	} else {
		nuevoNodo := l.newNodo(newEstudiante)

		if l.Final.anterior == nil {
			nuevoNodo.anterior = l.Inicio
			l.Inicio.siguiente = nuevoNodo
			l.Final = nuevoNodo
		} else {
			l.Final.siguiente = nuevoNodo
			nuevoNodo.anterior = l.Final
			l.Final = nuevoNodo
		}
		l.Size++
	}
}

// MOSTRAR TODOS LOS NODOS QUE ESTAN DENTRO DE LA LISTA
func (l *ListaDoble) MostrarLista() {
	current := l.Inicio

	for current != nil {
		fmt.Printf("Nombre: %s %s, Carnet: %s\n", current.estudiante.nombre, current.estudiante.apellido, current.estudiante.carnet)
		fmt.Println("*****************************************")
		current = current.siguiente
	}
}

func (l *ListaDoble) CrearJson() string {
	txt := "{\n"
	txt += "\t\"alumnos\": [\n"
	current := l.Inicio

	if l.Size == 1 {
		txt += "\t \t{\n"
		txt += "\t \t \t\"nombre\": \"" + current.estudiante.nombre + " " + current.estudiante.apellido + "\",\n"
		txt += "\t \t \t\"carnet\": " + current.estudiante.carnet + ",\n"
		txt += "\t \t \t\"password\": \"" + current.estudiante.pass + "\",\n"
		txt += "\t \t \t\"Carpeta_Raiz\": \"/\"\n"
		txt += "\t \t }\n"
		txt += "\t]\n"
		txt += "}"

		return txt
	}

	for current != nil {

		txt += "\t \t{\n"
		txt += "\t \t \t\"nombre\": \"" + current.estudiante.nombre + " " + current.estudiante.apellido + "\",\n"
		txt += "\t \t \t\"carnet\": " + current.estudiante.carnet + ",\n"
		txt += "\t \t \t\"password\": \"" + current.estudiante.pass + "\",\n"
		txt += "\t \t \t\"Carpeta_Raiz\": \"/\"\n"

		if current.siguiente == nil {
			txt += "\t \t }\n"
			break
		}
		txt += "\t \t },\n"

		current = current.siguiente
	}

	txt += "\t]\n"
	txt += "}"

	return txt
}

// VERIFICAR SI SE REPITE UN ESTUDIANTE
func (l *ListaDoble) EstudianteRepetido(nombre string) bool {
	current := l.Inicio
	for current != nil {
		if nombre == current.estudiante.nombre {
			return true
		}
		current = current.siguiente
	}
	return false
}

// INICIO DE SESION ESTUDIANTES
func (l *ListaDoble) InicioSesion(carnet string, pass string) bool {
	current := l.Inicio

	for current != nil {
		if carnet == current.estudiante.carnet && pass == current.estudiante.pass {
			return true
		}
		current = current.siguiente
	}
	return false
}

func (l *ListaDoble) AddBitacoraEnListaDoble(carnet string, fecha string) {
	current := l.Inicio

	for current != nil {
		if carnet == current.estudiante.carnet {
			current.estudiante.pila.Push("Se inició sesión", fecha)
		}
		current = current.siguiente
	}
}

func (l *ListaDoble) GraficarF() {
	nombre_archivo := "./reportes/graphviz/listadoble.dot"
	nombre_imagen := "reportes/listadoble.png"
	graphviztxt := "digraph listadoble{\n"
	graphviztxt += "node[shape = box fillcolor = \"white\" style = filled];\n"
	graphviztxt += "subgraph cluster_l{ \n"
	graphviztxt += "label = \"Lista de Estudiante\" \n"
	graphviztxt += "edge[dir = \"both\" minlen = 2] \n"
	graphviztxt += "nodon1[width = 1.2 label = \"null\" fillcolor = white] \n"
	graphviztxt += "nodon2[width = 1.2 label = \"null\" fillcolor = white] \n"
	current := l.Inicio

	for i := 0; i < l.Size; i++ {
		graphviztxt += "nodo" + strconv.Itoa(i) + "[width = 1.2 label=\"" + current.estudiante.carnet + "\\n" + current.estudiante.nombre + "\"]" + "\n"
		current = current.siguiente
	}
	for i := 0; i < l.Size-1; i++ {
		if i == 0 {
			graphviztxt += "nodon1" + " -> nodo" + strconv.Itoa(i) + "\n"
		}
		graphviztxt += "nodo" + strconv.Itoa(i) + " -> nodo" + strconv.Itoa(i+1) + "\n"
		if (i + 1) == l.Size-1 {
			graphviztxt += "nodo" + strconv.Itoa(i+1) + " -> nodon2" + "\n"
		}
	}
	graphviztxt += "{rank = same;nodon1;nodon2"
	for i := 0; i < l.Size; i++ {
		graphviztxt += ";nodo" + strconv.Itoa(i)
	}
	graphviztxt += "}\n"

	current = l.Inicio
	for i := 0; i < l.Size; i++ {
		if !current.estudiante.pila.EstaVacia() {
			graphviztxt += "pila" + strconv.Itoa(i) + current.estudiante.pila.GraficarNodo()
			graphviztxt += "nodo" + strconv.Itoa(i) + " -> " + "pila" + strconv.Itoa(i) + "\n"
		}
		current = current.siguiente
	}
	graphviztxt += "}\n"
	graphviztxt += "}"
	graphviz.CrearArchivo(nombre_archivo)
	graphviz.EscribirArchivoDot(graphviztxt, nombre_archivo)
	graphviz.Ejecutar(nombre_imagen, nombre_archivo)
}

func (l *ListaDoble) MostrarBitacoraEstudiante(carnet string) {
	current := l.Inicio

	for current != nil {
		if carnet == current.estudiante.carnet {
			current.estudiante.pila.MostrarDatos()
		}
		current = current.siguiente
	}
}
