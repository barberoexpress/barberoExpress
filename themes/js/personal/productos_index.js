

  var imagenes = '<ul class="thumbnails" id= "fotos_index">';
  var rows = 1;
  var foto_Url = [" ", " "];
  var nombre = [" ", " "];
  var precio = [" ", " "]
  var keyProducto = [" ", " "];
  var descripcion = [" ", " "];
  var recomendado = [" ", " "];
        //SI QUEREMOS AGREGAR MAS VALORES, PONERLOS ARRIBA
  var refProductos = firebase.database().ref("PRODUCTOS");


          refProductos.orderByChild("id").on("child_added", function(snapshot){
            foto_Url.push(snapshot.val().foto);
            nombre.push(snapshot.val().nombre);
            precio.push(snapshot.val().precio);
            descripcion.push(snapshot.val().descripcion);
            recomendado.push(snapshot.val().recomendado);
            keyProducto.push(snapshot.key);
          });
  

          
    setTimeout(function(){
            //var j = 2;
            var j = Math.floor((Math.random() * 10) + 2);
            var estatica = j + 8;
            while(j < estatica){
              imagenes += '<li class="span3">';
              imagenes += '<div class="thumbnail">';
              imagenes += '<img src="'+foto_Url[j]+'" onclick="Ir_producto('+"'"+ keyProducto[j]+"'"+')" style="width:200px;height:200px;" alt=""/>';
              imagenes += '<div class="caption">';                                    
              imagenes += '<h5>'+ nombre[j] +'</h5>';
              imagenes += '<p> Tocamela toda </p>';
              imagenes += '<h4 style="text-align:center"><a class="btn" href="product_details.html"> <i class="icon-zoom-in"></i></a> <a class="btn" href="#">Añadir <i class="icon-shopping-cart"></i></a> <a class="btn btn-primary" href="#">&dollar;'+precio[j]+'</a></h4>';
              imagenes += '</div>';
              imagenes += '</div>';
              imagenes += '</li>';
              j++;
    }
      document.getElementById("fotos_index").innerHTML = imagenes + '</ul>';
    }, 3000);


   setTimeout(function(){
          var imagenes_referidos = '<div class="item active">' + '<ul class="thumbnails">';
          var j = 2;
          var No_productos = 0;
          var completo = false;
            while(j < recomendado.length){
              if(recomendado[j] == true){
                if(No_productos == 4){
                  No_productos = 0;
                  imagenes_referidos += '</ul>' + '</div>';
                  imagenes_referidos += '<div class="item">' + '<ul class="thumbnails">';
                }
                imagenes_referidos += '<li class="span3">';
                imagenes_referidos += '<div class="thumbnail">';
                imagenes_referidos += '<i class="tag"></i>';
                imagenes_referidos += '<img src="'+foto_Url[j]+'" onclick="Ir_producto('+"'"+ keyProducto[j]+"'"+')" style="width:200px;height:200px;" alt=""/>';
                imagenes_referidos += '<div class="caption">';
                imagenes_referidos += '<h5>'+ nombre[j] +'</h5>';
                imagenes_referidos += '<h4 onclick="Ir_producto('+"'"+ keyProducto[j]+"'"+')"><a class="btn"> Ver </a><span class="pull-right">$'+precio[j]+'</span></h4>';
                imagenes_referidos += '</div>';
                imagenes_referidos += '</div>';
                imagenes_referidos += '</li>';
                
                No_productos++;
              }
              j++;
            }
      document.getElementById("imagenes_recomendados").innerHTML = imagenes_referidos;
    }, 3000);
