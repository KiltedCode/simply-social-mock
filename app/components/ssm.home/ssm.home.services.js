/* Home Service.
 * used for shared object of basic user information.
 */
angular.module('ssm.home')
.factory('HomeService', ['$http', function ($http) {
	return {
		getPosts : function() {
			return $http.get('/app/data/posts.json');
		}
	}
}]);