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
  var count = 0;

	SearchRef.orderByChild('correo').equalTo(correo).on("child_added", function(snapshot) {
		 key = snapshot.key;
		 ref = firebase.database().ref("USUARIOS/" + key);
     localStorage.setItem("USERKEY2", key);
     //DEBEMOS DE ESPERAR A TENER EL NAV BAR CON EL CARRITO DE COMPRAS PARA AÑADIR ESTO
		 /*nombre = snapshot.val().nombre;
     if(nombre.toString() == "null"){
      nombre = "Mi cuenta";
     }

		 document.getElementById("Usuario").innerHTML = '<strong>' + nombre + '<strong>';*/

    ref.child("carritoCompras").once('value', function(snapshot) {
    var count = 0;
    snapshot.forEach(function(childSnapshot) {
      count++;
    });
      //DEBEMOS DE ESPERAR A TENER EL NAV BAR CON EL CARRITO DE COMPRAR PARA AÑADIR ESTO
      //document.getElementById("numeroProductos").innerHTML = count;
    });

	});



	//document.getElementById("numeroProductos").innerHTML = localStorage.getItem("PRODCUTOSCARRO");
  } else {
    console.log("nadie ha iniciado seccion");
  }
});




// -------------------- FUNCION PARA CERRAR SECCION --------------------
//DEBEMOS DE ESPERAR A TENER EL NAV BAR CON EL CARRITO DE COMPRAR PARA AÑADIR ESTO
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
    var precioHTML = $("#precioProducto").text();
    var precio = precioHTML.substring(1);
    var id = parseInt($("#id_Producto").text());
    var cantidad = document.getElementById( "cantidad" ).value;

    var marca = $("#marcaProducto").text();
    var descuento = "0";
    var foto = $('#imagenProducto').attr('src');
    /*var labelProductosCarro = Number($("#numeroProductos").text()) + 1;
    document.getElementById("numeroProductos").innerHTML = labelProductosCarro;*/ //ESTO ES PARA MODIFICAR EL LABEL DEL CARRO

   ref.child("carritoCompras").push({
      nombre: nombre,
      precio: precio,
      cantidad: cantidad,
      id: id,
      marca: marca,
      descuento: descuento,
      foto: foto
    });
    window.alert("Producto Agregado");
    //window.location.href="product_summary.html";
    window.open("carritoCompras.html");
  } else {
    window.alert("Inicia seccion primero");
  }
}

// -------------------- FUNCION PARA IR A LA VENTANA DE CADA PRODUCTO --------------------
function Ir_producto(prodKey){
  localStorage.setItem("PROD_KEY", prodKey);
  /* es preferible abrir una pestaña nueva con el producto para que el ususario
   no pierda su busqueda y pueda seguir viendo productos
  */
  //window.location.href="product_details.html";
  window.open("productoSimple.html");

}

//--------------------- Funcion Para sumar uno -----------//
function sumarUno(){
  var valor = document.getElementById( "cantidad" ).value;
  var num = parseInt( valor );
    console.log("valor: "+valor+" num: "+num);
    num++;
    console.log("valor: "+valor+" num: "+num);
  //document.getElementById( "cantidad" ).innerHTML = num ;
  document.getElementById("cantidad").value = num ;
}
//---------------- Funcion Para restar sin pasarse de 0---//
function restarUnoCompras(){
  var valor = document.getElementById( "cantidad" ).value;
  var num = parseInt( valor );
    console.log("valor: "+valor+" num: "+num);
    if(num <= 1){
      num = 1;
    }else{
      num--;
    }
    console.log("valor: "+valor+" num: "+num);
    document.getElementById("cantidad").value = num ;
}

// -------------------- FUNCION PARA USAR EL BUSCADOR --------------------
function Buscar(){
  var queryText = document.getElementById("srchFld").value;
  var foto_Url = [" ", " "];
  var nombre = [" ", " "];
  var precio = [" ", " "];
  var descripcion = [" ", " "];
  var keyProducto = [" ", " "];

  if(queryText.length > 2){
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

    setTimeout(function(){
      localStorage.setItem("FOTO_URL_BS", JSON.stringify(foto_Url));
      localStorage.setItem("NOMBRE_BS", JSON.stringify(nombre));
      localStorage.setItem("PRECIO_BS", JSON.stringify(precio));
      localStorage.setItem("DESCRIPCION_BS", JSON.stringify(descripcion));
      localStorage.setItem("KEYPRODUCTO_BS", JSON.stringify(keyProducto));
      window.location.href="buscar-4columnas.html";
    }, 1000);

  }else{
    localStorage.setItem("FOTO_URL_BS", JSON.stringify(foto_Url));
    localStorage.setItem("NOMBRE_BS", JSON.stringify(nombre));
    localStorage.setItem("PRECIO_BS", JSON.stringify(precio));
    localStorage.setItem("DESCRIPCION_BS", JSON.stringify(descripcion));
    localStorage.setItem("KEYPRODUCTO_BS", JSON.stringify(keyProducto));
    window.location.href="buscar-4columnas.html";
  }
}


function Delete_search_icon(){
  $("#srchFld").toggleClass("move");
}
