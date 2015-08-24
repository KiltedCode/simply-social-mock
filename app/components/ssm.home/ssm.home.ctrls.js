/* home controller */
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

			console.log('rand', rand);
			lastTS -= rand * 60000;
			$scope.model.posts[i].ts = lastTS;
		}
	};

	HomeService.getPosts()
		.success(function(data, status) {
			$scope.model.posts = data;
			adjustTStoRecent();
			console.log('posts', $scope.model.posts);
		})
		.error(function(data, status) {
			console.log('error');
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