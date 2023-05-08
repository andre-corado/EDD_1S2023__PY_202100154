import Arbol_avl from "./pagAdmin/estudiante/arbolAVL.js";
import CircularJSON from "./circular-json.js";
import TablaHash from "../../EDD_Proyecto1_Fase3/TablaHash/T_HASH.js"
import { encryptSHA256 } from "../../EDD_Proyecto1_Fase3/encriptacion/encriptarPass.js";

var inicio = document.getElementById("iniciar");


inicio.addEventListener("click", async function (event){
    var username = document.getElementById("usuario").value;
    var userpass = document.getElementById("contra").value;

    var objHash = JSON.parse(localStorage.getItem("structHash"))
    var hash = new TablaHash()
    hash.tabla = objHash.tabla 
    hash.capacidad = objHash.capacidad 
    hash.utilizacion = objHash.utilizacion 
    const hashPass = await encryptSHA256(userpass);

    if(username == "admin" && userpass == "admin"){
        location.href = "./pagAdmin/admin.html";
        alert("Bienvenido");

    }else if(hash.login(username, hashPass)){
        localStorage.setItem("estudiante", username)
        location.href = "./pagUsuario/usuario.html";
        alert("Usuario y contraseña correcto!d");
    }else{
        alert("Usuario y/o contraseña invalidos");
    }
})
