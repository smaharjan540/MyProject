(function() {
    'use strict';

    angular.module('rascal')
        .directive('vitalSigns', vitalSignsModal);

    vitalSignsModal.$inject = [];

    function vitalSignsModal() {
        return {
            restrict: 'E',
            scope: true,
            replace: true, // Replace with the template below
            transclude: true, // we want to insert custom content inside the directive
            link: function(scope, element, attrs) {
                scope.title = attrs.title;
            },
            templateUrl: 'templates/vitalSigns.html'
        };
    }
})();