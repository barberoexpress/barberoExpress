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

//VEAMOS EN QUE HTML ESTAMOS
var url = window.location.pathname;
var currentLocation = url.substring(url.lastIndexOf('/')+1);

//NO HACEMOS ESTA OPERACION SI ESTAMOS EN LA PAGINA DEL BODEGUERO
if (currentLocation != "bodeguero.html"){
	// ---- SI EL USUARIO ESTA LOGGEADO PARA PONER SU FOTO, SU NOMBRE, CAMBIAR EL BOTON DE INICIAR/CERRAR SESION Y ACTUALIZAR LOS PRODUCTOS DEL CARRO DE COMPRAS EN EL NAV BAR -------
	var userL = localStorage.getItem("USERKEY2");
	var userN = localStorage.getItem("USERNAME2");
	console.log("userKey: " +  userL);
	if (userL != "null" && userL != null) {	

		//TEXTO NOMBRE
		if(currentLocation == "carritoCompras" || currentLocation == "buscar-4columnas" || currentLocation == "login" || currentLocation == "productoSimple" || currentLocation == "terminosLegales"){
			var infoUsuario = "";
			//infoUsuario += '<p><img align="left" src="FrontEnd/images/logo/logoWhiteNavBar.png"/>'+userN+'</p>';
			infoUsuario += '<p><img align="left" src="../images/logo/logoWhiteNavBar.png"/>'+userN+'</p>';

		}else{
			var infoUsuario = "";
			//infoUsuario += '<p><img align="left" src="../images/logo/logoWhiteNavBar.png"/>'+userN+'</p>';
			infoUsuario += '<p><img align="left" src="FrontEnd/images/logo/logoWhiteNavBar.png"/>'+userN+'</p>';
		}


		//BOTON DE INICIAR SESION / CERRAR SESION
		var botonIniciarCerrar = "";
		botonIniciarCerrar = '<a onclick="CerrarSeccion()">Cerrar sesión</a>';

		document.getElementById("infoUsuario").innerHTML = infoUsuario;
		document.getElementById("iniciar/cerrar").innerHTML = botonIniciarCerrar;

		//MOSTRAMOS LA CANTIDAD DE PRODUCTOS EN EL CARRO DE COMPRAS
		mostrarCantidadPedidos();

	}else{

		//TEXTO NOMBRE
		/*if(currentLocation == "index.html"){
			var infoUsuario = "";
			infoUsuario += '<p><img align="left" src="FrontEnd/images/logo/logoWhiteNavBar.png"/>BE</p>';
		}else{
			var infoUsuario = "";
			infoUsuario += '<p><img align="left" src="../images/logo/logoWhiteNavBar.png"/>BE</p>';
		}*/

		//BOTON DE INICIAR SESION / CERRAR SESION
		if(currentLocation == "carritoCompras" || currentLocation == "buscar-4columnas" || currentLocation == "login" || currentLocation == "productoSimple" || currentLocation == "terminosLegales"){
			var botonIniciarCerrar = "";
			botonIniciarCerrar = '<a href="login.html">iniciar sesión</a>';
			//botonIniciarCerrar = '<a href="FrontEnd/vistas/login.html">iniciar sesión</a>';
		}else{
			var botonIniciarCerrar = "";
			botonIniciarCerrar = '<a href="FrontEnd/vistas/login.html">iniciar sesión</a>';
			//botonIniciarCerrar = '<a href="login.html">iniciar sesión</a>';
		}
		document.getElementById("iniciar/cerrar").innerHTML = botonIniciarCerrar;
		//document.getElementById("infoUsuario").innerHTML = infoUsuario;
	}
}

// -------------------- FUNCION PARA CERRAR SECCION --------------------
//DEBEMOS DE ESPERAR A TENER EL NAV BAR CON EL CARRITO DE COMPRAR PARA AÑADIR ESTO

function onLoad() {
	gapi.load('auth2', function() {
        gapi.auth2.init();
    });
}

