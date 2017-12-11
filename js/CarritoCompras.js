var config = {
    apiKey: "AIzaSyD1UUijWvL3lVdaCNUBRVwS_tntGpBPCxM",
    authDomain: "barberoexpress-8c13c.firebaseapp.com",
    databaseURL: "https://barberoexpress-8c13c.firebaseio.com",
    projectId: "barberoexpress-8c13c",
    storageBucket: "barberoexpress-8c13c.appspot.com",
    messagingSenderId: "634083713883"
};
firebase.initializeApp(config);

var firebaseRef = firebase.database().ref();
var firebaseAuth = firebase.auth();
var userkey = localStorage.getItem("USERKEY2");
var user = firebase.auth().currentUser;
var actualizar = true;
var refCarro;
//firebase.database().ref("USUARIOS/" + key);
//while(actualizar){ActualizarDatos();}
var table = '<tr>' + '<th>Foto</th>' + '<th>Producto</th>' + '<th>Cantidad</th>' + '<th>Precio</th>' + '<th> </th>';
var tabla_total;
var rows = 1;
var producto = 'themes/images/products/4.jpg';
var nombre = [" ", " "];
var marca = [" ", " "];
var precio = [" ", " "];
var foto_URL = [" ", " "];
var descuento = [" ", " "];
var cantidad = [" ", " "];
var total = 0;
var id_producto = [" ", " "];
var keyArreglo = [" ", " "];
var ciudad, direccion, nombre_pedido, apellido, telefono, informacion_adicional;

var botonCantidad = '<div class="input-append"><input class="span1" style="max-width:34px" placeholder="1" id="appendedInputButtons" size="16" type="text"><button class="btn" type="button"><i class="icon-minus"></i></button><button class="btn" type="button"><i class="icon-plus"></i></button><button class="btn btn-danger" type="button" onclick="EliminarArticulo()"><i class="icon-remove icon-white"></button></div>';

// -------------------- CODIGO PARA ACTUALIZAR EL CARRITO DE COMPRAS DEL USUARIO --------------------//
firebase.auth().onAuthStateChanged(function(user) {
if (user) {
	actualizar = false;

	refCarro = firebase.database().ref("USUARIOS/" + userkey + "/" + "carritoCompras");
	var refUsuario = firebase.database().ref("USUARIOS/" + userkey);
	//DATOS DE ENVIO
	

    refUsuario.once("value", function(snapshot){
    	ciudad = snapshot.val().direccion.ciudad;
    	direccion = snapshot.val().direccion.direccion;
    	nombre_pedido = snapshot.val().nombre;
    	apellido = snapshot.val().apellido;
    	telefono = snapshot.val().telefono.telefonoCelular;
      informacion_adicional = snapshot.val().direccion.informacionAdicional;
    });


	ActualizarCarrito();
	/*setTimeout(function(){
    //esto pone error
		document.getElementById("ciudad").innerHTML = '<strong>'+ ciudad +'</strong>';
		document.getElementById("direccion").innerHTML = '<strong>'+ direccion +'</strong>';
		document.getElementById("direccion2").innerHTML = '<strong>'+ direccion2 +'</strong>';
		document.getElementById("info_adicional").innerHTML = '<strong>'+ info_adicional +'</strong>';
		document.getElementById("telefono").innerHTML = '<strong>'+ telefono +'</strong>';
    }, 1000);*/
} else {
   window.alert("Inicia seccion primero");
   window.location.href="register.html";
}
});

function EliminarArticulo(id){
  id = parseInt(id);
	refCarro.orderByChild("id").equalTo(id).on("child_added", function(snapshot) {
		id = snapshot.key;
		refCarro.child(id).remove();
	});
  setTimeout(function(){
	 ActualizarCarrito();
  }, 1000);
}

function BuscarEnCarrito(id){
  console.log("entro");
  var Encontrado = false;
  console.log("id: " + id);
  refCarro.orderByChild("id").equalTo(id).on("child_added",function(snapshot){
    console.log("encontro");
    Encontrado = true;
    console.log("Encontrado = "+Encontrado);
    return Encontrado;
  });
  console.log("Encontrado = "+Encontrado);
  return Encontrado;
  /*
  setTimeout(function () {

    if(Encontrado==true){
      respuesta = true;
      return respuesta;
    }else{
      respuesta = false;
      return respuesta;
    }

    console.log("Encontrado = "+Encontrado);
    return Encontrado;
  }, 3000);
  */
}

function CambiarAPorIr(uno,dos) {
//lo de los intentos deberia de estar cada vez que se conecte a Firebase, con valores por defecto

var noMasIntentos = false;
var intentos = 4;
var respuesta;
  var valor = document.getElementById( "id_Producto" ).innerText;
  console.log(valor);

  var esta = BuscarEnCarrito(parseInt(valor));

  console.log(esta);

  if (esta == true) {
    noMasIntentos = true;
    switchDivS(dos,uno);
  }else {
    switchDivS(uno,dos);
  }

}

