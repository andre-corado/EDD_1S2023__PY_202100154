import Arbol_avl from "./estudiante/arbolAVL.js"
import CircularJSON from "../circular-json.js"

/* LLAMADO DE BOTONES */
const btn_POST = document.getElementById("btn_PostO")
const btn_IN = document.getElementById("btn_InO")
const btn_PRE = document.getElementById("btn_PreO")

/* EXTRACCION DE INFORMACION PARA TABLA  [POR DEFECTO IN-ORDEN]*/
TablaInOrden()

/* BOTON DE RECORRIDO POSTORDEN */
btn_POST.addEventListener("click", TablaPostOrden, true)

function TablaPostOrden(){
    var ObjEstudiantes = CircularJSON.parse(JSON.parse(localStorage.getItem("structEstudiantes")));
    var StructPOST = new  Arbol_avl();
    StructPOST.raiz = ObjEstudiantes.raiz;

    const tablaBody = document.getElementById("tableBody_users");
    tablaBody.innerHTML = StructPOST.recorridoPostOrden(ObjEstudiantes.raiz);
}

/* BOTON DE RECORRIDO PREORDEN */
btn_IN.addEventListener("click", TablaInOrden, true)

function TablaInOrden(){
    var ObjEstudiantes = CircularJSON.parse(JSON.parse(localStorage.getItem("structEstudiantes")));
    var StructIN = new  Arbol_avl();
    StructIN.raiz = ObjEstudiantes.raiz;

    const tablaBody = document.getElementById("tableBody_users");
    tablaBody.innerHTML = StructIN.recorridoInorden(ObjEstudiantes.raiz);
}
/* BOTON DE RECORRIDO INORDEN */
btn_PRE.addEventListener("click", TablaPreOrden, true)

function TablaPreOrden(){
    var ObjEstudiantes = CircularJSON.parse(JSON.parse(localStorage.getItem("structEstudiantes")));
    var StructPRE = new  Arbol_avl();
    StructPRE.raiz = ObjEstudiantes.raiz;

    const tablaBody = document.getElementById("tableBody_users");
    tablaBody.innerHTML = StructPRE.recorridoPreorden(ObjEstudiantes.raiz);
}
