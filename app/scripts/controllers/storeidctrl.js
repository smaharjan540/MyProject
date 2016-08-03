'use strict';

angular.module('rascal').controller('StoreIdCtrl', function ($scope, $state, DataService) {
  $scope.info = { storeId: (window.localStorage.getItem('rascal-store-id') || '') };
  if (!DataService.isNativeApp() || !!$scope.info.storeId) {
    DataService.storeId = $scope.info.storeId;
    $state.go('landing');
  }
  $scope.enterStoreId = function () {
    DataService.storeId = $scope.info.storeId;
    window.localStorage.setItem('rascal-store-id', $scope.info.storeId);
    $state.go('landing');
  };
});
