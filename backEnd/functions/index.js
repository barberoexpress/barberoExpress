var functions = require('firebase-functions');

//Acceso admin
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase, inetnto chorromil");
//  console.log("A la verga todo :v");
// });

exports.totalizarCarrito = functions.database
.ref('/USUARIOS/{USUARIOSID}/carritoCompras')
.onWrite(event =>{ 
	// esto es para coger la infurmacion de todo el carrito de compras
	const carritoCompra = event.data.val()
	console.log(carritoCompra.vaciar.isVerified)
	// preguntamos por vaciar, para que no entre 2 veces
	if (carritoCompra.vaciar.isVerified == 'true') {
		console.log("se fue")
		return
	}
	// aqui modificamos el valor vaciar
	carritoCompra.vaciar.isVerified = true
	console.log("entro  >:v")


	var eventSnapshot = event.data; // Get carrito data
    var itemsSnapshot = eventSnapshot.child('productos'); // Get items data
    var totalSD = 0 ;

    // --- Pedido ----

		//var pedido ={productos:[],total:0};
		//var listaP =[];
		var productos =[];
		/*
		var info ={
				id:0,
				nombreUsuario: " ",
				totalPesos: 0,
				direccionEntrega:"", 
				telefonoContacto: "",
				comoLlegar:""
				};
		*/
	//var rootRef = functions.database.ref('/USUARIOS/{USUARIOSID}/carritoCompras')
	//const referencia = event.data.ref.parent;
	//var hola = referencia.parent; 
	//console.log("padre: " + hola )
	//var coso = referencia.data.val()

	//console.log("nombre Usuario: " + coso.nombre)

    itemsSnapshot.forEach(function(itemSnapshot) { // For each item
        //var itemKey = itemSnapshot.key; // Get item key
        var itemData = itemSnapshot.val(); // Get item data
        console.log("id: "+ itemData.id)
        console.log("precio: "+ itemData.precio)
        var llave = itemData.key;

        console.log("llave: " + llave)
        /* //pasar de "," a "." en float
        var values = itemData.precio.split(",")
		var v1 = parseFloat(values[0])
		var v2 = parseFloat(values[1])
		var value = parseFloat(itemData.precio.replace(",", "."));
		console.log("float: "+ value)
		*/	
		var value = parseFloat(itemData.precio);
		
		/*
		var ref = event.data.ref.root;
		console.log("/PRODUCTOS"+"/"+yave)
  		var producto = ref.child("/PRODUCTOS"+"/"+yave)

  		//console.log("producto: "+ producto)
  		var productoData = producto.data;
  		var klp = productoData.val();
  		console.log("precioReal: " + klp.precio)
  		*/
		
		// ---- DATOS INSEGUROS -------
		var cantidad = parseInt(itemData.cantidad);
		var nombre = itemData.nombre;
		var marca = itemData.marca;
		
		var producto ={
			nombre: nombre,
			marca: marca,
			cantidad: cantidad,
			precio: value
		};
		
		productos.push(producto);

		/*
		pedido.child("productos").push({
			nombre: nombre,
			marca: marca,
			cantidad: cantidad,
			precio: value
		});
		*/
		totalSD += (value * cantidad);
		


		//aqui mas adelante hacer descuento

    });
    console.log("Total: " + totalSD)
	// cambiamos la informacion del DataBase por el nuevo carritoCompras
	
	carritoCompra.total = totalSD

	/*
	const algo = event.data.ref.parent.once("value").then(snap => {
      const post = snap.val();
      // do stuff with post here
      info.nombreUsuario = post.nombre +" "+ post.apellido;
      info.telefonoContacto = post.telefono.telefonoCelular;
      info.direccionEntrega = post.direccion.direccion;
      info.comoLlegar = post.direccion.informacionAdicional;
    });
	*/
	
	//info.totalPesos = totalSD;
	

	const promise = event.data.ref.set(carritoCompra)

	//return ref.child("PEDIDOS").push({pedido});
	//admin.database().ref('FACTURAS').set(pedido)
	//return ref.child("FACTURAS").set(pedido);
	//firebaseRef.child("events").push(data);
	var info = getDatosPadre(event);
	info.totalPesos = totalSD;
	var ref = event.data.ref.root;
  	return ref.child("PEDIDOS").push({productos:productos,info:info});
  	//return ref.child("PEDIDOS").push(info);
	return promise
})

function getDatosPadre(event) {
	return event.data.ref.parent.once("value").then(snap => {
      const post = snap.val();
      // do stuff with post here
      informacion ={
				id:0,
				nombreUsuario: " ",
				totalPesos: 0,
				direccionEntrega:"", 
				telefonoContacto: "",
				comoLlegar:""
				};

      informacion.nombreUsuario = post.nombre +" "+ post.apellido;
      informacion.telefonoContacto = post.telefono.telefonoCelular;
      informacion.direccionEntrega = post.direccion.direccion;
      informacion.comoLlegar = post.direccion.informacionAdicional;
      return informacion;
    });
}
/*
exports.productosMin = functions.database
.ref('/PRODUCTOS')
.onWrite(event =>{
	
	//var raiz = event.data.ref.root;

	return event.data.ref.parent.once("value").then(snap => {
    	const post = snap.val();
      	// do stuff with post here
      	var eventSnapshot = snap.data; 
    	var itemsSnapshot = eventSnapshot.child('PRODUCTOS'); // Get items data
      	
      	itemsSnapshot.forEach(function(itemSnapshot) { // For each item
        //var itemKey = itemSnapshot.key; // Get item key
        	var itemData = itemSnapshot.val(); // Get item data
        	console.log("id: "+ itemData.id)
        	console.log("precio: "+ itemData.precio)
    	});

    });
    
})
*/

