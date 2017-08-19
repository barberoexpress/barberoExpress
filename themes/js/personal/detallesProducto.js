var config = {
    apiKey: "AIzaSyD1UUijWvL3lVdaCNUBRVwS_tntGpBPCxM",
    authDomain: "barberoexpress-8c13c.firebaseapp.com",
    databaseURL: "https://barberoexpress-8c13c.firebaseio.com",
    projectId: "barberoexpress-8c13c",
    storageBucket: "barberoexpress-8c13c.appspot.com",
    messagingSenderId: "634083713883"
};

var firebaseRef = firebase.database().ref();
var firebaseAuth = firebase.auth();
var prodKey = localStorage.getItem("PROD_KEY");
var SearchRef = firebase.database().ref("PRODUCTOS/" + prodKey);

SearchRef.on("value", function(snapshot) {
	//BASICO
	console.log(snapshot.val().foto);
	document.getElementById("nombreProducto").innerHTML = snapshot.val().nombre;
	document.getElementById("nombreProducto2").innerHTML = snapshot.val().nombre;
	document.getElementById("marcaProducto").innerHTML = snapshot.val().marca;
	document.getElementById("descripcion_producto").innerHTML = snapshot.val().descripcion;
  //nota: añadir separadores para el precio (1 000.000)
	document.getElementById("precioProducto").innerHTML = "<span>" + "$ " + snapshot.val().precio + "</span>";
  //id del producto NOTA : hay que esconderlo mejor
  document.getElementById("id_producto").innerHTML = snapshot.val().id;

  //solo con esta linea de codigo mal ya no podia obtener mas elementos by id
  //document.getElementById().innerHTML ("idProducto").innerHTML = snapshot.val().id;

  //IMAGENES
	document.getElementById("imagenProducto1").innerHTML = '<img src="'+snapshot.val().foto+'" id="imagenProducto" style="width:100%" alt=""/>'
	document.getElementById("imagenProducto2").innerHTML = '<img style="width:29%" src="' + snapshot.val().foto + '" alt=""/>'
	document.getElementById("imagenProducto3").innerHTML = '<img style="width:29%" src="' + snapshot.val().foto + '" alt=""/>'
	document.getElementById("imagenProducto4").innerHTML = '<img style="width:29%" src="' + snapshot.val().foto + '" alt=""/>'



});
