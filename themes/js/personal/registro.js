var config = {
    apiKey: "AIzaSyD1UUijWvL3lVdaCNUBRVwS_tntGpBPCxM",
    authDomain: "barberoexpress-8c13c.firebaseapp.com",
    databaseURL: "https://barberoexpress-8c13c.firebaseio.com",
    projectId: "barberoexpress-8c13c",
    storageBucket: "barberoexpress-8c13c.appspot.com",
    messagingSenderId: "634083713883"
};
firebase.initializeApp(config);


//FUNCION DE REGISTRO DE USUARIO
function Registrarse(){

	console.log("conectamos");

	var email = document.getElementById('input_email').value;
	var password = document.getElementById("inputPassword1").value;

	firebaseAuth.createUserWithEmailAndPassword(email, password).catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;

		if (errorCode === 'auth/wrong-password') {
	        alert('Contraseña equivocada.');
	        return;
	    } else {
	        alert(errorMessage);
	        return;
	    }
	});

}