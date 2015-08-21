/* Current User Service.
 * used for shared object of basic user information.
 */
angular.module('ssm.user')
.factory('CurrentUserService', [ function () {
	var currentUser = {
		'id' : 'ad9r-4dsc-567s',
		'fname' : 'Jessica',
		'lname' : 'Tuan',
		'photo' : 'ad9r-4dsc-567s-thumb.png'
	};

	return {
		getCurrentUser : function() {
			return currentUser;
		}
	}
}]);