$(document).ready(function(){
  $("#busqueda1").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#table1 tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});
$(".dobleClick").on("dblclick", function() {

  $("#detalle").modal("show");

});

//alert
    $('#idBoton1').click(function () {
        $('#idAlert').show('fade');

        setTimeout(function () {
            $('#idAlert').hide('fade');
        }, 2000);

    });

    $('#lidBoton2').click(function () {
        $('#idAlert').hide('fade');
    });
// //inicio Administrar Productos
// $('#tblProd').ready(function(){
//     var listaProd = [
//         {
//             "idProd": 1,
//             "idCat": 1,
//             "nombre": "Bocas de chorizo",
//             "Precio": 5.75,
//             "es_preparado": 1
//         },
//         {
//             "idProd": 2,
//             "idCat": 1,
//             "nombre": "Nachos",
//             "Precio": 3.85,
//             "es_preparado": 1
//         },
//         {
//             "idProd": 3,
//             "idCat": 1,
//             "nombre": "Sopa de tortilla",
//             "Precio": 3,
//             "es_preparado": 1
//         },
//         {
//             "idProd": 4,
//             "idCat": 1,
//             "nombre": "Bocas de alitas",
//             "Precio": 4.55,
//             "es_preparado": 1
//         },
//         {
//             "idProd": 5,
//             "idCat": 1,
//             "nombre": "Tapas de jamones",
//             "Precio": 5.95,
//             "es_preparado": 1
//         },
//         {
//             "idProd": 6,
//             "idCat": 2,
//             "nombre": "Puyaso argentino",
//             "Precio": 12.50,
//             "es_preparado": 1
//         },
//         {
//             "idProd": 7,
//             "idCat": 2,
//             "nombre": "Milanesa de pollo",
//             "Precio": 9.99,
//             "es_preparado": 1
//         }
//     ]

//     llenarTabla(listaProd);
// });

// $('#btnEntradas').on('click', function(){
//     var listaProd = [
//         {
//             "idProd": 1,
//             "idCat": 1,
//             "nombre": "Bocas de chorizo",
//             "Precio": 5.75,
//             "es_preparado": 1
//         },
//         {
//             "idProd": 2,
//             "idCat": 1,
//             "nombre": "Nachos",
//             "Precio": 3.85,
//             "es_preparado": 1
//         },
//         {
//             "idProd": 3,
//             "idCat": 1,
//             "nombre": "Sopa de tortilla",
//             "Precio": 3,
//             "es_preparado": 1
//         },
//         {
//             "idProd": 4,
//             "idCat": 1,
//             "nombre": "Bocas de alitas",
//             "Precio": 4.55,
//             "es_preparado": 1
//         },
//         {
//             "idProd": 5,
//             "idCat": 1,
//             "nombre": "Tapas de jamones",
//             "Precio": 5.95,
//             "es_preparado": 1
//         }
//     ]

//     llenarTabla(listaProd);
// });

// $('#btnPlatos').on('click', function(){
//     var listaProd = [
//         {
//             "idProd": 6,
//             "idCat": 2,
//             "nombre": "Puyaso argentino",
//             "Precio": 12.50,
//             "es_preparado": 1
//         },
//         {
//             "idProd": 7,
//             "idCat": 2,
//             "nombre": "Milanesa de pollo",
//             "Precio": 9.99,
//             "es_preparado": 1
//         }
//     ]

//     llenarTabla(listaProd);
// });

// $('#btnBebidas').on('click', function(){
//     var listaProd = [
//         {
//             "idProd": 14,
//             "idCat": 3,
//             "nombre": "Michelada nacional",
//             "Precio": 2.75,
//             "es_preparado": 1
//         },
//         {
//             "idProd": 15,
//             "idCat": 3,
//             "nombre": "Michelada extranjera",
//             "Precio": 3.25,
//             "es_preparado": 1
//         }
//     ]

//     llenarTabla(listaProd);
// });

// $('#btnPostres').on('click', function(){
//     var listaProd = [
//         {
//             "idProd": 29,
//             "idCat": 4,
//             "nombre": "Tres leches",
//             "Precio": 1.99,
//             "es_preparado": 0
//         },
//         {
//             "idProd": 30,
//             "idCat": 4,
//             "nombre": "Quesadilla",
//             "Precio": 1.75,
//             "es_preparado": 0
//         }
//     ]

//     llenarTabla(listaProd);
// });

// function llenarTabla(listaProd){
    
//     var tabProd = document.querySelector('#tablaProd');
//     tabProd.innerHTML = "";

//     for(datos of listaProd){
//         tabProd.innerHTML += `<tr>
//                                 <td>${datos.nombre}</td>
//                                 <td>${datos.Precio}</td>
//                                 <td>${datos.es_preparado}</td>
//                             </tr>`;
//     }

// }
// //fin Administrar Productos