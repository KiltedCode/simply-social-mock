/* home module configuration */
angular.module('ssm.home', ['ssm.user', 'ngRoute', 'ngSanitize'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home',  {
        templateUrl     :   'views/home.html',
        controller      :   'HomeCtrl'
    });
}]);