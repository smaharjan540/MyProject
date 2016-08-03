'use strict';

angular.module('rascal').directive('testBox', function ($templateCache) {
return {
        scope: {
            label: '@label',
            value: '@value',
            property: '='
        },
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/test.dir.html'
    };
});
