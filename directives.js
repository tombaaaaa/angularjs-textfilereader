'use strict';

/* Directives */

var myDirectives = angular.module('myApp.directives', []);

myDirectives.directive('filereader', function ($compile) {
  return {
    scope: {
      file: '='
    },
    restrict: 'E',
    template: "<input type='file' onchange='angular.element(this).scope().upload(this)'>",
    link: function (scope, element, attrs) {
      scope.upload = function (element) {
        scope.$apply(function (scope) {
          scope.file = element.files[0];
        });
      };

      scope.$watch('file', function () {
        if (scope.file) {
          var reader = new FileReader();
          reader.onload = (function (file) {
            return function (env) {
              scope.$apply(function () {
                scope.file.contents = env.target.result;
              });
            }
          }(scope.file));
          reader.readAsText(scope.file);
        }
      }, true);
    }
  };
});