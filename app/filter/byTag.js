(function() {
  'use strict';

  var app = angular.module('filter.byTag', []);

  app.filter('byTag', function($rootScope) {
    return function(array, tag, nameOfCounter) {
      if (!Array.isArray(array)) return array;
      $rootScope[nameOfCounter] = array.length;
      if (tag === '') return array;

      tag = tag.toLowerCase();
      var result = array.filter(function (item) {
        return item.tags.some(function(tagItem) {
          return tagItem.toLowerCase() === tag;
        });
      });

      $rootScope[nameOfCounter] = result.length;
      return result;
    };
  });

})();