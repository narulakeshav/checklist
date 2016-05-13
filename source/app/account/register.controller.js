(function() {

	'use strict';

	angular
		.module('checklist')
		.controller('RegisterController', RegisterController);

	RegisterController.$inject = ['UsersFactory', 'AuthFactory'];

	function RegisterController(UsersFactory, AuthFactory) {

		var vm = this;

		vm.auth = AuthFactory.isAuthenticated();
		vm.message = (!vm.auth) ? 'Register' : 'You are already logged in';

		vm.user = {
			name: '',
			email: '',
			password: ''
		};

		vm.register = function() {
			console.log(vm.user);

			UsersFactory.register(vm.user)
				.then(function(data) {
					console.log('success');
					console.log(data);

					var loginData = {
						username: vm.user.name,
						password: vm.user.password
					};

					AuthFactory.login(loginData);
				}, function(err) {
					console.log('error');
					console.log(err);
				});
		};

	}

}());