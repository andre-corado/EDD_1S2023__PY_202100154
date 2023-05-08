package packEstudiantes

type Nodo struct {
	estudiante *Estudiante
	anterior   *Nodo
	siguiente  *Nodo
}
