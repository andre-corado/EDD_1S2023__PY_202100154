package db

import (
	"encoding/csv"
	"fmt"
	"io"
	"os"
	"strings"
)

func LeerArchivo(ruta string) {
	file, err := os.Open(ruta)

	if err != nil {
		fmt.Println("ERROR: no se pudo abrir el archivo")
		return
	}

	defer file.Close()

	leer := csv.NewReader(file)
	leer.Comma = ','
	encabezado := true

	for {
		linea, err := leer.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			fmt.Println("ERROR: No se pudo leer la linea")
			continue
		}
		if encabezado {
			encabezado = false
			continue
		}
		divisionNombre := strings.Split(linea[1], " ")
		nombre := divisionNombre[0]
		apellido := divisionNombre[1]
		if !AgregarEstudiante(nombre, apellido, linea[0], linea[2]) {
			fmt.Println("\nERROR: Este estudiante ya se encuentra en espera.")
		}
	}
}
