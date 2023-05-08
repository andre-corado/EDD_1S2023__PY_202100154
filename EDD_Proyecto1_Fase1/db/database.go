package db

import (
	"EDD_1S2023_PY_202103718/estructuras/packCola"
	"EDD_1S2023_PY_202103718/estructuras/packEstudiantes"
	"EDD_1S2023_PY_202103718/estructuras/packPila"
	"fmt"
	"os"
	"os/exec"
	"strconv"
	"time"
)

var listaEstudiantes = &packEstudiantes.ListaDoble{Inicio: nil, Final: nil, Size: 0}
var colaDeEspera = &packCola.Cola{Primero: nil, Size: 0}
var pilaAdmin = &packPila.Pila{Primero: nil, Size: 0}

func Clean() {
	cmd := exec.Command("cmd", "/c", "cls")
	cmd.Stdout = os.Stdout
	cmd.Run()
}

func formato_hora() string {
	tiempo := time.Now() // 10:04

	year := tiempo.Year()
	mes := tiempo.Month().String()
	day := tiempo.Day()
	fecha := strconv.Itoa(day) + " " + mes + " " + strconv.Itoa(year)

	texto_final := ""
	if tiempo.Hour() < 10 {
		texto_final = texto_final + "0" + strconv.Itoa(tiempo.Hour()) + ":"
	} else {
		texto_final = texto_final + strconv.Itoa(tiempo.Hour()) + ":"
	}
	if tiempo.Minute() < 10 {
		texto_final = texto_final + "0" + strconv.Itoa(tiempo.Minute()) + ":"
	} else {
		texto_final = texto_final + strconv.Itoa(tiempo.Minute()) + ":"
	}
	if tiempo.Second() < 10 {
		texto_final = texto_final + "0" + strconv.Itoa(tiempo.Second())
	} else {
		texto_final = texto_final + strconv.Itoa(tiempo.Second())
	}
	return fecha + " " + texto_final
}

func AgregarEstudiante(nombre string, apellido string, carnet string, pass string) bool {
	if colaDeEspera.EstudianteRepetido(carnet) {
		return false
	}

	colaDeEspera.Encolar(nombre, apellido, carnet, pass)
	colaDeEspera.Graficar()
	return true
}

func ReturnPrimerEstudiante() string {
	if colaDeEspera.MostrarPrimero() {
		return "1"
	}
	return "2"
}

func AprobarEstudiante() {
	nombre, apellido, carnet, pass := colaDeEspera.RetunPrimero()
	listaEstudiantes.AddEstudiante(nombre, apellido, carnet, pass)
	pilaAdmin.Push("Se aceptó a "+nombre+", ", formato_hora())

	pilaAdmin.Graficar()
	listaEstudiantes.GraficarF()
	colaDeEspera.Descolar()
	colaDeEspera.Graficar()

	contenido := listaEstudiantes.CrearJson()
	packEstudiantes.CrearArchivo()
	packEstudiantes.EscribirArchivo(contenido)
	listaEstudiantes.MostrarLista()
}

func RechazarEstudiante() {
	nombre, apellido, carnet, pass := colaDeEspera.RetunPrimero()
	hola(apellido, carnet, pass)
	pilaAdmin.Push("Se rechazó a "+nombre+", ", formato_hora())
	pilaAdmin.Graficar()
	colaDeEspera.Descolar()
	colaDeEspera.Graficar()
}

func ListaDeEstudiantesRegistrados() {
	fmt.Print("\n")
	listaEstudiantes.MostrarLista()
}

func InicioSesionEstudiante(carnet string, pass string) string {
	if listaEstudiantes.InicioSesion(carnet, pass) {
		return "1"
	}
	return "2"
}

func BitacoraEstudiante(carnet string) {
	fecha := formato_hora()
	listaEstudiantes.AddBitacoraEnListaDoble(carnet, fecha)
	listaEstudiantes.MostrarBitacoraEstudiante(carnet)
	listaEstudiantes.GraficarF()
}

func hola(ap string, car string, pas string) {
	//hola
}
