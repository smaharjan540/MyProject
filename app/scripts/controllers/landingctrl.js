(function(){
'use strict';

angular.module('rascal').controller('LandingCtrl', LandingCtrl);

LandingCtrl.$inject=['$scope', 'ModalSvc'];
function LandingCtrl($scope, ModalSvc){
 $scope.toggleTemp= function() {
            console.log($scope.currentCharting);
            $scope.modalInstance = ModalSvc.openModalWithCloseHook({
                templateUrl: 'templates/temperature.html',
                scope: $scope,
                controller: 'VitalSignsCtrl'
            });
        }
}
})();

