import Bloque from "../../BlockChain/Bloque.js"
import { setBlock } from "./setBlock.js"
import CircularJSON from "../../../EDD_Proyecto1_Fase2/src/circular-json.js"

export function getBlock(){
    var block = new Bloque()
    let obj = CircularJSON.parse(JSON.parse(localStorage.getItem("structBlock")))
    

    if(obj != null){
        block.inicio = obj.inicio
        block.bloques_creados = obj.bloques_creados
        return block
    }
    setBlock(block)
}