(function() {
  'use strict';
  var app = angular.module("component.tag-href", ['filter.makeLink']);

  app.directive("tagHref", function ($filter) {
    return {
      restrict: "A",
      link: function ($scope, element, attributes) {
        var value = $scope.$eval(attributes.tagHref);
        element.attr('href', $filter('makeLink')(value));
      }
    };
  });
})();