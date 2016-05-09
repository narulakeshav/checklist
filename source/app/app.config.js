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
                templateUrl: 'views/task/task.html',
                controller: 'TaskController',
                controllerAs: 'vm',
                resolve: {
                    tasksPrepService: tasksPrepService
                }
            })
            .when('/login', {
                templateUrl: 'views/account/login.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            })
            .otherwise('/', {
                templateUrl: 'views/task/task.html',
                controller: 'TaskController',
                controllerAs: 'vm'
            });

        $compileProvider.debugInfoEnabled(false);

    }

    function tasksPrepService(store) {
        return store.get();
    }

}());