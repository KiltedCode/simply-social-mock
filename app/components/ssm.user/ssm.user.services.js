/* Current User Service.
 * used for shared object of basic user information.
 */
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