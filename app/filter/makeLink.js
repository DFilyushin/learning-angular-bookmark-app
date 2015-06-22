(function() {
  'use strict';

  angular.module('filter.makeLink', [])
    .filter('makeLink', function($rootScope) {
      return function(tagName) {
        return '#filter/' + tagName.replace('#','_sharp_').toLowerCase();
      };
    });

})();