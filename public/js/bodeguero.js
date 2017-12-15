var config = {
    apiKey: "AIzaSyD1UUijWvL3lVdaCNUBRVwS_tntGpBPCxM",
    authDomain: "barberoexpress-8c13c.firebaseapp.com",
    databaseURL: "https://barberoexpress-8c13c.firebaseio.com",
    projectId: "barberoexpress-8c13c",
    storageBucket: "barberoexpress-8c13c.appspot.com",
    messagingSenderId: "634083713883"
};
firebase.initializeApp(config);

//CONTROL DE CALLBACK DE FIREBASE
var end = false;
var time = 0;

//BASE DE DATOS BARBERO
var barberoDB = firebase.database().ref();
var firebaseAuth = firebase.auth();

//TABLA PEDIDOS
var tablaPedidos = barberoDB.child("PEDIDOS");

/* ATRIBUTOS DE LOS PEDIDOS*/
// var tablaPedidos = [];     // ** tabla de pedidos
    // Esta información es dentro de cada pedido


//ATRIBUTOS TABLA INFO
// var comoLlegar = [""];
// var direccionEntrega = [];
// var id = [];
// var nombreUsuario = [];
// var telefonoContacto = [];
// var totalPesos = [];
var tablaInfo = [];
var tablaProductos = [];


//GUARDAMOS TODOS LOS PEDIDOS EN UN ARREGLO
tablaPedidos.orderByChild("id").on("child_added", function(snapshot){
  // tablaPedidos.push(snapshot.key);
  tablaInfo.push(snapshot.val().info);
  //tablaProductos.push(snapshot.val().productos);
});
var tamañoArregloInfo;



// CICLO QUE ESPERA PARA CARGAR
esperarCarga();







                          // FUNCIONES
var numeroPedidos = '';
var pedidosActuales = '';


// FUNCIÓN ENCARGADA DE MOSTRAR LA CANTIDAD DE PEDIDOS
function mostrarCantidadPedidos(contador){
  numeroPedidos += '<a href="#"><i class="fa fa-shopping-cart"></i> Pedidos('+ contador + ')</a>';
  document.getElementById("cantidadPedidos").innerHTML = numeroPedidos;
}

//FUNCIÓN ENCARGADA DE LEER TODOS LOS PEDIDOS ACTUALES
function pedidos(){
  //TOMAMOS CADA PEDIDO INDEPENDIENTE
  var contador = 0;
  pedidosActuales += '<tr>'
                    + '<th class="hidden-xs">'
                      + 'Foto'
                    + '</th>'
                    + '<th>'
                      + 'Nombre'
                    + '</th>'
                    + '<th>'
                      + 'Celular'
                    + '</th>'
                    + '<th>'
                      + 'Dirección entrega'
                    + '</th>'
                    + '<th>'
                      + 'Como llegar'
                    + '</th>'
                    + '<th>'
                      + 'Precio Total'
                    + '</th>'
                    + '<th>'
                      + 'ID'
                    + '</th>'
                    + '<th>'
                      + 'Estado'
                    + '</th>'
                  + '</tr>';
  //for (var contador in tablaInfo){
  while(contador < 7){
      pedidosActuales += '<tr id="filaCambiar' + tablaInfo[contador].id  + '" onclick="renderPedidos(' + tablaInfo[contador].id + ',' + contador + ')">'
                      + '<!-- FOTO -->'
                      + '<td class="hidden-xs">'
                      + '<a href=""><img src="../images/shop/previews/shop-prev-5.jpg" alt=""/></a>'
                      + '</td>'
                      + '<!-- NOMBRE -->'
                      + '<td>'
                      + tablaInfo[contador].nombreUsuario + ' '//'Santiago Cortés Ríos'
                      + '</td>'
                      + '<!-- CELULAR -->'
                      + '<td>'
                      + tablaInfo[contador].telefonoContacto + ' '//'3005933685'
                      + '</td>'
                      + '<!-- DIRECCION -->'
                      + '<td>'
                      + tablaInfo[contador].direccionEntrega + ' '//'Carrera 45 1'
                      + '</td>'
                      + '<!-- <td>'
                      + '<form class="form">'
                      + '<input type="number" class="input-sm" style="width: 60px;" min="1" max="100" value="1" />'
                      + '</form>'
                      + '</td> -->'
                      + '<!-- COMO LLEGAR -->'
                      + '<td>'
                      + tablaInfo[contador].comoLlegar + ' '//'Detrás del éxito'
                      + '</td>'
                      + '<!-- PRECIO TOTAL -->'
                      + '<td>'
                      + tablaInfo[contador].totalPesos + ' '//'$ 20.000'
                      + '</td>'
                      + '<!-- IDENTIFICADOR -->'
                      + '<td>'
                      + '<a href="#" title="">'+ tablaInfo[contador].id + '</a>'
                      + '</td>'
                      + '<!-- ESTADO -->'
                      + '<td>'
                      + '<a href=""><i class="fa fa-times"></i> <span class="hidden-xs">ENVIAR</span></a>'
                      + '</td>'
                      + '</tr>'
                      + '<tr id="informacionProductos">'
                      + '</tr>';
                      console.log(contador);
                      console.log(tablaInfo[contador]);
                      contador++;
  }
  tamañoArregloInfo = tablaInfo.length;
  // MOSTRAR LA CANTIDAD DE PEDIDOS EN COLA
  mostrarCantidadPedidos(contador);
  console.log("El tamño de la tabla de pedidos es de " + tamañoArregloInfo);
  document.getElementById("tablaBodeguero").innerHTML = pedidosActuales;
}

