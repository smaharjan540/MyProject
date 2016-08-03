'use strict';

angular.module('rascal').directive('fileSelect', function () {

  return {
    scope: {
      onFileSelect: '&onFileSelect'
    },
    link: function($scope,el){
      
      el.bind('change', function(e) {
        $scope.file = (e.srcElement || e.target).files[0];
        $scope.onFileSelect({data: $scope.file});
      });
    } 
  };
});
