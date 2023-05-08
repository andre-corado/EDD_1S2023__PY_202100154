package packEstudiantes

import (
	"os"
)

func CrearArchivo() {
	//Verifica que el archivo existe
	var _, err = os.Stat("./reportes/Archivo.json")
	//Crea el archivo si no existe
	if os.IsNotExist(err) {
		var file, err = os.Create("./reportes/Archivo.json")
		if err != nil {
			return
		}
		defer file.Close()
	}
}

func EscribirArchivo(contenido string) {
	var file, err = os.OpenFile("./reportes/Archivo.json", os.O_RDWR, 0644)
	if err != nil {
		return
	}
	defer file.Close()
	// Escribe algo de texto linea por linea
	_, err = file.WriteString(contenido)
	if err != nil {
		return
	}
	// Salva los cambios
	err = file.Sync()
	if err != nil {
		return
	}
}
