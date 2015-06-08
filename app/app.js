/*
 * DONE List of bookmarks with tags.
 * DONE List of tags with number of using.
 * DONE Removing bookmark.
 * DONE Filtering by tag.
 * TODO Pagination.
 * TODO New bookmark form.
 * TODO Editing bookmark.
 * TODO Add button "Last Bookmark".
 * TODO Store bookmarks on local storage.
 */

(function() {
  'use strict';

  var app = angular.module('bookmarkApp', [
    'component.get-bookmarks',
    'component.bookmark-list',
    'component.tag-list',
    'component.filterByTag'
  ]);

})();

