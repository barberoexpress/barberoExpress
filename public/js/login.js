/*var config = {
    apiKey: "AIzaSyD1UUijWvL3lVdaCNUBRVwS_tntGpBPCxM",
    authDomain: "barberoexpress-8c13c.firebaseapp.com",
    databaseURL: "https://barberoexpress-8c13c.firebaseio.com",
    projectId: "barberoexpress-8c13c",
    storageBucket: "barberoexpress-8c13c.appspot.com",
    messagingSenderId: "634083713883"
};
firebase.initializeApp(config);*/

var firebaseRef = firebase.database().ref();
var firebaseAuth = firebase.auth();
var ref;


/* FUNCION PARA TOMAR INFORMACION CON GOOGLE */
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  var loggearGoogle;
  var email = profile.getEmail();
  var password = "QWERTY123";
  var nombre = profile.getName();
  var errores = false;

  /*CHEKEAMOS SI DEBEMOS LOGGEAR CON GOOGLE O CREARLE UNA CUENTA AL USUARIO CON GOOGLE */
  var SearchRef = firebase.database().ref("USUARIOS");
  SearchRef.orderByChild('correo').equalTo(email).on("child_added", function(snapshot) {
    loggearGoogle = snapshot.val().email;
  });
  console.log(loggearGoogle);
  setTimeout(function() {
    //ESTAMOS YA REGISTRADOS
    if(loggearGoogle.length > 5){

      //INICIAMOS SESION
      firebaseAuth.signInWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      //MANEJO DE ERRORES
      if (errorCode === 'auth/wrong-password'){
              errores = true;
              alert('Contraseña equivocada.');
              return;
            } else if (errorCode === 'auth/user-not-found'){
              errores = true;
              alert('Usuario no encontrado.');
              return;

            } else if(errorCode === 'auth/invalid-email'){
              errores = true;
              alert('Email invalido.');
              return;

            } else if(errorCode === 'auth/user-disabled'){
              errores = true;
              alert('Usuario bloqueado.');
              return;

            }else{
              errores = true;
              alert(errorMessage);
              return;
            }
      });

    }//NO ESTAMOS REGISTRADOS
    else{

      //NOS REGISTRAMOS
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
    }

  }, 2000);


  setTimeout(function(){
    if(errores == false && loggearGoogle.length < 5){
      InformacionBaseDatos(email,nombre);
    }
  },1000);

  localStorage.setItem("USERNAME2", nombre);
  window.location.href="../../index.html";


  /*console.log('ID: ' + profile.getId()); 
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());*/
  
}


//FUNCION DE AGREGAR INFORMACION A LA DB
function InformacionBaseDatos(correo,nombre){
  var ref = firebaseRef.child("USUARIOS");
  ref.push({
    correo: correo,
    nombre: nombre,
    apellido: "null",
    telefono: {telefonoCelular: "null", telefonoFijo: "null"},
    direccion: {direccion: "null", direccion2: "null", ciudad:"null", informacionAdicional: "null"},
    carritoCompras: {vaciar:"false",keyUsuario:"null"},
    foto: "null",
    historialCompras: "null"
  });
}





/* FUNCION PARA INICIAR SESION SI NO ES CON GOOGLE */
function IniciarSeccion(){
	var email = document.getElementById('inputEmail').value;
	var password = document.getElementById("inputPassword").value;
  var errores = false;


	firebaseAuth.signInWithEmailAndPassword(email, password).catch(function(error) {
	  var errorCode = error.code;
	  var errorMessage = error.message;

	  //MANEJO DE ERRORES
	  if (errorCode === 'auth/wrong-password'){
            errores = true;
            alert('Contraseña equivocada.');
            return;
          } else if (errorCode === 'auth/user-not-found'){
            errores = true;
            alert('Usuario no encontrado.');
            return;

      	  } else if(errorCode === 'auth/invalid-email'){
            errores = true;
      	  	alert('Email invalido.');
      	  	return;

      	  } else if(errorCode === 'auth/user-disabled'){
            errores = true;
      	  	alert('Usuario bloqueado.');
      	  	return;

      	  }else{
            errores = true;
      	  	alert(errorMessage);
      	  	return;
      	  }
	});
  setTimeout(function() {
    if(errores == false){
      window.alert("Bienvenido " + email + " que bueno tenerte de vuelta");
    }
  }, 1000);
	
  setTimeout(function(){
    if(errores == false){
      window.location.href="../../index.html";
    }
  }, 1000);
  

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
     localStorage.setItem("USERNAME2", snapshot.val().nombre);
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
    var keyP = localStorage.getItem("PROD_KEY")

   ref.child("carritoCompras/productos").push({
      nombre: nombre,
      precio: precio,
      cantidad: cantidad,
      id: id,
      key: keyP,
      marca: marca,
      descuento: descuento,
      foto: foto
    });
    window.alert("Producto Agregado");
    //window.location.href="product_summary.html";
    window.location.href= "carritoCompras.html";
  } else {
    window.alert("Inicia sesion primero");
  }
}

// -------------------- FUNCION PARA IR A LA VENTANA DE CADA PRODUCTO -------------------- RESPLICADOOOOOO, BORRAR, YA ESTA EN FIREBASEBARBERO
function Ir_producto(prodKey){
  localStorage.setItem("PROD_KEY", prodKey);
  window.location.href= "productoSimple.html";

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




