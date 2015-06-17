(function() {
  'use strict';

  var app = angular.module('component.bookmark-form', []);

  app.directive('bookmarkForm', function() {
     return {
       restrict: 'E',
       templateUrl: 'app/component/bookmark-form/bookmark-form.html',
       controller: function($scope, $modal) {
         var modalInstance = null;

         $scope.newBookmark = function() {
           modalInstance = $modal.open({
             animation: false,
             templateUrl: 'myModalContent.html'
           });
         };

         $scope.editBookmark = function () {
           modalInstance = $modal.open({
             animation: false,
             templateUrl: 'myModalContent.html'
           });
         };

         $scope.cancel = function() {
           modalInstance.dismiss();
         };
       }
     };
    });

})();