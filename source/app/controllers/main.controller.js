/**
 * Created by szka on 04.05.2016.
 */
(function() {

    'use strict';

    angular
        .module('checklist')
        .controller('MainController', MainController);

    MainController.$inject = ['store'];

    function MainController(store) {
        var vm = this;

        vm.tasks = store.tasks;

        vm.addTask = function() {
            var newTask;

            newTask = {
                value: vm.newTask,
                completed: false
            };

            store.add(newTask);
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
            vm.tasks = store.clear();
        };

        vm.checkEdit = function(e, task) {
            if(e.keyCode === 13) {
                task.edit = !task.edit;
            }
        };

    }

}());
