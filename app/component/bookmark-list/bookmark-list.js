(function() {
  'use strict';

  var app = angular.module('component.bookmark-list', [
    'ui.bootstrap.pagination',
    'ui.bootstrap.modal',
    'component.tag-href',
    'component.shortcut',
    'filter.byTag'
  ]);

  app.constant('PER_PAGE', 20);

  app.directive('bookmarkList', function(PER_PAGE) {
    return {
      restrict: 'E',
      templateUrl: 'app/component/bookmark-list/bookmark-list.html',
      controller: function($scope, $location) {

        $scope.makeEditLink = function(bookmark) {
          return '#/edit/' + btoa(bookmark.u);
        };

        $scope.remove = function(bookmark) {
          $scope.bookmarks.splice($scope.bookmarks.indexOf(bookmark), 1);
        };

        $scope.clearFilter = function() {
          $location.url('');
        };

        $scope.getMaxPage = function() {
          var count = $scope.filterCount;
          var result = (count / PER_PAGE)|0;
          if (count % PER_PAGE > 0)
            result++;
          return result;
        }

        $scope.nextPage = function() {
          var maxPage = $scope.getMaxPage();
          if ($scope.currentPage >= maxPage)
            $scope.currentPage = maxPage;
          else
            $scope.currentPage++;
        };

        $scope.prevPage = function() {
          if ($scope.currentPage <= 1)
            $scope.currentPage = 1;
          else
            $scope.currentPage--;
        };

        $scope.firstPage = function() {
          $scope.currentPage = 1;
        };

        $scope.lastPage = function() {
          $scope.currentPage = $scope.getMaxPage();
        };

        $scope.currentPage = 1;
        $scope.perPage = PER_PAGE;
      }
    };
  });

  app.run(function($rootScope, $location) {
    $rootScope.$on("$locationChangeSuccess",function(event, next, current){
      // fix '#' char
      var tag = $location.url().replace(/\/(filter\/)?/, '').replace('_sharp_', '#').trim().toLowerCase();

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