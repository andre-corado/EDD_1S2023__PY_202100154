import TablaHash from "../../TablaHash/T_HASH.js"

export function getHash(){
    let hash = new TablaHash()
    let objHash = JSON.parse(localStorage.getItem("structHash"))
    hash.tabla = objHash.tabla
    hash.capacidad = objHash.capacidad
    hash.utilizacion = objHash.utilizacion
    return hash
}