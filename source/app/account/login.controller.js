(function() {

	'use strict';

	angular
		.module('checklist')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$state', 'AuthFactory'];

	function LoginController($state, AuthFactory) {

		var vm = this;

		vm.auth = AuthFactory.isAuthenticated();
		vm.message = (!vm.auth) ? 'Login' : 'You are already logged in';

		vm.user = {
			username: '',
			password: ''
		};

		vm.login = function(data) {
			AuthFactory.login(data);			
		};

		vm.logout = function() {
			AuthFactory.logout();
			$state.go($state.current, {}, {reload: true});
		};

	}

}());