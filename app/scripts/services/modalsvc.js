(function() {
    'use strict';

    angular
        .module('rascal')
        .factory('ModalSvc', ModalSvc);

    ModalSvc.$inject = ['$modal', '$rootScope'];

    /* @ngInject */
    function ModalSvc($modal, $rootScope) {
        /**
         * Interface
         */
        return {
            openModalWithCloseHook: openModalWithCloseHook
        };

        /**
         * Impl
         */
        function openModalWithCloseHook(args) {
            var modalInstance = $modal.open(args);

            registerBroadcast(modalInstance);

            return modalInstance;
        }

        function registerBroadcast(modalInstance) {
            var eventListener;
            eventListener = $rootScope.$on('backButtonPressed', function() {
                modalInstance.dismiss();

                //Deregister this specific listener.
                eventListener();
            });
        }



    }
})();