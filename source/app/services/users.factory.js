(function() {

	'use strict';

	angular
		.module('checklist')
		.factory('UsersFactory', UsersFactory);

	UsersFactory.$inject = ['$resource', 'userProfile'];

	function UsersFactory($resource, userProfile) {

		var data = {

			api: $resource('/api/users/:id', null, {
				update: { method: 'PUT' }
			}),

			register: function(user) {
				return this.api.save(user).$promise;
			},

			get: function() {
				return this.api.query().$promise;
			},

			getOne: function() {
				console.log(userProfile.get());
				return this.api.get({id: userProfile.get().id}).$promise;
			}

		};

		return data;

	}

}());