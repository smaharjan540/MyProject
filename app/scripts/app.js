'use strict';

// Ionic Rascal App
var rascalApp = angular.module('rascal', ['ui.bootstrap','ionic', 'ngCordova', 'rascal.templates', '$idle']);

rascalApp.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $idleProvider) {

    // app settings for easier dev.
    $ionicConfigProvider.views.maxCache(0);
    //$ionicConfigProvider.views.transition('none');
    $ionicConfigProvider.scrolling.jsScrolling(true);

    $idleProvider.setIdleTime(180);
    $idleProvider.setTimeoutTime(60);
    $idleProvider.keepalive(false);
    $idleProvider.autoResume(true);

    $stateProvider
        .state('landing',
        {
            url: '/landing',
            templateUrl: 'templates/landing.html',
            controller: 'LandingCtrl'
        });
    $urlRouterProvider.otherwise(function () {
           return '/landing';
    });
});

/*istanbul ignore next*/
rascalApp.run(function ($ionicPlatform, $cordovaDevice, DataService) { // ionicPlatform service injected as dependency into run function.

    $ionicPlatform.ready(function () { // This is the same as document.ready()
        try {
            // plugins is not defined, so code commented out for now.
            // if (window.cordova && window.cordova.plugins.Keyboard) {
            //     // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            //     // for form inputs)
            //     cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            //     // Don't remove this line unless you know what you are doing. It stops the viewport
            //     // from snapping when text inputs are focused. Ionic handles this internally for
            //     // a much nicer keyboard experience.
            //     cordova.plugins.Keyboard.disableScroll(true);
            // }

            if (window.cordova) {
                window.cordova.getAppVersion(function(version) {
                    DataService.appVersion = version;
                });
            }

            var hardwareBackButtonHandler = function () {
                console.log('Hardware back button pressed');
                // do more interesting things here
            };

            $ionicPlatform.onHardwareBackButton(hardwareBackButtonHandler);

            // Register Cordova events in ionicPlatform.ready() method.
            $ionicPlatform.on('pause', function () {
                console.log('App is sent to background');
                // do stuff to save power
            });

            $ionicPlatform.on('resume', function () {
                console.log('App is retrieved from background');
                // re-init the app
            });

            // Supported only in BlackBerry 10 & Android
            $ionicPlatform.on('volumeupbutton', function () {
                console.log('Volume up button pressed');
                // moving a slider up
            });

            $ionicPlatform.on('volumedownbutton', function () {
                console.log('Volume down button pressed');
                // moving a slider down
            });
        }
        catch (jsE) {
            console.log('Ionic ready() event handler error: ' + jsE.message);
        }
    });
});
