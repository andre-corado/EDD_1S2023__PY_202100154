package packCola

import (
	"EDD_1S2023_PY_202103718/reportes/graphviz"
	"fmt"
	"strconv"
)

type Cola struct {
	Primero *nodo
	Size    int
}

func (c *Cola) estaVacia() bool {
	if c.Size == 0 {
		return true
	} else {
		return false
	}
}

func (c *Cola) Encolar(nombre string, apellido string, carnet string, pass string) {
	if c.estaVacia() {
		nuevoNodo := &nodo{nombre, apellido, carnet, pass, nil}
		c.Primero = nuevoNodo
		c.Size++
	} else {
		nuevoNodo := &nodo{nombre, apellido, carnet, pass, nil}
		aux := c.Primero
		for aux.siguiente != nil {
			aux = aux.siguiente
		}
		aux.siguiente = nuevoNodo
		c.Size++
	}
}

func (c *Cola) Descolar() {
	if c.estaVacia() {
		fmt.Println("La cola no contiene elementos")
	} else {
		c.Primero = c.Primero.siguiente
		c.Size--
	}
}

func (c *Cola) MostrarPrimero() bool {
	if c.estaVacia() {
		fmt.Println("\nLa cola no contiene elementos")
		return true
	}
	fmt.Println("\n\nPendientes: ", c.Size)
	fmt.Println("Estudiante actual: " + c.Primero.nombre + " " + c.Primero.apellido)
	return false
}

func (c *Cola) RetunPrimero() (nombre string, apellido string, carnet string, pass string) {
	nombre = c.Primero.nombre
	apellido = c.Primero.apellido
	carnet = c.Primero.carnet
	pass = c.Primero.pass
	return nombre, apellido, carnet, pass
}

func (c *Cola) EstudianteRepetido(carnet string) bool {
	current := c.Primero
	for current != nil {
		if carnet == current.carnet {
			return true
		}
		current = current.siguiente
	}
	return false
}

func (c *Cola) Graficar() {
	nombre_archivo := "./reportes/graphviz/cola.dot"
	nombre_imagen := "reportes/colaDeEspera.jpg"
	texto := "digraph cola{\n"
	texto += "rankdir=LR;\n"
	texto += "node[shape = record];\n"
	texto += "nodonull2[label=\"null\"];\n"
	aux := c.Primero
	contador := 0
	for i := 0; i < c.Size; i++ {
		texto = texto + "nodo" + strconv.Itoa(i) + "[label=\"{" + aux.carnet + "\\n " + aux.nombre + " " + aux.apellido + "|}\"];\n"
		aux = aux.siguiente
	}
	for i := 0; i < c.Size-1; i++ {
		c := i + 1
		texto += "nodo" + strconv.Itoa(i) + "->nodo" + strconv.Itoa(c) + ";\n"
		contador = c
	}
	texto += "nodo" + strconv.Itoa(contador) + "->nodonull2;\n"
	texto += "}"

	graphviz.CrearArchivo(nombre_archivo)
	graphviz.EscribirArchivoDot(texto, nombre_archivo)
	graphviz.Ejecutar(nombre_imagen, nombre_archivo)
}
