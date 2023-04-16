import Matriz from "./matriz.js";
import CircularJSON from "../../circular-json.js";

class nodoArbol{
    constructor(valor, id){
        this.siguiente = null;
        this.valor = valor;
        this.filesCarpeta = new Matriz();
        this.primero = null;
        this.id = id;
        this.copia = 1
    }
}

export default class ArbolNArio{
    constructor(){
        this.raiz = new nodoArbol("/", 0)
        this.nodo_creados = 1;
    }

    BuscarCarpeta(carpeta_nueva, lista_carpeta){
        //Si la nueva carpeta se creara en la raiz, se buscara si existe o no
        if(lista_carpeta[1] === "" && this.raiz.primero !== null){
            let aux = this.raiz.primero
            while(aux){
                if(aux.valor === carpeta_nueva){
                    return 1
                }
                aux = aux.siguiente
            }
            return 2
        }
        //Si la nueva carpeta se creara en la raiz pero no existe ninguna carpeta
        else if (lista_carpeta[1] === "" && this.raiz.primero === null){
            return 5
        }
        //Si la nueva carpeta se creara en algun directorio pero la raiz no posee ninguna carpeta
        else if(lista_carpeta[1] !== "" && this.raiz.primero === null){
            return 3
        }
        //Buscamos el directorio padre y revisar si en sus hijos existe la carpeta
        else if(lista_carpeta[1] !== "" && this.raiz.primero !== null){
            let aux = this.raiz.primero
            let nivel = lista_carpeta.length
            let posicion = 1; 
            for(var i = 1; i < nivel; i++){
                if(aux !== null){
                    while(aux){
                        if(posicion < lista_carpeta.length && lista_carpeta[posicion] === aux.valor){
                            posicion++
                            if(aux.primero !== null && posicion < lista_carpeta.length){
                                aux = aux.primero
                            }
                            break;
                        }else{
                            aux = aux.siguiente
                        }
                    }
                }else{
                    break;
                }
            }
            if(aux !== null){
                aux = aux.primero
                while(aux){
                    if(aux.valor === carpeta_nueva){
                        return 1
                    }
                    aux = aux.siguiente
                }
                return 2
            }else{
                return 4
            }

        }
    }

    tablaCarpetas(raiz, nodo, nodo_padre, carpeta){
        //RAIZ.PRIMERO, NODO = 1, NODO_PADRE = 0, CARPETA
        let cadena = ""
        let aux = raiz
        let nodo_padre_aumento = nodo_padre
        if(aux !== null){
            while(aux){

                if(carpeta == aux.valor){


                    var current = aux.primero
                    while(current != null){

                        cadena += "<tr>\n"
                        cadena += "\t<td > <img src = \"../img/carpeta.png\" width=\"30\" alt = \"iconoCarpeta\"> </td>\n"
                        cadena += "\t<td >"+current.valor+"</td>\n"
                        cadena += "</tr>\n\n"
                        current = current.siguiente
                    }

                    
                }
                aux = aux.siguiente
            }
            aux = raiz
            while(aux){
                nodo_padre_aumento++
                cadena += this.tablaCarpetas(aux.primero, this.nodo_creados, nodo_padre_aumento, carpeta)
                aux = aux.siguiente
            }
        }
        return cadena
    }

