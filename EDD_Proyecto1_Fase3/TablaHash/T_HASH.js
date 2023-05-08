import ArbolNArio from "../../EDD_Proyecto1_Fase2/src/pagUsuario/ArbolCarpetas/arbolN.js";
import Permiso from "../PermisosHTML/objPermisos.js";

class nodoHash{
    constructor(carnet, usuario, password, archivos){
        this.carnet = carnet
        this.usuario = usuario
        this.password = password
        this.archivos = archivos
    }
}

export default class TablaHash{
    constructor(){
        this.tabla = new Array(7)
        this.capacidad = 7
        this.utilizacion = 0
    }

    insertar(carnet, usuario, password, archivos){
        let indice = this.calculoIndice(carnet)
        const nuevoNodo = new nodoHash(carnet, usuario, password, archivos)
        if(indice < this.capacidad){
            try{
                if(this.tabla[indice] == null){
                    this.tabla[indice] = nuevoNodo
                    this.utilizacion++
                    this.capacidad_tabla()
                }else{
                    let contador = 1
                    indice = this.RecalculoIndice(carnet,contador)
                    while(this.tabla[indice] != null){
                        contador++
                        indice = this.RecalculoIndice(carnet, contador)
                    }
                    this.tabla[indice] = nuevoNodo
                    this.utilizacion++
                    this.capacidad_tabla()
                }
            }catch(err){
                console.log("Hubo un error en insercion")
            }
        }
    }

    calculoIndice(carnet){ 
        let carnet_cadena = carnet.toString()
        let divisor = 0
        for(let i = 0; i < carnet_cadena.length; i++){
            divisor = divisor + carnet_cadena.charCodeAt(i)
        }
        let indice_final = divisor % this.capacidad
        return indice_final
    }

    capacidad_tabla(){
        let aux_utilizacion = this.capacidad*0.75
        if(this.utilizacion > aux_utilizacion){
            this.capacidad = this.nueva_capacidad()
            this.utilizacion = 0
            this.ReInsertar()
        } 
    }

    nueva_capacidad(){ //Sustituir por un algoritmo del siguiente numero primo
        let numero = this.capacidad + 1;
        while (!this.isPrime(numero)) {
          numero++;
        }
        return numero;
    }

    ReInsertar(){
        const auxiliar_tabla = this.tabla
        this.tabla = new Array(this.capacidad)
        auxiliar_tabla.forEach((alumno) => {
            this.insertar(alumno.carnet, alumno.usuario, alumno.password, alumno.archivos)
        })
    }

    RecalculoIndice(carnet, intento){
        let nuevo_indice = this.calculoIndice(carnet) + intento*intento
        let nuevo = this.nuevo_Indice(nuevo_indice)
        return nuevo
    }

    nuevo_Indice(numero){
        let nueva_posicion = 0
        if(numero < this.capacidad){
            nueva_posicion = numero
        }else{
            nueva_posicion = numero - this.capacidad
            nueva_posicion = this.nuevo_Indice(nueva_posicion)
        }
        return nueva_posicion
    }

    busquedaUsuario(carnet) {
        let index = this.calculoIndice(carnet);
        if (index < this.capacidad) {
          try {
            let contador = 1;
            let temp = this.tabla[index];
            while (temp != null) {
              if (temp.carnet == String(carnet)) {
                return temp;
              } else {
                index = this.RecalculoIndice(carnet, contador);
                temp = this.tabla[index];
                contador++;
              }
            }
            return null;
          } catch (error) {}
        }
      }

    login(carnet, password) {
        console.log(password)
        if (this.busquedaUsuario(carnet)) {
          let temp = this.busquedaUsuario(carnet);
          // console.log(`temp.carnet:${temp.carnet} temp.password: ${temp.password} a: ${password} `)
          if (temp.password == password) {
            return true;
          } else {
            return false;
          }
        }
        return false;
    }

    tablaEstudiantes(){
        let cadena = ""
        for(var i = 0; i < this.capacidad; i++){

            if(this.tabla[i] != null){
                var arreglo = new Array(3)
                arreglo[0] = this.tabla[i].carnet
                arreglo[1] = this.tabla[i].usuario
                arreglo[2] = this.tabla[i].password

                cadena += "<tr>\n"
                for(var j = 0; j < 3; j++){
                    cadena += "\t<td>"+arreglo[j]+"</td>\n"
                }
                cadena += "</tr>\n"
            }
        }
        return cadena
    }


    genera_tabla() {
        // Obtener la referencia del elemento body
        var body = document.getElementsByTagName("body")[0];
      
        // Crea un elemento <table> y un elemento <tbody>
        var divtable = document.createElement("div");
        var tabla   = document.createElement("table");
        var tblBody = document.createElement("tbody");
        var salto_html = document.createElement("br")
        divtable.className = "container"
        tabla.className = "table"
        //carnet
        var encabezado = document.createElement("tr")
        var celda_encabezado = document.createElement("td");
        var encabezado_contenido = document.createTextNode("Carnet")
        celda_encabezado.appendChild(encabezado_contenido);
        encabezado.appendChild(celda_encabezado)
        tblBody.appendChild(encabezado)
        //Nombre
        celda_encabezado = document.createElement("td");
        encabezado_contenido = document.createTextNode("Nombre")
        celda_encabezado.appendChild(encabezado_contenido);
        encabezado.appendChild(celda_encabezado)
        tblBody.appendChild(encabezado)
        //Password
        celda_encabezado = document.createElement("td");
        encabezado_contenido = document.createTextNode("Password")
        celda_encabezado.appendChild(encabezado_contenido);
        encabezado.appendChild(celda_encabezado)
        tblBody.appendChild(encabezado)

        for(var i = 0; i < this.capacidad; i++){
            if(this.tabla[i] != null){
                var hilera = document.createElement("tr");
                var arreglo = new Array(3)
                arreglo[0] = this.tabla[i].carnet
                arreglo[1] = this.tabla[i].usuario
                arreglo[2] = this.tabla[i].password
                for(var j = 0; j < 3; j++){
                    var celda = document.createElement("td");
                    var textoCelda = document.createTextNode(arreglo[j]);
                    celda.appendChild(textoCelda);
                    hilera.appendChild(celda);
                }
                tblBody.appendChild(hilera);
            }
        }


        divtable.appendChild(tabla)
        // posiciona el <tbody> debajo del elemento <table>
        tabla.appendChild(tblBody);
        // appends <table> into <body>
        body.appendChild(salto_html);
        body.appendChild(divtable);
        // modifica el atributo "border" de la tabla y lo fija a "2";
        tabla.setAttribute("border", "2");
    }

    isPrime(numero) {
        if (numero <= 1) {return false}
        if (numero === 2) {return true}
        if (numero % 2 === 0) {return false}
        for (let i = 3; i <= Math.sqrt(numero); i += 2) {
          if (numero % i === 0) {return false};
        }
        return true;
    }
}

/*




const tablaHash = new TablaHash()

const inputElement = document.getElementById("input");
inputElement.addEventListener("change", onChange, false);
function onChange(event) {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
}

function onReaderLoad(event){
    var obj = JSON.parse(event.target.result);
    for(var i = 0; i < obj.alumnos.length; i++){
        tablaHash.insertar(obj.alumnos[i].carnet, obj.alumnos[i].nombre, obj.alumnos[i].password)
    }
    console.log(tablaHash.tabla)
    tablaHash.genera_tabla()
}

function busqueda(){
    let carnet = document.getElementById("valor").value;
    tablaHash.busquedaUsuario(carnet)
}
*/