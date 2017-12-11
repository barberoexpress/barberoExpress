var imagenes = '<ul class="thumbnails" id= "fotos_index">';
var rows = 1;
var foto_Url = [" ", " "];
var nombre = [" ", " "];
var precio = [" ", " "]
var keyProducto = [" ", " "];
var descripcion = [" ", " "];
var recomendado = [" ", " "];

//CONTROL DE CALLBACK DE FIREBASE
var end = false;
var time = 0;

/* SE INGRESA A LA BASE DE DATOS
** Y SE TRAEN TODOS LOS PRODUCTOS
** foto: string
** nombre: string
** precio: string
+* descripcion: string
** recomendado: boolean
** keyProducto: string
*/
var refProductos = firebase.database().ref("PRODUCTOS");


refProductos.orderByChild("id").on("child_added", function(snapshot) {
  foto_Url.push(snapshot.val().foto);
  nombre.push(snapshot.val().nombre);
  precio.push(snapshot.val().precio);
  descripcion.push(snapshot.val().descripcion);
  recomendado.push(snapshot.val().recomendado);
  keyProducto.push(snapshot.key);
});

// CICLO QUE ESPERA PARA CARGAR
if (navigator.userAgent.indexOf("Chrome") != -1) {
  setTimeout(function() {
    while (end == false && time < 500000) {
      if (nombre[24] != null) {
        end = true;
      }
      time += 0.1;
      if (time >= 500000) {
        alert("Mala conexión a Internet, intenta cargar la pagina de nuevo");
        time = 500001;
      }

    }
    //Fotos_Index();
    Imegenes_Recomendadas();
  }, 2000);


} else {
  setTimeout(function() {
    while (end == false && time < 500000) {
      if (nombre[24] != null) {
        end = true;
      }
      time += 0.1;
      if (time >= 500000) {
        alert("Mala conexión a Internet, intenta cargar la pagina de nuevo");
        time = 500001;
      }

    }
    //Fotos_Index();
    Imegenes_Recomendadas();
  }, 1000);

}




function Imegenes_Recomendadas() {
  //setTimeout(function(){
  // var imagenes_referidos = '<div class="item active">' + '<ul class="thumbnails">';
  var imagenes_referidos = '';
  var j = 2;
  var No_productos = 0; // CANTIDAD DE PRODUCTOS A MOSTRAR
  var completo = false;
  var contador = 0;
  while (j < recomendado.length && contador < 3) {
    if (recomendado[j] == true) {
      imagenes_referidos += '<div class="col-sm-4 mb-xs-30 wow fadeInUp" data-wow-delay="0.' + contador + 's">'
                            + '<div class="team-item">'
                              + '<div class="team-item-image">'
                                + '<img src="' + foto_Url[j] + '" onclick="Ir_producto(' + "'" + keyProducto[j] + "'" + ')" alt=""/>'
                                + '<div class="team-item-detail">'
                                  + '<h4 class="font-alt normal">Nice to meet!</h4>'
                                  + '<p> Curabitur augue, nec finibus mauris pretium eu. Duis placerat ex gravida nibh tristique porta.</p>'
                                  + '<div class="team-social-links">'
                                    + '<a href="#" target="_blank"><i class="fa fa-facebook"></i></a>'
                                    + '<a href="#" target="_blank"><i class="fa fa-twitter"></i></a>'
                                    + '<a href="#" target="_blank"><i class="fa fa-pinterest"></i></a>'
                                  + '</div>'
                                + '</div>'
                              + '</div>'
                              + '<div class="team-item-descr font-alt">'
                                + '<div class="team-item-name">'
                                  + nombre[j]
                                + '</div>'
                                + '<div class="team-item-role">'
                                  + '$' + precio[j]
                                + '</div>'
                              + '</div>'
                            + '</div>'
                          + '</div>';
      No_productos++;
      contador++;
    }
    j++;
  }
  document.getElementById("imagenes_recomendados").innerHTML = imagenes_referidos;
  //}, 3000);
}


// CARGA IMAGENES POR TIPOS (PORTAFOLIO)
function imagenesTipos(){
  var imagenesTipo = '';
  var j = 2;
  var noProductos = 5; // 5 - 2 = 3
  var completo = false;
  while(j < noProductos){
    var aleatorio = Math.floor((Math.random() * 18) + 2);
    imagenesTipo +='<li class="work-item mix general">'
                    + '<a href="portfolio-single-1.html" class="work-ext-link">'
                      + '<div class="work-img">'
                        + '<img class="work-img" src="'+ foto_Url[aleatorio] + '" alt="Work" />'
                      + '</div>'
                      + '<div class="work-intro">'
                        + '<h3 class="work-title">' + nombre[aleatorio] + '</h3>'
                        + '<div class="work-descr">'
                          + 'Barbero Express'
                        + '</div>'
                      + '</div>'
                    + '</a>'
                    + '<div class="">'
                      + '<p class="text-center">' + nombre[aleatorio] + ' </br> $' + precio[aleatorio] + '</p>'
                    + '</div>'
                  + '</li>';
    j++;
  }
  document.getElementById("work-grid").innerHTML = imagenesTipo;
}


