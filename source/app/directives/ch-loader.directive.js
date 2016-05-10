(function() {

	'use strict';

	angular
		.module('checklist')
		.directive('chLoader', chLoader);

	chLoader.$inject = ['$http'];
	
	function chLoader($http) {

		return {
			link: link,
			template: '<div ng-show="showLoader" class="loader"><img src="./images/preloader.gif" /></div>',
			restrict: 'EA'
		};

		function link(scope, element, attrs) {

			scope.isLoading = function() {
				return $http.pendingRequests.length > 0;
			};

			scope.$watch(scope.isLoading, function(isPending) {
				scope.showLoader = (isPending) ? true : false;
			});

		}

	}

}());