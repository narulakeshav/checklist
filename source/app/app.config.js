/**
 * Created by szka on 04.05.2016.
 */
(function() {

    'use strict';

    angular
        .module('checklist')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$compileProvider', '$locationProvider'];

    function config($stateProvider, $urlRouterProvider, $compileProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('tasks', {
                url: '/tasks',
                templateUrl: 'views/task/task.html',
                controller: 'TaskController',
                controllerAs: 'vm',
                resolve: {
                    authentication: authentication,
                    tasksPrepService: tasksPrepService
                }
            })
            .state('login', {
                url: '/login',
                templateUrl: 'views/account/login.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            })
            .state('register', {
                url: '/register',
                templateUrl: 'views/account/register.html',
                controller: 'RegisterController',
                controllerAs: 'vm'
            })
            .state('edit', {
                url: '/edit',
                templateUrl: 'views/user/user-edit.html',
                controller: 'UserEditController',
                controllerAs: 'vm',
                resolve: {
                    authentication: authentication,
                    getProfile: getProfile
                }
            });

        $compileProvider.debugInfoEnabled(false);

    }

    tasksPrepService.$inject = ['StoreFactory'];

    function tasksPrepService(StoreFactory) {
        console.log(StoreFactory.get());
        return StoreFactory.get();
    }

    authentication.$inject = ['$q', '$state', '$timeout', 'AuthFactory'];

    function authentication($q, $state, $timeout, AuthFactory) {
        var authenticated = AuthFactory.isAuthenticated();

        if(authenticated) {
            return $q.resolve();
        } else {
            $timeout(function() {
                $state.go('login');
            });

            return $q.reject();
        }
    }

    getProfile.$inject = ['userProfile'];

    function getProfile(userProfile) {
        return userProfile.get();
    }

}());