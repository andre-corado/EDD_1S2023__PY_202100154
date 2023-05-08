package packEstudiantes

type Operaciones interface {
	isEmpty() bool
	AddEstudiante(nombre string, apellido string, carnet string, pass string)
	newNodo(estudiante *Estudiante) *Nodo
	MostrarLista()
}
