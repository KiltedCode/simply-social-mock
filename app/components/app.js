'use strict';

angular.module('ssm', ['ngRoute', 'ssm.home', 'ssm.user']);

angular.module('ssm')
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/',  {
            redirectTo      :   '/home'
        });
        $routeProvider.otherwise({redirectTo: '/404'});
    }])