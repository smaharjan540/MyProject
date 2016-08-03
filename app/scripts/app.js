'use strict';

// Ionic Rascal App
var rascalApp = angular.module('rascal', ['ionic', 'ngCordova', 'rascal.templates', '$idle']);

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
        .state('storeId',
        {
            url: '/storeid',
            templateUrl: 'templates/storeid.html',
            controller: 'StoreIdCtrl'
        })
        .state('landing',
        {
            url: '/landing',
            templateUrl: 'templates/landing.html',
            controller: 'LandingCtrl'
        })
        .state('startRequest',
        {
            url: '/startrequest',
            templateUrl: 'templates/startrequest.html',
            controller: 'StartRequestCtrl'
        })
        .state('intro',
        {
            url: '/intro',
            templateUrl: 'templates/intro.html',
            controller: 'IntroCtrl'
        })
        .state('patientNeeds',
        {
            url: '/patientneeds',
            templateUrl: 'templates/patientneeds.html',
            controller: 'PatientNeedsCtrl'
        })
        .state('patientInfo',
        {
            url: '/patientinfo',
            templateUrl: 'templates/patientinfo.html',
            controller: 'PatientInfoCtrl'
        })
        .state('contactDetails',
        {
            url: '/contactdetails',
            templateUrl: 'templates/contactdetails.html',
            controller: 'ContactDetailsCtrl'
        })
        .state('doctorInfo',
        {
            url: '/doctorinfo',
            templateUrl: 'templates/doctorinfo.html',
            controller: 'DoctorInfoCtrl'
        })
        .state('insurance',
        {
            url: '/insurance',
            templateUrl: 'templates/insurance.html',
            controller: 'InsuranceCtrl'
        })
        .state('confirmation',
        {
            url: '/confirmation',
            templateUrl: 'templates/confirmationpage.html',
            controller: 'ConfirmationCtrl'
        })
        .state('thanks',
        {
            url: '/thanks',
            templateUrl: 'templates/thanks.html',
            controller: 'ThanksCtrl'
        })
        .state('nurseDetails',
        {
            url: '/nursedetails',
            templateUrl: 'templates/nursedetails.html',
            controller: 'NurseDetailsCtrl'
        })
        .state('nursePatientInfo',
        {
            url: '/nursepatientinfo',
            templateUrl: 'templates/nursepatientinfo.html',
            controller: 'NursePatientInfoCtrl'
        })
        .state('nursePatientInsurance',
        {
            url: '/nursepatientinsurance',
            templateUrl: 'templates/nursepatientinsurance.html',
            controller: 'NursePatientInsuranceCtrl'
        })
        .state('productRequest',
        {
            url: '/productrequest',
            templateUrl: 'templates/productrequest.html',
            controller: 'ProductRequestCtrl'
        })
        .state('nursePatientDoctor',
        {
            url: '/nursepatientdoctor',
            templateUrl: 'templates/nursepatientdoctor.html',
            controller: 'NursePatientDoctorCtrl'
        })
        .state('nurseConfirmation',
        {
            url: '/nurseconfirmation',
            templateUrl: 'templates/nurseconfirmationpage.html',
            controller: 'ConfirmationCtrl'
        });
    $urlRouterProvider.otherwise(function () {
        if (window.ionic.Platform.platform() === 'android' && !window.localStorage.getItem('rascal-store-id')) {
            return '/storeid';
        }
        else {
            return '/landing';
        }
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
