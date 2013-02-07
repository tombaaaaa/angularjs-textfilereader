'use strict';

/* Directives */

var myDirectives = angular.module('myApp.directives', []);

myDirectives.directive('filereader', function ($compile) {
  return {
    scope: {
      files: '='
    },
    restrict: 'E',
    template: "<input type='file' onchange='angular.element(this).scope().upload(this)'>",
    link: function (scope, element, attrs) {
      scope.upload = function (element) {
        scope.$apply(function (scope) {
          scope.files = element.files;
        });
      };

      scope.$watch('files', function () {
        if (scope.files) {
          for (var i = 0; i < scope.files.length; i += 1) {
            var current = scope.files[i];
            var reader = new FileReader();

            reader.onload = (function (file) {
              return function (env) {
                scope.$apply(function () {
                  current.contents = env.target.result;
              });
              }
            }(current));

            reader.readAsText(current);
          }
        }
      }, true);
    }
  };
});