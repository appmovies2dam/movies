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
   
.controller('cinesCercanosCtrl', function($scope,$cordovaGeolocation) {
    /*var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
          var lat  = position.coords.latitude
          var long = position.coords.longitude
          console.log(lat + " --- " + long);
      }, function(error) {
          console.log('--->'+error);
        // error
    });*/
    if (window.cordova) {
        cordova.plugins.diagnostic.isGpsLocationEnabled(function(enabled) {
        console.log("Location is " + (enabled ? "enabled" : "disabled"));
        cordova.plugins.diagnostic.switchToLocationSettings();
    }, function(error) {
        console.log("The following error occurred: " + error);
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
    console.log(movie.original_title);
  });
  
  Movies.trai($stateParams.movieid, function(asd) {
      if(asd.length==0){
          $scope.asdf=null;
      }
      else{
          for (var key in asd) {
              if (asd.hasOwnProperty(key)) {
                  var element = asd[key];
                  element.key=$sce.trustAsResourceUrl('https://www.youtube.com/embed/'+element.key);
                  //element.key=$sce.trustAsResourceUrl('https://www.youtube.com/v/'+element.key);
              }
          }
          $scope.asdf=asd;
      }
    });
  
  $scope.volver = function(){
    $ionicHistory.goBack();
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