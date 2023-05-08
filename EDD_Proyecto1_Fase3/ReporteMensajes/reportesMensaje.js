import { getBlock } from "../mensajeria/herramientas/getBlockChain.js"

const btnReporte = document.getElementById("reporte")
btnReporte.addEventListener("click", reporte)
let bloque_actual

function reporte(){
    bloque_actual = getBlock().inicio
    if(bloque_actual != null){
        let cadena = "Index: " + bloque_actual.valor['index']
        cadena += "\nTimeStamp: " + bloque_actual.valor['timestamp']
        cadena += "\nEmisor: " + bloque_actual.valor['transmitter']
        cadena += "\nReceptor: " + bloque_actual.valor['receiver']
        cadena += "\nMensaje: " + bloque_actual.valor['message']
        cadena += "\nPreviousHash: " + bloque_actual.valor['previoushash']
        cadena += "\nHash: " + bloque_actual.valor['hash']
        document.getElementById("reporte-bloques").value = cadena
    }
}

const btnReporte1 = document.getElementById("siguiente-bloque")
btnReporte1.addEventListener("click", reporte_siguente)

function reporte_siguente(){
    if(bloque_actual.siguiente != null){
        bloque_actual = bloque_actual.siguiente
        let cadena = "Index: " + bloque_actual.valor['index']
        cadena += "\nTimeStamp: " + bloque_actual.valor['timestamp']
        cadena += "\nEmisor: " + bloque_actual.valor['transmitter']
        cadena += "\nReceptor: " + bloque_actual.valor['receiver']
        cadena += "\nMensaje: " + bloque_actual.valor['message']
        cadena += "\nPreviousHash: " + bloque_actual.valor['previoushash']
        cadena += "\nHash: " + bloque_actual.valor['hash']
        document.getElementById("reporte-bloques").value = cadena
    }
}

const btnReporte2 = document.getElementById("anterior-bloque")
btnReporte2.addEventListener("click", reporte_anterior)

function reporte_anterior(){
    if(bloque_actual.anterior != null){
        bloque_actual = bloque_actual.anterior
        let cadena = "Index: " + bloque_actual.valor['index']
        cadena += "\nTimeStamp: " + bloque_actual.valor['timestamp']
        cadena += "\nEmisor: " + bloque_actual.valor['transmitter']
        cadena += "\nReceptor: " + bloque_actual.valor['receiver']
        cadena += "\nMensaje: " + bloque_actual.valor['message']
        cadena += "\nPreviousHash: " + bloque_actual.valor['previoushash']
        cadena += "\nHash: " + bloque_actual.valor['hash']
        document.getElementById("reporte-bloques").value = cadena
    }
}

var btn_graficar = document.getElementById("Rep_menss")

btn_graficar.addEventListener("show.bs.modal", function (event){
    var block = getBlock()
    let url = 'https://quickchart.io/graphviz?graph=';
    var graph = block.graphvizBlock()
    console.log(url+graph)
    var imagen = document.getElementById("harrycomes")
    imagen.src = (url+graph)
})
/**
 * Una funcion que lea todo los bloques y simplemente muestre el mensaje
 * al usuario final
 * bloque_actual.valor['receiver'] == 201700918
 * mensaje de  bloque_actual.valor['trasmitter']
 *  ( mensaje_descriptado(carnet, emisor) )
 * 201700918
 * 
 */