function CerrarSeccion(){
	var auth2 = gapi.auth2.getAuthInstance();
	    auth2.signOut().then(function () {
	      document.location.href = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://barberoexpress-8c13c.firebaseapp.com";
	      alert('Te has desconectado exitosamente.');
	    });


	firebase.auth().signOut().then(function() {
		//CERRAMOS SESION CON GOOGLE
		/*var auth2 = gapi.auth2.getAuthInstance();
	    auth2.signOut().then(function () {
	      console.log('User signed out.');
	    });*/

		window.alert("sesion cerrada correctamente");
		localStorage.setItem("USERKEY2", "null");
		localStorage.setItem("USERNAME2", "null");
		if(currentLocation != "index"){
			window.location.href="../../index.html";
		}else{
			window.location.href="index.html";
		}
	}, function(error) {
    	windows.alert("Un error ha sucedido, por favor comuniquese con lancha para mas informacion");
	});
}

/* Ramon */

// IE10+
document.getElementsByTagName( "html" )[0].classList.remove( "loading" );

// All browsers
document.getElementsByTagName( "html" )[0].className.replace( /loading/, "" );

// Or with jQuery
$( "html" ).removeClass( "loading" );



// -------------------- FUNCION PARA USAR EL BUSCADOR EN EL INDEX--------------------
function BuscarINDEX(prod1, prod2){
  var queryText = prod1;
  var queryText2 = prod2;
  if (queryText2 == '*'){queryText2 = "";}
  var foto_Url = [" ", " "];
  var nombre = [" ", " "];
  var precio = [" ", " "];
  var descripcion = [" ", " "];
  var keyProducto = [" ", " "];

  //BUSCAMOS COINCIDENCIAS CON EL PRIMER PRODUCTO
    if(queryText.length >= 2){
	    firebaseRef.child("PRODUCTOS").orderByChild('nombre').startAt(queryText).endAt(queryText+"\uf8ff").on('child_added', function(snapshot) {
	        foto_Url.push(snapshot.val().foto);
	        nombre.push(snapshot.val().nombre);
	        precio.push(snapshot.val().precio);
	        descripcion.push(snapshot.val().descripcion);
	        keyProducto.push(snapshot.key);
	    });

	    firebaseRef.child("PRODUCTOS").orderByChild('marca').startAt(queryText).endAt(queryText+"\uf8ff").on('child_added', function(snapshot) {
	        foto_Url.push(snapshot.val().foto);
	        nombre.push(snapshot.val().nombre);
	        precio.push(snapshot.val().precio);
	        descripcion.push(snapshot.val().descripcion);
	        keyProducto.push(snapshot.key);
	    });

	    firebaseRef.child("PRODUCTOS").orderByChild('tipo').startAt(queryText).endAt(queryText+"\uf8ff").on('child_added', function(snapshot) {
	        foto_Url.push(snapshot.val().foto);
	        nombre.push(snapshot.val().nombre);
	        precio.push(snapshot.val().precio);
	        descripcion.push(snapshot.val().descripcion);
	        keyProducto.push(snapshot.key);
	    });

	}else{
	    localStorage.setItem("FOTO_URL_BS", JSON.stringify(foto_Url));
	    localStorage.setItem("NOMBRE_BS", JSON.stringify(nombre));
	    localStorage.setItem("PRECIO_BS", JSON.stringify(precio));
	    localStorage.setItem("DESCRIPCION_BS", JSON.stringify(descripcion));
	    localStorage.setItem("KEYPRODUCTO_BS", JSON.stringify(keyProducto));
  	}

    //BUSCAMOS COINCIDENCIAS CON EL SEGUNDO PRODUCTO
    if(queryText2.length >= 2){
	    firebaseRef.child("PRODUCTOS").orderByChild('nombre').startAt(queryText2).endAt(queryText2+"\uf8ff").on('child_added', function(snapshot) {
	        foto_Url.push(snapshot.val().foto);
	        nombre.push(snapshot.val().nombre);
	        precio.push(snapshot.val().precio);
	        descripcion.push(snapshot.val().descripcion);
	        keyProducto.push(snapshot.key);
	    });

	    firebaseRef.child("PRODUCTOS").orderByChild('marca').startAt(queryText2).endAt(queryText2+"\uf8ff").on('child_added', function(snapshot) {
	        foto_Url.push(snapshot.val().foto);
	        nombre.push(snapshot.val().nombre);
	        precio.push(snapshot.val().precio);
	        descripcion.push(snapshot.val().descripcion);
	        keyProducto.push(snapshot.key);
	    });

	    firebaseRef.child("PRODUCTOS").orderByChild('tipo').startAt(queryText2).endAt(queryText2+"\uf8ff").on('child_added', function(snapshot) {
	        foto_Url.push(snapshot.val().foto);
	        nombre.push(snapshot.val().nombre);
	        precio.push(snapshot.val().precio);
	        descripcion.push(snapshot.val().descripcion);
	        keyProducto.push(snapshot.key);
	    });

	}else{
	    localStorage.setItem("FOTO_URL_BS", JSON.stringify(foto_Url));
	    localStorage.setItem("NOMBRE_BS", JSON.stringify(nombre));
	    localStorage.setItem("PRECIO_BS", JSON.stringify(precio));
	    localStorage.setItem("DESCRIPCION_BS", JSON.stringify(descripcion));
	    localStorage.setItem("KEYPRODUCTO_BS", JSON.stringify(keyProducto));
  	}


    //ESPERAMOS UN PAR DE SEGUNDOS QUE SE HAGA LA BUSQUEDA PARA MANDAR LA INFORMACION AL HTML
    setTimeout(function(){
      localStorage.setItem("FOTO_URL_BS", JSON.stringify(foto_Url));
      localStorage.setItem("NOMBRE_BS", JSON.stringify(nombre));
      localStorage.setItem("PRECIO_BS", JSON.stringify(precio));
      localStorage.setItem("DESCRIPCION_BS", JSON.stringify(descripcion));
      localStorage.setItem("KEYPRODUCTO_BS", JSON.stringify(keyProducto));
      window.location.href="FrontEnd/vistas/buscar-4columnas.html";
    }, 2000);
}


