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
        vm.tasks = [];

        activate();

        vm.addTask = function() {
            var newTask;

            newTask = {
                value: vm.newTask,
                completed: false
            };

            store.add(newTask).then(function(data) {
                vm.newTask = '';
                console.log('success');
                console.log(data);
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

        vm.update = function() {
            vm.tasks = store.tasks;
        };

        function activate() {
            return store.get().then(function(data) {
                vm.tasks = store.tasks = data;
                return vm.tasks;
            });
        }

    }

}());
