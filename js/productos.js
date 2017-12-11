/*var config = {
    apiKey: "AIzaSyD1UUijWvL3lVdaCNUBRVwS_tntGpBPCxM",
    authDomain: "barberoexpress-8c13c.firebaseapp.com",
    databaseURL: "https://barberoexpress-8c13c.firebaseio.com",
    projectId: "barberoexpress-8c13c",
    storageBucket: "barberoexpress-8c13c.appspot.com",
    messagingSenderId: "634083713883"
};
firebase.initializeApp(config);*/

//var firebaseRef = firebase.database().ref();
//var firebaseAuth = firebase.auth();




    var pagina_actual = 1;
    var registros_por_pagina = 12;
    var total_registros = 0;
  	var imagenes = '';
    var paginas = '<a href="#" onclick="paginaAnterior()">&lsaquo;</a>';
  	var rows = 1;
  	var foto_Url = [" ", " "];
  	var nombre = [" ", " "];
    var precio = [" ", " "];
    var descripcion = [" ", " "];
    var keyProducto = [" ", " "];
    var busqueda = false;

    //CONTROL DE CALLBACK DE FIREBASE
    var end = false;
    var time = 0;

    //SI QUEREMOS AGREGAR MAS VALORES, PONERLOS ARRIBA
  	var refProductos = firebase.database().ref("PRODUCTOS");
    // ---------------------------------- BUSQUEDA DE PRODUCTOS--------------------------------------------
  	var EstamosBuscando = JSON.parse(localStorage.getItem("NOMBRE_BS"));
    //var EstamosBuscando = "";
    if(EstamosBuscando!= null && EstamosBuscando.length > 2 && EstamosBuscando[3] != " "){
      foto_Url = JSON.parse(localStorage.getItem("FOTO_URL_BS"));
      nombre = JSON.parse(localStorage.getItem("NOMBRE_BS"));
      precio = JSON.parse(localStorage.getItem("PRECIO_BS"));
      descripcione = JSON.parse(localStorage.getItem("DESCRIPCION_BS"));
      keyProducto = JSON.parse(localStorage.getItem("KEYPRODUCTO_BS"));
      total_registros = nombre.length - 2;
      busqueda = true;

    }else{
 // ---------------------------------- DEBERIA DE HACER ESTE QUERING SOLO 1 VEZ Y PASARLO POR LOCALSTORAGE (+ VELCIDAD )-------------------------------------------- carlos azabustre
      for(var r = 0; r < rows; r++)
    	{
    		refProductos.orderByChild("id").on("child_added", function(snapshot){
    			foto_Url.push(snapshot.val().foto);
    			nombre.push(snapshot.val().nombre);
          precio.push(snapshot.val().precio);
          descripcion.push(snapshot.val().descripcion);
          keyProducto.push(snapshot.key);
          total_registros++;
    		});
    	}
  }

    setTimeout(function(){
      while (end == false && time < 500000){
        if(nombre[2] != null){
          end = true;
        }
        time +=0.1;
        if (time >= 500000){
          alert("Mala conexión a Internet, intenta cargar la pagina de nuevo");
          time = 500001;
        }

      }
      ActualizarBuscador();
  }, 2000); //700 firefox -> chrome 2000

  	//setTimeout(function(){

      function ActualizarBuscador(){
  	  var j = 2;
      var no_imagenes = 12;
      if (busqueda){if(total_registros < 12){no_imagenes = total_registros + 2}}
  		while(j < no_imagenes){
// ---------------------------------- CAMBIAR HTML DE IMAGENES--------------------------------------------
        imagenes += '<div class="col-md-3 col-lg-3 mb-60 mb-xs-40">';
    		imagenes += '<div class="post-prev-img">';
    		imagenes +=	'<img src="'+foto_Url[j]+'" onclick="Ir_producto('+"'"+ keyProducto[j]+"'"+')" alt=""/>';
        imagenes += '</div>';
    		imagenes +=	'<div class="post-prev-title font-alt align-center">';
    		imagenes +=	'<h5>'+ nombre[j] +'</h5>'; //CAMBIAR EL ESTILO DE LETRA Y AGREGAR EL IR_PRODUCTO
    		imagenes += '</div>';
        //imagenes +=	'<p>'+ descripcion[j] +'</p>';
        imagenes += '<div class="post-prev-text align-center">';
        imagenes += '<strong>$ '+ precio[j] + '</strong>';
        imagenes += '</div>';
        imagenes += '<div class="post-prev-more align-center">';
        imagenes += ' <a class="btn btn-mod btn-gray btn-round" onclick="Ir_producto('+"'"+ keyProducto[j]+"'"+')"> <i class="fa fa-shopping-cart"></i> Añadir al carro </a>';
    		//imagenes +=	'<h4 style="text-align:center"> <a class="btn" onclick="Ir_producto('+"'"+ keyProducto[j]+"'"+')"> <i class="icon-zoom-in"></i> <i class="icon-shopping-cart"></i></a> <a class="btn btn-primary" href="#">&dollar;'+precio[j]+'</a></h4>';
    		imagenes +=	'</div>';
    		imagenes +=	'</div>';
  			j++;
  		}
  		document.getElementById("blockView").innerHTML = imagenes;
// ---------------------------------- CAMBIAR HTML DE PAGINAS--------------------------------------------
      var k = 1;
      while(k <= total_registros/registros_por_pagina){
        paginas += '<a href="#" onclick="cambiar_pagina(' + k + ')">' + k + '</a>';
        k++;
      }
      paginas += '<a class="no-active">...</a>';
      paginas += '<a href="#" onclick="paginaSiguiente()">&rsaquo;</a>';
      document.getElementById("paginas").innerHTML = paginas;
      }

    //}, 4000);

