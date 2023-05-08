import * as DB from "./db.js"
import TablaHash from "../../../EDD_Proyecto1_Fase3/TablaHash/T_HASH.js";
import Arbol_avl from "./estudiante/arbolAVL.js"
import CircularJSON from "../circular-json.js";
import ListaSimplePermisosHTML from "../../../EDD_Proyecto1_Fase3/PermisosHTML/listaPermisos.js"
import * as DB_F3 from "../../../EDD_Proyecto1_Fase3/DB/database.js"

/* ---------------- SUBIDA DE ARCHIVOS ---------------- */
const dropArea = document.querySelector(".drag-area");
const dragText = dropArea.querySelector("h2");
const button = dropArea.querySelector("button");
const input = dropArea.querySelector("#input-file");
const CargaStructsNews = document.querySelector("#CargaStructsNews");
let files;

input.addEventListener("change", (e) => {
    dropArea.classList.add("active");
    // acá va algo ---> <---
    dropArea.classList.remove("active");
});

dropArea.addEventListener("dragover", (e) =>{
    e.preventDefault();
    dropArea.classList.add("active");
    dragText.textContent = "Suelte para cargar los archivos";
});

dropArea.addEventListener("dragleave", (e) =>{
    e.preventDefault();
    dropArea.classList.remove("active");
    dragText.textContent = "Arrastre y suelte los archivos aquí para subirlos";
});

dropArea.addEventListener("drop", (e) =>{
    e.preventDefault();
    files = e.dataTransfer.files;
    showFiles(files);
    dropArea.classList.remove("active"); 
    dragText.textContent = "Arrastre y suelte los archivos aquí para subirlos";
});

/* ---------- SUBIDA DE ARCHIVOS AL ARBOL AVL ---------- */
const inputElement = document.getElementById("input-file");
inputElement.addEventListener("change", onchange, false);
function onchange(event){
var reader = new FileReader();
reader.onload = onReaderLoad;
reader.readAsText(event.target.files[0]);
}   

function onReaderLoad(event){
    var obj = JSON.parse(event.target.result);

    console.log("---- Datos ingresados ----")
    for(var i = 0; i<obj.alumnos.length; i++){
        DB.addEstudiante(obj.alumnos[i].nombre, obj.alumnos[i].carnet, obj.alumnos[i].password);
    }

}


CargaStructsNews.addEventListener("click", function (event){
    var tablaHash = new TablaHash();

    var ObjEstudiantes = CircularJSON.parse(JSON.parse(localStorage.getItem("structEstudiantes")));
    var struct_avl = new  Arbol_avl();
    struct_avl.raiz = ObjEstudiantes.raiz;

    DB_F3.insertarHash(struct_avl, tablaHash);

    alert("Archivos agregados correctamente");

    var objPermisos = JSON.parse(localStorage.getItem("PermisosHTML"))
    var permisos = new ListaSimplePermisosHTML();
    permisos.raiz = objPermisos.raiz
    permisos.size = objPermisos.size

    // console.log(permisos.returnHTMLPermisos())
    const tablaBody2 = document.getElementById("tableBody_users2");
    tablaBody2.innerHTML = permisos.returnHTMLPermisos()
    
});
/* ---------- CAMBIOS ENTRE PAGINAS ---------- */
