let vueOrdenes = new Vue({
    el: "#ordenes",
    data: {
        alerta:{
            titulo: "Error",
            mensaje:"Texto",
            tipo: 0 // 0 para alert success y 1 para alert error
        },
        alertaCambio: {
            mensaje:"Texto",
        },
        textoBusqueda:"",
        orderByCampo:"",
        orderByAsc:1,
        seleccionado: 0,
        activas: 1,
        ordenSelected: 0,
        efectivo: 0,
        cambio: 0,
        productos: [],
        ordenes: [],
        detalles: [],
        detalle: {
            "idOrden": 0,
            "idProducto": 0,
            "cantidad": 0,
            "precioUnitario": 0
        },
        orden: {
            "idOrden": 0,
            "fecha": "",
            "mesero": "",
            "mesa": "",
            "cliente": "",
            "estado": "",
            "total": 0,
            "observacion": ""
        }
    },
    methods: {
        cargarDatos: async function(){
            //cargando ordenes
            axios.get('http://localhost:3000/api/Ordens')
                .then(function (res) {
                    vueOrdenes.ordenes=res.data;
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
            //detalles
            axios.get('http://localhost:3000/api/DetalleOrdens')
                .then(function (res) {
                    vueOrdenes.detalles=res.data;
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });

            //cargando productos
            axios.get('http://localhost:3000/api/Productos')
            .then(function (res) {
                vueOrdenes.productos=res.data;
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
        },
        mostrarAlerta:function(titu,msg, tipo){
            this.alerta.titulo=titu;
            this.alerta.mensaje=msg;
            this.alerta.tipo = tipo;
           
            $("#alerta").show('fade');
            setTimeout(function(){
                $("#alerta").hide('fade');
            },2000);
            
        },
        cerrarAlerta:function(){
            $('#alerta').hide('fade');
        },
        mostrarAlertaCambio: function(msg){
            this.alertaCambio.mensaje = msg;
            $("#alertaCambio").show('fade');
            setTimeout(function(){
                $("#alertaCambio").hide('fade');
            },5000);
        },
        cerrarAlertaCambio:function(){
            $('#alertaCambio').hide('fade');
        },
        buscar:function(x){
            if(this.textoBusqueda=="")
                return true;
                    
            var cad=this.ordenes[x].cliente + 
                this.ordenes[x].mesa +
                this.ordenes[x].mesero + this.ordenes[x].total + this.ordenes[x].estado;
            cad=cad.toUpperCase();
            
            if(cad.indexOf(this.textoBusqueda.toUpperCase())>=0)
                        return true;
            else
                return false;
        },
        filtrarOrden: function(x){
            if(this.activas == 1){
                //mostrar activas
                if(this.ordenes[x].estado == "A"){
                    return true;
                }else{
                    return false;
                }
            }else{
                //mostrar cobradas
                if(this.ordenes[x].estado == "C"){
                    return true;
                }else{
                    return false;
                }
            }
        },
        nombreProducto:function(idProd){
            return vueOrdenes.productos.find(function(prod){
                return prod.idProducto==idProd;
            }).nombreProducto;
        },
        seleccionarFila: function(index){
            if(this.seleccionado == 0){
                this.seleccionado = 1;
            }else if(this.seleccionado == 1 && this.ordenSelected == index){
                this.seleccionado = 0;
            }
            this.ordenSelected = index;
        },
        mostrarDetalle:function(index){
            this.ordenSelected = index;
            $('#detalle').modal("show");
        },
        mostrarCobro: function(){
            console.log("njkhkhk")
            if(this.seleccionado == 1){
                if(this.ordenes[this.ordenSelected].estado == "A"){
                    $('#cobrar').modal("show");
                }else{
                    vueOrdenes.mostrarAlerta("Eliminar:","La orden ya esta cobrada", 1);
                }
            }else{
                vueOrdenes.mostrarAlerta("Eliminar:","debe seleccionar una fila antes", 1);
            }
        },
        mostrarEliminar: function(){
            if(this.seleccionado == 1){
               if(vueOrdenes.ordenes[vueOrdenes.ordenSelected].estado == "A"){
                    $("#eliminar").modal("show");
               }else{
                vueOrdenes.mostrarAlerta("Eliminar: ","La orden ya ha sido cobrada", 1);
               }
            }else{
                vueOrdenes.mostrarAlerta("Eliminar: ","Seleccione una orden primero", 1);
            }
        },
        eliminar: function(){
            axios.delete('http://localhost:3000/api/Ordens/'+vueOrdenes.ordenes[vueOrdenes.ordenSelected].idOrden)
                .then(function (res) {
                    console.log("Update estado de A a C");
                    $('#eliminar').modal("hide");
                    vueOrdenes.mostrarAlerta("Eliminar: ","Orden eliminada", 0);
                    
                    vueOrdenes.cargarDatos();
                    vueOrdenes.seleccionado = 0;

                })
                .catch(function (error) {
                    // handle error
                    vueOrdenes.mostrarAlerta("Error en ",error, 1);

                    console.log(error);
                });
        },
        cobrar: async function(){
            if(this.efectivo >= this.ordenes[this.ordenSelected].total){
                this.cambio = this.efectivo - this.ordenes[this.ordenSelected].total;
                this.ordenes[this.ordenSelected].estado = "C";

                axios.put('http://localhost:3000/api/Ordens',this.ordenes[this.ordenSelected])
                .then(function (res) {
                    console.log("Update estado de A a C");
                    $('#cobrar').modal("hide");
                    vueOrdenes.mostrarAlertaCambio('Efectivo: $ '+vueOrdenes.efectivo+ '      Total: $ '+vueOrdenes.ordenes[vueOrdenes.ordenSelected].total+ '      Cambio: $ '+vueOrdenes.cambio);
                    
                    vueOrdenes.efectivo = 0;
                    vueOrdenes.cambio = 0;
                    vueOrdenes.seleccionado = 0;

                })
                .catch(function (error) {
                    // handle error
                    vueOrdenes.mostrarAlerta("Error en ",error, 1);

                    console.log(error);
                });
            }else{

            }
        },
        orderBy: function(campo){
            //sin probar
            if(this.orderByCampo==campo)
                this.orderByAsc*= -1;
            this.orderByCampo=campo;
            
         
            
          if(campo=="MESA"){
             this.ordenes.sort(function(a,b){
                // Se debe usar vueOrdenesuct.orderByAsc
                // porque this ya no hace referencia al objeto vue
                 
                 
                 return vueOrdenes.orderByAsc * 
                     (a.mesa - b.mesa);
              });
    
          }
        if(campo='CLIENTE'){
            this.ordenes.sort(function(a,b){
                if(a.cliente>b.cliente)
                    return vueOrdenes.orderByAsc * 1;
                else
                    return vueOrdenes.orderByAsc * -1;
            });
            
        }
        if(campo='MESERO'){
            this.ordenes.sort(function(a,b){
                if(a.mesero>b.mesero)
                    return vueOrdenes.orderByAsc * 1;
                else
                    return vueOrdenes.orderByAsc * -1;
            });
            
        }
        if(campo=="PRECIO"){
             this.ordenes.sort(function(a,b){
                // Se debe usar vueOrdenesuct.orderByAsc
                // porque this ya no hace referencia al objeto vue
                return vueOrdenes.orderByAsc * (a.total - b.total);
              });
    
          }
          
          this.seleccionado = 0;
        },
    },
    mounted: async function(){
        let c = await this.cargarDatos();
    }
}); 