import { encryptSHA256 } from "../encriptacion/encriptarPass.js"
import CircularJSON from "../../EDD_Proyecto1_Fase2/src/circular-json.js";

export async function insertarHash(avl, hash){
    const lista = avl.recorridoArbol(avl.raiz)

    for (const alum of lista){
        const hashPass = await encryptSHA256(alum.password);
        hash.insertar(alum.carnet, alum.nombre, hashPass, JSON.stringify(CircularJSON.stringify(alum.archivos)))
    }

    const table = JSON.stringify(hash)
    localStorage.setItem("structHash", table)

    const tablaBody = document.getElementById("tableBody_users");
    tablaBody.innerHTML = hash.tablaEstudiantes();

}