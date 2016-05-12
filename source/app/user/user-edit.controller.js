(function() {

	'use strict';

	angular
		.module('checklist')
		.controller('UserEditController', UserEditController);

	UserEditController.$inject = ['getProfile'];

	function UserEditController(getProfile) {

		var vm = this;

		vm.user = getProfile;

		console.log(vm.user);

	}

}());