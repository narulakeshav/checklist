/**
 * Created by szka on 04.05.2016.
 */
(function() {

    'use strict';

    angular
        .module('checklist')
        .factory('store', store);

    store.$inject = ['$resource', '$q'];

    function store($resource, $q) {

        var data = {

            tasks: [],

            api: $resource('http://localhost:3000/tasks/:id', null, {
                update: { method: 'PUT' }
            }),

            get: function() {
                return this.api.query().$promise;
            },

            add: function(task) {
                var self = this;
                
                return this.api.save(task, function(res) {
                    self.tasks.push(res);
                }, function(error) {}).$promise;
            },

            delete: function(task) {
                var self = this;

                return this.api.delete({id: task.id}, function(res) {
                    self.tasks.splice(self.tasks.indexOf(task), 1);
                }, function(error) {}).$promise;
            },

            toggle: function(task) {
                task.completed = !task.completed;

                this.update(task);
            },

            mark: function(task) {
                task.completed = true;

                this.update(task);
            },

            clear: function() {
                var tasks, self = this, promises = [];

                tasks = this.tasks.filter(function(task) {
                    return task.completed;
                });

                console.log(this.tasks);

                angular.forEach(tasks, function(task) {
                    promises.push(self.delete(task));
                });

                $q.all(promises).then(function(res) {
                    console.log('FINISHED');
                    console.log(self.tasks);
                }, function(error) {
                    console.log(error);
                });

            },

            update: function(task) {
                return this.api.update({id: task.id}, task).$promise;
            }

        };

        return data;

    }

}());