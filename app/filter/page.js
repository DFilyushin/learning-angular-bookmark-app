(function() {
  'use strict';

  var app = angular.module('filter.page', []);

  app.filter('page', function(PER_PAGE) {
    return function(array, pageNo) {
      if (!Array.isArray(array)) return array;

      var start = (pageNo-1)*PER_PAGE;
      return array.slice(start, start+PER_PAGE);
    }
  });

})();