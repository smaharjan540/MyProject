'use strict';

angular.module('rascal').controller('IntroCtrl', function($scope, $ionicModal, $ionicScrollDelegate, DataService, IEService) {

    if (!DataService.intro) {
        DataService.intro = {};
    }
    $scope.accept = DataService.intro.complete;
    $scope.isNurseFlow = DataService.isNurseFlow();
    IEService.resetFlag();

    $scope.btnIndexZero = {
        disabled: !DataService.intro.complete,
        visible: true,
        href: $scope.isNurseFlow ? 'nurseDetails' : 'patientNeeds'
    };
    $scope.btnIndexOne = {
        disabled: false,
        visible: true,
        href: 'startRequest'
    };

    $scope.legalData = {
        privacy: {
            title: 'Privacy Policy',
            effective: 'May 2016',
            content: 'templates/privacypolicy.snippet.html'
        },
        terms: {
            title: 'Terms of Use',
            effective: 'June 2016',
            content: 'templates/termsofuse.snippet.html'
        }
    };

    $scope.legal = {};

    $ionicModal.fromTemplateUrl('templates/termsandconditions.modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.showPolicy = function () {
        $scope.legal = $scope.legalData.privacy;
        $ionicScrollDelegate.scrollTop();
        $scope.modal.show();
    };

    $scope.showTerms = function () {
        $scope.legal = $scope.legalData.terms;
        $ionicScrollDelegate.scrollTop();
        $scope.modal.show();
    };

    $scope.closeModal = function() {
        $scope.modal.hide();
    };

    $scope.acceptTerms = function() {

      if( 0 === IEService.processEventForIEVersion(11) ) {
        return;
      }

      if ($scope.accept === false || $scope.accept === undefined) {
          $scope.accept = true;
          DataService.intro.complete = true;
          $scope.btnIndexZero.disabled = false;
      } else {
          $scope.accept = false;
          DataService.intro.complete = false;
          $scope.btnIndexZero.disabled = true;
      }
    };
});
