(function() {

	'use strict';

	angular
		.module('checklist')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$http', '$window'];

	function LoginController($http, $window) {

		var vm = this;

		vm.user = {
			username: '',
			password: ''
		};

		vm.login = function(data) {
		    $http
		      .post('http://localhost:8080/authenticate', vm.user)
		      .then(function (data, status, headers, config) {
		        $window.sessionStorage.token = data.token;
		        console.log('welcome');
		      }, function (data, status, headers, config) {
		        delete $window.sessionStorage.token;
		        console.log('error: invalid user or password');
		      });			
		};

	}

}());