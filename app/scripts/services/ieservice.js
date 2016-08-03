'use strict';

angular.module('rascal').factory('IEService', function() {

  return {
    ieEventRepeatedFlag: true,

    checkIEVersion: function() {
      var rv = -1; // Return value assumes failure.
      if( navigator.appName === 'Microsoft Internet Explorer' ) {
        var ua = navigator.userAgent,
            re  = new RegExp('MSIE ([0-9]{1,}[\\.0-9]{0,})');

        if( re.exec(ua) !== null ) {
          rv = parseFloat( RegExp.$1 );
        }
      }
      else if( navigator.appName === 'Netscape' ) {                       
        /// in IE 11 the navigator.appVersion says 'trident'
        /// in Edge the navigator.appVersion does not say trident
        if( navigator.appVersion.indexOf('Trident') === -1 ) { 
          rv = 12;
        }
        else {
          rv = 11;
        }
      }       
      return rv;          
    },

    processEventForIEVersion: function(ieVersion) {
      if( this.checkIEVersion() === ieVersion ) {
        if( this.ieEventRepeatedFlag ) {
          this.ieEventRepeatedFlag = false;
          return 1;
        }
        else { // Don't process second event.
          this.resetFlag();
          return 0;
        }        
      }
      return -1; // Not applicable.
    },

    resetFlag: function() {
      this.ieEventRepeatedFlag = true;
    }
  };
});