// ---------------------------------- DESDE ACA COMIENZA LAS FUNCIONES DE PAGINACION (LA PAGINACION NO DEBE ESTAR CLIENT-SIDE) --------------------------------------------
function paginaAnterior(){
  if (pagina_actual > 1) {
        pagina_actual--;
        cambiar_pagina(pagina_actual);
    }
}

function paginaSiguiente(){
   if (pagina_actual < numPags()) {
        pagina_actual++;
        cambiar_pagina(pagina_actual);
    }
}

function numPags()
{
    return Math.ceil(total_registros / registros_por_pagina);
}

function cambiar_pagina(pagina_actual){
      imagenes = '<ul class="thumbnails">';
      var j = (pagina_actual-1) * registros_por_pagina + 2;
      while(j < pagina_actual * registros_por_pagina){

       imagenes += '<div class="col-md-3 col-lg-3 mb-60 mb-xs-40">';
        imagenes += '<div class="post-prev-img">';
        imagenes += '<img src="'+foto_Url[j]+'" onclick="Ir_producto('+"'"+ keyProducto[j]+"'"+')" alt=""/>';
        imagenes += '</div>';
        imagenes += '<div class="post-prev-title font-alt align-center">';
        imagenes += '<h5>'+ nombre[j] +'</h5>'; //CAMBIAR EL ESTILO DE LETRA Y AGREGAR EL IR_PRODUCTO
        imagenes += '</div>';
        //imagenes += '<p>'+ descripcion[j] +'</p>';
        imagenes += '<div class="post-prev-text align-center">';
        imagenes += '<strong>$ '+ precio[j] + '</strong>';
        imagenes += '</div>';
        imagenes += '<div class="post-prev-more align-center">';
        imagenes += ' <a class="btn btn-mod btn-gray btn-round"><i class="fa fa-shopping-cart"></i> Añadir al carro</a>'
        //imagenes += '<h4 style="text-align:center"> <a class="btn" onclick="Ir_producto('+"'"+ keyProducto[j]+"'"+')"> <i class="icon-zoom-in"></i> <i class="icon-shopping-cart"></i></a> <a class="btn btn-primary" href="#">&dollar;'+precio[j]+'</a></h4>';
        imagenes += '</div>';
        imagenes += '</div>';

        j++;
      }
      document.getElementById("blockView").innerHTML = imagenes;

}
