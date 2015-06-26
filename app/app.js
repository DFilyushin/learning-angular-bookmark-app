/*
 * DONE List of bookmarks with tags.
 * DONE List of tags with number of using.
 * DONE Removing bookmark.
 * DONE Filtering by tag.
 * DONE Pagination.
 * TODO New bookmark form.
 * TODO Editing bookmark.
 * TODO Add button "Last Bookmark".
 * TODO Store bookmarks to local storage.
 */

(function() {
  'use strict';

  var app = angular.module('bookmarkApp', [
    'component.get-bookmarks',
    'component.bookmark-list',
    'component.tag-list',
    'component.bookmark-form'
  ]);

  app.run(function($rootScope) {
    $rootScope.removeAllBookmarks = function () {
      $rootScope.bookmarks = [];
      $rootScope.tags = [];
      $rootScope.filterTag = '';
    };
  });
})();

