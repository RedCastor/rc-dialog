(function(angular){
  'use strict';

  var module = angular.module('rcDialog');

  //ngDialog Modal Controller
    module.controller('rcDialogCtrl', ['$log', 'rcDialogObj', 'rcDialogDataObj', function ( $log, rcDialogObj, rcDialogDataObj) {

      this.dialog = rcDialogObj;
      this.data = rcDialogDataObj;

      this.closeDialog = function ( value ) {
        this.closeThisDialog( value );
      };

      this.confirmDialog = function ( value ) {
        this.confirm( value );
      };

  }]);


  //UI Bootstrap Modal Controller
    module.controller('rcDialogUibCtrl', ['$log', 'rcDialogObj', 'rcDialogDataObj', '$uibModalInstance', function ($log, rcDialogObj, rcDialogDataObj, $uibModalInstance) {

      this.dialog = rcDialogObj;
      this.data = rcDialogDataObj;

      this.closeDialog = function ( value ) {
        $uibModalInstance.close( value );
      };

      this.confirmDialog = function ( value ) {
        if ( angular.isString(value) ) {
          value = 'confirm_' + value;
        }
        $uibModalInstance.close(value);
      };

  }]);


  //Foundation6 Modal Controller
    module.controller('rcDialogFoundationCtrl', ['$log', 'rcDialogObj', 'rcDialogDataObj', '$modalInstance', function ($log, rcDialogObj, rcDialogDataObj, $modalInstance) {

      this.dialog = rcDialogObj;
      this.data = rcDialogDataObj;

      this.closeDialog = function ( value ) {
        $modalInstance.close( value );
      };

      this.confirmDialog = function ( value ) {
        if ( angular.isString(value) ) {
          value = 'confirm_' + value;
        }
        $modalInstance.close(value);
      };

  }]);

})(angular, window);
