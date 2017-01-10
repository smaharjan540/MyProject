(function () {
    'use strict';
    angular
        .module('rascal')
        .directive("keypad", keypad);

// takes a model called value and changes it with a keypad for other inputs to consume
    function keypad() {
        return {
            restrict: 'E',
            templateUrl: 'templates/keypad.html',
            controller: keypadCtrl,
            replace: true,
            scope: {
                value: "=",
                hideDecimal: "@"
            },
            link: function(scope, elem, attr, ctrl){
                console.log(scope);
                console.log(ctrl);
            }
        };
    }

    function keypadCtrl($scope) {
        $scope.addNum = addNum;
        $scope.deleteLastNum = deleteLastNum;
        $scope.addDecimal = addDecimal;

        function addNum(num) {
            console.log($scope.value);
            $scope.value = $scope.value + num;
        }

        function deleteLastNum() {
            $scope.value  = $scope.value.slice(0, - 1);
        }

        function addDecimal() {
            $scope.value = $scope.value + ".";
        }
    }

})();