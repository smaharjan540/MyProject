'use strict';

angular.module('rascal').controller('PatientNeedsCtrl', function($scope, DataService) {

  if (!DataService.patientNeeds) {
    DataService.patientNeeds = {
      categories: {
        incontinence: {
          id: 'incontinence',
          title: 'Incontinence',
          details: 'Briefs, Pull-Ups/Underwear, Underpads, Liners',
          checkboxValue: false,
          image: 'images/carousel/Incontinence.jpg'
        },
        ostomy: {
          id: 'ostomy',
          title: 'Ostomy',
          details: 'One-Piece and Two-Piece Pouching Systems, Accessories',
          checkboxValue: false,
          image: 'images/carousel/Ostomy.jpg'
        },
        wound: {
          id: 'wound',
          title: 'Wound Care',
          details: 'Wound cleanser/saline, Gauze Dressing, Bandage Rolls, Foam Dressings, Medical Tape',
          checkboxValue: false,
          image: 'images/carousel/Woundcare.jpg'
        },
        diabetes: {
          id: 'diabetes',
          title: 'Diabetes Management / Testing Supplies',
          details: 'Glucometer, Test Strips, Lancets',
          checkboxValue: false,
          image: 'images/carousel/Diabetes.jpg'
        },
        insulin: {
          id: 'insulin',
          title: 'Insulin Therapy',
          details: 'CGM (Continuous Glucose Monitors), Insulin Pumps and OmniPods',
          checkboxValue: false,
          image: 'images/carousel/Insulin.jpg'
        },
        urological: {
          id: 'urological',
          title: 'Urological',
          details: 'Intermittent Catheters (Straight, Coudé, and External), Lubricating Jelly, Leg and Night Drainage Bags',
          checkboxValue: false,
          image: 'images/carousel/Urological.jpg'
        },
        health: {
          id: 'health',
          title: 'Health and Wellness',
          details: 'Blood Pressure Monitors, CPAP Accessories, Nebulizers, Nutrition (Supplemental, Infant and Toddler), Shower Chairs, Canes, Toilet Risers',
          checkboxValue: false,
          image: 'images/carousel/Healthandwellness.jpg'
        }
      },
      complete: false,
      specialRequest : ''
    };
  }
  $scope.needs = DataService.patientNeeds;

  $scope.display = {
    row1: [$scope.needs.categories.incontinence, $scope.needs.categories.ostomy, $scope.needs.categories.wound, $scope.needs.categories.diabetes],
    row2: [$scope.needs.categories.insulin, $scope.needs.categories.urological, $scope.needs.categories.health]
  };

  $scope.btnIndexZero = {
    disabled: !DataService.patientNeeds.complete,
    visible: true,
    href: 'patientInfo'
  };
  $scope.btnIndexOne = {
    disabled: false,
    visible: true,
    href: 'intro'
  };

  $scope.onClick = function (category) {
    $scope.needs.categories[category].checkboxValue = !$scope.needs.categories[category].checkboxValue;
  };

  $scope.$watch('needs.categories', function () {
    function somethingIsSelected() {
      return Object.keys($scope.needs.categories)
          .map(function (key) {
            return $scope.needs.categories[key].checkboxValue || false;
          })
          .reduce(function (p, c) {
            return p || c;
          });
    }

    var complete = somethingIsSelected();
    $scope.needs.complete = complete;
    $scope.btnIndexZero.disabled = !complete;
  }, true);

});
