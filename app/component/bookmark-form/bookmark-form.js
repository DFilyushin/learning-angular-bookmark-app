(function() {
  'use strict';

  var app = angular.module('component.bookmark-form', ['component.get-bookmarks']);

  app.directive('bookmarkForm', function() {
     return {
       restrict: 'E',
       //scope: {
       //  useBookmarks: '=',
       //  useTags: '='
       //},
       templateUrl: 'app/component/bookmark-form/bookmark-form.html',
       controller: function($scope, $modal, tagsFactory) {
         var modalInstance = null;
         var storeBookmark = null;
         $scope.savedBookmark = null;

         $scope.newBookmark = function() {
           storeBookmark = null;
           $scope.mode = 'ADD';
           $scope.edit = {};
           modalInstance = $modal.open({animation: false, templateUrl: 'BookmarkEditForm.html' });
         };

         $scope.editBookmark = function (bookmark) {
           storeBookmark = bookmark;
           $scope.mode = 'EDIT';
           $scope.edit = { url: bookmark.u, title: bookmark.t, description: bookmark.d, tags: bookmark.tags };
           modalInstance = $modal.open({animation: false, templateUrl: 'BookmarkEditForm.html' });
         };

         $scope.lastBookmark = function () {
           if ($scope.savedBookmark)
             $scope.editBookmark($scope.savedBookmark);
         }

         $scope.ok = function() {
           switch($scope.mode)
           {
             case 'ADD':
               $scope.doAddBookmark($scope.edit);
               break;
             case 'EDIT':
               $scope.doUpdateBookmark($scope.edit, storeBookmark);
               break;
           }
           modalInstance.dismiss();
         };

         $scope.cancel = function() {
           modalInstance.dismiss();
         };

         $scope.doAddBookmark = function (edit) {
           var bookmark = {u: edit.url, t: edit.title, d: edit.description, tags: tagsFactory.parseTags(edit.tags) };
           $scope.bookmarks.push(bookmark);
           $scope.updateTags();
           $scope.savedBookmark = bookmark;
         };

         $scope.doUpdateBookmark = function(edit, bookmark) {
           bookmark.u = edit.url;
           bookmark.t = edit.title;
           bookmark.d = edit.description;
           bookmark.tags = tagsFactory.parseTags(edit.tags);
           $scope.updateTags();
           $scope.savedBookmark = bookmark;
         };

         $scope.doRemoveBookmark = function(bookmark) {
           $scope.bookmarks.splice($scope.bookmarks.indexOf(bookmark), 1);
           $scope.updateTags();
           $scope.savedBookmark = null;
         };

         $scope.updateTags = function() {
           var tagsArray = tagsFactory.buildTags($scope.bookmarks);
           $scope.tags = tagsFactory.sortTags(tagsArray);
         };
       }
     };
    });

})();