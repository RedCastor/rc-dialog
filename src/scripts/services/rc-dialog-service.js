(function(angular){
    'use strict';


    // Load module dialog
    var module = angular.module('rcDialog');


    //Dialog Helper
    module.factory('rcDialogHelpers', [ '$rootScope', '$log', '$injector', '$document', '$window', function($rootScope, $log, $injector, $document, $window) {

        /**
         * Generate unique id
         *
         * @returns {string}
         */
        function unique_id () {
            return 'dialog_' + Math.random().toString(36).substr(2, 16);
        }


        function _get_default_dialog () {

            return {
                id:         unique_id(),
                theme:      '',
                template:   '',
                templateUrl: '',
                size:       'large',
                animation:  true,
                backdrop:   true,
                escClose:   true,
                clickClose: true,
                autoClose:  0,
                class:      '',
                testMode : false,
                trigger: {
                    type:   undefined,
                    val:    0,
                    disabled: false
                },
                open: true
            };
        }

        //Height document on percent check
        function _documentCheckScrollPercent ( trigger_percent ) {

            var doc_height = angular.element($document).height() - angular.element($window).height();
            var doc_quantum = parseFloat(doc_height / 100);

            var current_percentage = parseInt(100 - ((doc_height - angular.element($window).scrollTop()) / doc_quantum), 10);

            return (current_percentage >= trigger_percent);
        }

        //Send event notify
        function _send_event( name, args ) {
            name = 'rcDialog:' + name;

            angular.element(document.body).triggerHandler( name, args);
            $rootScope.$broadcast(name, args);
        }

        return {
            getDefaultDialog:           _get_default_dialog,
            documentCheckScrollPercent: _documentCheckScrollPercent,
            sendEvent:                  _send_event,
        };
    }]);

    //Dialog Service
    module.factory('rcDialog', [ '$log', '$injector', '$q', '$timeout', '$window', 'rcDialogHelpers', function ( $log, $injector, $q, $timeout, $window, rcDialogHelpers ) {

            var modal = null;
            var triggerHeightCheck = {};

            function _open_dialog_modal( dialog, data, dialog_api ) {

                var width = null;
                var height = null;

                switch (dialog.size) {
                    case 'tiny':
                        width = '30%';
                        break;
                    case 'small':
                        width = '50%';
                        break;
                    case 'large':
                        width = '90%';
                        break;
                    case 'full':
                        width = '100%';
                        height = '100vh';
                        break;
                    default:
                        dialog.size = 'small';
                        width = '50%';
                }

                var options = {
                    width: width,
                    height: height,
                    ariaAuto: true,
                    name: 'ngdialog-rc-dialog',
                    disableAnimation: !dialog.animation,
                    overlay: dialog.backdrop,
                    showClose: true,
                    closeByDocument: dialog.clickClose,
                    closeByEscape: dialog.escClose,
                    controllerAs: 'rcDialogApi',
                    controller: 'rcDialogCtrl',
                    resolve: {
                        rcDialogObj: [ function(){
                            return dialog;
                        }],
                        rcDialogDataObj: [ function(){
                            return data;
                        }],
                        rcDialogApiObj: [ function(){
                            return dialog_api;
                        }]
                    },
                    preCloseCallback: function () {

                    }
                };

                if ( angular.isString(dialog.template) && dialog.template.length ) {
                    options.template = dialog.template;
                    options.plain = true;
                }
                else {
                    options.template = dialog.templateUrl;
                    options.plain = false;
                }

                options.appendClassName = 'rc-dialog ' + dialog.class;

                var modal_instance = modal.openConfirm( options );

                modal_instance.then(
                    function (confirm) {
                        rcDialogHelpers.sendEvent('confirm', confirm);
                    },
                    function (close) {
                        rcDialogHelpers.sendEvent('close', close);
                    }
                );

                return modal_instance;
            }


            //Bootstrap Modal
            function _open_bootstrap_modal ( dialog, data, dialog_api ) {

                var options = {
                    size: (dialog.size === 'large' || dialog.size === 'full') ? 'lg' : 'sm',
                    animation: dialog.animation,
                    backdrop: dialog.backdrop,
                    keyboard: dialog.escClose,
                    controllerAs: 'rcDialogApi',
                    controller: 'rcDialogUibCtrl',
                    resolve: {
                        rcDialogObj: [ function(){
                            return dialog;
                        }],
                        rcDialogDataObj: [ function(){
                            return data;
                        }],
                        rcDialogApiObj: [ function(){
                            return dialog_api;
                        }]
                    }
                };

                if ( angular.isString(dialog.template) && dialog.template.length ) {
                    options.template = dialog.template;
                }
                else {
                    options.templateUrl = dialog.templateUrl;
                }


                if (dialog.backdrop === true && dialog.clickClose === false) {
                    options.backdrop = 'static';
                }

                options.windowClass = 'rc-dialog-uibdialog ' + dialog.class;
                options.backdropClass = 'rc-dialog-uibdialog-backdrop ' + dialog.class;

                //Modal Open
                var modal_instance = modal.open( options );

                modal_instance.result.then(
                    function (confirm) {
                        rcDialogHelpers.sendEvent('confirm', confirm);
                    },
                    function (close) {
                        rcDialogHelpers.sendEvent('close', close);
                    }
                );

                return modal_instance.result;
            }

            //Foundation Modal
            function _open_foundation_modal ( dialog, data, dialog_api ) {

                var options = {
                    size: dialog.size,
                    backdrop: dialog.backdrop,
                    closeOnClick: dialog.clickClose,
                    keyboard: dialog.escClose,
                    controllerAs: 'rcDialogApi',
                    controller: 'rcDialogFoundationCtrl',
                    resolve: {
                        rcDialogObj: [ function(){
                            return dialog;
                        }],
                        rcDialogDataObj: [ function(){
                            return data;
                        }],
                        rcDialogApiObj: [ function(){
                            return dialog_api;
                        }]
                    }
                };

                if ( angular.isString(dialog.template) && dialog.template.length ) {
                    options.template = dialog.template;
                }
                else {
                    options.templateUrl = dialog.templateUrl;
                }

                if (dialog.backdrop === true && dialog.clickClose === false) {
                    options.backdrop = 'static';
                }

                options.windowClass = 'rc-dialog-zfdialog ' + dialog.class;

                //Modal Open
                var modal_instance = modal.open( options );

                modal_instance.result.then(
                    function (confirm) {
                        rcDialogHelpers.sendEvent('confirm', confirm);
                    },
                    function (close) {
                        rcDialogHelpers.sendEvent('close', close);
                    }
                );

                return modal_instance.result;
            }


            //Open new dialog
            function _open_modal( dialog, data, dialog_api ) {

                var deferred = $q.defer();
                var result;

                switch ( dialog.theme ) {
                    case 'bootstrap':
                        try {
                            angular.module('ui.bootstrap');
                            modal = $injector.get('$uibModal');

                            return _open_bootstrap_modal( dialog, data, dialog_api );
                        }
                        catch(err) {
                            result.message = 'Error to open dialog with "ui.bootstrap".';
                            result.error = err;
                        }
                        break;
                    case 'foundation':
                        try {
                            angular.module('mm.foundation');
                            modal = $injector.get('$modal');

                            return _open_foundation_modal( dialog, data, dialog_api );
                        }
                        catch(err) {
                            result.message = 'Error to open dialog with "mm.foundation".';
                            result.error = err;
                        }
                        break;
                    default:
                        try {
                            angular.module('ngDialog');
                            modal = $injector.get('ngDialog');

                            return _open_dialog_modal( dialog, data, dialog_api );
                        }
                        catch(err) {
                            result.message = 'Error to open dialog with "ngDialog".';
                            result.error = err;
                        }
                }

                $log.error(result.message);
                $log.error(result.error);

                deferred.reject(result);

                return deferred.promise;
            }

            return {
                open: function ( dialog, data, dialog_api ) {

                    var deferred = $q.defer();
                    var promise = deferred.promise;

                    dialog = angular.extend({}, rcDialogHelpers.getDefaultDialog(), dialog);

                    if (dialog.open === true) {
                        promise = _open_modal( dialog, data, dialog_api );

                        return promise;
                    }

                    if (dialog.trigger.disabled === true) {
                        deferred.reject(false);

                        return promise;
                    }

                    switch ( dialog.trigger.type ) {
                        case 'seconds':
                            var timeout_to_open = dialog.trigger.val * 1000;

                            $timeout(function () {
                                promise = _open_modal( dialog, data, dialog_api );
                            }, timeout_to_open);

                            break;
                        case 'scroll':

                            //Add event on scroll
                            if (!triggerHeightCheck[dialog.id]) {

                                //Trigger on scroll
                                triggerHeightCheck[dialog.id] = function(){

                                    if (rcDialogHelpers.documentCheckScrollPercent( dialog.trigger.val ) ) {
                                        angular.element($window).unbind('scroll', triggerHeightCheck[dialog.id]);
                                        promise = _open_modal( dialog, data, dialog_api );
                                    }
                                };

                                angular.element($window).bind('scroll', triggerHeightCheck[dialog.id]);
                            }
                            break;
                        case 'onload':
                            promise = _open_modal( dialog, data, dialog_api );
                            break;
                        default:
                            deferred.reject(false);
                    }

                    return promise;
                },
                destroy: function (dialog) {
                    if (triggerHeightCheck[dialog.id]) {
                        angular.element($window).unbind('scroll', triggerHeightCheck[dialog.id]);
                    }
                }
            };


        }]);

})(angular);
