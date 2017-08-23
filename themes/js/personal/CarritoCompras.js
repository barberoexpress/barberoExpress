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
var total = 0;
var id_producto = [" ", " "];
var botonCantidad = '<div class="input-append"><input class="span1" style="max-width:34px" placeholder="1" id="appendedInputButtons" size="16" type="text"><button class="btn" type="button"><i class="icon-minus"></i></button><button class="btn" type="button"><i class="icon-plus"></i></button><button class="btn btn-danger" type="button" onclick="EliminarArticulo()"><i class="icon-remove icon-white"></button></div>';

// -------------------- CODIGO PARA ACTUALIZAR EL CARRITO DE COMPRAS DEL USUARIO --------------------
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

function BotonCantidad(id){
	return botonCantidad = '<div class="input-append"><input class="span1" style="max-width:34px" placeholder="1" id="appendedInputButtons" size="16" type="text"><button class="btn" type="button"><i class="icon-minus"></i></button><button class="btn" type="button"><i class="icon-plus"></i></button><button class="btn btn-danger" type="button" id="'+id+'" onclick="EliminarArticulo('+id+')"><i class="icon-remove icon-white"></button></div>';
}

function ActualizarCarrito(){

	for(var r = 0; r < rows; r++)
	{
		refCarro.orderByChild("id").on("child_added", function(snapshot){
			//producto.push(snapshot.val().foto);
			nombre.push(snapshot.val().nombre);
			precio.push(snapshot.val().precio);
			marca.push(snapshot.val().marca);
			descuento.push(snapshot.val().descuento);
			foto_URL.push(snapshot.val().foto);
			id_producto.push(snapshot.val().id);
		});
	}

	setTimeout(function(){
	var j = 2;
	var Precio_total = 0;
	var descuento_total = 0;
		while(j < nombre.length){
			table += '<tr>';
			table += '<td>' + '<img src="' + foto_URL[j] + '" alt="Mountain View" style="width:60px;height:auto;">' + '</td>';
			table += '<td>' + nombre[j] +'</td>';
			table += '<td>' + marca[j] + '</td>';
			table += '<td>' + BotonCantidad(id_producto[j]) + '</td>';
			table += '<td>$ ' + precio[j] + '</td>';
			table += '<td>' + descuento[j] + ' %</td>';
			total = parseInt(precio[j]) - (parseInt(precio[j]) * parseInt(descuento[j])/100);
			table += '<td>' + total + '</td>';
			table += '</tr>';
			Precio_total += parseInt(precio[j]);
			descuento_total += parseInt(precio[j]) * parseInt(descuento[j])/100;
			total = 0;
			j++;
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

	}, 1500);



}
