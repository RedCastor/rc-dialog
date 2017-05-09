(function(angular){
    'use strict';


    // Load module dialog
    var module = angular.module('rcDialog');


    //Media dialog
    module.factory('rcDialog', [ '$log', '$injector', '$timeout', function ( $log, $injector, $timeout ) {

            var modal = null;


            function _open_dialog_modal( dialog, data ) {

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
                        }]

                    },
                    preCloseCallback: function () {

                    }
                };

                if ( angular.isDefined(dialog.template) && dialog.template !== '' ) {
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
                    function (close) {

                    },
                    function (confirm) {

                    }
                );

            }


            //Bootstrap Modal
            function _open_bootstrap_modal ( dialog, data ) {

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
                        }]
                    }
                };

                if ( angular.isDefined(dialog.template) && dialog.template !== '' ) {
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
                    function (close) {

                    },
                    function (dismiss) {

                    }
                );
            }

            //Foundation Modal
            function _open_foundation_modal ( dialog, data ) {

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
                        }]
                    }
                };

                if ( angular.isDefined(dialog.template) && dialog.template !== '' ) {
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
                    function (close) {

                    },
                    function (dismiss) {

                    }
                );
            }


            //Open new dialog
            function _open_modal( dialog, data ) {

                switch ( dialog.theme ) {
                    case 'bootstrap':
                        try {
                            angular.module('ui.bootstrap');
                            modal = $injector.get('$uibModal');

                            _open_bootstrap_modal( dialog, data );
                        }
                        catch(err) {
                            $log.error('Error to open dialog with "ui.bootstrap".');
                            $log.error(err);
                        }
                        break;
                    case 'foundation':
                        try {
                            angular.module('mm.foundation');
                            modal = $injector.get('$modal');

                            _open_foundation_modal( dialog, data );
                        }
                        catch(err) {
                            $log.error('Error to open dialog with "mm.foundation".');
                            $log.error(err);
                        }
                        break;
                    default:
                        try {
                            angular.module('ngDialog');
                            modal = $injector.get('ngDialog');

                            _open_dialog_modal( dialog, data );
                        }
                        catch(err) {
                            $log.error('Error to open dialog with "ngDialog".');
                            $log.error(err);
                        }
                }

            }

            return {
                open: function ( dialog, data ) {
                    _open_modal( dialog, data );
                }
            };


        }]);

})(angular);