    eliminarCarpeta(directoryList) {
        //let directoryList = ruta.split("/");

        // Verificar si la carpeta está en la raiz
        if(directoryList.length === 2) {
            console.log(this.raiz)
            console.log(this.raiz.primero.valor +" == "+directoryList[1])
            if (this.raiz.primero.valor === directoryList[1]) {
                this.raiz.primero = this.raiz.primero.siguiente;
            } else {
                let aux = this.raiz.primero;
                while (aux.siguiente !== null) {
                    console.log(aux.siguiente.valor +" == "+directoryList[1])
                    if(aux.siguiente.valor === directoryList[1]) {
                        aux.siguiente = aux.siguiente.siguiente;
                        break;
                    }
                    aux = aux.siguiente;
                }
            }
            return;
        }

        // En cualquier otro caso
        let nodeDirectory = this.BuscarCarpetaV2(directoryList);/*   [ , DOCUMENTOS, DOC1, ARCHIVO]    */
        let parentDirectory = this.BuscarCarpetaV2(directoryList.slice(0, directoryList.length - 1)); /*  [DOCUMENTOS, DOC1, ARCHIVO]  */

        if (nodeDirectory === this.raiz) {
            this.raiz = null;
        }
        else if (nodeDirectory === null) {
            alert("La ruta no es válida");
        }
        else {
            // Si el nodo que queremos eliminar no es la raíz, lo eliminamos de la lista
            // de hijos del nodo padre y actualizamos las referencias a los hermanos.
            let currentNode = parentDirectory.primero;
            let prevNode = null;
            while (currentNode !== null) {
                if (currentNode === nodeDirectory) {
                    if (prevNode === null) {
                        parentDirectory.primero = currentNode.siguiente;
                    } else {
                        prevNode.siguiente = currentNode.siguiente;
                    }
                    currentNode.siguiente = null;
                    break;
                }
                prevNode = currentNode;
                currentNode = currentNode.siguiente;
            }
        }
    }





    busquedaDeCarpeta(carpeta, lista_carpeta){
        let existe_carpeta = this.BuscarCarpeta(carpeta, lista_carpeta)

        switch(existe_carpeta){
            case 1:
                console.log("la carpeta ya existe")
                return true
            case 2: 
                console.log("la carpeta no existe")
                return false
            case 3:
                console.log("el directorio no es correcto o no es valido")
                return false
            case 4:
                console.log("directorio no valido")
                return false
            case 5:
                console.log("no existe ninguna carpeta en la raiz")
                return false
        }
    }

    //Funcion solo para ordenar la lista de hijos cuando el padre posee varios hijos
    insertarOrdenado(raiz, nuevoNodo){
        let piv = raiz.primero
        if(nuevoNodo.valor < raiz.primero.valor){
            nuevoNodo.siguiente = raiz.primero
            raiz.primero = nuevoNodo
            return raiz
        }else{
            while(piv.siguiente){
                if( nuevoNodo.valor > piv.valor && nuevoNodo.valor < piv.siguiente.valor){
                    nuevoNodo.siguiente = piv.siguiente
                    piv.siguiente = nuevoNodo
                    return raiz
                }else if(nuevoNodo.valor < piv.valor){
                    nuevoNodo.siguiente = piv
                    piv =  nuevoNodo
                    return raiz
                }else{
                    piv = piv.siguiente
                }
            }
            piv.siguiente = nuevoNodo
            return raiz
        }
    }
    // /usac/prueba -> prueba1 /usac/prueba(prueba1)
    insertarHijos(carpeta_nueva, lista_carpeta){
        /**
         * creamos el nuevo nodo y aumentamos la cantidad de nodos creados
         */
        const nuevoNodo = new nodoArbol(carpeta_nueva, this.nodo_creados)
        this.nodo_creados++
        //Corroboramos si la insercion es en la raiz y si la raiz no tiene ninguna carpeta
        if(lista_carpeta[1] === "" && this.raiz.primero === null){
            this.raiz.primero = nuevoNodo
        }
        //Corroboramos si la insercion es en la raiz y pero la raiz ya tiene carpetas
        else if(lista_carpeta[1] === "" && this.raiz.primero !== null){
            this.raiz = this.insertarOrdenado(this.raiz, nuevoNodo)
        }
        //Corroboramos si la insercion es en algun directorio que no es la raiz
        else if(lista_carpeta[1] !== "" && this.raiz.primero !== null){
            let aux = this.raiz.primero
            let nivel = lista_carpeta.length
            let posicion = 1; 
            //Recorremos hasta llegar a la profundidad maxima donde se quiere insertar la nueva carpeta
            for(var i = 1; i < nivel; i++){
                if(aux !== null){
                    while(aux){
                        //Comparamos si las posiciones de la lista de carpetas es igual a la del nodo actual sino seguimos buscando
                        if(posicion < lista_carpeta.length && lista_carpeta[posicion] === aux.valor){ 
                            posicion++
                            //Esta comparacion es para asegurarnos que nos quedaremos en el nodo padre
                            if(aux.primero !== null && posicion < lista_carpeta.length){
                                aux = aux.primero
                            }
                            break;
                        }else{
                            aux = aux.siguiente
                        }
                    }
                }else{
                    break;
                }
            }
            //Si la carpeta padre ya tiene carpetas se agrega en el primero sino se manda a insertar en el orden correcto
            if(aux.primero === null){
                aux.primero = nuevoNodo
            }else{
                aux = this.insertarOrdenado(aux, nuevoNodo)
            }
        }
    }
    /**
     * 1 - Carpeta ya existe
     * 2 - la carpeta no existe
     * 3 - El directorio no es correcto o no es valido
     * 4 - Directorio no valido
     * 5 - No existe ninguna carpeta en la raiz
     * 
     */
    insertarValor(ruta, carpeta_nueva, numero){
        var respuesta = ""
        let lista_carpeta = ruta.split('/')
        console.log("insertar carpetas: "+carpeta_nueva)
        console.log(lista_carpeta)
        let existe_carpeta = this.BuscarCarpeta(carpeta_nueva, lista_carpeta)
        switch(existe_carpeta){
            case 1:
                let CarpetaCopia = "("+(numero++)+")"+carpeta_nueva
                this.insertarHijos(CarpetaCopia, lista_carpeta)
                break;
            case 2:
                this.insertarHijos(carpeta_nueva, lista_carpeta)
                break;
            case 3:
                respuesta = "La ruta actual no existe."
                break;
            case 4:
                respuesta = "La ruta actual no es valida."
                break;
            case 5:
                this.insertarHijos(carpeta_nueva, lista_carpeta)
                break;
        }
        return respuesta
    }

