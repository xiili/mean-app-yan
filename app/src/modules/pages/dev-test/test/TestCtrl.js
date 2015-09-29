'use strict';

angular.module('myApp').controller('TestCtrl', ['$scope', '$timeout', 'appHttp', 'UserModel', '$location', '$q', function($scope, $timeout, appHttp, UserModel, $location, $q) {
        $scope.scopeOne = 'scope Yan';	

        $scope.funcYan = function() {
           console.log('funcOne controller');
        };
        $scope.myVar = 'var1';
	$scope.user =UserModel.load();
        $scope.$on('appMyDirectiveEvt1', function(evt, params) {
           console.log("Controller directive event.");
        });
	
	$scope.swipeIt =function(evt, direction, params) {
		console.log('swipe: '+direction);
	};
	
	$scope.tapIt =function(evt, params) {
		console.log('tap');
	};

        function sync(var1) {
              console.log('sync');
              return var1;
        }

       $scope.$on('myEvt', function(evt, params){
           console.log('on myEvt');
       });

      $scope.$broadcast('myEvt', {});

       $timeout(function() {
            $scope.$broadcast('myEvt', {});
       },1000);
}]);
