(function() {
    'use strict';

    /* jasmine specs for tasks controllers go here */
    describe('Tasks Controller', function() {
        var scope = {};
        var base_uri = 'carlos';
        var api_key = 'sarlanga';
        var configMock = {"mongolab": {"base_uri": base_uri, "api_key": api_key}};
        var tasksMock = {};


        beforeEach(function(){
            module('tasksModule');

            module(function($provide) {
                $provide.constant('config', configMock);
                $provide.factory('Tasks', tasksMock);
            });

            inject(function ($compile, $rootScope, $q) {
                scope = $rootScope.$new();
                var taskList=[
                    { "id" : "565c94a8e4b03d453c995e48" , "description" : "Hacer el Commit inicial" , "status" : "WIP"},
                    { "id" : "565c94a8e4b03d453c9carlos" , "description" : "Hacer el Commit inicial" , "status" : "WIP"}
                ];
                
                tasksMock.read = function() {
                    return $q.when(taskList);
                };

                tasksMock.addTask = function() {
                    taskList.add({ "id" : "565c94a8e4b03d453c9carlos" , "description" : "Hacer el Commit inicial" , "status" : "WIP"});
                };
            });
        });

        describe('Startup', function() {
            it('Should startup tasks with empty set', inject(function($controller) {
                $controller('TasksController', {$scope:scope, Tasks: tasksMock});
                expect(scope).to.have.property('tasks').with.length(0);
            }));

            it('Should bind 2 tasks from service to scope', inject(function($controller) {
                $controller('TasksController', {$scope:scope, Tasks: tasksMock});
                scope.$digest();
                expect(scope).to.have.property('tasks').with.length(2);
            }));
        });

        describe('Adding task', function() {
            it('Should add a task to the list', inject(function($controller) {
                $controller('TasksController', {$scope:scope, Tasks: tasksMock});
                //should call addTask
                expect(scope).to.have.property('tasks').with.length(3);
            }));
        });
    });
})();
