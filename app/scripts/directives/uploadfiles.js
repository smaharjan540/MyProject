'use strict';

angular.module('rascal').directive('uploadfiles', function($templateCache) {
    return {
        restrict: 'EA',
        scope: {
            input: '@',
            itemData: '='
        },
        template: $templateCache.get('templates/uploadfiles.dir.html'),
        controller: function() {

        }
    };
});
