describe('Landing Controller', function () {
  var controller;
  var $scope = {};

  beforeEach(module('rascal'));

  beforeEach(inject(function ($controller) {
    controller = $controller('LandingCtrl', {
      $scope: $scope
    });
  }));

  it('contains the information for the image carousels', function () {
    $scope.carouselData.should.not.be.null;
  });

});
