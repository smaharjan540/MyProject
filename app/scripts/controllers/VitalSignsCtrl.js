(function() {
    'use strict';

    angular
        .module('rascal')
        .controller('VitalSignsCtrl', VitalSignsCtrl);

    VitalSignsCtrl.$inject = [ '$scope'];

    /* @ngInject */
    function VitalSignsCtrl($scope) {

        // $scope.temperature= $scope.currentCharting.formData.vitalSigns.vitalSignsAssessed.tempearture?$scope.currentCharting.formData.vitalSigns.vitalSignsAssessed.tempearture:'';
        console.log($scope.temp);
        $scope.add = function() {
            console.log($scope.currentCharting.formData);
            console.log($scope.temp);
            console.log($scope.temp);
            // console.log($scope);
            // if($scope.currentCharting.formData.vitalSigns.vitalSignsAssessed.tempearture){
            //     console.log($scope.currentCharting.formData);
            //     console.log($scope);
            //     $scope.currentCharting.formData.vitalSigns.vitalSignsAssessed.tempearture = $scope.temperature;
            // }
            $scope.close();
        }

        $scope.close = function(){
            $scope.modalInstance.dismiss();
        }
    }
})();
