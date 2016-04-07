// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.factory('Movies', function($http) {
  var cachedData;
  //var direccion;
  //var pagTot;
  //var pagAct;

  function getData(moviename, callback) {

    var url = 'http://api.themoviedb.org/3/',
      mode = 'search/movie?query=',
      name = '&query=' + encodeURI(moviename),
      key = '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
      language='&language=es';
      
      //direccion=url + mode + key + language + name;

      $http.get(url + mode + key + language + name).success(function(data) {

      console.log(JSON.stringify(data));
      
      //pagTot=data.total_pages;
      //pagAct=1;
      
      cachedData = data.results;
      callback(data.results);
    });
  }
  
  /*function pagSig(callback) {
      pagAct++;
      console.log("-----------"+pagAct); 
      $http.get(direccion+pagAct).success(function(data){
          console.log(JSON.stringify(data));
          cachedData = data.results;
          callback(data.results);
      });
  }*/

  return {
    list: getData,
    //sig: pagSig,
    find: function(name, callback) {
      console.log(name);
      var movie = cachedData.filter(function(entry) {
        return entry.id == name;
      })[0];
      callback(movie);
    }
  };

})