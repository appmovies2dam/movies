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
   
.controller('cinesCercanosCtrl', function($scope) {

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

.controller('noticiasCtrl',function($scope){
    
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