var VueCategoria = new Vue({
	el:'#contenedor',

	data: {
		alerta:{
          titulo: "Error",
          mensaje:"Texto"
      },

      categorias:[],
      categoria: {
      	'idCategoria':0,
      	'nombreCategoria':''
      },

     categoriaSelected: 0,
     seleccionado: 0

	},

	methods: {

		seleccionarFila: function(index) { 
			if(this.seleccionado == 0){
				this.seleccionado= 1;
			}else if (this.seleccionado== 1 && this.categoriaSelected == index){
				this.seleccionado=0;
			}
			this.categoriaSelected=index;
		},
		mostrarAlerta:function(titu,msg){
            this.alerta.titulo=titu;
            this.alerta.mensaje=msg;
           
            $("#miAlerta").show('fade');
            setTimeout(function(){
                $("#miAlerta").hide('fade');
            },5000);
            
        },
        cerrarAlerta:function(){
            $('#miAlerta').hide('fade');
        },

         cargarDatos: function(){
            //cargando las categorias
                       axios.get('http://localhost:3000/api/Categoria')
                .then(function (res) {
                    VueCategoria.categorias=res.data;
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
                       
        },

        mostrarAgregar:function(){
            $('#modalAgregar').modal('show');
        },
        mostrarModificar:function(){
        	this.categoria.idCategoria=this.categorias[this.categoriaSelected].idCategoria;
        	this.categoria.nombreCategoria=this.categorias[this.categoriaSelected].nombreCategoria;
            $('#modalModificar').modal('show');
        },
        mostrarEliminar:function(){
            $('#modalEliminar').modal('show');            
        },

        agregarCategoria:function(){
            axios.post('http://localhost:3000/api/Categoria',this.categoria)
                .then(function (res) {
                	$('#modalAgregar').modal('hide');
                    VueCategoria.categoria.nombreCategoria="";
                    VueCategoria.categoria.idCategoria=0;
                    VueCategoria.cargarDatos();
                    VueCategoria.mostrarAlerta("Categoria Agregado","Se agregó el nuevo producto");
                })
                .catch(function (error) {
                    // handle error
                    VueCategoria.mostrarAlerta("Error",error);

                    console.log(error);
                });
        },

        modificarCategoria:function(){
        	
        	            axios.put('http://localhost:3000/api/Categoria',this.categoria)
                .then(function (res) {
                	$('#modalModificar').modal('hide');
                    VueCategoria.categoria.nombreCategoria="";
                    VueCategoria.categoria.idCategoria=0;
                    VueCategoria.cargarDatos();
                    console.log("UPDATED PRODUCTO");
                    VueCategoria.mostrarAlerta("Categoria Modificado","Se modifico la categoria satisfactoriamente");

                })
                .catch(function (error) {
                    // handle error
                    VueCategoria.mostrarAlerta("Error",error);

                    console.log(error);
                });
        },

         eliminarCategoria:function(){
            console.log();
            axios.delete('http://localhost:3000/api/Categoria/'+ this.categorias[this.categoriaSelected].idCategoria)
                .then(function (res) {
                	$('#modalEliminar').modal('hide');
                    console.log("DELETE PRODUCTO");  
                    VueCategoria.cargarDatos();
                    VueCategoria.mostrarAlerta("Categoria Eliminada","La categoria se eliminó de la base de datos");

                })
                .catch(function (error) {
                    // handle error
                    VueCategoria.mostrarAlerta("Error:",error);

                    console.log(error);
                });
        },
	},

	mounted:function(){
				this.cargarDatos();
	} ,

});