/**
 * Created by szka on 04.05.2016.
 */
(function() {

    'use strict';

    angular
        .module('checklist')
        .factory('StoreFactory', StoreFactory);

    StoreFactory.$inject = ['$resource', '$q'];

    function StoreFactory($resource, $q) {

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
                
                return this.api.save(task).$promise
                    .then(function(res) {
                        self.tasks.push(res);
                    }, function(err) {
                        console.log('an error has occured');
                        console.log(err);
                    });
            },

            delete: function(task) {
                var self = this;

                return this.api.delete({id: task.id}).$promise
                    .then(function(res) {
                        self.tasks.splice(self.tasks.indexOf(task), 1);
                    }, function(err) {
                        console.log('an error has occured');
                        console.log(err);
                    });
            },

            toggle: function(task) {
                task.completed = !task.completed;

                return this.update(task);
            },

            mark: function(task) {
                task.completed = true;

                return this.update(task);
            },

            markAll: function() {
                var self = this, promises = [];

                angular.forEach(self.tasks, function(task) {
                    promises.push(self.mark(task));
                });

                return $q.all(promises);
            },

            clear: function() {
                var tasks, self = this, promises = [];

                tasks = this.tasks.filter(function(task) {
                    return task.completed;
                });

                angular.forEach(tasks, function(task) {
                    promises.push(self.delete(task));
                });

                return $q.all(promises);
            },

            update: function(task) {
                return this.api.update({id: task.id}, task).$promise;
            }

        };

        return data;

    }

}());