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
var i = 0;
var vacio = ".";

function Añadir(){


	var nombre = document.getElementById('nombre').value;
	var precio = document.getElementById("precio").value;
	var marca = document.getElementById("marca").value;

	firebaseRef.child("PRODUCTOS").push({
		nombre: nombre,
    marca: marca,
		precio: precio,
		foto: "null",
		gif:"null",
		descripcion:"null",
		id: i,
		disponibles: 10,
		numCompras: 0
	});
	i++
	document.getElementById("nombre").innerHTML = vacio;
	document.getElementById("precio").innerHTML = vacio;

}


function Agregar(){
	var keys = [" ", " "];
	var recomendado = document.getElementById("recomendado").value;
	firebaseRef.child("PRODUCTOS").on("child_added", function(snapshot) {
		keys.push(snapshot.key);
	});
	
	setTimeout(function(){
		for(j = 2; j < keys.length; j++){
			firebaseRef.child("PRODUCTOS").child(keys[j]).update({
				recomendado : false
			});
		}
		console.log(keys);
    }, 3000)
	
}
