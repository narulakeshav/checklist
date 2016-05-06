/**
 * Created by szka on 04.05.2016.
 */
(function() {

    'use strict';

    angular
        .module('checklist')
        .factory('store', store);

    store.$inject = ['$resource'];

    function store($resource) {

        var data = {

            tasks: [],

            api: $resource('http://localhost:3000/tasks/', null, {
                method: 'PUT'
            }),

            get: function() {
                return this.api.query();
            },

            add: function(task) {
                this.tasks.unshift(task);
            },

            delete: function(task) {
                this.tasks.splice(this.tasks.indexOf(task), 1);
            },

            toggle: function(task) {
                task.completed = !task.completed;
            },

            mark: function(task) {
                task.completed = true;
            },

            clear: function() {
                var tasks;

                tasks = this.tasks.filter(function(task) {
                    return !task.completed;
                });

                this.tasks = tasks;

                return this.tasks;
            }

        };

        return data;

    }

}());