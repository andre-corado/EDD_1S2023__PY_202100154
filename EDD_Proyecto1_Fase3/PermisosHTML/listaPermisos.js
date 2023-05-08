import Permiso from "./objPermisos.js";

export default class ListaSimplePermisosHTML{
    constructor() {
      this.raiz = null;
      this.size = 0;
    }
  
    // Agrega un nodo al final de la lista
    add(_propietario, _destino, _ubicacion, _archivo, _permisos) {
      const node = new Permiso(_propietario, _destino, _ubicacion, _archivo, _permisos);
  
      if (!this.raiz) {
        this.raiz = node;

      }else {
        let current = this.raiz;
        while (current.sig) {
          current = current.sig;
        }
        current.sig = node;
      }
  
      this.size++;
    }
  
    // Devuelve el tamaño de la lista
    getSize() {
      return this.size;
    }
  
    // Devuelve un array con los datos de la lista
    toArray() {
      const result = [];
      let current = this.raiz;
  
      while (current) {
        result.push(
            {   propietario: current.propietario,
                destino: current.destino,
                ubicacion: current.ubicacion,
                archivo: current.archivo,
                permisos: current.permisos
            }
            );
        current = current.sig;
      }
      return result;
    }

    returnHTMLPermisos(){
      var array = this.toArray()
      var cadena = ""
      
      for(var j = 0; j < array.length; j++){
        cadena += "<tr>\n"
        cadena += "\t<td>"+array[j].propietario+"</td>\n"
        cadena += "\t<td>"+array[j].destino+"</td>\n"
        cadena += "\t<td>"+array[j].ubicacion+"</td>\n"
        cadena += "\t<td>"+array[j].archivo+"</td>\n"
        cadena += "\t<td>"+array[j].permisos+"</td>\n"
        cadena += "</tr>\n"
      }

      return cadena
    }
}