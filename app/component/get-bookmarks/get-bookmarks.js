(function() {
  'use strict';

  var app = angular.module('component.get-bookmarks', []);


  // @ - value of attribute
  // = - variable
  app.directive('getBookmarks', function() {
    return {
      restrict: 'E',
      scope: {
        fromSrc: '@',
        storeBookmarksTo: '=',
        storeTagsTo: '='
      },
      controller: function($scope, $http, tagsFactory) {
        $scope.storeBookmarksTo = [];
        $scope.storeTagsTo = [];

        $http.get($scope.fromSrc)
          .error(function() {
            console.error("Error while loading data from '" + $scope.fromSrc + "'.");
          })
          .success(function(data) {
            $scope.storeBookmarksTo = data;
            var tagsArray = tagsFactory.buildTags(data);
            $scope.storeTagsTo = tagsFactory.sortTags(tagsArray);
        });
      }
    };
  });

  app.factory('tagsFactory', function() {
    var result = [];


    /**
     * @param tags
     * @returns array
     */
    result.uniqueItems = function(tags) {
      var hash = {};
      var out = [];
      tags.forEach(function(item) {
        var key = item.toLowerCase();
        if (hash[key] === undefined) {
          hash[key] = item;
          out.push(item);
        }
      });
      return out;
    };

    /**
     * @param data
     * @returns {Array}
     */
    result.buildTags = function(data) {
      // get tag list and number of use each tag
      var tags = [];
      data.forEach(function(item) {
        item.tags = result.uniqueItems(item.tags);
        item.tags.forEach(function(tag) {
          var key = tag.toLowerCase();
          if (tags[key] === undefined) {
            tags[key] = {name: tag, count: 1};
          } else {
            tags[key].count++;
          }
        });
      });
      // convert hash array to index array
      var tagsArray = [];
      for (var key in tags) {
        tagsArray.push(tags[key]);
      }
      return tagsArray;
    };

    /**
     * @param tagsArray
     * @returns {*}
     */
    result.sortTags = function(tagsArray) {
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
        var key1 = a.name.toLowerCase();
        var key2 = b.name.toLowerCase();
        if (key1 < key2) { return -1; }
        if (key1 === key2) { return 0; }
        return 1;
      });
      return tagsArray;
    };

    /**
     * @param str
     * @returns array
     */
    result.parseTags = function(str) {
      if (Array.isArray(str)) return str;

      var array = [];
      var tags = str.split(/[, ]/);
      tags.forEach(function(item) {
        item = item.trim();
        if (item.length > 0)
          array.push(item);
      });
      return array;
    }

    return result;
  });


})();