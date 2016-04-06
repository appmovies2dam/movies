angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.inicio', {
    url: '/inicio',
    views: {
      'side-menu21': {
        templateUrl: 'templates/inicio.html',
        controller: 'inicioCtrl'
      }
    }
  })

  .state('menu.estrenos', {
    url: '/estrenos',
    views: {
      'side-menu21': {
        templateUrl: 'templates/estrenos.html',
        controller: 'estrenosCtrl'
      }
    }
  })

  .state('menu.cinesCercanos', {
    url: '/cines',
    views: {
      'side-menu21': {
        templateUrl: 'templates/cinesCercanos.html',
        controller: 'cinesCercanosCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    abstract:true
  })

  .state('menu.trailers', {
    url: '/trailers',
    views: {
      'side-menu21': {
        templateUrl: 'templates/trailers.html',
        controller: 'trailersCtrl'
      }
    }
  })

  .state('menu.ayuda', {
    url: '/ayuda',
    views: {
      'side-menu21': {
        templateUrl: 'templates/ayuda.html',
        controller: 'ayudaCtrl'
      }
    }
  })
  
  .state('menu.noticias', {
      url: '/ayuda',
      views: {
          'side-menu21':{
              templateUrl: 'templates/noticias.html',
              controller: 'noticiasCtrl'
            }
        }
  })

$urlRouterProvider.otherwise('/side-menu21/inicio')

  

});