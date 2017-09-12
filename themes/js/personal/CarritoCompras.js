var config = {
    apiKey: "AIzaSyD1UUijWvL3lVdaCNUBRVwS_tntGpBPCxM",
    authDomain: "barberoexpress-8c13c.firebaseapp.com",
    databaseURL: "https://barberoexpress-8c13c.firebaseio.com",
    projectId: "barberoexpress-8c13c",
    storageBucket: "barberoexpress-8c13c.appspot.com",
    messagingSenderId: "634083713883"
};
//firebase.initializeApp(config);

var firebaseRef = firebase.database().ref();
var firebaseAuth = firebase.auth();
var userkey = localStorage.getItem("USERKEY2");
var user = firebase.auth().currentUser;
var actualizar = true;
var refCarro;
//firebase.database().ref("USUARIOS/" + key);
//while(actualizar){ActualizarDatos();}
var table = '<thead>' + '<tr>' + '<th>Producto</th>' + '<th>Caracteristicas</th>' + '<th>Marca</th>' + '<th>Cantidad/Actualizar</th>' + '<th>Precio</th>' + '<th>Descuento</th>' + '<th>Total</th>' + '</tr>' + '</thead>' + '<tbody>';
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

var botonCantidad = '<div class="input-append"><input class="span1" style="max-width:34px" placeholder="1" id="appendedInputButtons" size="16" type="text"><button class="btn" type="button"><i class="icon-minus"></i></button><button class="btn" type="button"><i class="icon-plus"></i></button><button class="btn btn-danger" type="button" onclick="EliminarArticulo()"><i class="icon-remove icon-white"></button></div>';

// -------------------- CODIGO PARA ACTUALIZAR EL CARRITO DE COMPRAS DEL USUARIO --------------------//
firebase.auth().onAuthStateChanged(function(user) {
if (user) {
	actualizar = false;

	refCarro = firebase.database().ref("USUARIOS/" + userkey + "/" + "carritoCompras");
	var refUsuario = firebase.database().ref("USUARIOS/" + userkey);
	//DATOS DE ENVIO
	var ciudad, direccion, direccion2, info_adicional, telefono

    refUsuario.once("value", function(snapshot){
    	ciudad = snapshot.val().direccion.ciudad;
    	direccion = snapshot.val().direccion.direccion;
    	direccion2 = snapshot.val().direccion.direccion2;
    	info_adicional = snapshot.val().direccion.informacionAdicional;
    	telefono = snapshot.val().telefono.telefonoCelular;
    });


	ActualizarCarrito();
	setTimeout(function(){
    //esto pone error
		document.getElementById("ciudad").innerHTML = '<strong>'+ ciudad +'</strong>';
		document.getElementById("direccion").innerHTML = '<strong>'+ direccion +'</strong>';
		document.getElementById("direccion2").innerHTML = '<strong>'+ direccion2 +'</strong>';
		document.getElementById("info_adicional").innerHTML = '<strong>'+ info_adicional +'</strong>';
		document.getElementById("telefono").innerHTML = '<strong>'+ telefono +'</strong>';
    }, 1000);
} else {
   window.alert("Inicia seccion primero");
   window.location.href="register.html";
}
});

