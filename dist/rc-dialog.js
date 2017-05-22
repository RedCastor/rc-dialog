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
                rcdAutoClose: "=",
                rcdClass: "@",
                rcdSelectedView: "=",
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
                    autoClose: angular.isDefined($scope.rcdAutoClose) && $scope.rcdAutoClose ? $scope.rcdAutoClose : 0,
                    class: angular.isDefined($scope.rcdClass) ? $scope.rcdClass : ""
                };
                var data = angular.isDefined($scope.rcdData) ? $scope.rcdData : null;
                var dialog_api = {
                    selectedView: angular.isDefined($scope.rcdSelectedView) ? $scope.rcdSelectedView : ""
                };
                elem.bind("click", function() {
                    rcDialog.open(dialog, data, dialog_api);
                });
            }
        };
    } ]);
})(angular);

(function(angular) {
    "use strict";
    var module = angular.module("rcDialog");
    module.controller("rcDialogCtrl", [ "$scope", "$location", "$timeout", "$log", "rcDialogObj", "rcDialogDataObj", "rcDialogApiObj", function($scope, $location, $timeout, $log, rcDialogObj, rcDialogDataObj, rcDialogApiObj) {
        function get_selected_view() {
            var search = $location.search();
            var selected_view = null;
            if (angular.isDefined(search.selectedView)) {
                if (angular.isString(search.selectedView)) {
                    selected_view = search.selectedView;
                }
                $location.search("selectedView", null);
            }
            return selected_view;
        }
        var dialogApi = this;
        var selectedView = get_selected_view();
        angular.extend(this, rcDialogApiObj);
        this.dialog = rcDialogObj;
        this.data = rcDialogDataObj;
        if (!angular.isDefined(this.selectedView)) {
            this.selectedView = null;
        }
        if (selectedView) {
            this.selectedView = selectedView;
        }
        if (angular.isDefined(this.dialog.autoClose) && angular.isNumber(this.dialog.autoClose) && this.dialog.autoClose > 0) {
            $timeout(function() {
                dialogApi.closeDialog();
            }, this.dialog.autoClose);
        }
        this.closeDialog = function(value) {
            if (angular.isString(value)) {
                value = "close_" + value;
            } else if (angular.isObject(value)) {
                value.name = "confirm";
            }
            $scope.closeThisDialog(value);
        };
        this.confirmDialog = function(value) {
            if (angular.isString(value)) {
                value = "confirm_" + value;
            } else if (angular.isObject(value)) {
                value.name = "confirm";
            }
            $scope.confirm(value);
        };
        this.setSelectedView = function(value) {
            if (!this.selectedView) {
                this.selectedView = value;
            }
        };
    } ]);
    module.controller("rcDialogUibCtrl", [ "$scope", "$location", "$timeout", "$log", "rcDialogObj", "rcDialogDataObj", "rcDialogApiObj", "$uibModalInstance", function($scope, $location, $timeout, $log, rcDialogObj, rcDialogDataObj, rcDialogApiObj, $uibModalInstance) {
        function get_selected_view() {
            var search = $location.search();
            var selected_view = null;
            if (angular.isDefined(search.selectedView)) {
                if (angular.isString(search.selectedView)) {
                    selected_view = search.selectedView;
                }
                $location.search("selectedView", null);
            }
            return selected_view;
        }
        var dialogApi = this;
        var selectedView = get_selected_view();
        angular.extend(this, rcDialogApiObj);
        this.dialog = rcDialogObj;
        this.data = rcDialogDataObj;
        if (!angular.isDefined(this.selectedView)) {
            this.selectedView = null;
        }
        if (selectedView) {
            this.selectedView = selectedView;
        }
        if (angular.isDefined(this.dialog.autoClose) && angular.isNumber(this.dialog.autoClose) && this.dialog.autoClose > 0) {
            $timeout(function() {
                dialogApi.closeDialog();
            }, this.dialog.autoClose);
        }
        this.closeDialog = function(value) {
            if (angular.isString(value)) {
                value = "close_" + value;
            } else if (angular.isObject(value)) {
                value.name = "close";
            }
            $uibModalInstance.dismiss(value);
        };
        this.confirmDialog = function(value) {
            if (angular.isString(value)) {
                value = "confirm_" + value;
            } else if (angular.isObject(value)) {
                value.name = "confirm";
            }
            $uibModalInstance.close(value);
        };
        this.setSelectedView = function(value) {
            if (!this.selectedView) {
                this.selectedView = value;
            }
        };
    } ]);
    module.controller("rcDialogFoundationCtrl", [ "$scope", "$location", "$timeout", "$log", "rcDialogObj", "rcDialogDataObj", "rcDialogApiObj", "$modalInstance", function($scope, $location, $timeout, $log, rcDialogObj, rcDialogDataObj, rcDialogApiObj, $modalInstance) {
        function get_selected_view() {
            var search = $location.search();
            var selected_view = null;
            if (angular.isDefined(search.selectedView)) {
                if (angular.isString(search.selectedView)) {
                    selected_view = search.selectedView;
                }
                $location.search("selectedView", null);
            }
            return selected_view;
        }
        var dialogApi = this;
        var selectedView = get_selected_view();
        angular.extend(this, rcDialogApiObj);
        this.dialog = rcDialogObj;
        this.data = rcDialogDataObj;
        if (!angular.isDefined(this.selectedView)) {
            this.selectedView = null;
        }
        if (selectedView) {
            this.selectedView = selectedView;
        }
        if (angular.isDefined(this.dialog.autoClose) && angular.isNumber(this.dialog.autoClose) && this.dialog.autoClose > 0) {
            $timeout(function() {
                dialogApi.closeDialog();
            }, this.dialog.autoClose);
        }
        this.closeDialog = function(value) {
            if (angular.isString(value)) {
                value = "close_" + value;
            } else if (angular.isObject(value)) {
                value.name = "close";
            }
            $modalInstance.dismiss(value);
        };
        this.confirmDialog = function(value) {
            if (angular.isString(value)) {
                value = "confirm_" + value;
            } else if (angular.isObject(value)) {
                value.name = "confirm";
            }
            $modalInstance.close(value);
        };
        this.setSelectedView = function(value) {
            if (!this.selectedView) {
                this.selectedView = value;
            }
        };
    } ]);
})(angular, window);

