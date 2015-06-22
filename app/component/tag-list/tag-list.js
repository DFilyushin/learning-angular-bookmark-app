(function() {
  'use strict';

  var app = angular.module('component.tag-list', ['component.tag-href']);

  app.directive('tagList', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/component/tag-list/tag-list.html'
    };
  });

})();