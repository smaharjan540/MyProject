'use strict';

describe('Image Carousel Directive', function () {
  var $compile, $scope;

  beforeEach(module('rascal'));

  beforeEach(inject(function(_$compile_, $rootScope){
    $compile = _$compile_;
    $scope = $rootScope.$new();
  }));

  it('upon initializtation, calculates which images to display based on shownImages', function () {
    $scope.carousel = [
      { url: 'uri1', subtext: 'test1' },
      { url: 'uri2', subtext: 'test2' },
      { url: 'uri3', subtext: 'test3' }
    ];
    var element = getCompiledElement('<image-carousel image-data="carousel"></image-carousel>');
    element.isolateScope().images.should.deep.equal($scope.carousel);
    var element = getCompiledElement('<image-carousel image-data="carousel" shown-images="2"></image-carousel>');
    element.isolateScope().images.should.deep.equal($scope.carousel.slice(0, 2));
  });

  it('cycleLeft and cycleRight do nothing if imageData is undefined or empty', function () {
    $scope.carousel = [];
    var element = getCompiledElement('<image-carousel></image-carousel>');
    element.isolateScope().images.should.be.empty;
    element.isolateScope().cycleLeft();
    element.isolateScope().images.should.be.empty;
    element.isolateScope().cycleRight();
    element.isolateScope().images.should.be.empty;

    var element = getCompiledElement('<image-carousel image-data="carousel"></image-carousel>');
    element.isolateScope().images.should.be.empty;
    element.isolateScope().cycleLeft();
    element.isolateScope().images.should.be.empty;
    element.isolateScope().cycleRight();
    element.isolateScope().images.should.be.empty;
  });

  it('cycleLeft and cycleRight cycle through the shown items with a shownImages of 1', function () {
    $scope.carousel = [
      { url: 'uri1', subtext: 'test1' },
      { url: 'uri2', subtext: 'test2' },
      { url: 'uri3', subtext: 'test3' }
    ];
    var element = getCompiledElement('<image-carousel image-data="carousel" shown-images="1"></image-carousel>');
    element.isolateScope().images.should.deep.equal([$scope.carousel[0]]);
    element.isolateScope().cycleRight();
    element.isolateScope().images.should.deep.equal([$scope.carousel[1]]);
    element.isolateScope().cycleRight();
    element.isolateScope().images.should.deep.equal([$scope.carousel[2]]);
    element.isolateScope().cycleRight();
    element.isolateScope().images.should.deep.equal([$scope.carousel[0]]);
    element.isolateScope().cycleLeft();
    element.isolateScope().images.should.deep.equal([$scope.carousel[2]]);
    element.isolateScope().cycleLeft();
    element.isolateScope().images.should.deep.equal([$scope.carousel[1]]);
    element.isolateScope().cycleLeft();
    element.isolateScope().images.should.deep.equal([$scope.carousel[0]]);
  });

  it('cycleLeft and cycleRight cycle through the shown items with a shownImages less than max', function () {
    function subarray(positions) { return positions.map(function(x) { return $scope.carousel[x]; }) }
    $scope.carousel = [
      { url: 'uri1', subtext: 'test1' },
      { url: 'uri2', subtext: 'test2' },
      { url: 'uri3', subtext: 'test3' }
    ];
    var element = getCompiledElement('<image-carousel image-data="carousel" shown-images="2"></image-carousel>');
    element.isolateScope().images.should.deep.equal(subarray([0, 1]));
    element.isolateScope().cycleRight();
    element.isolateScope().images.should.deep.equal(subarray([1, 2]));
    element.isolateScope().cycleRight();
    element.isolateScope().images.should.deep.equal(subarray([2, 0]));
    element.isolateScope().cycleRight();
    element.isolateScope().images.should.deep.equal(subarray([0, 1]));
    element.isolateScope().cycleLeft();
    element.isolateScope().images.should.deep.equal(subarray([2, 0]));
    element.isolateScope().cycleLeft();
    element.isolateScope().images.should.deep.equal(subarray([1, 2]));
    element.isolateScope().cycleLeft();
    element.isolateScope().images.should.deep.equal(subarray([0, 1]));
  });

  it('cycleLeft and cycleRight rearrange the array of shown items with all images shown', function () {
    function subarray(positions) { return positions.map(function(x) { return $scope.carousel[x]; }) }
    $scope.carousel = [
      { url: 'uri1', subtext: 'test1' },
      { url: 'uri2', subtext: 'test2' },
      { url: 'uri3', subtext: 'test3' }
    ];
    var element = getCompiledElement('<image-carousel image-data="carousel" shown-images="3"></image-carousel>');
    element.isolateScope().images.should.deep.equal(subarray([0, 1, 2]));
    element.isolateScope().cycleRight();
    element.isolateScope().images.should.deep.equal(subarray([1, 2, 0]));
    element.isolateScope().cycleRight();
    element.isolateScope().images.should.deep.equal(subarray([2, 0, 1]));
    element.isolateScope().cycleRight();
    element.isolateScope().images.should.deep.equal(subarray([0, 1, 2]));
    element.isolateScope().cycleLeft();
    element.isolateScope().images.should.deep.equal(subarray([2, 0, 1]));
    element.isolateScope().cycleLeft();
    element.isolateScope().images.should.deep.equal(subarray([1, 2, 0]));
    element.isolateScope().cycleLeft();
    element.isolateScope().images.should.deep.equal(subarray([0, 1, 2]));
  });

  function getCompiledElement (text) {
    var compiledElement = $compile(text)($scope);
    $scope.$apply();
    return compiledElement;
  }
});
