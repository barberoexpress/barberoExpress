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
//firebase.database().ref("USUARIOS/" + key);
//while(actualizar){ActualizarDatos();}


// -------------------- CODIGO PARA ACTUALIZAR EL CARRITO DE COMPRAS DEL USUARIO --------------------
firebase.auth().onAuthStateChanged(function(user) {
if (user) {
	actualizar = false;
	var table = '<thead>' + '<tr>' + '<th>Producto</th>' + '<th>Caracteristicas</th>' + '<th>Marca</th>' + '<th>Cantidad/Actualizar</th>' + '<th>Precio</th>' + '<th>Descuento</th>' + '<th>Total</th>' + '</tr>' + '</thead>' + '<tbody>';
	var rows = 1;
	var cols = 7;
	var producto = 'themes/images/products/4.jpg';
	var caracteristicas = [" ", " "];
	var marca = [" ", " "];
	var precio = [" ", " "];
	var descuento = [" ", " "];
	var total = "$10.00";
	var botonCantidad = '<div class="input-append"><input class="span1" style="max-width:34px" placeholder="1" id="appendedInputButtons" size="16" type="text"><button class="btn" type="button"><i class="icon-minus"></i></button><button class="btn" type="button"><i class="icon-plus"></i></button></div>';
	var refCarro = firebase.database().ref("USUARIOS/" + userkey + "/" + "carritoCompras");

	for(var r = 0; r < rows; r++)
	{
		refCarro.orderByChild("id").on("child_added", function(snapshot){
			//producto.push(snapshot.val().foto);
			caracteristicas.push(snapshot.val().nombre);
			precio.push(snapshot.val().precio);
			marca.push(snapshot.val().marca);   
			descuento.push(snapshot.val().descuento);
		});
	}
	//ACA TOCA ARREGLAR LA IMAGEN PARA QUE SALGA LA DE LA BASE DE DATOS Y NO UNA PRE DEFINIDA
	setTimeout(function(){
	var j = 2;
		while(j < caracteristicas.length){
			table += '<tr>';
			table += '<td>' + '<img src="themes/images/products/4.jpg" alt="Mountain View" style="width:60px;height:auto;">' + '</td>';
			table += '<td>' + caracteristicas[j] +'</td>';
			table += '<td>' + marca[j] + '</td>';
			table += '<td>' + botonCantidad + '</td>';
			table += '<td>' + precio[j] + '</td>';
			table += '<td>' + descuento[j] + '</td>';
			table += '<td>' + total + '</td>';
			table += '</tr>';
			j++;
		}
		document.getElementById("tablaCarritoCompras").innerHTML = '<table class="table table-bordered" id ="tablaCarritoCompras">' + table + '</table>';
    }, 1000);
} else {
   console.log("Inicia seccion primero");
}
});



/*function CrearImagen() {
    var x = document.createElement("IMG");
    x.setAttribute("src", "themes/images/products/4.jpg");
    x.setAttribute("width", "270");
    x.setAttribute("height", "110");
    x.setAttribute("alt", "The Pulpit Rock");
    var currentDiv = document.getElementById("imagenProducto"); 
	document.body.insertBefore(x, currentDiv); 
    //document.body.appendChild(x);
}*/

