export default class Permiso{
    constructor(_propietario, _destino, _ubicacion, _archivo, _permisos){
        this.propietario = _propietario
        this.destino = _destino
        this.ubicacion = _ubicacion
        this.archivo = _archivo
        this.permisos = _permisos
        this.sig = null
    }
}