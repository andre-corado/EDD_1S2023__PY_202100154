/* IMPORTACIONES DE ESTRUCTURAS */
import Arbol_avl from "./estudiante/arbolAVL.js"
import CircularJSON from "../circular-json.js";

/* ACÁ SE INSTANCIARAN TODAS LAS ESTRUCTURAS A UTILIZAR */
var arbolEstudiantes = new Arbol_avl();

/* FUNCIONES PARA MANEJO DE INFORMACION */

export function addEstudiante(nombre, carnet, password){
    arbolEstudiantes.push(carnet, nombre, password);
    localStorage.setItem("structEstudiantes", JSON.stringify(CircularJSON.stringify(arbolEstudiantes)))
}
