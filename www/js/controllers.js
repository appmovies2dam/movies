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
    
    $scope.borrar = function() {
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
      
.controller('trailersCtrl', function($scope) {

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
      if(asd==null){
          $scope.key=null;
          console.log('asd nulo')
      }
      else{
          $scope.key=$sce.trustAsResourceUrl('https://www.youtube.com/embed/'+asd.key);
      }
      
    });
  
  $scope.volver = function(){
    $ionicHistory.goBack();
  }
  
})