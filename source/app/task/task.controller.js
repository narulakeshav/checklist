/**
 * Created by szka on 04.05.2016.
 */
(function() {

    'use strict';

    angular
        .module('checklist')
        .controller('TaskController', TaskController);

    TaskController.$inject = ['$scope', 'StoreFactory', 'tasksPrepService'];

    function TaskController($scope, StoreFactory, tasksPrepService) {

        var vm = this;
        vm.tasks = StoreFactory.tasks = tasksPrepService;
        vm.pre = false;

        vm.addTask = function() {
            var newTask;

            newTask = {
                value: vm.newTask,
                completed: false
            };

            vm.preloader(StoreFactory.add, newTask)
                .then(function() {
                    vm.newTask = '';
                });
        };

        vm.deleteTask = function(task) {
            vm.preloader(StoreFactory.delete, task);
        };

        vm.markAll = function() {
            vm.preloader(StoreFactory.markAll);
        };

        vm.toggleTask = function(task) {
            vm.preloader(StoreFactory.toggle, task);
        };

        vm.clearCompleted = function() {
            vm.preloader(StoreFactory.clear);
        };

        vm.update = function(task) {
            vm.preloader(StoreFactory.update, task);
        };

        vm.preloader = function(action, arg) { 
            vm.pre = true;

            return action.call(StoreFactory, arg).then(function() {
                vm.pre = false;
            }); 
        };

    }

}());
