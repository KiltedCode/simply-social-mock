'use strict';

angular.module('ssm', ['ngRoute', 'ssm.home', 'ssm.user'])
.run(['$rootScope', 'CurrentUserService', function($rootScope, CurrentUserService) {
	$rootScope.currentUser = CurrentUserService.getCurrentUser();
}]);

angular.module('ssm')
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/',  {
        redirectTo      :   '/home'
    });
    $routeProvider.otherwise({redirectTo: '/404'});
}])