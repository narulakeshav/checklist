/**
 * Created by szka on 04.05.2016.
 */
(function() {

    'use strict';

    angular
        .module('checklist')
        .config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainController',
                controllerAs: 'vm',
                resolve: {
                    tasksPrepService: tasksPrepService
                }
            })
            .otherwise('/', {
                templateUrl: 'views/main.html',
                controller: 'MainController',
                controllerAs: 'vm'
            });

    }

    function tasksPrepService(store) {
        return store.get();
    }

}());