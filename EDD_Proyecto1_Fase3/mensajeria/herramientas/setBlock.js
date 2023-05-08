import CircularJSON from "../../../EDD_Proyecto1_Fase2/src/circular-json.js"

export function setBlock(block){
    localStorage.setItem("structBlock", JSON.stringify(CircularJSON.stringify(block)))
    
}