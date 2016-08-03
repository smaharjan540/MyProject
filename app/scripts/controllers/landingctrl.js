'use strict';

angular.module('rascal').controller('LandingCtrl', function($scope) {
  $scope.carouselData = [
    {
      url: 'images/carousel/Diabetes.jpg',
      subtext: 'Diabetes Testing Supplies'
    },
    {
      url: 'images/carousel/Woundcare.jpg',
      subtext: 'Wound Care'
    },
    {
      url: 'images/carousel/Incontinence.jpg',
      subtext: 'Incontinence'
    },
    {
      url: 'images/carousel/Insulin.jpg',
      subtext: 'Insulin Delivery'
    },
    {
      url: 'images/carousel/Ostomy.jpg',
      subtext: 'Ostomy'
    },
    {
      url: 'images/carousel/Healthandwellness.jpg',
      subtext: 'Health & Wellness'
    },
    {
      url: 'images/carousel/Urological.jpg',
      subtext: 'Urological'
    }
  ];
});
