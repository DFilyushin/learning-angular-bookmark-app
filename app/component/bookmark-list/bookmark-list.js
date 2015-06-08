(function() {
  'use strict';

  var app = angular.module('component.bookmark-list', []);

  app.directive('bookmarkList', function() {
    return {
      restrict: 'E',
      templateUrl: 'component/bookmark-list/bookmark-list.html',
      controller: function($scope, $location) {
        $scope.edit = function(bookmark) {
          alert(JSON.stringify(bookmark));
        };

        $scope.remove = function(bookmark) {
          $scope.bookmarks.splice($scope.bookmarks.indexOf(bookmark), 1);
        };

        $scope.clearFilter = function() {
          $location.url('');
        };
      }
    };
  });

  app.run(function($rootScope, $location) {
    $rootScope.$on("$locationChangeSuccess",function(event, next, current){
      // fix '#' char
      var tag = $location.url().replace(/\/(filter\/)?/, '').replace('_sharp_', '#').toLowerCase();

      // lookup tag with correct char case
      $rootScope.tags.forEach(function(item){
        if (tag === item.name.toLowerCase())
        {
          tag = item.name;
          return;
        }
      });
      $rootScope.filterTag = tag;
      console.log("$location.url() = "+$location.url()+", filterTag = "+tag);
    });

  });

})();