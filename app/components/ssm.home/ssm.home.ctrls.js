/* home controller */
angular.module('ssm.home')
.controller('HomeCtrl', [ '$scope', '$routeParams', 'HomeService', function($scope, $routeParams, HomeService) {
	$scope.model = {};
	$scope.model.postFilter = '';
	$scope.model.view = 'list';
	$scope.model.posts = [];
	$scope.model.showNewMsg = true;
	

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