import { FechaHora } from "./herramientas/fechaHora.js"
import { getBlock } from "./herramientas/getBlockChain.js"
import { getHash } from "./herramientas/getHash.js"
import { setBlock } from "./herramientas/setBlock.js"

let emisor = localStorage.getItem("estudiante");
let barra_search = document.getElementById("inputNewChat")
let currentChat = document.getElementById("box-chats")

document.getElementById("encabezado_carnet").textContent = emisor
var enviar_mensaje = document.getElementById("enviar_mensaje")
getBlock()


function nuevoChatLateral(){
    var usuario = document.getElementById("inputNewChat").value
    let hash = getHash()

    if(!hash.busquedaUsuario(usuario)){
        alert("No se encontró al estudiante")
        return false
    }

    let lateral = document.getElementById("name_lateral")
    lateral.textContent = usuario
}

async function actuChat(){
    var receptor_ = document.getElementById("name_lateral").textContent
    let block = getBlock()
    var data_mensajes = await block.getChatsContenedor(emisor, receptor_)
    console.log(data_mensajes)
    document.getElementById("bloque_mensajes").innerHTML = data_mensajes
}

async function nuevoChat(){
    // PRIMERO VA A VERIFICAR SI HAY MENSAJES ANTERIORES (blockChain)
    // MODIFICO EL LATERAL DERECHO COLOCANDO SUS DATOS DE CARNET Y NOMBRE

    var receptor_ = document.getElementById("inputNewChat").value
    let block = getBlock()
    var data_mensajes = await block.getChatsContenedor(emisor, receptor_)
    document.getElementById("bloque_mensajes").innerHTML = data_mensajes
    document.getElementById("inputNewChat").value = ""
    var name = document.getElementById("nombre_receptor")
    name.innerHTML = `${receptor_}<br><span>${getHash().busquedaUsuario(receptor_).usuario}</span>`
}
// let imagen = 'https://robohash.org/'+carnet +'.png'

function getMensaje(){
    var mensaje = document.getElementById("mensaje").value
    document.getElementById("mensaje").value = ""
    return mensaje
}

async function enviarMensaje(){
    let receptor = document.getElementById("name_lateral").textContent
    let hash = getHash()
    let mensaje = getMensaje()
    console.log(mensaje)
    console.log(receptor)
    // VALIDACIONES
    if(!mensaje){
        alert("El input esta vacio")
        return false
    }

    if(!hash.busquedaUsuario(receptor)){
        alert("El estudiante no existe")
        return false
    }

    // LOGICA
    let fecha = FechaHora()
    let block = getBlock()

    await block.insertarBloque(fecha, emisor, receptor, mensaje)
    setBlock(block)
    actuChat()
}

enviar_mensaje.addEventListener("click", function (event){
    enviarMensaje()
})


barra_search.addEventListener("keyup", function (event){
    if(event.keyCode === 13){
        nuevoChatLateral()
    }
})

currentChat.addEventListener("click", function (event){
    if(document.getElementById("name_lateral").textContent == ""){
        alert("Chat en blanco")
    }

    nuevoChat()
})