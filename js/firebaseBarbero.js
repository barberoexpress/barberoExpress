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
      window.location.href="vistas/buscar-4columnas.html";
    }, 2000);
}


// -------------------- FUNCION PARA IR A LA VENTANA DE CADA PRODUCTO --------------------
function Ir_productoINDEX(prodKey){
  localStorage.setItem("PROD_KEY", prodKey);
  /* es preferible abrir una pestaña nueva con el producto para que el ususario
   no pierda su busqueda y pueda seguir viendo productos
  */
  //window.location.href="product_details.html";
  window.open("vistas/productoSimple.html");

}