function switchDivS(id1, id2) {
//este solo mustra el primero y oculta el segundo
//facta organizar la posicion, quizas superponer uno ensima de otro

  console.log(id1);
  console.log(id2);

  document.getElementById(id1).style.opacity ="1";
  document.getElementById(id2).style.opacity ="0";

}

function MostrarUno() {
  document.getElementById("Uno").style.opacity ="1";
}

function OcultarUno() {
  document.getElementById("Uno").style.opacity ="0";
}


function BotonCantidad(id,cantidad){
	//return botonCantidad = '<div class="input-append"><input class="span1" style="max-width:34px" placeholder="'+cantidad+'" id="appendedInputButtons" size="16" type="text"><button class="btn" type="button"><i class="icon-minus"></i></button><button class="btn" type="button"><i class="icon-plus"></i></button><button class="btn btn-danger" type="button" id="'+id+'" onclick="EliminarArticulo('+id+')"><i class="icon-remove icon-white"></button></div>';
  return botonCantidad = '<input type="text" id="'+id+'" value='+cantidad+'> <input type="button" value="+" onClick="sumarUnoCarrito('+id+');"> <input type="button" value="-" onClick="restarUnoCarrito('+id+');"> ';
  // FALTA POR HACER: que se actualize la tabla cada vez que se cambia una cantidad y
}

function BotonSwitch(idA,idB) {
  return botonOCultar = ' <input type="submit"  value="Uno" onclick="switchDivS( '+idA+' , '+idB+' );">';
}

function sumarUnoCarrito(id){
  var valor = document.getElementById( id ).value;
  var num = parseInt( valor );
  num++;
  document.getElementById( id ).value = num ;
  actualizarCantidad();
}
function restarUnoCarrito(id){
  var valor = document.getElementById( id ).value;
  var num = parseInt( valor );
    if(num <= 1){
      num = 1;
    }else{
      num--;
    }
    document.getElementById( id ).value = num ;
    actualizarCantidad();
}

function ActualizarCarrito(){
    var end = false;
    var time = 0;
    
    //LIMPIAR EL ARREGLO
    nombre = [" ", " "];
    marca = [" ", " "];
    precio = [" ", " "];
    foto_URL = [" ", " "];
    descuento = [" ", " "];
    total = 0;
    table = "";
    id_producto = [" ", " "];
    cantidad = [" ", " "];
    keyArreglo = [" ", " "];
    document.getElementById("tablaCarritoCompras").innerHTML = "";
    document.getElementById("tabla_total").innerHTML = "";

      refCarro.orderByChild("id").on("child_added", function(snapshot){
  			//producto.push(snapshot.val().foto);
  			nombre.push(snapshot.val().nombre);
  			precio.push(snapshot.val().precio);
        keyArreglo.push(snapshot.key);
  			marca.push(snapshot.val().marca);
  			descuento.push(snapshot.val().descuento);
  			foto_URL.push(snapshot.val().foto);
  			id_producto.push(snapshot.val().id);
        cantidad.push(snapshot.val().cantidad);
		  });


  setTimeout(function(){
   while (end == false && time < 500000){
      if(nombre[2] != null){
        end = true;
      }
      time +=0.1;
      if (time >= 500000){
        alert("Mala conexión a Internet, intenta cargar la pagina de nuevo");
        time = 500001;
      }

    }
    Actualizar_HTML_carrito();
  }, 700);
}

function actualizarCantidad() {

    var i=2;
    var j = 0;
    while (i < cantidad.length) {
      /**/
      
      var idCantiad = id_producto[i].toString();
      var nuevaCantidad = document.getElementById( idCantiad ).value;
      var numUno = parseInt( nuevaCantidad );

      if(numUno != parseInt(cantidad[i]) && parseInt(cantidad[i]) >= 1){
        var keyP = keyArreglo[i].toString();
        var numUno_string= numUno.toString();
        refCarro.child(keyP).update({
          cantidad: numUno_string
        });
      }
      i++;
      j++;
      //lo que quiero es agregar las nuevas cantidades

    }
}


