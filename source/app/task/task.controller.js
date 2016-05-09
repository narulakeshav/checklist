/**
 * Created by szka on 04.05.2016.
 */
(function() {

    'use strict';

    angular
        .module('checklist')
        .controller('TaskController', TaskController);

    TaskController.$inject = ['store', 'tasksPrepService'];

    function TaskController(store, tasksPrepService) {
        var vm = this;
        vm.tasks = store.tasks = tasksPrepService;

        vm.addTask = function() {
            var newTask;

            newTask = {
                value: vm.newTask,
                completed: false
            };

            store.add(newTask).then(function(res) {
                vm.newTask = '';
            });
        };

        vm.deleteTask = function(task) {
            store.delete(task);
        };

        vm.markAll = function() {
            angular.forEach(vm.tasks, function(task) {
                store.mark(task);
            });
        };

        vm.toggleTask = function(task) {
            store.toggle(task);
        };

        vm.clearCompleted = function() {
            store.clear();
        };

        vm.update = function(task) {
            store.update(task);
        };

        vm.editTask = function() {

        };

    }

}());