    grafica_arbol(){
        var cadena = "";
        if(!(this.raiz === null)){
            cadena = "digraph arbol{ ";
            cadena = cadena + this.retornarValoresArbol(this.raiz);
            cadena = cadena + "}";
        }else{
            cadena = "digraph G { arbol }";
        }
        return cadena;
    }

    /** le mando el parametro primero y solo recorre los siguientes*/
    retornarValoresArbol(raiz){
        var cadena = "node[shape=record] ";
        let nodo = 1;
        let nodo_padre = 0;
        cadena += "nodo" + nodo_padre + "[label=\"" + this.raiz.valor  + "\"] "
        cadena += this.valoresSiguietes(this.raiz.primero, nodo, nodo_padre)
        cadena += this.conexionRamas(this.raiz.primero, 0)
        return cadena;
    }


    valoresSiguietes(raiz, nodo, nodo_padre){
        let cadena = ""
        let aux = raiz
        let nodo_padre_aumento = nodo_padre
        if(aux !== null){
            while(aux){
                cadena += "nodo" + aux.id + "[label=\"" + aux.valor  + "\"] "
                aux = aux.siguiente
            }
            aux = raiz
            while(aux){
                nodo_padre_aumento++
                cadena += this.valoresSiguietes(aux.primero, this.nodo_creados, nodo_padre_aumento)
                aux = aux.siguiente
            }
        }
        return cadena
    }

    returnNodoCarpeta(raiz, nodo, nodo_padre, carpeta){
        //RAIZ.PRIMERO, NODO = 1, NODO_PADRE = 0, CARPETA
        let cadena = ""
        let aux = raiz
        let nodo_padre_aumento = nodo_padre
        if(aux !== null){
            while(aux){

                if(aux.valor == carpeta){
                    var matriz = new Matriz()
                    matriz.principal = aux.filesCarpeta.principal
                    matriz.coordenadaX = aux.filesCarpeta.coordenadaX
                    matriz.coordenadaY = aux.filesCarpeta.coordenadaY

                    cadena += JSON.stringify(CircularJSON.stringify(matriz))
                }                
                aux = aux.siguiente
            }
            aux = raiz
            while(aux){
                nodo_padre_aumento++
                cadena += this.returnNodoCarpeta(aux.primero, this.nodo_creados, nodo_padre_aumento, carpeta)
                aux = aux.siguiente
            }
        }
        return cadena
    }

