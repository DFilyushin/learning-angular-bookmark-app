(function() {
  'use strict';

  var app = angular.module('component.get-bookmarks', []);

  app.factory('bookmarkStore', function($http) {
    return {
      get: $http.get('component/get-bookmarks/dmoz_part.json')
    };
  });

  app.directive('getBookmarks', function() {
    return {
      restrict: 'E',
      controller: function($scope, bookmarkStore) {
        $scope.bookmarks = [];
        $scope.tags = [];

        bookmarkStore.get.
          error(function() {
            console.log("Error while loading json data.");
          }).
          success(function(data) {
          $scope.bookmarks = data;

          // get tag list and number of use each tag
          var tags = [];
          data.forEach(function(item) {
            item.tags.forEach(function(tag) {
              if (tags[tag] === undefined) {
                tags[tag] = {name: tag, count: 1};
              } else {
                tags[tag].count++;
              }
            });
          });

          // convert hash array to index array
          var tagsArray = [];
          for (var key in tags) {
            tagsArray.push(tags[key]);
          }

          // sort by count descending
          tagsArray.sort(function(a, b) {
            return b.count - a.count;
          });
          var index = 1;
          tagsArray.forEach(function(item) {
            item.order = index++;
          });

          // sort by alphabet
          tagsArray.sort(function(a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name === b.name) { return 0; }
            return 1;
          });

          $scope.tags = tagsArray;
        });
      }
    };
  });

})();