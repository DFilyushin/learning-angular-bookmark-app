(function() {

  var app = angular.module('component.shortcut', []);

  app.directive('shortcut', function($location) {
    return {
      restrict: 'E',
      scope: {
        'altKey': '@',
        'ctrlKey': '@',
        'shiftKey': '@',
        'keyCode': '@',
        'keyIdentifier': '@',
        'do': '@'
      },
      link: function ($scope, element, attrs){
        angular.element(document).on('keydown', function(e){
          if ($scope.do === undefined) {
            var info = { altKey: e.altKey, ctrlKey: e.ctrlKey, shiftKey: e.shiftKey, keyCode: e.keyCode, keyIdentifier: e.keyIdentifier };
            console.log('shortcut: ' + JSON.stringify(info));
            return;
          }
          var alt = e.altKey === ($scope.altKey !== undefined);
          var ctrl = e.ctrlKey === ($scope.ctrlKey !== undefined);
          var shift = e.shiftKey === ($scope.shiftKey !== undefined);
          if (alt && ctrl && shift &&
              ($scope.keyIdentifier !== undefined && e.keyIdentifier == $scope.keyIdentifier ||
               $scope.keyCode !== undefined && e.keyCode == $scope.keyCode)) {
            $scope.$parent.$eval($scope.do);
            $scope.$parent.$digest();
            e.preventDefault();
          }
        });
      }
    };
  });

})();

