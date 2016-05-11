// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives'])//ng-cordova

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
      mode = 'search/movie',
      name = '&query=' + encodeURI(moviename),
      key = '?api_key=5fbddf6b517048e25bc3ac1bbeafb919';
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
  
  function getEstrenos(callback){
    var url = 'http://api.themoviedb.org/3/',
      mode = 'movie/now_playing',
      key = '?api_key=5fbddf6b517048e25bc3ac1bbeafb919';
      language='&language=es';
      
      $http.get(url + mode + key + language).success(function(data) {

      console.log(JSON.stringify(data));
      
      cachedData = data.results;
      callback(data.results);
    });
  }
  
  function getTrailers(idVideo,callback){
    var url = 'http://api.themoviedb.org/3/',
      mode = 'movie/'+idVideo+'/videos',
      key = '?api_key=5fbddf6b517048e25bc3ac1bbeafb919';
      language='&language=es';
      
      $http.get(url + mode + key + language).success(function(data) {

      console.log(JSON.stringify(data));
      
      //cachedData = data.results;
      callback(data.results);
    });
  }
  
  function buscarTrailers(busq,callback) {
    //muestra solamente 10 resultados
    var url='https://www.googleapis.com/youtube/v3/search?part=id&maxResults=10&q=trailer%20+'+busq+'&regionCode=es&type=video&videoType=any&key=AIzaSyD2n2mudoIN3Bjem1-Nj10Oio6CGwnMgy4';
    $http.get(url).success(function(data) {
      console.log(JSON.stringify(data));
      callback(data.items);
    });
  }
  
  function buscarNoticias(callback) {
    var url2='https://api.tviso.com/auth_token?id_api=3488&secret=zaWV7a7pbtwaChbVAqaC';
    $http.get(url2).success(function(data2) {
      console.log(JSON.stringify(data2));
      
      var url='https://api.tviso.com/news/last/movies?auth_token='+data2.auth_token;
      $http.get(url).success(function(data) {
      console.log(JSON.stringify(data));
      callback(data.results);
    });
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
    estr: getEstrenos,
    trai: getTrailers,
    you: buscarTrailers,
    not: buscarNoticias,
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
/*NO BORRAR
--------------------------------------------------------------------------------------------------------------------------
themoviedb para buscar peliculas,etc.
http://api.themoviedb.org/3/movie/now_playing?api_key=5fbddf6b517048e25bc3ac1bbeafb919&language=es&query=fast
http://api.themoviedb.org/3/movie/idVideo?api_key=5fbddf6b517048e25bc3ac1bbeafb919&append_to_response=videos&language=es&query=fast
http://api.themoviedb.org/3/movie/idVideo/videos?api_key=5fbddf6b517048e25bc3ac1bbeafb919&language=es&query=fast
http://api.themoviedb.org/3/discover/movie?api_key=5fbddf6b517048e25bc3ac1bbeafb919&language=es&query=fast
http://api.themoviedb.org/3/genre/movie/list?api_key=5fbddf6b517048e25bc3ac1bbeafb919&language=es&query=fast
http://api.themoviedb.org/3/movie/popular?api_key=5fbddf6b517048e25bc3ac1bbeafb919&language=es&query=fast
http://api.themoviedb.org/3/movie/top_rated?api_key=5fbddf6b517048e25bc3ac1bbeafb919&language=es&query=fast
http://api.themoviedb.org/3/movie/upcoming?api_key=5fbddf6b517048e25bc3ac1bbeafb919&language=es&query=fast
http://api.themoviedb.org/3/tv/airing_today?api_key=5fbddf6b517048e25bc3ac1bbeafb919&language=es&query=fast
http://api.themoviedb.org/3/tv/airing_today?api_key=5fbddf6b517048e25bc3ac1bbeafb919&timezone=Europe/Madrid&language=es&query=fast
http://api.themoviedb.org/3/tv/airing_today?api_key=5fbddf6b517048e25bc3ac1bbeafb919&timezone=es&language=es&query=fast
---------------------------------------------------------------------------------------------------------------------------
youtube para buscar trailers
https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=fast&type=video&key=AIzaSyD2n2mudoIN3Bjem1-Nj10Oio6CGwnMgy4
https://www.googleapis.com/youtube/v3/search?part=id&maxResults=10&q=fast&type=video&key=AIzaSyD2n2mudoIN3Bjem1-Nj10Oio6CGwnMgy4
https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=fast&regionCode=es&type=video&videoType=movie&key=AIzaSyD2n2mudoIN3Bjem1-Nj10Oio6CGwnMgy4
---------------------------------------------------------------------------------------------------------------------------
tviso para noticias
secret zaWV7a7pbtwaChbVAqaC
app id 3488
auth token 280097e0610e983c377adcfbf61e18e0
https://developers.tviso.com/
https://api.tviso.com/auth_token?id_api=3488&secret=zaWV7a7pbtwaChbVAqaC
https://api.tviso.com/news/last/movies?auth_token=dcccdb2ccec9e552cb62ecb576004a9c
https://api.tviso.com/news/last/movies?auth_token=dcccdb2ccec9e552cb62ecb576004a9c&page=2
https://api.tviso.com/news/item?auth_token=dcccdb2ccec9e552cb62ecb576004a9c&id=56d40239060f0e922f8b4567
*/
/*http://noeticforce.com/best-material-design-web-frameworks
http://materializecss.com/getting-started.html
http://callemall.github.io/material-ui/#/components/list
https://material.angularjs.org/latest/demo/list
http://ui.lumapps.com/components/list
http://nt1m.github.io/material-framework/#cards
https://bootswatch.com/paper/
https://material.angularjs.org/latest/
https://www.airpair.com/angularjs/posts/material-design-with-angularjs
https://angularjs4u.com/angularjs2/20-angularjs-ionic-themes-plugins-2016/
http://www.themezy.com/free-website-templates/184-expose-responsive-bootstrap-template
http://webdesignledger.com/premium-bootstrap-themes-templates/
http://www.designsave.net/2015/06/free-angularjs-boostrap-templates.html
http://themesforangular.com/7-fantastic-free-angularjs-templates/
 */