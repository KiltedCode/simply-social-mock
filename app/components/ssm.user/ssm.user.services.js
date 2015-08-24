/* Current User Service.
 * used for shared object of basic user information.
 */
angular.module('ssm.user')
.factory('CurrentUserService', [ function () {
	var currentUser = {
		'id' : 'aaaa-tuan',
		'fname' : 'Jessica',
		'lname' : 'Tuan',
		'photo' : 'aaaa-tuan-thumb.png',
	};

	return {
		getCurrentUser : function() {
			return currentUser;
		}
	}
}]);