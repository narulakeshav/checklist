/**
 * Created by szka on 04.05.2016.
 */
(function() {

    'use strict';

    angular
        .module('checklist')
        .factory('store', store);

    function store() {

        var data = {

            tasks: [
                {value: 'Initial task', completed: false}
            ],

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