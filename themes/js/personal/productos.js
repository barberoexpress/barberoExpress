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
    var registros_por_pagina = 6;
    var total_registros = 0;
  	var imagenes = '<ul class="thumbnails">';
    var paginas = '<ul>' + '<li><a href="#" onclick="paginaAnterior()">&lsaquo;</a></li>';
  	var rows = 1;
  	var foto_Url = [" ", " "];
  	var nombre = [" ", " "];
    var precio = [" ", " "];
    var descripcion = [" ", " "];
    var keyProducto = [" ", " "];
    //SI QUEREMOS AGREGAR MAS VALORES, PONERLOS ARRIBA
  	var refProductos = firebase.database().ref("PRODUCTOS");
    // ---------------------------------- DEBERIA DE HACER ESTE QUERING SOLO 1 VEZ Y PASARLO POR LOCALSTORAGE (+ VELCIDAD )--------------------------------------------
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

  	setTimeout(function(){
  	  var j = 2;
  		while(j < 6){
// ---------------------------------- CAMBIAR HTML DE IMAGENES--------------------------------------------
        imagenes += '<li class="span3">';
    		imagenes += '<div class="thumbnail">';
    		imagenes +=	'<img src="'+foto_Url[j]+'" onclick="Ir_producto('+"'"+ keyProducto[j]+"'"+')" style="width:200px;height:200px;" alt=""/>';
    		imagenes +=	'<div class="caption">';                                    
    		imagenes +=	'<h5>'+ nombre[j] +'</h5>';
    		imagenes +=	'<p>'+ descripcion[j] +'</p>';
    		imagenes +=	'<h4 style="text-align:center"><a class="btn" href="product_details.html"> <i class="icon-zoom-in"></i></a> <a class="btn" onclick="Ir_producto('+"'"+ keyProducto[j]+"'"+')">Add to <i class="icon-shopping-cart"></i></a> <a class="btn btn-primary" href="#">&dollar;'+precio[j]+'</a></h4>';
    		imagenes +=	'</div>';
    		imagenes +=	'</div>';
    		imagenes += '</li>';

  			j++;
  		}
      imagenes += '</ul>';
               +  '<hr class="soft"/>';
  		document.getElementById("blockView").innerHTML = imagenes;
// ---------------------------------- CAMBIAR HTML DE PAGINAS--------------------------------------------
      var k = 1;
      while(k < total_registros/registros_por_pagina){
        paginas += '<li><a href="#" onclick="cambiar_pagina(' + k + ')">' + k + '</a></li>';
        k++;
      }
      paginas += ' <li><a href="#">...</a></li>';
      paginas += '<li><a href="#" onclick="paginaSiguiente()">&rsaquo;</a></li>';
      paginas += '</ul>'
      document.getElementById("paginas").innerHTML = paginas;

    }, 4000);

// ---------------------------------- DESDE ACA COMIENZA LAS FUNCIONES DE PAGINACION --------------------------------------------
function paginaAnterior(){
  if (pagina_actual > 1) {
        pagina_actual--;
        cambiar_pagina(pagina_actual);
    }
    console.log("pagina actual: " + pagina_actual);
}

function paginaSiguiente(){
   if (pagina_actual < numPags()) {
        pagina_actual++;
        cambiar_pagina(pagina_actual);
    }
    console.log("pagina actual: " + pagina_actual);

}

function numPags()
{
    return Math.ceil(total_registros / registros_por_pagina);
}

function cambiar_pagina(pagina_actual){
      imagenes = '<ul class="thumbnails">';
      var j = (pagina_actual-1) * registros_por_pagina + 2;
      while(j < pagina_actual * registros_por_pagina){

      imagenes += '<li class="span3">';
      imagenes += '<div class="thumbnail">';
      imagenes += '<img src="'+foto_Url[j]+'" onclick="Ir_producto('+"'"+ keyProducto[j]+"'"+')" style="width:200px;height:200px;" alt=""/>';
      imagenes += '<div class="caption">';                                    
      imagenes += '<h5>'+ nombre[j] +'</h5>';
      imagenes += '<p>'+ descripcion[j] +'</p>';
      imagenes += '<h4 style="text-align:center"><a class="btn" href="product_details.html"> <i class="icon-zoom-in"></i></a> <a class="btn" onclick="Ir_producto('+"'"+ keyProducto[j]+"'"+')">Add to <i class="icon-shopping-cart"></i></a> <a class="btn btn-primary" href="#">&dollar;'+precio[j]+'</a></h4>';
      imagenes += '</div>';
      imagenes += '</div>';
      imagenes += '</li>';

        j++;
      }
      imagenes += '</ul>';
               +  '<hr class="soft"/>';
               +  '</div>';
      document.getElementById("blockView").innerHTML = imagenes;
      console.log("cambio de pagina exitoso: " + pagina_actual);

}