import Arbol_avl from "../pagAdmin/estudiante/arbolAVL.js";
import CircularJSON from "../circular-json.js";
import ArbolNArio from "./ArbolCarpetas/arbolN.js";
import Matriz from "./ArbolCarpetas/matriz.js";

/* 
        --------------- CREAR CARPETA ---------------
*/
export function agregarCarpeta_user(carnet, ruta, carpeta){
    // JALAR LA INFO DE LOCALSTORAGE
    var ObjEstudiantes = CircularJSON.parse(JSON.parse(localStorage.getItem("structEstudiantes")));
    var struct = new  Arbol_avl();
    struct.raiz = ObjEstudiantes.raiz;

    console.log(struct)
    var respuesta = struct.addArbolN(struct.raiz, carnet, ruta, carpeta);
    var retornoResultado = "";

    if(respuesta == ""){
        console.log("RESULTADO: creado correctamente")
        retornoResultado = "Carpeta creada correctamente!"
    }else{
        console.log("RESULTADO: "+respuesta)
        retornoResultado = respuesta
    }
    
    localStorage.setItem("structEstudiantes", JSON.stringify(CircularJSON.stringify(struct)))
    return retornoResultado
}

/* 
        --------------- CARGA DE ARCHIVOS A MATRIZ ---------------
*/
export function agregarMatrizD(texto, rutaUnida, numero){// texto => texto.txt | rutaUnida => /DOCUMENTOS/DOC1 |
    var ruta = rutaUnida.split("/")
    var ObjEstudiantes = CircularJSON.parse(JSON.parse(localStorage.getItem("structEstudiantes")));
    var carnet = localStorage.getItem("estudiante");

    var struct = new  Arbol_avl();
    struct.raiz = ObjEstudiantes.raiz;
    var jsonRAIZ = struct.returnNodo(struct.raiz, carnet);
    var raizNARIO = CircularJSON.parse(JSON.parse(jsonRAIZ)).raiz;

    var structN = new ArbolNArio();
    structN.raiz = raizNARIO
    structN.nodo_creados = CircularJSON.parse(JSON.parse(jsonRAIZ)).nodo_creados

    if(structN.BuscarCarpetaV2(ruta) !== null){
        var carpeta

        if(rutaUnida == "/"){
            carpeta = "/"

        }else{carpeta = ruta[ruta.length - 1]}
        
        console.log(carpeta)
        var respuest = struct.addMatrizD(struct.raiz, carnet, texto, carpeta, numero);
        console.log("RESPUESTA DE MATRIZ:\n"+respuest+"\n");
        localStorage.setItem("structEstudiantes", JSON.stringify(CircularJSON.stringify(struct)));
        alert("Archivo cargado correctamente!")
        return true
    }
    
    alert("Revise la ruta por favor!")
    return false
}

/* 
        --------------- PERMISOS PARA EL USUARIO ---------------
*/
export function permisos(textoInput, rutaUnida){
    let arreglo = textoInput.split("-")
    var carnet = localStorage.getItem("estudiante")
    var ObjEstudiantes = CircularJSON.parse(JSON.parse(localStorage.getItem("structEstudiantes")));
    var ruta = rutaUnida.split("/")
    var carpeta

    if(rutaUnida == "/"){
        carpeta = "/"

    }else{carpeta = ruta[ruta.length - 1]}

    var struct = new  Arbol_avl();
    struct.raiz = ObjEstudiantes.raiz;
    var jsonRAIZ = struct.returnNodo(struct.raiz, carnet);
    var raizNARIO = CircularJSON.parse(JSON.parse(jsonRAIZ)).raiz;

    var structN = new ArbolNArio();
    structN.raiz = raizNARIO
    structN.nodo_creados = CircularJSON.parse(JSON.parse(jsonRAIZ)).nodo_creados
    var nodoMatriz = structN.BuscarCarpetaV2(ruta)

    if (nodoMatriz !== null){
        
        // AGREGAR EL PERMISO Y AGREGAR LA CARPETA AL OTRO USUARIO
        var matriz = new Matriz()
        matriz.principal = nodoMatriz.filesCarpeta.principal
        matriz.coordenadaX = nodoMatriz.filesCarpeta.coordenadaX
        matriz.coordenadaY = nodoMatriz.filesCarpeta.coordenadaY
        matriz.colocarPermiso(arreglo[0], arreglo[1], arreglo[2])
        console.log(matriz.reporte())
        
        structN.permisosDeCarpeta(structN.raiz, 1, 0, carpeta, JSON.stringify(CircularJSON.stringify(matriz)))
        // ENCONTRAR AL ESTUDIANTE EL CUAL MODIFICAR LA CARPETA
        struct.permisosUser(struct.raiz, carnet, structN)

        localStorage.setItem("structEstudiantes", JSON.stringify(CircularJSON.stringify(struct)))
    }

}

