(function() {

	'use strict';

	angular
		.module('checklist')
		.factory('AuthFactory', AuthFactory);

	AuthFactory.$inject = ['$http', '$state', '$window'];

	function AuthFactory($http, $state, $window) {

		var data = {

			login: function(user) {
			    $http
			      .post('http://localhost:8080/authenticate', user)
			      .then(function(data, status, headers, config) {
			        $window.sessionStorage.token = data.token;
			        $state.go('tasks');			      	
			        console.log('welcome');
			      }, function(data, status, headers, config) {
			        delete $window.sessionStorage.token;
			        console.log('error: invalid user or password');			      	
			      });		
			},

			logout: function() {
				delete $window.sessionStorage.token;
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