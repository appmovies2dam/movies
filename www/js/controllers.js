angular.module('app.controllers', [])
  //verificar errores en la consola y establecer if else
.controller('inicioCtrl', function($scope,Movies) {
    $scope.movie = {
        name: ''
    }

    $scope.searchMovieDB = function() {
        Movies.list($scope.movie.name, function(movies) {
            $scope.movies = movies;
        });
    }
  
    /*$scope.paginaSiguiente = function(){
        Movies.sig(function(movies) {
            $scope.movies = movies;
        });
    };*/
    
    $scope.borrar = function(n) {
        $scope.movies=null;
    }
    
})
   
.controller('estrenosCtrl', function($scope,Movies) {
    $scope.buscarEstrenos = function() {
        Movies.estr(function(movies) {
            $scope.movies = movies;
        });
    }
})
   
.controller('cinesCercanosCtrl', function($scope,$cordovaGeolocation,Movies) {
    if (window.cordova) {
        cordova.plugins.diagnostic.isGpsLocationEnabled(function(enabled) {
            if(enabled==true){
                var posOptions = {timeout: 10000, enableHighAccuracy: false};
                $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
                    var lat  = position.coords.latitude;
                    var long = position.coords.longitude;
                    Movies.cin(lat,long,function(maps){
                        $scope.cines=maps;
                    });
                    console.log("GPS activado");
                    console.log("ubicacion--> "+lat + "," + long);
                }, function(error) {
                    console.log('--->'+error);
                });
            }
            else{
                console.log("GPS desactivado");
                alert("El GPS esta desactivado por favor activelo y reinicie la aplicacion para poder buscar cines cercanos");
                cordova.plugins.diagnostic.switchToLocationSettings(); //abre la configuracion del gps en el movil
            }
        }, function(error) {
            console.log("Error: " + error);
        });
    }
    
    $scope.borrar = function(n) {
        $scope.cines=null;
    }
    
    $scope.appMaps=function(id){
        Movies.detCin(id, function(ubi) {
            cordova.plugins.miplugin.appNativa(ubi.url); 
        });
    }
    
})
      
.controller('trailersCtrl', function($scope,Movies,$sce) {
    $scope.busq = {
        name: ''
    }

    $scope.busTra = function() {
        Movies.you($scope.busq.name, function(yt) {
            for (var key in yt) {
              if (yt.hasOwnProperty(key)) {
                  var element = yt[key];
                  element.id.videoId=$sce.trustAsResourceUrl('https://www.youtube.com/embed/'+element.id.videoId);
              }
          }
            $scope.you = yt;
        });
    }
    
    $scope.borrar = function(n) {
        $scope.you=null;
    }
})
   
.controller('ayudaCtrl', function($scope) {

})

.controller('noticiasCtrl',function($scope,Movies){
    $scope.buscarNoticias = function() {
        Movies.not(function(data) {
            $scope.noticias = data;
        });
    }
    /*$scope.swipe=function(index){
        $scope.noticias.splice(index,1);
    }*/
})

.controller('detalleCtrl',function($scope, $stateParams, Movies, $ionicHistory,$sce){
  Movies.find($stateParams.movieid, function(movie) {
    $scope.movie = movie;
  });
  
  Movies.trai($stateParams.movieid, function(asd) {
      if(asd.length==0){
          $scope.asdf=null;
      }
      else{
          for (var key in asd) {
              if (asd.hasOwnProperty(key)) {
                  var element = asd[key];
                  element.iframe=$sce.trustAsResourceUrl('https://www.youtube.com/embed/'+element.key);
                  //element.iframe=$sce.trustAsResourceUrl('https://www.youtube.com/v/'+element.key);
              }
          }
          $scope.asdf=asd;
      }
    });
  
  $scope.volver = function(){
    $ionicHistory.goBack();
  }
  
  $scope.appYou=function(url){
      cordova.plugins.miplugin.appNativa(url);
  }
  
})

.controller('detalleNoticiaCtrl',function($scope, $stateParams, Movies, $ionicHistory){
    Movies.det($stateParams.idn, function(noti) {
    $scope.noticia = noti;
    console.log(noticia.title);
  });
  
  $scope.volver = function(){
    $ionicHistory.goBack();
  }
  
})