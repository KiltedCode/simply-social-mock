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

	HomeService.getPosts()
		.success(function(data, status) {
			$scope.model.posts = data;
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