/* 
        --------------- GRAFICACIÓN DE MATRIZ CON ARCHIVOS ---------------
*/
export function graficacionMatriz(carpeta, carpetasSeparadas){
    var carnet = localStorage.getItem("estudiante")
    var ObjEstudiantes = CircularJSON.parse(JSON.parse(localStorage.getItem("structEstudiantes")));

    var struct = new  Arbol_avl();
    struct.raiz = ObjEstudiantes.raiz;
    var jsonRAIZ = struct.returnNodo(struct.raiz, carnet);
    var raizNARIO = CircularJSON.parse(JSON.parse(jsonRAIZ)).raiz;

    var structN = new ArbolNArio();
    structN.raiz = raizNARIO
    structN.nodo_creados = CircularJSON.parse(JSON.parse(jsonRAIZ)).nodo_creados

    if (structN.BuscarCarpetaV2(carpetasSeparadas) !== null){
        return structN.returnNodoCarpeta(structN.raiz, 1, 0, carpeta)
    }
    return ""
}

/* 
        --------------- MUESTRA DE ARCHIVOS EN EL BUSCADOR POR RUTA ---------------
*/
export function tablaCarpetas(carpeta, lista_carpeta){
    var carnet = localStorage.getItem("estudiante")
    var ObjEstudiantes = CircularJSON.parse(JSON.parse(localStorage.getItem("structEstudiantes")));

    var struct = new  Arbol_avl();
    struct.raiz = ObjEstudiantes.raiz;
    var jsonRAIZ = struct.returnNodo(struct.raiz, carnet);
    var raizNARIO = CircularJSON.parse(JSON.parse(jsonRAIZ)).raiz;

    var structN = new ArbolNArio();
    structN.raiz = raizNARIO
    structN.nodo_creados = CircularJSON.parse(JSON.parse(jsonRAIZ)).nodo_creados

    var nodoMatriz = structN.BuscarCarpetaV2(lista_carpeta)

    if(nodoMatriz !== null){

        var matriz = new Matriz()
        matriz.principal = nodoMatriz.filesCarpeta.principal
        matriz.coordenadaX = nodoMatriz.filesCarpeta.coordenadaX
        matriz.coordenadaY = nodoMatriz.filesCarpeta.coordenadaY

        var HTML_tabla = structN.tablaCarpetas(structN.raiz, 1, 0, carpeta) + matriz.tablaArchivos()
        const tablaBody = document.getElementById("tableBody_users")
        tablaBody.innerHTML = HTML_tabla    
        return
    }
    alert("Revise la ruta por favor.")
}

/* 
        --------------- ELIMINACIÓN DE CARPETA ---------------
*/
export function eliminarCarpeta(lista_carpeta){
    var carnet = localStorage.getItem("estudiante")
    var ObjEstudiantes = CircularJSON.parse(JSON.parse(localStorage.getItem("structEstudiantes")));

    var struct = new  Arbol_avl();
    struct.raiz = ObjEstudiantes.raiz;
    var jsonRAIZ = struct.returnNodo(struct.raiz, carnet);
    var raizNARIO = CircularJSON.parse(JSON.parse(jsonRAIZ)).raiz;

    var structN = new ArbolNArio();
    structN.raiz = raizNARIO
    structN.nodo_creados = CircularJSON.parse(JSON.parse(jsonRAIZ)).nodo_creados

    var nodoMatriz = structN.BuscarCarpetaV2(lista_carpeta)
    if(nodoMatriz !== null){

        structN.eliminarCarpeta(lista_carpeta)   
        // BUSCAR AL ESTUDIANTE Y SUSTITUIRLE SU ARBOL NARIO 
        struct.eliminarCarpeta(struct.raiz, carnet, structN)
        localStorage.setItem("structEstudiantes", JSON.stringify(CircularJSON.stringify(struct)))
        alert("Carpeta eliminada con exito!")
        return true
    }

    console.log("Revise la ruta por favor!")
    return false
}
