'use strict';

angular.module('ssm', ['ngRoute', 'ssm.home', 'ssm.user', 'angularMoment'])
.run(['$rootScope', 'CurrentUserService', function($rootScope, CurrentUserService) {
	$rootScope.currentUser = CurrentUserService.getCurrentUser();
	$rootScope.nav = {};
	$rootScope.nav.showNewMsg = false;

	moment.lang('en', {
	    relativeTime : {
	        future: "in %s",
	        past:   "%s",
	        s:  "seconds ago",
	        m:  "1m",
	        mm: "%dm",
	        h:  "1h",
	        hh: "%dh",
	        d:  "1d",
	        dd: "%dd",
	        M:  "1m",
	        MM: "%dm",
	        y:  "1y",
	        yy: "%dy"
	    }
	});
}]);

angular.module('ssm')
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/',  {
        redirectTo      :   '/home'
    });
    $routeProvider.otherwise({redirectTo: '/404'});
}])