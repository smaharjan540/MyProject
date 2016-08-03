'use strict';

angular.module('rascal').filter('truncate', function ($filter) {
  return function (txt, length) {
    if (!txt) {
      return '';
    }
    return $filter('limitTo')(txt, length) + (txt.length > length ? '...' : '');
  };
});
