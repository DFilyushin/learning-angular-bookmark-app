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
    'ui.bootstrap.pagination',
    'component.get-bookmarks',
    'component.bookmark-list',
    'component.tag-list',
    'filter.byTag',
    'filter.page'
  ]);

})();

