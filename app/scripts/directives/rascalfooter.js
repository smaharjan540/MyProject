'use strict';

angular.module('rascal').directive('rascalFooter', function($templateCache) {
    return {
        restrict: 'E',
        template: $templateCache.get('templates/footer.dir.html'),
        scope: {
          btnIndexZero: '=',
          btnIndexOne: '=',
          displayReCaptcha: '@',
          callback: '&'
        },
        controller: function ($scope, $rootScope, $state, DataService) {
          $scope.initializedReCaptcha = false;
          $scope.onDisplayReCaptcha = function() {

            if( $scope.displayReCaptcha === 'true' && false === DataService.isNativeApp() ) {
              if( angular.element('#recaptchaplaceholder').length > 0 ) { // Only do this on footer that has div with id of: recaptchaplaceholder
                if( !$scope.initializedReCaptcha ) {
                  if( 0 === angular.element('#recaptchaplaceholder').find('#recaptcha').length ) {
                    angular.element('#recaptcha').detach().prependTo('#recaptchaplaceholder');
                    angular.element('.recaptcha-container').find('.btn-nav').attr('disabled', true);
                  }
                  $scope.initializedReCaptcha = true;
                }
              }
              return true;
            }
            return false;
          };
          $scope.displayCaptchaMessage = function() {
            return $scope.displayReCaptcha === 'true' && !DataService.isNativeApp();
          };          
          $scope.onClickBtnZero = function() {
            var result = $scope.callback();
            if (typeof result === 'undefined' || result) {
              $state.go($scope.btnIndexZero.href);
            }
          };
          $scope.onClickBtnOne = function () {
            $state.go($scope.btnIndexOne.href);
          };
          $scope.$on('$destroy', function () {
            if( $scope.displayReCaptcha === 'true' && false === DataService.isNativeApp() ) {
              grecaptcha.reset();
              if( angular.element('#recaptchaplaceholder').length > 0 ) { // Only do this on footer that has div with id of: recaptchaplaceholder
                if( 1 === angular.element('#recaptchaplaceholder').find('#recaptcha').length ) {
                  angular.element('#recaptcha').detach().prependTo('#recaptchahidden');
                }
              }              
            }
          });          
        }
    };
});

//
// ReCaptcha settings / callback.
//

var useReCaptchaServerValidation = false;

var captchaVerifyCallback = function(reCaptchaResponse) {
  if( useReCaptchaServerValidation ) {
    jQuery.ajax({
      url: '/recaptcha/validate/' + reCaptchaResponse,
      headers: {
          'Content-Type' : 'application/json',
          'Accept' : 'application/json'
      },
      type: 'POST',
      data: {},
      success: function(data) {
          if( data === true ) {
            angular.element('.recaptcha-container').find('.btn-nav').attr('disabled', false);
          }
      },
      error: function (/* jqXHR, textStatus, errorThrown */) {
        angular.element('.recaptcha-container').find('.btn-nav').attr('disabled', false);
      }
    });
  }
  else {
    angular.element('.recaptcha-container').find('.btn-nav').attr('disabled', false);
  }
};