//CARGAR IMAGENES PORTAFOLIO RESUMEN
function imagenesPortafolioGeneral(){
  var imagenesPortafolio = '';
  var j = 0;
  var noProductos = 6;
  var ubicacionImagen = ["images/portAfolio/barbera.jpg","images/portafolio/maquina.jpg","images/portafolio/tijeras.jpg","images/portafolio/brush.jpg","images/portafolio/crazyGel.jpg","images/portafolio/espuma.jpg"];
  var nombreImagen = ["BARBERAS/CUCHILLAS","MÁQUINAS","TIJERAS","SACUDIDORES/OTROS","CERAS/GEL","TÓNICOS/ESPUMAS"];
  var contador = 0;
    imagenesPortafolio += '<!-- Work Item (External Page) -->'
                        + '<li class="work-item mix general barberasCuchillas">'
                        + '<a href="portfolio-single-1.html" class="work-ext-link">'
                        + '<div class="work-img">'
                        + '<img class="work-img" src="images/portAfolio/barbera.jpg" alt="Work" />'
                        + '</div>'
                        + '<div class="work-intro">'
                        + '<h3 class="work-title">Barberas/Cuchillas</h3>'
                        + '<div class="work-descr">'
                        + 'La mejor calidad'
                        + '</div>'
                        + '</div>'
                        + '</a>'
                        + '<div class="">'
                        + '<p class="text-center">BARBERAS/CUCHILLAS</p>'
                        + '</div>'
                        + '</li>'
                        + '<!-- End Work Item -->'
                        + '<!-- Work Item (Lightbox) -->'
                        + '<li class="work-item mix general">'
                        + '<a href="images/portafolio/maquina.jpg" class="work-lightbox-link mfp-image">'
                        + '<div class="work-img">'
                        + '<img src="images/portafolio/maquina.jpg" alt="Work" />'
                        + '</div>'
                        + '<div class="work-intro">'
                        + '<h3 class="work-title">Máquinas</h3>'
                        + '<div class="work-descr">'
                        + 'Las mejores marcas'
                        + '</div>'
                        + '</div>'
                        + '</a>'
                        + '<div class="">'
                        + '<p class="text-center">MÁQUINAS</p>'
                        + '<!-- <p class="text-center">TÓNICO <br> $2.500</p> -->'
                        + '</div>'
                        + '</li>'
                        + '<!-- End Work Item -->'
                        + '<!-- Work Item (External Page) -->'
                        + '<li class="work-item mix general">'
                        + '<a href="portfolio-single-1.html" class="work-ext-link">'
                        + '<div class="work-img">'
                        + '<img class="work-img" src="images/portafolio/tijeras.jpg" alt="Work" />'
                        + '</div>'
                        + '<div class="work-intro">'
                        + '<h3 class="work-title">Tijeras</h3>'
                        + '<div class="work-descr">'
                        + 'Diseños especiales'
                        + '</div>'
                        + '</div>'
                        + '</a>'
                        + '<div class="">'
                        + '<p class="text-center">TIJERAS</p>'
                        + '</div>'
                        + '</li>'
                        + '<!-- End Work Item -->'
                        + '<!-- Work Item (External Page) -->'
                        + '<li class="work-item mix general">'
                        + '<a href="portfolio-single-1.html" class="work-ext-link">'
                        + '<div class="work-img">'
                        + '<img class="work-img" src="images/portafolio/brush.jpg" alt="Work" />'
                        + '</div>'
                        + '<div class="work-intro">'
                        + '<h3 class="work-title">Sacudidor/Otros</h3>'
                        + '<div class="work-descr">'
                        + 'El mejor complemento para tu trabajo.'
                        + '</div>'
                        + '</div>'
                        + '</a>'
                        + '<div class="">'
                        + '<p class="text-center">SACUDIDORES/OTROS</p>'
                        + '</div>'
                        + '</li>'
                        + '<!-- End Work Item -->'
                        + '<!-- Work Item (External Page) -->'
                        + '<li class="work-item mix general">'
                        + '<a href="portfolio-single-1.html" class="work-ext-link">'
                        + '<div class="work-img">'
                        + '<img class="work-img" src="images/portafolio/crazyGel.jpg" alt="Work" />'
                        + '</div>'
                        + '<div class="work-intro">'
                        + '<h3 class="work-title">Ceras/Gel</h3>'
                        + '<div class="work-descr">'
                        + 'Excelentes fragancias y calidad.'
                        + '</div>'
                        + '</div>'
                        + '</a>'
                        + '<div class="">'
                        + '<p class="text-center">CERAS/GEL</p>'
                        + '</div>'
                        + '</li>'
                        + '<!-- End Work Item -->'
                        + '<!-- Work Item (External Page) -->'
                        + '<li class="work-item mix general">'
                        + '<a href="portfolio-single-1.html" class="work-ext-link">'
                        + '<div class="work-img">'
                        + '<img class="work-img" src="images/portafolio/espuma.jpg" alt="Work" />'
                        + '</div>'
                        + '<div class="work-intro">'
                        + '<h3 class="work-title">Tónicos/Espumas</h3>'
                        + '<div class="work-descr">'
                        + 'Las mejores marcas de América'
                        + '</div>'
                        + '</div>'
                        + '</a>'
                        + '<div class="">'
                        + '<p class="text-center">TÓNICOS/ESPUMAS</p>'
                        + '</div>'
                        + '</li>'
                        + '<!-- End Work Item -->'
                        ;

  document.getElementById("work-grid").innerHTML = imagenesPortafolio;
}
