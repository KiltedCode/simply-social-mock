/* simply-social-mock - v0.1.0 - 2015-08-24 */
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
angular.module('ssm.home', ['ssm.user', 'ngRoute', 'ngSanitize'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home',  {
        templateUrl     :   'views/home.html',
        controller      :   'HomeCtrl'
    });
}]);
angular.module('ssm.home')
.controller('HomeCtrl', [ '$scope', '$routeParams', 'HomeService', function($scope, $routeParams, HomeService) {
	$scope.model = {};
	$scope.model.postFilter = '';
	$scope.model.view = 'list';
	$scope.model.posts = [];
	$scope.nav.showNewMsg = false;
	$scope.model.newMsg = '';
	var id = 100;

	/* Adds message from modal to feed */
	$scope.model.addMsg = function() {
		if($scope.model.newMsg && $scope.model.newMsg.length > 0) {
			var newPost = {
				'id'      : ++id,
				'ts'      : (new Date()).getTime(),
				'user'    : $scope.currentUser,
				'liked'   : false,
				'msg'     : $scope.model.newMsg,
				'photo'   : null,
				'video'   : null,
				'replies' : []
			}
			$scope.model.posts.push(newPost);
			$scope.model.newMsg = '';
			$scope.nav.showNewMsg=false;
		}
	}

	/* adjusts the list of posts to have timestamps relative to run. */
	var adjustTStoRecent = function() {
		var lastTS = (new Date()).getTime();
		for(var i = 0, len = $scope.model.posts.length; i < len; i++) {
			var rand = 0;
			if(i <= 5) {
				rand = Math.floor(Math.random()*10) + 1;
			} else {
				rand = Math.floor(Math.random()*36) + 1;
			}

			lastTS -= rand * 60000;
			$scope.model.posts[i].ts = lastTS;
		}
	};

	HomeService.getPosts()
		.success(function(data, status) {
			$scope.model.posts = data;
			adjustTStoRecent();
		})
		.error(function(data, status) {
			//TODO: error handling
			console.log('error', status);
		});

	$scope.model.listFilter = function(element) {
		if($scope.model.postFilter == 'photo') {
			return element.photo;
		} else if($scope.model.postFilter == 'video') {
			return element.video;
		} else {
			return true;
		}
	};

}]);
angular.module('ssm.home')
.factory('HomeService', ['$http', function ($http) {
	return {
		getPosts : function() {
			return $http.get('/app/data/posts.json');
		}
	}
}]);
angular.module('ssm.user', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/currentuser/settings',  {
        templateUrl     :   'views/user-settings.html',
        controller      :   'UserSettingsCtrl'
    });
}]);
angular.module('ssm.home')
.controller('UserSettingsCtrl', [ '$scope', '$routeParams', 'CurrentUserService', function($scope, $routeParams, CurrentUserService) {
	$scope.model = {};
	$scope.model.changePassword = false;

	CurrentUserService.getUserSettings()
		.success(function(data, status) {
			$scope.model.user = data;
		})
		.error(function(data, status) {
			//TODO: error handling
			console.log('error', status);
		});

}]);
angular.module('ssm.user')
.factory('CurrentUserService', [ '$http', function ($http) {
	var currentUser = {
		'id' : 'aaaa-tuan',
		'fname' : 'Jessica',
		'lname' : 'Tuan',
		'photo' : 'aaaa-tuan-thumb.png',
	};

	return {
		getCurrentUser : function() {
			return currentUser;
		},
		getUserSettings : function() {
			return $http.get('/app/data/current-user-settings.json');
		}
	}
}]);