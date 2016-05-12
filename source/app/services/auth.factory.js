(function() {

	'use strict';

	angular
		.module('checklist')
		.factory('AuthFactory', AuthFactory);

	AuthFactory.$inject = ['$http', '$state', '$window', 'userProfile'];

	function AuthFactory($http, $state, $window, userProfile) {

		var data = {

			login: function(user) {
			    $http
			      .post('/api/authenticate', user)
			      .then(function(res) {

			      	console.log(res);
			        $window.sessionStorage.token = res.token;
			      	// sets profile object to sessionStorage.user
			      	userProfile.set(res.data.user._id, res.data.user.name, res.data.user.email, res.data.user.password);

			        $state.go('tasks');			      	

			      }, function(data) {
			        delete $window.sessionStorage.token;
			        delete $window.sessionStorage.user;
			      });		
			},

			logout: function() {
				delete $window.sessionStorage.token;
				delete $window.sessionStorage.user;
				userProfile.erase();
			},

			getToken: function() {
				return $window.sessionStorage.getItem('token');
			},

			isAuthenticated: function() {
				return !!this.getToken();
			}

		};

		return data;

	}

}()); 