/* user module configuration */
angular.module('ssm.user', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/currentuser/settings',  {
        templateUrl     :   'views/user-settings.html',
        controller      :   'UserSettingsCtrl'
    });
}]);