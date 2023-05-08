export function FechaHora(){
    let cadena = ''
    const fechaActual = new Date();
    cadena += fechaActual.getDate() < 10 ? ("0"+fechaActual.getDate()+"-") : (fechaActual.getDate()+"-")
    cadena += fechaActual.getMonth() < 10 ? ("0"+(fechaActual.getMonth()+1)+"-") : (fechaActual.getMonth()+"-")
    cadena += fechaActual.getFullYear() + "::"
    cadena += fechaActual.getHours() < 10 ? ("0"+fechaActual.getHours()+":") : (fechaActual.getHours()+":")
    cadena += fechaActual.getMinutes() < 10 ? ("0"+fechaActual.getMinutes()+":") : (fechaActual.getMinutes()+":")
    cadena += fechaActual.getSeconds() < 10 ? ("0"+fechaActual.getSeconds()) : (fechaActual.getSeconds())
    return cadena
}