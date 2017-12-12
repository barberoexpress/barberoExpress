var config = {
    apiKey: "AIzaSyD1UUijWvL3lVdaCNUBRVwS_tntGpBPCxM",
    authDomain: "barberoexpress-8c13c.firebaseapp.com",
    databaseURL: "https://barberoexpress-8c13c.firebaseio.com",
    projectId: "barberoexpress-8c13c",
    storageBucket: "barberoexpress-8c13c.appspot.com",
    messagingSenderId: "634083713883"
};
firebase.initializeApp(config);


// -------------------- FUNCION PARA CERRAR SECCION --------------------
//DEBEMOS DE ESPERAR A TENER EL NAV BAR CON EL CARRITO DE COMPRAR PARA AÑADIR ESTO
function CerrarSeccion(){
	firebase.auth().signOut().then(function() {
		window.alert("seccion cerrada correctamente");
		window.location.href="../index.html";
	}, function(error) {
    	windows.alert("Un error ha sucedido, por favor comuniquese con lancha para mas informacion");
	});
}

function CerrarSeccionIndex(){
	firebase.auth().signOut().then(function() {
		window.alert("seccion cerrada correctamente");
		window.location.href="index.html";
	}, function(error) {
    	windows.alert("Un error ha sucedido, por favor comuniquese con lancha para mas informacion");
	});
}

