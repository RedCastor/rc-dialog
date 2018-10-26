(function(angular){
    'use strict';


    // Load module notify
    var module = angular.module('rcDialog');


    module.directive( 'rcdOpen', ['rcDialog', function ( rcDialog ) {
        return {
            restrict: "EAC",
            replace: false,
            scope: {
                rcdThemeOptions: '<',
                rcdTemplate: '@',
                rcdTemplateUrl: '@',
                rcdSize: '@',
                rcdAnimation: '=',
                rcdBackdrop: '=',
                rcdEscClose: '=',
                rcdClickClose: '=',
                rcdAutoClose: '=',
                rcdClass: '@',
                rcdSelectedView: '=',
                rcdData: '=?',
                rcdTrigger: '@',
                rcdTriggerValue: '@',
                rcdTriggerDisabled: '<',
                onConfirm: "&rcdOnConfirm",
                onClose: "&rcdOnClose"
            },
            link: function ($scope, elem, attrs) {

                var dialog = {
                    theme:      angular.isDefined(attrs.rcdOpen) ? attrs.rcdOpen : '',
                    themeOptions: angular.isObject($scope.rcdThemeOptions) ? $scope.rcdThemeOptions : {},
                    template:   angular.isDefined($scope.rcdTemplate) ? $scope.rcdTemplate : '',
                    templateUrl:angular.isDefined($scope.rcdTemplateUrl) ? $scope.rcdTemplateUrl : '',
                    size:       angular.isDefined($scope.rcdSize) ? $scope.rcdSize : 'large',
                    animation:  angular.isDefined($scope.rcdAnimation) ? $scope.rcdAnimation : true,
                    backdrop:   angular.isDefined($scope.rcdBackdrop) ? $scope.rcdBackdrop : true,
                    escClose:   angular.isDefined($scope.rcdEscClose) ? $scope.rcdEscClose : true,
                    clickClose: angular.isDefined($scope.rcdClickClose) ? $scope.rcdClickClose : true,
                    autoClose:  angular.isDefined($scope.rcdAutoClose)&& parseInt($scope.rcdAutoClose, 10) ? $scope.rcdAutoClose : 0,
                    class:      angular.isDefined($scope.rcdClass) ? $scope.rcdClass : '',
                    trigger: {
                        type:   angular.isString($scope.rcdTrigger) ? $scope.rcdTrigger : undefined,
                        val:    angular.isDefined($scope.rcdTriggerValue) ? parseInt($scope.rcdTriggerValue, 10) : 0,
                        disabled: !$scope.rcdTriggerDisabled ? false : true
                    },
                    open: false
                };

                if (attrs.id) {
                    dialog.id = attrs.id;
                }

                var data = angular.isDefined($scope.rcdData) ? $scope.rcdData : null;

                var dialog_api = {
                    selectedView: angular.isDefined($scope.rcdSelectedView) ? $scope.rcdSelectedView : '',
                };

                //Open on click
                elem.bind('click', function() {
                    dialog.open = true;

                    rcDialog.open(dialog, data, dialog_api).then(
                        function(response) { $scope.onConfirm({$confirm: response}); },
                        function (response) { $scope.onClose({$close: response}); }
                    );

                    dialog.open = false;
                });

                //Open on trriger
                if (dialog.trigger.type) {
                    rcDialog.open(dialog, data, dialog_api).then(
                        function(response) { $scope.onConfirm({$confirm: response}); },
                        function (response) { $scope.onClose({$close: response}); }
                    );
                }

                /**
                 * Destroy
                 */
                $scope.$on('$destroy', function handleDestroyEvent() {

                    rcDialog.destroy(dialog);
                });
            }
        };
    }]);

})(angular);
