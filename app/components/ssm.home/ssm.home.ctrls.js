/* home controller */
angular.module('ssm.home')
.controller('HomeCtrl', [ '$scope', '$routeParams', 'CurrentUserService', function($scope, $routeParams, CurrentUserService) {
	$scope.currentUser = CurrentUserService.getCurrentUser();
}]);