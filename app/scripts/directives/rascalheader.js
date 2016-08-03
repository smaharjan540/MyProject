'use strict';

angular.module('rascal').directive('rascalHeader', function($templateCache) {
    return {
        restrict: 'E',
        template: $templateCache.get('templates/header.dir.html'),
        scope: {
            hideQuitButton: '@'
        },
        controller: function ($scope, $state, DataService, $ionicModal) {
            $ionicModal.fromTemplateUrl('templates/sessiontimeout.modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.timeoutModal = modal;
            });

            $ionicModal.fromTemplateUrl('templates/quit.modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.quitModal = modal;
            });

            $scope.closeTimeoutModal = function() {
                $scope.timeoutModal.hide();
            };

            $scope.quitSession = function() {
                $scope.timeoutModal.hide();
                $scope.quitModal.hide();
                DataService.clearData();
                $state.go('landing');
            };

            $scope.$on('$userIdle', function () {
                console.log('User is now idle');
                $scope.timeoutModal.show();
            });

            $scope.$on('$userTimeout', function () {
                console.log('User now timed out');
                $scope.quitSession();
            });

            $scope.showQuitModal = function () {
                $scope.quitModal.show();
            };

            $scope.closeQuitModal = function () {
                $scope.quitModal.hide();
            };
        }
    };
});
