(function(angular) {
    "use strict";
    var module = angular.module("rcDialog", []);
})(angular);

(function(angular) {
    "use strict";
    var module = angular.module("rcDialog");
    module.directive("rcdOpen", [ "rcDialog", function(rcDialog) {
        return {
            restrict: "AC",
            replace: false,
            scope: {
                rcdTemplate: "@",
                rcdTemplateUrl: "@",
                rcdSize: "@",
                rcdAnimation: "=",
                rcdBackdrop: "=",
                rcdEscClose: "=",
                rcdClickClose: "=",
                rcdClass: "@",
                rcdData: "=?"
            },
            link: function($scope, elem, attrs) {
                var dialog = {
                    theme: angular.isDefined(attrs.rcdOpen) ? attrs.rcdOpen : "",
                    template: angular.isDefined($scope.rcdTemplate) ? $scope.rcdTemplate : "",
                    templateUrl: angular.isDefined($scope.rcdTemplateUrl) ? $scope.rcdTemplateUrl : "",
                    size: angular.isDefined($scope.rcdSize) ? $scope.rcdSize : "large",
                    animation: angular.isDefined($scope.rcdAnimation) && $scope.rcdAnimation === "true" ? $scope.rcdAnimation : true,
                    backdrop: angular.isDefined($scope.rcdBackdrop) && $scope.rcdBackdrop === "true" ? $scope.rcdBackdrop : true,
                    escClose: angular.isDefined($scope.rcdEscClose) && $scope.rcdEscClose === "true" ? $scope.rcdEscClose : true,
                    clickClose: angular.isDefined($scope.rcdClickClose) && $scope.rcdClickClose === "true" ? $scope.rcdClickClose : true,
                    class: angular.isDefined($scope.rcdClass) ? $scope.rcdClass : ""
                };
                var data = angular.isDefined($scope.rcdData) ? $scope.rcdData : null;
                elem.bind("click", function() {
                    rcDialog.open(dialog, data);
                });
            }
        };
    } ]);
})(angular);

(function(angular) {
    "use strict";
    var module = angular.module("rcDialog");
    module.controller("rcDialogCtrl", [ "$log", "rcDialogObj", "rcDialogDataObj", function($log, rcDialogObj, rcDialogDataObj) {
        this.dialog = rcDialogObj;
        this.data = rcDialogDataObj;
        this.closeDialog = function(value) {
            this.closeThisDialog(value);
        };
        this.confirmDialog = function(value) {
            this.confirm(value);
        };
    } ]);
    module.controller("rcDialogUibCtrl", [ "$log", "rcDialogObj", "rcDialogDataObj", "$uibModalInstance", function($log, rcDialogObj, rcDialogDataObj, $uibModalInstance) {
        this.dialog = rcDialogObj;
        this.data = rcDialogDataObj;
        this.closeDialog = function(value) {
            $uibModalInstance.close(value);
        };
        this.confirmDialog = function(value) {
            if (angular.isString(value)) {
                value = "confirm_" + value;
            }
            $uibModalInstance.close(value);
        };
    } ]);
    module.controller("rcDialogFoundationCtrl", [ "$log", "rcDialogObj", "rcDialogDataObj", "$modalInstance", function($log, rcDialogObj, rcDialogDataObj, $modalInstance) {
        this.dialog = rcDialogObj;
        this.data = rcDialogDataObj;
        this.closeDialog = function(value) {
            $modalInstance.close(value);
        };
        this.confirmDialog = function(value) {
            if (angular.isString(value)) {
                value = "confirm_" + value;
            }
            $modalInstance.close(value);
        };
    } ]);
})(angular, window);