function EliminarArticulo(id){

	refCarro.orderByChild("id").equalTo(id).on("child_added", function(snapshot) {
		console.log("adentro");
		id = snapshot.key;
		refCarro.child(id).remove();
	});
	ActualizarCarrito();
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
    id_producto = [" ", " "];
    cantidad = [" ", " "];
    keyArreglo = [" ", " "];

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


	//setTimeout(function(){
  /*function Actualizar_HTML_carrito(){
  var j = 2;
	var Precio_total = 0;
	var descuento_total = 0;
		while(j < nombre.length){
      if(parseInt(cantidad[j]) > 1){
        table += '<tr>';
  			table += '<td>' + '<img src="' + foto_URL[j] + '" alt="Mountain View" style="width:60px;height:auto;">' + '</td>';
  			table += '<td>' + nombre[j] +'</td>';
  			table += '<td>' + marca[j] + '</td>';

  			table += '<td>' + BotonCantidad(id_producto[j],cantidad[j]) + '</td>';
  			table += '<td>$ ' + parseInt(precio[j]) + '</td>';
  			table += '<td>' + descuento[j] + ' %</td>';
  			total = (parseInt(precio[j]) - (parseInt(precio[j]) * parseInt(descuento[j])/100))* parseInt(cantidad[j]);
  			table += '<td>' + total  + '</td>';
  			table += '</tr>';
  			Precio_total += total;
  			descuento_total += parseInt(precio[j]) * parseInt(descuento[j])/100;
  			total = 0;
  			j++;
      }else{
  			table += '<tr>';
  			table += '<td>' + '<img src="' + foto_URL[j] + '" alt="Mountain View" style="width:60px;height:auto;">' + '</td>';
  			table += '<td>' + nombre[j] +'</td>';
  			table += '<td>' + marca[j] + '</td>';
  			table += '<td>' + BotonCantidad(id_producto[j]) + '</td>';
  			table += '<td>$ ' + precio[j] + '</td>';
  			table += '<td>' + descuento[j] + ' %</td>';
        //¿por que está restando precio con precio? intento cambiar algo de seta liena y todo se ve a la mierda
  			total = (parseInt(precio[j]) - (parseInt(precio[j]) * parseInt(descuento[j])/100))* parseInt(cantidad[j]);
  			table += '<td>' + total + '</td>';
  			table += '</tr>';
  			Precio_total += total;
  			descuento_total += parseInt(precio[j]) * parseInt(descuento[j])/100;
  			total = 0;
  			j++;
      }
		}


			table += '<tr>';
            table += '<td colspan="6" style="text-align:right">Precio total:	</td>';
            table += '<td> $ '+Precio_total+'</td>';
            table += '</tr>';
			table += '<tr>';
            table += '<td colspan="6" style="text-align:right">Descuento total:	</td>';
            table += '<td> $ '+descuento_total+'</td>';
            table += '</tr>';
			table += '<tr>';
            table += '<td colspan="6" style="text-align:right"><strong>TOTAL ($'+Precio_total+' - '+descuento_total+') =</strong></td>';
            table += '<td class="label label-important" style="display:block"> <strong> $'+ (Precio_total - descuento_total) +' </strong></td>';
            table += '</tr>';


		document.getElementById("tablaCarritoCompras").innerHTML = '<table class="table table-bordered" id ="tablaCarritoCompras">' + table + '</table>';

		table = '<thead>' + '<tr>' + '<th>Producto</th>' + '<th>Caracteristicas</th>' + '<th>Marca</th>' + '<th>Cantidad/Actualizar</th>' + '<th>Precio</th>' + '<th>Descuento</th>' + '<th>Total</th>' + '</tr>' + '</thead>' + '<tbody>';
		rows = 1;
		producto = 'themes/images/products/4.jpg';
		nombre = [" ", " "];
		marca = [" ", " "];
		precio = [" ", " "];
		foto_URL = [" ", " "];
		descuento = [" ", " "];
		total = 0;
		id_producto = [" ", " "];
  }*/

	//}, 1500);



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
        table += '<tr>';
        table += '<td>' + '<img src="' + foto_URL[j] + '" alt="Mountain View" style="width:60px;height:auto;">' + '</td>';
        table += '<td>' + nombre[j] +'</td>';
        table += '<td>' + marca[j] + '</td>';

        table += '<td>' + BotonCantidad(id_producto[j],cantidad[j]) + '</td>';
        table += '<td>$ ' + parseInt(precio[j]) + '</td>';
        table += '<td>' + descuento[j] + ' %</td>';
        total = (parseInt(precio[j]) - (parseInt(precio[j]) * parseInt(descuento[j])/100))* parseInt(cantidad[j]);
        table += '<td>' + total  + '</td>';
        table += '</tr>';
        Precio_total += total;
        descuento_total += parseInt(precio[j]) * parseInt(descuento[j])/100;
        total = 0;
        j++;
      }else{
        table += '<tr>';
        table += '<td>' + '<img src="' + foto_URL[j] + '" alt="Mountain View" style="width:60px;height:auto;">' + '</td>';
        table += '<td>' + nombre[j] +'</td>';
        table += '<td>' + marca[j] + '</td>';
        table += '<td>' + BotonCantidad(id_producto[j]) + '</td>';
        table += '<td>$ ' + precio[j] + '</td>';
        table += '<td>' + descuento[j] + ' %</td>';
        //¿por que está restando precio con precio? intento cambiar algo de seta liena y todo se ve a la mierda
        total = (parseInt(precio[j]) - (parseInt(precio[j]) * parseInt(descuento[j])/100))* parseInt(cantidad[j]);
        table += '<td>' + total + '</td>';
        table += '</tr>';
        Precio_total += total;
        descuento_total += parseInt(precio[j]) * parseInt(descuento[j])/100;
        total = 0;
        j++;
      }
    }


      table += '<tr>';
            table += '<td colspan="6" style="text-align:right">Precio total:  </td>';
            table += '<td> $ '+Precio_total+'</td>';
            table += '</tr>';
      table += '<tr>';
            table += '<td colspan="6" style="text-align:right">Descuento total: </td>';
            table += '<td> $ '+descuento_total+'</td>';
            table += '</tr>';
      table += '<tr>';
            table += '<td colspan="6" style="text-align:right"><strong>TOTAL ($'+Precio_total+' - '+descuento_total+') =</strong></td>';
            table += '<td class="label label-important" style="display:block"> <strong> $'+ (Precio_total - descuento_total) +' </strong></td>';
            table += '</tr>';


    document.getElementById("tablaCarritoCompras").innerHTML = '<table class="table table-bordered" id ="tablaCarritoCompras">' + table + '</table>';

    table = '<thead>' + '<tr>' + '<th>Producto</th>' + '<th>Caracteristicas</th>' + '<th>Marca</th>' + '<th>Cantidad/Actualizar</th>' + '<th>Precio</th>' + '<th>Descuento</th>' + '<th>Total</th>' + '</tr>' + '</thead>' + '<tbody>';
    rows = 1;
    producto = 'themes/images/products/4.jpg';
  }