function Actualizar_HTML_carrito(){
  var j = 2;
  var Precio_total = 0;
  var descuento_total = 0;
    while(j < nombre.length){
      if(parseInt(cantidad[j]) >= 1){
        table += '<tr>'
                  + '<td class="hidden-xs"> '
                      + '<img src="' + foto_URL[j] + '" style= "width:200px; height: 200px" alt=""/>'
                  + '</td>'
                  + '<td>'
                      + nombre[j]
                  + '</td>'
                  + '<td>'
                      + BotonCantidad(id_producto[j],cantidad[j])
                  + '</td>'
                  + '<td>'
                      + parseInt(precio[j])
                  + '</td>'
                  + '<td>'
                      + '<div onClick="EliminarArticulo(' + "'" + id_producto[j] + "'" + ')"><i class="fa fa-times"></i> <span class="hidden-xs">Eliminar</span><div>'
                  + '</td>'
              + '</tr>';
        Precio_total += parseInt(precio[j]);
        j++;
      }else{
         table += '<tr>'
                  + '<td class="hidden-xs"> '
                  + '<img src="' + foto_URL[j] + '" alt=""/>'
                  + '</td>'
                  + '<td>'
                  + nombre[j]
                  + '</td>'
                  + '<td>'
                  + BotonCantidad(id_producto[j],cantidad[j])
                  + '</td>'
                  + '<td>'
                  + parseInt(precio[j])
                  + '</td>'
                  + '<td>'
                  + '<div onClick="EliminarArticulo(' + "'" + id_producto[j] + "'" + ')"><i class="fa fa-times"></i> <span class="hidden-xs">Eliminar</span><div>'
                  + '</td>'
                  + '</tr>';
        Precio_total += parseInt(precio[j]);
        j++;
      }
    }
      /*PARTE DE INFORMAICON PERSONAL*/
      tabla_total = '<div class="col-sm-6">'
                  +   '<h3 class="small-title font-alt">Calcular pedido</h3>'
                  +   '<form action="#" class="form">'
                  +     '<div class="mb-10">'
                  +       '<select class="input-md form-control" id="ciudadPedido">'
                  +         '<option>Selecciona ciudad</option>'
                  +          '<option>medellin</option>'
                  +        '</select>'
                  +     '</div>'
                  +     '<div class="mb-10">'
                  +       '<input placeholder="Direccion" class="input-md form-control" type="text" pattern=".{3,100}" id="direccionPedido"/>'
                  +     '</div>'

                  +     '<div class="mb-10">'
                  +       '<input placeholder="Nombre" class="input-md form-control" type="text" pattern=".{3,100}" id="nombrePedido"/>'
                  +     '</div>'

                  +     '<div class="mb-10">'
                  +       '<input placeholder="Apellido" class="input-md form-control" type="text" pattern=".{3,100}" id="apellidoPedido"/>'
                  +     '</div>'

                  +     '<div class="mb-10">'
                  +       '<input placeholder="Telefono Celular" class="input-md form-control" type="text" pattern=".{3,100}" id="telefonoPedido"/>'
                  +     '</div>'

                  +     '<div class="mb-10">'
                  +       '<textarea rows="4" cols="50" placeholder="Como podemos llegar?, Nombre del lugar?" class="input-md form-control"  id="informacionAdicionalPedido"></textarea>'
                  +     '</div>'

                  +   '</form>'
                  + '</div>'
      /*PARTE DE COSTO TOTAL*/   
                  + '<div class="col-sm-6 text align-right pt-10">'
                  +     '<div>'
                  +       'Total pedido: <strong>$'+ Precio_total +'</strong>'
                  +     '</div>'

                  +     '<div class="btn btn-mod btn-round btn-large" onclick="comprar()">'
                  +       'Comprar'
                  +     '</div>'
                  + '</div>';


    document.getElementById("tablaCarritoCompras").innerHTML = table;
    document.getElementById("tabla_total").innerHTML = tabla_total;
    llenarDatosPedido();
  }

  function llenarDatosPedido(){
    if(ciudad != "null"){document.getElementById("ciudadPedido").options[0].innerHTML = ciudad;}
    if(direccion != "null"){document.getElementById("direccionPedido").value = direccion;}
    if(nombre_pedido != "null"){document.getElementById("nombrePedido").value = nombre_pedido;}
    if(apellido != "null"){document.getElementById("apellidoPedido").value = apellido;}
    if(telefono != "null"){document.getElementById("telefonoPedido").value = telefono;}
  }

  function comprar(){
    var datosCompletos = true;
    _ciudad = document.getElementById("ciudadPedido");
    ciudad = _ciudad.options[_ciudad.selectedIndex].value;
    if (ciudad != "medellin"){
      ciudad = "medellin";
    }

    direccion = document.getElementById("direccionPedido").value;
     if (direccion == ""){
      window.alert("Porfavor llena la direccion");
      datosCompletos = false;
    }
    nombre_pedido = document.getElementById("nombrePedido").value;
     if (nombre_pedido == ""){
      window.alert("Porfavor llena el nombre");
      datosCompletos = false;
    }
    apellido = document.getElementById("apellidoPedido").value;
     if (apellido == ""){
      window.alert("Porfavor llena el apellido");
      datosCompletos = false;
    }
    telefono = document.getElementById("telefonoPedido").value;
     if (telefono == ""){
      window.alert("Porfavor llena el telefono");
      datosCompletos = false;
    }
    informacion_adicional = document.getElementById("informacionAdicionalPedido").value;
    if (informacion_adicional == ""){
      informacion_adicional = "";
    }

    //enviar valores nuevos al bodegero y a la base de datos
    if(datosCompletos == true){
      //direccion
      refUsuario.child("direccion").update({
        ciudad: ciudad,
        direccion: direccion,
        informacion_adicional: informacion_adicional
      });

      /*FALTA BODEGERO*/

      //datos basicos
      refUsuario.update({
        nombre: nombre_pedido,
        apellido: apellido
      });

      /*FALTA BODEGERO*/

      //telefono
      refUsuario.child("telefono").update({
        telefonoCelular: telefono
      });

      /*FALTA BODEGERO*/

    }
  }
