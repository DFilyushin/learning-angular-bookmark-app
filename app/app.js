/*
 * DONE List of bookmarks with tags.
 * DONE List of tags with number of using.
 * DONE Removing bookmark.
 * DONE Filtering by tag.
 * DONE Pagination.
 * DONE New bookmark form.
 * DONE Editing bookmark.
 * DONE Add button "Last Bookmark".
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

  app.run(function($rootScope, $location) {
    $rootScope.removeAllBookmarks = function () {
      $rootScope.bookmarks = [];
      $rootScope.tags = [];
      $location.url('');
    };
  });
})();

