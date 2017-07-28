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
var ref;

function IniciarSeccion(){
	var email = document.getElementById('inputEmail').value;
	var password = document.getElementById("inputPassword").value;


	firebaseAuth.signInWithEmailAndPassword(email, password).catch(function(error) {
	  var errorCode = error.code;
	  var errorMessage = error.message;

	  //MANEJO DE ERRORES
	  if (errorCode === 'auth/wrong-password') {
            alert('Contraseña equivocada.');
            return;
          } else if (errorCode === 'auth/user-not-found'){
            alert('Usuario no encontrado.');
            return;

      	  } else if(errorCode === 'auth/invalid-email'){
      	  	alert('Email invalido.');
      	  	return;

      	  } else if(errorCode === 'auth/user-disabled'){
      	  	alert('Usuario bloqueado.');
      	  	return;

      	  }else{
      	  	alert(errorMessage);
      	  	return;
      	  }
	});
	window.alert(email);
}

//FUNCION PARA ACTUALIZAR LA PAGINA SEGUN EL USUARIO

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
	var SearchRef = firebase.database().ref("USUARIOS");

	var correo = user.email;
	var nombre;

	SearchRef.orderByChild('correo').equalTo(correo).on("child_added", function(snapshot) {
		 key = snapshot.key;
		 ref = firebase.database().ref("USUARIOS/" + key);

		 nombre = snapshot.val().nombre;

		 document.getElementById("Usuario").innerHTML = '<strong>' + nombre + '<strong>';
	});
	
	
  } else {
    console.log("nadie ha iniciado seccion");
  }
});




// -------------------- FUNCION PARA CERRAR SECCION --------------------

function CerrarSeccion(){
	firebase.auth().signOut().then(function() {
		window.alert("seccion cerrada correctamente");
		window.location.href="index.html";
	}, function(error) {
    	windows.alert("Un error ha sucedido, por favor comuniquese con lancha para mas informacion");
	});
}

// -------------------- FUNCION PARA AGREGAR PRODUCTOS AL CARRO DE COMPRAS --------------------

function AgregarAlCarrito(){

  var user = firebase.auth().currentUser;

  if (user) {
    var nombre = $("#nombreProducto").text();
    var precio = $("#precioProducto").text();
    var id = "AGREGAR UN ID ACA";

    ref.child("carritoCompras").push({
      nombre: nombre,
      precio: precio,
      id: id
    });

  } else {
    window.alert("Inicia seccion primero");
  }
  

}