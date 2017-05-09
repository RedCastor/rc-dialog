(function(angular){
    'use strict';


    // Load module notify
    var module = angular.module('rcDialog');


    module.directive( 'rcdOpen', ['rcDialog', function ( rcDialog ) {
        return {
            restrict: "AC",
            replace: false,
            scope: {
                rcdTemplate: '@',
                rcdTemplateUrl: '@',
                rcdSize: '@',
                rcdAnimation: '=',
                rcdBackdrop: '=',
                rcdEscClose: '=',
                rcdClickClose: '=',
                rcdClass: '@',
                rcdData: '=?'
            },
            link: function ($scope, elem, attrs) {

                var dialog = {
                    theme:      angular.isDefined(attrs.rcdOpen) ? attrs.rcdOpen : '',
                    template:   angular.isDefined($scope.rcdTemplate) ? $scope.rcdTemplate : '',
                    templateUrl:angular.isDefined($scope.rcdTemplateUrl) ? $scope.rcdTemplateUrl : '',
                    size:       angular.isDefined($scope.rcdSize) ? $scope.rcdSize : 'large',
                    animation:  angular.isDefined($scope.rcdAnimation) && $scope.rcdAnimation === 'true' ? $scope.rcdAnimation : true,
                    backdrop:   angular.isDefined($scope.rcdBackdrop) && $scope.rcdBackdrop === 'true' ? $scope.rcdBackdrop : true,
                    escClose:   angular.isDefined($scope.rcdEscClose) && $scope.rcdEscClose === 'true' ? $scope.rcdEscClose : true,
                    clickClose: angular.isDefined($scope.rcdClickClose)&& $scope.rcdClickClose === 'true' ? $scope.rcdClickClose : true,
                    class:      angular.isDefined($scope.rcdClass) ? $scope.rcdClass : ''
                };

                var data = angular.isDefined($scope.rcdData) ? $scope.rcdData : null;

                elem.bind('click', function() {
                    rcDialog.open(dialog, data);
                });

            }
        };
    }]);

})(angular);