(function(angular) {
    "use strict";
    var module = angular.module("rcDialog");
    module.factory("rcDialogHelpers", [ "$rootScope", "$log", function($rootScope, $log) {
        function _send_event(name, args) {
            name = "rcDialog:" + name;
            $log.debug("RC Dialog send event: " + name);
            $log.debug(args);
            angular.element(document.body).triggerHandler(name, args);
            $rootScope.$broadcast("rcDialog:" + name, args);
        }
        return {
            sendEvent: _send_event
        };
    } ]);
    module.factory("rcDialog", [ "$log", "$injector", "$timeout", "rcDialogHelpers", function($log, $injector, $timeout, rcDialogHelpers) {
        var modal = null;
        function _open_dialog_modal(dialog, data, dialog_api) {
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
                    } ],
                    rcDialogApiObj: [ function() {
                        return dialog_api;
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
            modal_instance.then(function(confirm) {
                rcDialogHelpers.sendEvent("confirm", confirm);
            }, function(close) {
                rcDialogHelpers.sendEvent("close", close);
            });
        }
        function _open_bootstrap_modal(dialog, data, dialog_api) {
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
                    } ],
                    rcDialogApiObj: [ function() {
                        return dialog_api;
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
            modal_instance.result.then(function(confirm) {
                rcDialogHelpers.sendEvent("confirm", confirm);
            }, function(close) {
                rcDialogHelpers.sendEvent("close", close);
            });
        }
        function _open_foundation_modal(dialog, data, dialog_api) {
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
                    } ],
                    rcDialogApiObj: [ function() {
                        return dialog_api;
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
            modal_instance.result.then(function(confirm) {
                rcDialogHelpers.sendEvent("confirm", confirm);
            }, function(close) {
                rcDialogHelpers.sendEvent("close", close);
            });
        }
        function _open_modal(dialog, data, dialog_api) {
            switch (dialog.theme) {
              case "bootstrap":
                try {
                    angular.module("ui.bootstrap");
                    modal = $injector.get("$uibModal");
                    _open_bootstrap_modal(dialog, data, dialog_api);
                } catch (err) {
                    $log.error('Error to open dialog with "ui.bootstrap".');
                    $log.error(err);
                }
                break;

              case "foundation":
                try {
                    angular.module("mm.foundation");
                    modal = $injector.get("$modal");
                    _open_foundation_modal(dialog, data, dialog_api);
                } catch (err) {
                    $log.error('Error to open dialog with "mm.foundation".');
                    $log.error(err);
                }
                break;

              default:
                try {
                    angular.module("ngDialog");
                    modal = $injector.get("ngDialog");
                    _open_dialog_modal(dialog, data, dialog_api);
                } catch (err) {
                    $log.error('Error to open dialog with "ngDialog".');
                    $log.error(err);
                }
            }
        }
        return {
            open: function(dialog, data, dialog_api) {
                _open_modal(dialog, data, dialog_api);
            }
        };
    } ]);
})(angular);
//# sourceMappingURL=rc-dialog.js.map
