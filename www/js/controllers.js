angular.module('app.controllers', [])
  
.controller('inicioCtrl', function($scope,$http,Movies) {
    $scope.movie = {
        name: ''
    }

    $scope.searchMovieDB = function() {
        Movies.list($scope.movie.name, function(movies) {
            $scope.movies = movies;
        });
  };
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
 