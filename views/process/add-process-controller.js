'use strict';
app.controller("addProcessController", function($scope, $http, $filter){

  $scope.process = {
    noticia:"",
    fecha_de_denuncia:"",    
    municipio:"",    
    fecha_de_hechos: "",
    hechos:""
  }


  	$scope.consultaProcess = function(){      
      var idNoticia = $scope.process.noticia;
      console.log(idNoticia);
      $scope.process.noticia;
      $http({method:'GET', url:'/process/procesos',params: {idNoticia:idNoticia}})
        .then(function(process){ 
        console.log(process.data); 
      });     

    }

 $http({method:'GET', url:'/paises'})
    .success(function(response){        
      console.log(response);
     $scope.paises = response;      
  });

  $http({method:'GET', url:'process/categorias'})
    .success(function(response){        
      console.log(response);
      $scope.categorias = response;  
      
  });

  this.buscarDepartamento = function(buscar){
    console.log("pasoDepartamento");
    return $http({method:'GET', url:'/process/departamentos',params: {q:buscar, r:1}})
      .then(function(response){
        return response.data;     
      });
  }

  this.selectedItemChangeDepartamento = function(item){
    try{
      $scope.process.departamento = item._id;
    }catch(e){        
      alert("Campo vacio",e);
    }
  }

  this.buscarMunicipio = function(buscar){
    return $http({method:'GET', url:'process/municipios',params: {q:buscar, r:25}})
      .then(function(response){
        return response.data;     
      });
  }

  this.selectedItemChangeMunicipio = function(item){
    try{
      $scope.process.municipio = item._id;
    }catch(e){        
      alert("Campo vacio",e);
    }
  }





  $scope.guardar= function(){ 
    console.log($scope.user);
    $http({method:'POST',url:'process/procesos',headers : { 'Content-Type': 'application/json' }, data:$scope.process})
      .success(function(response){
        alert("Recibimos los datos");
        $scope.process = {};
    }).
    error(function(data,status,headers,config){
      console.log(data);
    });
  }



  });
