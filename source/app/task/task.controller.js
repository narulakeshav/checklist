/**
 * Created by szka on 04.05.2016.
 */
(function() {

    'use strict';

    angular
        .module('checklist')
        .controller('TaskController', TaskController);

    TaskController.$inject = ['StoreFactory', 'tasksPrepService'];

    function TaskController(StoreFactory, tasksPrepService) {

        var vm = this;
        vm.tasks = StoreFactory.tasks = tasksPrepService;

        vm.addTask = function() {
            var newTask;

            newTask = {
                value: vm.newTask,
                completed: false
            };

            StoreFactory.add(newTask)
                .then(function() {
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
