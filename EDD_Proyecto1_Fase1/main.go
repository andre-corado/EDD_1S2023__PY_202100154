package main

import (
	"EDD_1S2023_PY_202103718/db"
	"fmt"
)

func main() {
	inicio := "\n           ********************************\n           *                              *\n           *     BIENVENIDO A GoDrive     *\n           *                              *\n           ********************************"
	opcion := 0
	resp := ""
	usuario := ""
	pass := ""
	salir := false

	for !salir {
		db.Clean()
		opcion = 0
		usuario = ""
		pass = ""
		resp = ""

		fmt.Println(inicio)
		fmt.Println("\n   1.   Iniciar sesion\n   2.   Salir del sistema\n--------------------------\nElija una opcion:")
		fmt.Scanln(&resp)

		if resp != "1" {
			fmt.Print("\nCerrando Aplicación...\n\n")
			return
		}

		db.Clean()
		fmt.Println("********* INICIO DE SESIÓN < GoDrive > *********")
		fmt.Println("\nIngresa tu usuario: ")
		fmt.Scanln(&usuario)
		fmt.Println("\nIngresa tu password: ")
		fmt.Scanln(&pass)

		if usuario == "admin" && pass == "admin" {
			opcion = 1
		} else if db.InicioSesionEstudiante(usuario, pass) == "1" {
			opcion = 2
		}
		fmt.Println(opcion)
		switch opcion {
		case 1:
			// MENU DE ADMINISTRADOR
			adminMenu()

		case 2:
			// MENU DE ESTUDIANTES
			db.Clean()
			estudiantesMenu(usuario)

		default:
			fmt.Println("\nPOR FAVOR REVISE LOS DATOS.")
		}

	}
}

// -------------------------------------------------------ADMINISTRADOR-------------------------------------------------------
func adminMenu() {
	menu := "\n*** Dashboard Administrador - EDD GoDrive ***\n*      1. Ver Estudiantes Pendientes        *\n*" +
		"      2. Ver Estudiantes del Sistema       *\n*      3. Registrar Nuevo Estudiante 	    *\n*      4. Carga Masiva de Estudiantes	    *\n" +
		"*      5. Cerrar Sesion 	            *\n*********************************************"
	// MINUS PRIVADO, MAYUS PUBLICO
	nombreArchivo := ""
	opcion := 0
	enter := ""
	final := ""
	salirr := false

	for !salirr {
		salirr = false
		final = ""
		db.Clean()
		nombreArchivo = ""
		opcion = 0
		fmt.Println(menu)
		fmt.Print("Elige una opcion: ")
		fmt.Scanln(&opcion)

		switch opcion {
		case 1: // VER ESTUDIANTES PENDIENTES
			db.Clean()
			fmt.Println("\n********* Estudiantes Pendientes < GoDrive > *********")
			verEstudiantesPendientes()
			fmt.Println("\n\n    < Presione enter para regresar >")
			fmt.Scanln(&enter)

		case 2: // VER ESTUDIANTES DEL SISTEMA
			db.Clean()
			fmt.Println("\n********* Listado de Estudiantes < GoDrive > *********")
			db.ListaDeEstudiantesRegistrados()
			fmt.Println("\n\n    < Presione enter para regresar >")
			fmt.Scanln(&enter)

		case 3: // REGISTRAR NUEVO ESTUDIANTE
			db.Clean()
			fmt.Println("\n********* Registro de Estudiantes < GoDrive > *********")
			registrarNuevoEstudiante()
			fmt.Println("\n\n    < Presione enter para regresar >")
			fmt.Scanln(&enter)

		case 4: // CARGA MASIVA DE ESTUDIANTES
			db.Clean()
			fmt.Println("\n********* Carga Masiva de Usuarios < GoDrive > *********")
			fmt.Println("\nPor favor, ingrese el nombre del archivo")
			fmt.Scanln(&nombreArchivo)
			final = "./archivosPrueba/" + nombreArchivo + ".csv"
			fmt.Println("\nCargando todos los Estudiantes a la base de datos...")
			db.LeerArchivo(final)

			fmt.Println("\n\n    < Presione enter para regresar >")
			fmt.Scanln(&enter)

		case 5: // CERRAR SESION
			fmt.Println("\nCerrando Aplicación...")
			salirr = true
		}
	}
}

func registrarNuevoEstudiante() {
	var (
		nombre   string
		apellido string
		carnet   string
		pass     string
	)

	fmt.Println("\nIngrese un nombre")
	fmt.Scanln(&nombre)
	fmt.Println("\nIngrese un apellido")
	fmt.Scanln(&apellido)
	fmt.Println("\nIngrese el carnet")
	fmt.Scanln(&carnet)
	fmt.Println("\nIngrese una contraseña")
	fmt.Scanln(&pass)

	if !db.AgregarEstudiante(nombre, apellido, carnet, pass) {
		fmt.Println("\nERROR: Este estudiante ya se encuentra en espera.")
		return
	}

	fmt.Println("\n> Agregado correctamente! ")
}

func verEstudiantesPendientes() {

	salir := false
	opcion := 0

	for !salir {
		opcion = 0
		if db.ReturnPrimerEstudiante() == "1" {
			return
		}

		fmt.Println("\nElija una opcion:\n   1. Aprobar estudiante\n   2. Rechazar estudiante\n   3. Volver a menú principal\n---------------------------")
		fmt.Scanln(&opcion)

		switch opcion {
		case 1:
			db.AprobarEstudiante()
			fmt.Println("\nEstudiante aprobado.")

		case 2:
			db.RechazarEstudiante()
			fmt.Println("\nEstudiante rechazado.")

		case 3:
			fmt.Println("\n Regresando al menú principal...")
			salir = true

		}
	}
}

// -------------------------------------------------------ESTUDIANTE-------------------------------------------------------
func estudiantesMenu(carnet string) {
	enter := ""
	fmt.Println("\n********* Bitacora de Usuario < GoDrive > *********\nEstas son sus bitacoras:")
	fmt.Println("\n------------------------------------")
	db.BitacoraEstudiante(carnet)
	fmt.Println("\n------------------------------------")
	fmt.Println("\n\n > Se generó una imagen de la bitacora del estudiante.")
	fmt.Println("\n\n    < Presione enter para regresar >")
	fmt.Scanln(&enter)
}