(function(angular) {
    "use strict";
    var module = angular.module("rcDialog");
    module.factory("rcDialog", [ "$log", "$injector", "$timeout", function($log, $injector, $timeout) {
        var modal = null;
        function _open_dialog_modal(dialog, data) {
            var width = null;
            var height = null;
            switch (dialog.size) {
              case "tiny":
                width = "30%";
                break;

              case "small":
                width = "50%";
                break;

              case "large":
                width = "90%";
                break;

              case "full":
                width = "100%";
                height = "100vh";
                break;

              default:
                dialog.size = "small";
                width = "50%";
            }
            var options = {
                width: width,
                height: height,
                ariaAuto: true,
                name: "ngdialog-rc-dialog",
                disableAnimation: !dialog.animation,
                overlay: dialog.backdrop,
                showClose: true,
                closeByDocument: dialog.clickClose,
                closeByEscape: dialog.escClose,
                controllerAs: "rcDialogApi",
                controller: "rcDialogCtrl",
                resolve: {
                    rcDialogObj: [ function() {
                        return dialog;
                    } ],
                    rcDialogDataObj: [ function() {
                        return data;
                    } ]
                },
                preCloseCallback: function() {}
            };
            if (angular.isDefined(dialog.template) && dialog.template !== "") {
                options.template = dialog.template;
                options.plain = true;
            } else {
                options.template = dialog.templateUrl;
                options.plain = false;
            }
            options.appendClassName = "rc-dialog " + dialog.class;
            var modal_instance = modal.openConfirm(options);
            modal_instance.then(function(close) {}, function(confirm) {});
        }
        function _open_bootstrap_modal(dialog, data) {
            var options = {
                size: dialog.size === "large" || dialog.size === "full" ? "lg" : "sm",
                animation: dialog.animation,
                backdrop: dialog.backdrop,
                keyboard: dialog.escClose,
                controllerAs: "rcDialogApi",
                controller: "rcDialogUibCtrl",
                resolve: {
                    rcDialogObj: [ function() {
                        return dialog;
                    } ],
                    rcDialogDataObj: [ function() {
                        return data;
                    } ]
                }
            };
            if (angular.isDefined(dialog.template) && dialog.template !== "") {
                options.template = dialog.template;
            } else {
                options.templateUrl = dialog.templateUrl;
            }
            if (dialog.backdrop === true && dialog.clickClose === false) {
                options.backdrop = "static";
            }
            options.windowClass = "rc-dialog-uibdialog " + dialog.class;
            options.backdropClass = "rc-dialog-uibdialog-backdrop " + dialog.class;
            var modal_instance = modal.open(options);
            modal_instance.result.then(function(close) {}, function(dismiss) {});
        }
        function _open_foundation_modal(dialog, data) {
            var options = {
                size: dialog.size,
                backdrop: dialog.backdrop,
                closeOnClick: dialog.clickClose,
                keyboard: dialog.escClose,
                controllerAs: "rcDialogApi",
                controller: "rcDialogFoundationCtrl",
                resolve: {
                    rcDialogObj: [ function() {
                        return dialog;
                    } ],
                    rcDialogDataObj: [ function() {
                        return data;
                    } ]
                }
            };
            if (angular.isDefined(dialog.template) && dialog.template !== "") {
                options.template = dialog.template;
            } else {
                options.templateUrl = dialog.templateUrl;
            }
            if (dialog.backdrop === true && dialog.clickClose === false) {
                options.backdrop = "static";
            }
            options.windowClass = "rc-dialog-zfdialog " + dialog.class;
            var modal_instance = modal.open(options);
            modal_instance.result.then(function(close) {}, function(dismiss) {});
        }
        function _open_modal(dialog, data) {
            switch (dialog.theme) {
              case "bootstrap":
                try {
                    angular.module("ui.bootstrap");
                    modal = $injector.get("$uibModal");
                    _open_bootstrap_modal(dialog, data);
                } catch (err) {
                    $log.error('Error to open dialog with "ui.bootstrap".');
                    $log.error(err);
                }
                break;

              case "foundation":
                try {
                    angular.module("mm.foundation");
                    modal = $injector.get("$modal");
                    _open_foundation_modal(dialog, data);
                } catch (err) {
                    $log.error('Error to open dialog with "mm.foundation".');
                    $log.error(err);
                }
                break;

              default:
                try {
                    angular.module("ngDialog");
                    modal = $injector.get("ngDialog");
                    _open_dialog_modal(dialog, data);
                } catch (err) {
                    $log.error('Error to open dialog with "ngDialog".');
                    $log.error(err);
                }
            }
        }
        return {
            open: function(dialog, data) {
                _open_modal(dialog, data);
            }
        };
    } ]);
})(angular);
//# sourceMappingURL=rc-dialog.js.map
