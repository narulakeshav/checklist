/**
 * Created by szka on 04.05.2016.
 */
(function() {

    'use strict';

    angular
        .module('checklist')
        .controller('TaskController', TaskController);

    TaskController.$inject = ['$http', 'StoreFactory', 'tasksPrepService'];

    function TaskController($http, StoreFactory, tasksPrepService) {

        var vm = this;
        vm.tasks = StoreFactory.tasks = tasksPrepService;

        vm.addTask = function() {
            var newTask;

            newTask = {
                name: vm.newTask,
                completed: false
            };

            // $http
            //     .post('/api/tasks', newTask)
            //     .then(function(res) {
            //         console.log('success');
            //         console.log(res);
            //     }, function(err) {
            //         console.log('error');
            //         console.log(err);
            //     });
            StoreFactory.add(newTask)
                .then(function(data) {
                    console.log(vm.tasks);
                    vm.newTask = '';
                });
        };

        vm.deleteTask = function(task) {
            StoreFactory.delete(task);
        };

        vm.markAll = function() {
            angular.forEach(vm.tasks, function(task) {
                StoreFactory.mark(task);
            });
        };

        vm.toggleTask = function(task) {
            StoreFactory.toggle(task);
        };

        vm.clearCompleted = function() {
            StoreFactory.clear();
        };

        vm.update = function(task) {
            StoreFactory.update(task);
        };

    }

}());
