angular.module('app.controllers', [])
  
.controller('inicioCtrl', function($scope,$http,Movies) {
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
    
    /*$scope.borrar = function() {
        
    }*/
    
})
   
.controller('estrenosCtrl', function($scope) {

})
   
.controller('cinesCercanosCtrl', function($scope) {

})
      
.controller('trailersCtrl', function($scope) {

})
   
.controller('ayudaCtrl', function($scope) {

})

.controller('noticiasCtrl',function($scope){
    
})

.controller('detalleCtrl',function($scope, $http, $stateParams, Movies,$ionicHistory){
    Movies.find($stateParams.movieid, function(movie) {
    $scope.movie = movie;
  });
  $scope.volver = function(){
    $ionicHistory.goBack();
  }
})
 