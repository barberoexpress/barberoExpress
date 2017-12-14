//BASE DE DATOS BARBERO
var firebaseDB = firebase.database().ref();

//TABLA PEDIDOS
var tablaPedidos = firebaseDB.child("PEDIDOS");

// TOMAMOS KEY DE CADA PEDIDO EN UN ARREGLO
var arregloPedidos;

//GUARDAMOS TODOS LOS PEDIDOS EN UN ARREGLO
tablaPedidos.on("child_added", function(snapshot){
  arregloPedidos.push(snapshot.key);
});
var tamañoArregloPedidos = arregloPedidos.lenght();


// CICLO QUE ESPERA PARA CARGAR
esperarCarga();

// MOSTRAR LA CANTIDAD DE PEDIDOS EN COLA
mostrarCantidadPedidos();





                          // FUNCIONES
var numeroPedidos = '';
var pedidosActuales = '';


// FUNCIÓN ENCARGADA DE MOSTRAR LA CANTIDAD DE PEDIDOS
function mostrarCantidadPedidos(){
  numeroPedidos += '<a href="#"><i class="fa fa-shopping-cart"></i> Pedidos('+ tamañoArregloPedidos + ')</a>';
  document.getElementById("cantidadPedidos").innerHTML = numeroPedidos;
}

//FUNCIÓN ENCARGADA DE LEER TODOS LOS PEDIDOS ACTUALES
function pedidosActuales(){
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
                      + 'Precio Total'
                    + '</th>'
                    + '<th>'
                      + 'Dirección de entrega'
                    + '</th>'
                    + '<th>'
                      + 'Como llegar'
                    + '</th>'
                    + '<th>'
                      + 'Identificador'
                    + '</th>'
                    + '<th>'
                      + 'Estado'
                    + '</th>'
                  + '</tr>';
  while(contador < tamañoArregloPedidos){
      pedidosActuales += '<tr>'
                        + '<th class="hidden-xs">'
                          + '<a href=""><img src="../images/shop/previews/shop-prev-5.jpg" alt=""/></a>'
                        + '</th>'
                        + '<th>'
                          + 'Nombre'
                        + '</th>'
                        + '<th>'
                          + 'Celular'
                        + '</th>'
                        + '<th>'
                          + 'Precio Total'
                        + '</th>'
                        + '<th>'
                          + 'Dirección de entrega'
                        + '</th>'
                        + '<th>'
                          + 'Como llegar'
                        + '</th>'
                        + '<th>'
                          + 'Identificador'
                        + '</th>'
                        + '<th>'
                          + 'Estado'
                        + '</th>'
                      + '</tr>'
                      ;
  }
  document.getElementById("tablaBodeguero").innerHTML = pedidosActuales;
}


// FUNCIÓN QUÉ ESPERA 2 SEGUNDOS PARA CARGAR
function esperarCarga(){
  if (navigator.userAgent.indexOf("Chrome") != -1) {
    setTimeout(function() {
      while (end == false && time < 500000) {
        if (nombre[24] != null) {
          end = true;
        }
        time += 0.1;
        if (time >= 500000) {
          alert("Mala conexión a Internet, intenta cargar la pagina de nuevo");
          time = 500001;
        }

      }
      pedidosActuales();
    }, 2000);
  } else {
    setTimeout(function() {
      while (end == false && time < 500000) {
        if (nombre[24] != null) {
          end = true;
        }
        time += 0.1;
        if (time >= 500000) {
          alert("Mala conexión a Internet, intenta cargar la pagina de nuevo");
          time = 500001;
        }

      }
      pedidosActuales();
    }, 1000);

  }
}
