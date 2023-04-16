import Arbol_avl from "./estudiante/arbolAVL.js"
import CircularJSON from "../circular-json.js";

var ObjEstudiantes = CircularJSON.parse(JSON.parse(localStorage.getItem("structEstudiantes")));
var struct = new  Arbol_avl();
struct.raiz = ObjEstudiantes.raiz;

/*limpiar()

function limpiar(){
    struct.eliminarTodo();
    let url = 'https://quickchart.io/graphviz?graph=digraph G { raiz }';
    $("#image").attr("src", url);
}*/

let url = 'https://quickchart.io/graphviz?graph=';
let body = struct.grafica_arbol();
console.log(body)
$("#image").attr("src", url + body);
