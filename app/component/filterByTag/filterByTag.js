(function() {
  'use strict';

  var app = angular.module('component.filterByTag', []);

  app.filter('filterByTag', function() {
    return function(array, tag) {
      if (!Array.isArray(array) || tag === '') return array;

      tag = tag.toLowerCase();
      var result = array.filter(function (item) {
        return item.tags.some(function(tagItem) {
          return tagItem.toLowerCase() === tag;
        });
      });

      return result;
    };
  });

})();