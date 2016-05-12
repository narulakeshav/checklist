(function() {

	'use strict';

	angular
		.module('checklist')
		.controller('RegisterController', RegisterController);

	RegisterController.$inject = ['UsersFactory'];

	function RegisterController(UsersFactory) {

		var vm = this;

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
				}, function(err) {
					console.log('error');
					console.log(err);
				});
		};

	}

}());