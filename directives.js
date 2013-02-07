'use strict';

/* Directives */

var myDirectives = angular.module('myApp.directives', []);

myDirectives.directive('filereader', function ($compile) {
  return {
    scope: {},
    controller: function($scope) {
      $scope.files = [];

      $scope.upload = function (element) {
        $scope.$apply(function ($scope) {
          $scope.files = element.files;
        });
      };

      $scope.$watch('files', function () {

        for (var i = 0; i < $scope.files.length; i += 1) {
          var current = $scope.files[i];
          var reader = new FileReader();

          reader.onload = (function (file) {
            return function (env) {
              $scope.$apply(function () {
                current.contents = env.target.result;
            });
            }
          }(current));

          reader.readAsText(current);
        }

      }, true);
    },
    restrict: 'E',
    template: "<pre>{{files | json}}</pre><input type='file' onchange='angular.element(this).scope().upload(this)'>",
  };
});