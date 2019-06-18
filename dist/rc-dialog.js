(function(angular) {
    "use strict";
    var module = angular.module("rcDialog", []);
})(angular);

(function(angular) {
    "use strict";
    var module = angular.module("rcDialog");
    module.directive("rcdOpen", [ "rcDialog", function(rcDialog) {
        return {
            restrict: "EAC",
            replace: false,
            scope: {
                rcdThemeOptions: "<",
                rcdTemplate: "@",
                rcdTemplateUrl: "@",
                rcdSize: "@",
                rcdAnimation: "<",
                rcdBackdrop: "<",
                rcdEscClose: "<",
                rcdClickClose: "<",
                rcdAutoClose: "<",
                rcdClass: "@",
                rcdSelectedView: "<",
                rcdData: "<?",
                rcdTrigger: "@",
                rcdTriggerValue: "@",
                rcdTriggerDisabled: "<",
                onConfirm: "&rcdOnConfirm",
                onClose: "&rcdOnClose"
            },
            link: function($scope, elem, attrs) {
                var dialog = {
                    theme: angular.isDefined(attrs.rcdOpen) ? attrs.rcdOpen : "",
                    themeOptions: angular.isObject($scope.rcdThemeOptions) ? $scope.rcdThemeOptions : {},
                    template: angular.isDefined($scope.rcdTemplate) ? $scope.rcdTemplate : "",
                    templateUrl: angular.isDefined($scope.rcdTemplateUrl) ? $scope.rcdTemplateUrl : "",
                    size: angular.isDefined($scope.rcdSize) ? $scope.rcdSize : "large",
                    animation: angular.isDefined($scope.rcdAnimation) ? $scope.rcdAnimation : true,
                    backdrop: angular.isDefined($scope.rcdBackdrop) ? $scope.rcdBackdrop : true,
                    escClose: angular.isDefined($scope.rcdEscClose) ? $scope.rcdEscClose : true,
                    clickClose: angular.isDefined($scope.rcdClickClose) ? $scope.rcdClickClose : true,
                    autoClose: angular.isDefined($scope.rcdAutoClose) && parseInt($scope.rcdAutoClose, 10) ? $scope.rcdAutoClose : 0,
                    class: angular.isDefined($scope.rcdClass) ? $scope.rcdClass : "",
                    trigger: {
                        type: angular.isString($scope.rcdTrigger) ? $scope.rcdTrigger : undefined,
                        val: angular.isDefined($scope.rcdTriggerValue) ? parseInt($scope.rcdTriggerValue, 10) : 0,
                        disabled: !$scope.rcdTriggerDisabled ? false : true
                    }
                };
                if (attrs.id) {
                    dialog.id = attrs.id;
                }
                var data = angular.isDefined($scope.rcdData) ? $scope.rcdData : null;
                var dialog_api = {
                    selectedView: angular.isDefined($scope.rcdSelectedView) ? $scope.rcdSelectedView : ""
                };
                elem.bind("click", function() {
                    if (dialog.open) {
                        return;
                    }
                    dialog.open = true;
                    rcDialog.open(dialog, data, dialog_api).then(function(response) {
                        $scope.onConfirm({
                            $confirm: response
                        });
                    }, function(response) {
                        if (response !== false) {
                            $scope.onClose({
                                $close: response
                            });
                        }
                    });
                });
                if (dialog.trigger.type) {
                    rcDialog.open(dialog, data, dialog_api).then(function(response) {
                        $scope.onConfirm({
                            $confirm: response
                        });
                    }, function(response) {
                        if (response !== false) {
                            $scope.onClose({
                                $close: response
                            });
                        }
                    });
                }
                $scope.$on("$destroy", function handleDestroyEvent() {
                    rcDialog.destroy(dialog);
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
        var rcDialogApi = this;
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
                rcDialogApi.closeDialog();
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
        var rcDialogApi = this;
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
                rcDialogApi.closeDialog();
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
        var rcDialogApi = this;
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
                rcDialogApi.closeDialog();
            }, this.dialog.autoClose);
        }
        this.closeDialog = function(value) {
            if (angular.isString(value)) {
                value = "close_" + value;
            } else if (angular.isObject(value)) {
                value.name = "close";
            }
            $modalInstance.dismiss({
                $value: value
            });
        };
        this.confirmDialog = function(value) {
            if (angular.isString(value)) {
                value = "confirm_" + value;
            } else if (angular.isObject(value)) {
                value.name = "confirm";
            }
            $modalInstance.close({
                $value: value
            });
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
    module.factory("rcDialogHelpers", [ "$rootScope", "$log", "$injector", "$document", "$window", function($rootScope, $log, $injector, $document, $window) {
        function unique_id() {
            return "dialog_" + Math.random().toString(36).substr(2, 16);
        }
        function _get_default_dialog() {
            return {
                id: unique_id(),
                theme: "",
                template: "",
                templateUrl: "",
                size: "large",
                animation: true,
                backdrop: true,
                escClose: true,
                clickClose: true,
                autoClose: 0,
                class: "",
                testMode: false,
                trigger: {
                    type: undefined,
                    val: 0,
                    disabled: false
                }
            };
        }
        function _documentCheckScrollPercent(trigger_percent) {
            var doc_height = angular.element($document).height() - angular.element($window).height();
            var doc_quantum = parseFloat(doc_height / 100);
            var current_percentage = parseInt(100 - (doc_height - angular.element($window).scrollTop()) / doc_quantum, 10);
            return current_percentage >= trigger_percent;
        }
        function _send_event(name, args) {
            name = "rcDialog:" + name;
            angular.element(document.body).triggerHandler(name, args);
            $rootScope.$broadcast(name, args);
        }
        return {
            getDefaultDialog: _get_default_dialog,
            documentCheckScrollPercent: _documentCheckScrollPercent,
            sendEvent: _send_event
        };
    } ]);
    module.factory("rcDialog", [ "$log", "$injector", "$q", "$timeout", "$window", "rcDialogHelpers", function($log, $injector, $q, $timeout, $window, rcDialogHelpers) {
        var modal = null;
        var triggerHeightCheck = {};
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
            if (angular.isString(dialog.template) && dialog.template.length) {
                options.template = dialog.template;
                options.plain = true;
            } else {
                options.template = dialog.templateUrl;
                options.plain = false;
            }
            options.appendClassName = "rc-dialog " + dialog.class;
            angular.extend(options, dialog.themeOptions);
            var modal_instance = modal.openConfirm(options);
            modal_instance.then(function(confirm) {
                dialog.open = false;
                rcDialogHelpers.sendEvent("confirm", confirm);
            }, function(close) {
                dialog.open = false;
                rcDialogHelpers.sendEvent("close", close);
            });
            return modal_instance;
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
            if (angular.isString(dialog.template) && dialog.template.length) {
                options.template = dialog.template;
            } else {
                options.templateUrl = dialog.templateUrl;
            }
            if (dialog.backdrop === true && dialog.clickClose === false) {
                options.backdrop = "static";
            }
            options.windowClass = "rc-dialog-uibdialog " + dialog.class;
            options.backdropClass = "rc-dialog-uibdialog-backdrop " + dialog.class;
            angular.extend(options, dialog.themeOptions);
            var modal_instance = modal.open(options);
            modal_instance.result.then(function(confirm) {
                dialog.open = false;
                rcDialogHelpers.sendEvent("confirm", confirm);
            }, function(close) {
                dialog.open = false;
                rcDialogHelpers.sendEvent("close", close);
            });
            return modal_instance.result;
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
            if (angular.isString(dialog.template) && dialog.template.length) {
                options.template = dialog.template;
            } else {
                options.templateUrl = dialog.templateUrl;
            }
            if (dialog.backdrop === true && dialog.clickClose === false) {
                options.backdrop = "static";
            }
            options.windowClass = "rc-dialog-zfdialog " + dialog.class;
            angular.extend(options, dialog.themeOptions);
            var modal_instance = modal.open(options);
            modal_instance.result.then(function(confirm) {
                dialog.open = false;
                rcDialogHelpers.sendEvent("confirm", confirm);
            }, function(close) {
                dialog.open = false;
                rcDialogHelpers.sendEvent("close", close);
            });
            return modal_instance.result;
        }
        function _open_modal(dialog, data, dialog_api) {
            var deferred = $q.defer();
            var result = {};
            dialog.open = true;
            switch (dialog.theme) {
              case "bootstrap":
                try {
                    angular.module("ui.bootstrap");
                    modal = $injector.get("$uibModal");
                    return _open_bootstrap_modal(dialog, data, dialog_api);
                } catch (err) {
                    result.message = 'Error to open dialog with "ui.bootstrap".';
                    result.error = err;
                }
                break;

              case "foundation":
                try {
                    angular.module("mm.foundation");
                    modal = $injector.get("$modal");
                    return _open_foundation_modal(dialog, data, dialog_api);
                } catch (err) {
                    result.message = 'Error to open dialog with "mm.foundation".';
                    result.error = err;
                }
                break;

              default:
                try {
                    angular.module("ngDialog");
                    modal = $injector.get("ngDialog");
                    return _open_dialog_modal(dialog, data, dialog_api);
                } catch (err) {
                    result.message = 'Error to open dialog with "ngDialog".';
                    result.error = err;
                }
            }
            $log.error(result.message);
            $log.error(result.error);
            dialog.open = false;
            deferred.reject(result);
            return deferred.promise;
        }
        return {
            open: function(dialog, data, dialog_api) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                var dialog_prams = angular.extend(rcDialogHelpers.getDefaultDialog(), dialog);
                angular.extend(dialog, dialog_prams);
                if (dialog.open === true || dialog.open === undefined && !dialog.trigger.type) {
                    promise = _open_modal(dialog, data, dialog_api);
                    return promise;
                }
                if (dialog.trigger.disabled === true) {
                    deferred.reject(false);
                    return promise;
                }
                switch (dialog.trigger.type) {
                  case "seconds":
                    var timeout_to_open = dialog.trigger.val * 1e3;
                    promise = $timeout(function() {
                        return _open_modal(dialog, data, dialog_api);
                    }, timeout_to_open);
                    break;

                  case "scroll":
                    if (!triggerHeightCheck[dialog.id]) {
                        triggerHeightCheck[dialog.id] = function() {
                            if (rcDialogHelpers.documentCheckScrollPercent(dialog.trigger.val)) {
                                angular.element($window).unbind("scroll", triggerHeightCheck[dialog.id]);
                                promise = _open_modal(dialog, data, dialog_api);
                            }
                        };
                        angular.element($window).bind("scroll", triggerHeightCheck[dialog.id]);
                    }
                    break;

                  case "onload":
                    promise = $timeout(function() {
                        return _open_modal(dialog, data, dialog_api);
                    }, 0);
                    break;

                  default:
                    deferred.reject(false);
                }
                return promise;
            },
            destroy: function(dialog) {
                if (triggerHeightCheck[dialog.id]) {
                    angular.element($window).unbind("scroll", triggerHeightCheck[dialog.id]);
                }
            }
        };
    } ]);
})(angular);
//# sourceMappingURL=rc-dialog.js.map
