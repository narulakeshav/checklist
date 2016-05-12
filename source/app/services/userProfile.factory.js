(function() {

	'use strict';

	angular
		.module('checklist')
		.factory('userProfile', userProfile);

	userProfile.$inject = ['$window'];

	function userProfile($window) {
		
		var data = {

			id: null,
			name: null,
			email: null,
			password: null,

			set: function(id, name, email, password) {
				this.id = id;
				this.name = name;
				this.email = email;
				this.password = password;

				$window.sessionStorage.user = JSON.stringify({
					id: this.id,
					name: this.name,
					email: this.email,
					password: this.password
				});
			},

			get: function() {
				return JSON.parse($window.sessionStorage.user);
			},

			erase: function() {
				this.id = null;
				this.name = null;
				this.email = null;
				this.password = null;
			}

		};

		return data;

	}

}());