// -------------------- FUNCION PARA IR A LA VENTANA DE CADA PRODUCTO --------------------
function Ir_productoINDEX(prodKey){
  localStorage.setItem("PROD_KEY", prodKey);
  /* es preferible abrir una pestaña nueva con el producto para que el ususario
   no pierda su busqueda y pueda seguir viendo productos
  */
  window.location.href= "FrontEnd/vistas/productoSimple.html";

}

// -------------------- FUNCION PARA ACTUALIZAR LA CANTIDAD DE PRODUCTOS EN EL NAV-BAR--------------------
function mostrarCantidadPedidos(){
	var numeroPedidos = "";
	var tamañoArregloPedidos = [];

	firebaseRef.child("USUARIOS").child(userL).child("/carritoCompras/productos").on("child_added", function(snapshot) {
		tamañoArregloPedidos.push(snapshot.val().cantidad);
	});

	
	setTimeout(function() {
		console.log(tamañoArregloPedidos.length);
		if(currentLocation != "index.html"){
			numeroPedidos = '<a href="carritoCompras.html" style="height: 75px; line-height: 75px;"><i class="fa fa-shopping-cart"></i> Carrito('+ tamañoArregloPedidos.length + ')</a>';
		}else{
			numeroPedidos = '<a href="FrontEnd/vistas/carritoCompras.html" style="height: 75px; line-height: 75px;"><i class="fa fa-shopping-cart"></i> Carrito('+ tamañoArregloPedidos.length + ')</a>';
		}
		document.getElementById("cantidadPedidos").innerHTML = numeroPedidos;
	}, 2000);
	
}
