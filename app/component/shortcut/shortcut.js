(function() {

  var app = angular.module('component.shortcut', []);

  app.directive('shortcut', function($location) {
    return {
      restrict: 'E',
      scope: {
        'keyCode': '@',
        'keyIdentifier': '@',
        'do': '@'
      },
      link: function ($scope, element, attrs){
        angular.element(document).on('keydown', function(e){
          if ($scope.keyCode === undefined && $scope.do === undefined) {
            var info = { altKey: e.altKey, ctrlKey: e.ctrlKey, shiftKey: e.shiftKey, keyCode: e.keyCode, keyIdentifier: e.keyIdentifier };
            console.log('shortcut: ' + JSON.stringify(info));
          }

          if ($scope.keyIdentifier !== undefined && e.keyIdentifier == $scope.keyIdentifier ||
              $scope.keyCode !== undefined && e.keyCode == $scope.keyCode) {
            $scope.$parent.$eval($scope.do);
            $scope.$parent.$digest();
            e.preventDefault();
          }
        });
      }
    };
  });

})();

