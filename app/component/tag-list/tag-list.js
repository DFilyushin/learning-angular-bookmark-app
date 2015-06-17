(function() {
  'use strict';

  var app = angular.module('component.tag-list', []);

  app.directive('tagList', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/component/tag-list/tag-list.html',
      link: function($scope) {
        $scope.makeTagLink = function(tag) {
          return '#filter/' + tag.name.replace('#','_sharp_').toLowerCase();
        };
      }
    };
  });

})();