(function() {
    'use strict';

    /* Tasks Controllers */
    angular.module('tasksModule')
        .controller('TasksController', ['$scope', 'Tasks', function ($scope, Tasks) {
            $scope.tasks = [];
            $scope.task = "";

            $scope.addTask = function(description) {
            	Tasks.post(description).then(function() {
            		$scope.readAll();
            		$scope.task = "";
            	});
            };

            $scope.readAll = function() {
         	   Tasks.read().then(function (tasks) {
            	    $scope.tasks = tasks;
            	});
        	};

        	$scope.readAll();

        }]);
})();