    permisosDeCarpeta(raiz, nodo, nodo_padre, carpeta, matriz){
        //RAIZ.PRIMERO, NODO = 1, NODO_PADRE = 0, CARPETA
        let aux = raiz
        let nodo_padre_aumento = nodo_padre
        if(aux !== null){
            while(aux){

                if(aux.valor == carpeta){
                    var objMatriz = CircularJSON.parse(JSON.parse(matriz))
                    aux.filesCarpeta = objMatriz
                }                
                aux = aux.siguiente
            }

            aux = raiz
            
            while(aux){
                nodo_padre_aumento++
               this.permisosDeCarpeta(aux.primero, this.nodo_creados, nodo_padre_aumento, carpeta, matriz)
                aux = aux.siguiente
            }
        }
    }



    MatrizEstudiante(carpeta, texto, numero){
        var nodo = 1
        var nodo_padre = 0
        return this.addMatrizEstudiante(this.raiz, nodo, nodo_padre, carpeta, texto, numero)
    }




    addMatrizEstudiante(raiz, nodo, nodo_padre, carpeta, texto, numero){
        let cadena = ""
        let aux = raiz
        let nodo_padre_aumento = nodo_padre

        if(aux !== null){
            while(aux){
                console.log(aux.valor)
                
                if(aux.valor == carpeta){
                    var matriz = new Matriz()

                    matriz.principal =  aux.filesCarpeta.principal
                    matriz.coordenadaY =  aux.filesCarpeta.coordenadaY
                    matriz.coordenadaX =  aux.filesCarpeta.coordenadaX
                    
                    
                    matriz.insertarArchivo(texto, numero);
                    console.log("GRAPHIZ DE LA MATRIZ:\n\n"+ matriz.reporte())


                    aux.filesCarpeta.principal = matriz.principal
                    aux.filesCarpeta.coordenadaY = matriz.coordenadaY
                    aux.filesCarpeta.coordenadaX = matriz.coordenadaX

                    cadena += "Se agreago el archivo correctamente!"
                }
                aux = aux.siguiente

            }
            aux = raiz
            while(aux){
                nodo_padre_aumento++
                cadena += this.addMatrizEstudiante(aux.primero, this.nodo_creados, nodo_padre_aumento, carpeta, texto, numero)
                aux = aux.siguiente
            }
        }
        return cadena
    }










    conexionRamas(raiz, padre){
        let cadena = ""
        let aux = raiz
        if(aux !== null){
            while(aux){
                cadena += "nodo" + padre + " -> nodo" + aux.id + " "
                aux = aux.siguiente
            }
            aux = raiz
            while(aux){
                cadena += this.conexionRamas(aux.primero, aux.id)
                aux = aux.siguiente
            }
        }
        return cadena
    }

    /** Modificacion 30/03/2023 */
    BuscarCarpetaV2(lista_carpeta){
        //Directorio Actual seria la Raiz
        if(lista_carpeta[1] === "" && this.raiz.primero !== null){
            return this.raiz
        }
        //Directorio Actual seria Raiz pero no contiene elementos
        else if (lista_carpeta[1] === "" && this.raiz.primero === null){
            return null
        }
        //Actual no es raiz pero tampoco hay elementos en raiz
        else if(lista_carpeta[1] !== "" && this.raiz.primero === null){
            return null
        }
        //Buscamos el directorio padre y revisar si en sus hijos existe la carpeta
        else if(lista_carpeta[1] !== "" && this.raiz.primero !== null){
            let aux = this.raiz.primero
            let nivel = lista_carpeta.length
            let posicion = 1; 
            
            for(var i = 1; i < nivel; i++){
                if(aux !== null){
                    while(aux){
                        if(posicion < lista_carpeta.length && lista_carpeta[posicion] === aux.valor){
                            posicion++
                            if(aux.primero !== null && posicion < lista_carpeta.length){
                                aux = aux.primero
                            }
                            break;
                        }else{
                            aux = aux.siguiente
                        }
                    }
                }else{
                    break;
                }
            }
            if(aux !== null){
                return aux
            }else{
                return null
            }

        }
    }

    mostrarCarpetasActuales(ruta){
        let lista_carpeta = ruta.split('/')
        let existe_carpeta = this.BuscarCarpetaV2(lista_carpeta)
        try{
            if(existe_carpeta !== null){
                let aux = existe_carpeta.primero
                while(aux){
                    console.log(aux.valor)
                    aux = aux.siguiente
                }
            }
        }catch(error){
            console.log("Hubo un error")
        }
    }
}