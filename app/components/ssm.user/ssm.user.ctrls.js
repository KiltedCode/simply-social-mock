/* current user settings controller */
angular.module('ssm.home')
.controller('UserSettingsCtrl', [ '$scope', '$routeParams', 'CurrentUserService', function($scope, $routeParams, CurrentUserService) {
	$scope.model = {};
	$scope.model.changePassword = false;

	CurrentUserService.getUserSettings()
		.success(function(data, status) {
			$scope.model.user = data;
			console.log('user', $scope.model.user);
		})
		.error(function(data, status) {
			//TODO: error handling
			console.log('error', status);
		});

}]);