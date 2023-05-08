package packEstudiantes

import (
	"EDD_1S2023_PY_202103718/estructuras/packPila"
)

type Estudiante struct {
	nombre   string
	apellido string
	carnet   string
	pass     string
	pila     *packPila.Pila
}
