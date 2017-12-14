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
	// -------------------- REVISAMOS SI EL USUARIO ESTA LOGGEADO PARA PONER SU FOTO, SU NOMBRE, Y ACTUALIZAR LOS PRODUCTOS DEL CARRO DE COMPRAS EN EL NAV BAR--------------------
	var userL = localStorage.getItem("USERKEY2");
	var userN = localStorage.getItem("USERNAME2");
	if (userL != "false") {

		//CHEKEAMOS SI ESTAMOS EN INDEX O EN OTRA VISTA PARA MPDIFICAR LA RUTA
		if(currentLocation == "index.html"){
			var infoUsuario = "";
			infoUsuario += '<p><img align="left" src="FrontEnd/images/logo/logoWhiteNavBar.PNG"/>'+userN+'</p>';

		}else{
			var infoUsuario = "";
			infoUsuario += '<p><img align="left" src="../images/logo/logoWhiteNavBar.PNG"/>'+userN+'</p>';
		}
		document.getElementById("infoUsuario").innerHTML = infoUsuario;

		//MOSTRAMOS LA CANTIDAD DE PRODUCTOS EN EL CARRO DE COMPRAS
		mostrarCantidadPedidos();

	}else{

		if(currentLocation == "index.html"){
			var infoUsuario = "";
			infoUsuario += '<p><img align="left" src="FrontEnd/images/logo/logoWhiteNavBar.PNG"/>BE</p>';
			document.getElementById("infoUsuario").innerHTML = infoUsuario;
		}else{
			var infoUsuario = "";
			infoUsuario += '<p><img align="left" src="../images/logo/logoWhiteNavBar.PNG"/>BE</p>';
			document.getElementById("infoUsuario").innerHTML = infoUsuario;
		}
	}
}

// -------------------- FUNCION PARA CERRAR SECCION --------------------
//DEBEMOS DE ESPERAR A TENER EL NAV BAR CON EL CARRITO DE COMPRAR PARA AÑADIR ESTO
function CerrarSeccion(){
	firebase.auth().signOut().then(function() {
		window.alert("seccion cerrada correctamente");
		localStorage.setItem("USERKEY2", "false");
		if(currentLocation != "index.html"){
			window.location.href="../../index.html";
		}else{
			window.location.href="index.html";
		}
	}, function(error) {
    	windows.alert("Un error ha sucedido, por favor comuniquese con lancha para mas informacion");
	});
}


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
  //window.location.href="product_details.html";
  window.open("FrontEnd/vistas/productoSimple.html");

}

// -------------------- FUNCION PARA ACTUALIZAR LA CANTIDAD DE PRODUCTOS EN EL NAV-BAR--------------------
function mostrarCantidadPedidos(){
	var numeroPedidos = "";
	var tamañoArregloPedidos = [];

	firebaseRef.child("USUARIOS").child(userL).child("/carritoCompras/productos").on("child_added", function(snapshot) {
		tamañoArregloPedidos.push(snapshot.val().cantidad);
	});

	console.log(tamañoArregloPedidos);
	setTimeout(function() {
		if(currentLocation != "index.html"){
			numeroPedidos = '<a href="carritoCompras.html" style="height: 75px; line-height: 75px;"><i class="fa fa-shopping-cart"></i> Carrito('+ (tamañoArregloPedidos.length + 1) + ')</a>';
		}else{
			numeroPedidos = '<a href="FrontEnd/vistas/carritoCompras.html" style="height: 75px; line-height: 75px;"><i class="fa fa-shopping-cart"></i> Carrito('+ (tamañoArregloPedidos.length + 1) + ')</a>';
		}
		document.getElementById("cantidadPedidos").innerHTML = numeroPedidos;
	}, 1000);
	
}
