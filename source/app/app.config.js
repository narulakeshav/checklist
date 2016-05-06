/**
 * Created by szka on 04.05.2016.
 */
(function() {

    'use strict';

    angular
        .module('checklist')
        .config(config);

    config.$inject = ['$routeProvider', '$compileProvider'];

    function config($routeProvider, $compileProvider) {

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

        $compileProvider.debugInfoEnabled(false);

    }

    function tasksPrepService(store) {
        return store.get();
    }

}());