import Arbol_avl from "./pagAdmin/estudiante/arbolAVL.js";
import CircularJSON from "./circular-json.js";


var inicio = document.getElementById("iniciar");

inicio.addEventListener("click", function (event){
    var username = document.getElementById("usuario").value;
    var userpass = document.getElementById("contra").value;

    if(username == "admin" && userpass == "admin"){
        location.href = "./pagAdmin/admin.html";
        alert("Bienvenido");

    }else if(verificarUser(username, userpass)){
        location.href = "./pagUsuario/usuario.html";
        alert("Usuario y contraseña correcto!");
    }else{
        alert("Usuario y/o contraseña invalidos");
    }
})

function verificarUser(usuario, contra){
    var ObjEstudiantes = CircularJSON.parse(JSON.parse(localStorage.getItem("structEstudiantes")));
    var struct = new Arbol_avl();
    struct.raiz = ObjEstudiantes.raiz;

    if(struct.busquedaNodo(ObjEstudiantes.raiz, usuario, contra) != ""){
        return true
    }

    return false
}