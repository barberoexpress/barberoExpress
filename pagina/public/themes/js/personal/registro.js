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



//FUNCION DE REGISTRO DE USUARIO
function Registrarse(){


	var email = document.getElementById('input_email').value;
	var password = document.getElementById("inputPassword1").value;
	var nombre = document.getElementById('inputFname1').value;
	var apellido = document.getElementById("inputLnam").value;

	var direccion = document.getElementById('address').value;
	var direccion2 = document.getElementById("address2").value;
	var ciudad = document.getElementById('city').value;
	var informacionAdicional = document.getElementById('aditionalInfo').value;
	var telefonoCelular = document.getElementById("mobile").value;
	var telefonoFijo = document.getElementById("phone").value;
	var errores = false;
	if(direccion2 == null) { direccion2 = "null";}
	if(informacionAdicional == null) { informacionAdicional = "null";}
	if(telefonoFijo == null) { telefonoFijo = "null";}

	firebaseAuth.createUserWithEmailAndPassword(email, password).catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;

		if (errorCode === 'auth/wrong-password') {
	        alert('Contraseña equivocada.');
	        errores = true;
	        return;
	    } else {
	    	errores = true;
	        alert(errorMessage);
	        return;
	    }
	});
	setTimeout(function(){
                !errores ? InformacionBaseDatos(nombre, apellido, email, direccion, direccion2, ciudad, informacionAdicional, telefonoFijo, telefonoCelular) : console.log("problemas");
            }, 1000);

}


//FUNCION DE AGREGAR INFORMACION A LA DB
function InformacionBaseDatos(nombre, apellido, correo, direccion, direccion2, ciudad, informacionAdicional, telefonoFijo, telefonoCelular){
	var ref = firebaseRef.child("USUARIOS");
	ref.push({
		correo: correo,
		nombre: nombre,
		apellido: apellido,
		telefono: {telefonoCelular: telefonoCelular, telefonoFijo: telefonoFijo},
		direccion: {direccion: direccion, direccion2: direccion2, ciudad:ciudad, informacionAdicional: informacionAdicional},
		carritoCompras: {vaciar:"false"},
		foto: "null",
		historialCompras: "null"
	});

	CambiarVista();
}


//FUNCION PARA PASAR DE VISTA HTML
function CambiarVista(){
	var user = firebase.auth().currentUser;
	if (user) {
	  console.log("seccion iniciada");
	  //MOVER LA FUNCION ADDUSER_INFO() ACA
	  setTimeout(function(){
                window.location.href="index.html";
            }, 3000);
	} else {
	  alert("nadie ha iniciado seccion");
	  return;
	}
}
