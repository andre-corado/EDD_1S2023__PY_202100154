package packPila

import (
	"EDD_1S2023_PY_202103718/reportes/graphviz"
	"fmt"
)

type Pila struct {
	Primero *nodo
	Size    int
}

func (p *Pila) EstaVacia() bool {
	if p.Size == 0 {
		return true
	} else {
		return false
	}
}

func (p *Pila) Push(texto string, fechatexto string) {
	if p.EstaVacia() {
		nuevoNodo := &nodo{texto, fechatexto, nil}
		p.Primero = nuevoNodo
		p.Size++
	} else {
		nuevoNodo := &nodo{texto, fechatexto, p.Primero}
		p.Primero = nuevoNodo
		p.Size++
	}
}

func (p *Pila) Pop() {
	if p.EstaVacia() {
		fmt.Println("La pila no tiene elementos")
	} else {
		p.Primero = p.Primero.siguiente
		p.Size--
	}
}

func (p *Pila) MostrarDatos() {
	current := p.Primero

	for current != nil {
		fmt.Println("\n" + current.texto + ", Fecha: " + current.fechaSesion)
		current = current.siguiente
	}
}

func (p *Pila) Peek() {
	if p.EstaVacia() {
		fmt.Println("La pila no tiene elementos")
	} else {
		fmt.Println(p.Primero.texto, " ", p.Primero.fechaSesion)
	}
}

func (p *Pila) Graficar() {
	nombre_archivo := "./reportes/graphviz/pila.dot"
	nombre_imagen := "reportes/pilaAdmin.jpg"
	texto := "digraph pila{\n"
	texto += "rankdir=LR;\n"
	texto += "node[shape = record]"
	aux := p.Primero
	texto += "nodo0 [label=\""
	for i := 0; i < p.Size; i++ {
		texto = texto + "|" + aux.texto + "\\n" + aux.fechaSesion
		aux = aux.siguiente
	}
	texto += "\"]; \n}"
	graphviz.CrearArchivo(nombre_archivo)
	graphviz.EscribirArchivoDot(texto, nombre_archivo)
	graphviz.Ejecutar(nombre_imagen, nombre_archivo)
}

func (p *Pila) GraficarNodo() string {
	current := p.Primero

	graphviz := "[fontsize = 8 shape = record fillcolor = white label = \"{pila"
	for i := 0; i < p.Size; i++ {
		graphviz += "|" + current.texto + "\\n" + current.fechaSesion
		current = current.siguiente
	}
	graphviz += "}\"]\n"
	return graphviz
}
