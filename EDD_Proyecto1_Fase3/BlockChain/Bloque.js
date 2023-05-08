import {desencriptacion, encriptacion} from './encriptacionAES.js'

class nodoBloque{
    constructor(index, fecha, emisor, receptor, mensaje, previousHash, hash){
        this.valor = {
            'index' : index,
            'timestamp': fecha,
            'transmitter': emisor,
            'receiver': receptor,
            'message': mensaje,
            'previoushash': previousHash,
            'hash': hash
        }
        this.siguiente = null
        this.anterior = null
    }
}

export default class Bloque{
    constructor(){
        this.inicio = null
        this.bloques_creados = 0
    }
    
    async insertarBloque(fecha, emisor, receptor, mensaje){
        if(this.inicio === null){
            let cadena = this.bloques_creados + fecha + emisor + receptor + mensaje
            let hash = await this.sha256(cadena)
            let mensajeEncriptado = await encriptacion(mensaje)
            const nuevoBloque = new nodoBloque(this.bloques_creados, fecha,emisor, receptor, mensajeEncriptado, '0000', hash)
            this.inicio = nuevoBloque
            this.bloques_creados++
        }else{
            let cadena = this.bloques_creados + fecha + emisor + receptor + mensaje
            let hash = await this.sha256(cadena)
            let mensajeEncriptado = await encriptacion(mensaje)
            let aux = this.inicio
            while(aux.siguiente){
                aux = aux.siguiente
            }
            const nuevoBloque = new nodoBloque(this.bloques_creados, fecha,emisor, receptor, mensajeEncriptado, aux.valor['hash'], hash)
            nuevoBloque.anterior = aux
            aux.siguiente = nuevoBloque
            this.bloques_creados++
        }
    }

    async sha256(mensaje){
        let cadenaFinal
        const enconder =  new TextEncoder();
        const mensajeCodificado = enconder.encode(mensaje)
        await crypto.subtle.digest("SHA-256", mensajeCodificado)
        .then(result => { // 100 -> 6a 
            const hashArray =  Array.from(new Uint8Array(result))
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
            cadenaFinal = hashHex
        })
        .catch(error => console.log(error))
        return cadenaFinal
    }
    
    async desencrip_mensaje(msm){
        const cadena = await desencriptacion(msm)
        console.log(cadena)
        return cadena
    }

    async getChatsContenedor(emisor, receptor){
        var current = this.inicio
        var cadena = ""

        while(current != null){
            let mensaje_ = await desencriptacion(current.valor.message)

            if(current.valor.transmitter == receptor && current.valor.receiver == emisor){
                cadena += `<div class="message-box friend-message">\n`
                cadena += `<p>${mensaje_}\n<br>\n`
                cadena += `<span>${current.valor.timestamp.substring(12, 17)}</span>\n</p>\n</div>`

            }else if(current.valor.transmitter == emisor && current.valor.receiver == receptor){
                cadena += `<div class="message-box my-message">`
                // let mensaje_ = desencriptacion(current.valor.message)
                cadena += `<p>${mensaje_}`
                cadena += `<br><span>${current.valor.timestamp.substring(12, 17)}</span>`
                cadena += `</p>\n</div>`
            }
            current = current.siguiente
        }
        console.log(cadena)
        return cadena
    }

    graphvizBlock(){
        var current = this.inicio
        var cadena = "digraph reporte{\n"
        cadena += "\tnode[shape=rectangle]\n"

        for(var i = 0; i < this.bloques_creados; i++){
            if(i == 0){
                cadena += `\tnode${i}[label=\"timestamp = ${current.valor['timestamp']}\\n emisor = ${current.valor['transmitter']}\\n receptor = ${current.valor['receiver']}\\n previoushash = ${current.valor['previoushash']}\"];\n`
                current = current.siguiente
                continue
            }
            cadena += `\tnode${i}[label=\"timestamp = ${current.valor['timestamp']}\\n emisor = ${current.valor['transmitter']}\\n receptor = ${current.valor['receiver']}\\n previous = ${current.valor['previoushash']}\"];\n`
            current = current.siguiente
        }

        cadena += "\n"

        for(var i = 0; i < this.bloques_creados-1; i++){
            cadena += `\tnode${i}->node${i+1};\n`
        }

        cadena += "}"
        return cadena
    }
}