function renderPedidos(idPedido,posicion){
  console.log("Diste un click bb");
  var pedidosAMostrar = '';

  pedidosAMostrar += '<tr id="filaCambiar' + idPedido + '" onclick="renderPedidos">'
                  + '<!-- FOTO -->'
                  + '<td class="hidden-xs">'
                  + '<a href=""><img src="../images/shop/previews/shop-prev-5.jpg" alt=""/></a>'
                  + '</td>'
                  + '<!-- NOMBRE -->'
                  + '<td>'
                  + tablaInfo[posicion].nombreUsuario + ' '//'Santiago Cortés Ríos'
                  + '</td>'
                  + '<!-- CELULAR -->'
                  + '<td>'
                  + tablaInfo[posicion].telefonoContacto + ' '//'3005933685'
                  + '</td>'
                  + '<!-- DIRECCION -->'
                  + '<td>'
                  + tablaInfo[posicion].direccionEntrega + ' '//'Carrera 45 1'
                  + '</td>'
                  + '<!-- <td>'
                  + '<form class="form">'
                  + '<input type="number" class="input-sm" style="width: 60px;" min="1" max="100" value="1" />'
                  + '</form>'
                  + '</td> -->'
                  + '<!-- COMO LLEGAR -->'
                  + '<td>'
                  + tablaInfo[posicion].comoLlegar + ' '//'Detrás del éxito'
                  + '</td>'
                  + '<!-- PRECIO TOTAL -->'
                  + '<td>'
                  + tablaInfo[posicion].totalPesos + ' '//'$ 20.000'
                  + '</td>'
                  + '<!-- IDENTIFICADOR -->'
                  + '<td>'
                  + '<a href="#" title="">'+ tablaInfo[posicion].id + '</a>'
                  + '</td>'
                  + '<!-- ESTADO -->'
                  + '<td>'
                  + '<a href=""><i class="fa fa-times"></i> <span class="hidden-xs">ENVIAR</span></a>'
                  + '</td>'
                  + '</tr>';
                  document.getElementById("informacionProductos").innerHTML = pedidosAMostrar;

}

// FUNCIÓN QUÉ ESPERA 2 SEGUNDOS PARA CARGAR
function esperarCarga(){
  if (navigator.userAgent.indexOf("Chrome") != -1) {
    setTimeout(function() {
      while (end == false && time < 500000) {
        if (tablaPedidos[24] != null) {
          end = true;
        }
        time += 0.1;
        if (time >= 500000) {
          alert("Mala conexión a Internet, intenta cargar la pagina de nuevo");
          time = 500001;
        }

      }
      pedidos();
    }, 2000);
  } else {
    setTimeout(function() {
      while (end == false && time < 500000) {
        if (tablaPedidos[24] != null) {
          end = true;
        }
        time += 0.1;
        if (time >= 500000) {
          alert("Mala conexión a Internet, intenta cargar la pagina de nuevo");
          time = 500001;
        }

      }
      pedidos();
    }, 1000);

  }
}
