(function(angular){
  'use strict';

  var module = angular.module('rcDialog');

  //ngDialog Modal Controller
    module.controller('rcDialogCtrl', ['$scope', '$location', '$timeout', '$log', 'rcDialogObj', 'rcDialogDataObj', 'rcDialogApiObj', function ( $scope, $location, $timeout, $log, rcDialogObj, rcDialogDataObj, rcDialogApiObj) {

      function get_selected_view() {
          var search = $location.search();
          var selected_view = null;

          if ( angular.isDefined(search.selectedView) ) {

              if ( angular.isString(search.selectedView) ) {
                  selected_view = search.selectedView;
              }

              $location.search('selectedView', null);
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

      if ( angular.isDefined(this.dialog.autoClose) && angular.isNumber(this.dialog.autoClose) && this.dialog.autoClose > 0 ) {
          $timeout(function () {
              dialogApi.closeDialog();
          }, this.dialog.autoClose);
      }

      this.closeDialog = function ( value ) {
        if ( angular.isString(value) ) {
            value = 'close_' + value;
        }
        else if ( angular.isObject(value) ) {
            value.name = 'confirm';
        }
        $scope.closeThisDialog( value );
      };

      this.confirmDialog = function ( value ) {
        if ( angular.isString(value) ) {
            value = 'confirm_' + value;
        }
        else if ( angular.isObject(value) ) {
            value.name = 'confirm';
        }
        $scope.confirm( value );
      };

      this.setSelectedView = function ( value ) {

          if (!this.selectedView) {
              this.selectedView = value;
          }
      };

  }]);


  //UI Bootstrap Modal Controller
    module.controller('rcDialogUibCtrl', ['$scope', '$location', '$timeout', '$log', 'rcDialogObj', 'rcDialogDataObj', 'rcDialogApiObj', '$uibModalInstance', function ($scope, $location, $timeout, $log, rcDialogObj, rcDialogDataObj, rcDialogApiObj, $uibModalInstance) {

      function get_selected_view() {
          var search = $location.search();
          var selected_view = null;

          if ( angular.isDefined(search.selectedView) ) {

              if ( angular.isString(search.selectedView) ) {
                  selected_view = search.selectedView;
              }

              $location.search('selectedView', null);
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

      if ( angular.isDefined(this.dialog.autoClose) && angular.isNumber(this.dialog.autoClose) && this.dialog.autoClose > 0 ) {
          $timeout(function () {
              dialogApi.closeDialog();
          }, this.dialog.autoClose);
      }


      this.closeDialog = function ( value ) {
        if ( angular.isString(value) ) {
            value = 'close_' + value;
        }
        else if ( angular.isObject(value) ) {
            value.name = 'close';
        }
        $uibModalInstance.dismiss( value );
      };

      this.confirmDialog = function ( value ) {
        if ( angular.isString(value) ) {
          value = 'confirm_' + value;
        }
        else if ( angular.isObject(value) ) {
            value.name = 'confirm';
        }
        $uibModalInstance.close(value);
      };

      this.setSelectedView = function ( value ) {

          if (!this.selectedView) {
              this.selectedView = value;
          }
      };

  }]);


  //Foundation6 Modal Controller
    module.controller('rcDialogFoundationCtrl', ['$scope', '$location', '$timeout', '$log', 'rcDialogObj', 'rcDialogDataObj', 'rcDialogApiObj', '$modalInstance', function ($scope, $location, $timeout, $log, rcDialogObj, rcDialogDataObj, rcDialogApiObj, $modalInstance) {

      function get_selected_view() {
          var search = $location.search();
          var selected_view = null;

          if ( angular.isDefined(search.selectedView) ) {

              if ( angular.isString(search.selectedView) ) {
                  selected_view = search.selectedView;
              }

              $location.search('selectedView', null);
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

      if ( angular.isDefined(this.dialog.autoClose) && angular.isNumber(this.dialog.autoClose) && this.dialog.autoClose > 0 ) {
          $timeout(function () {
              dialogApi.closeDialog();
          }, this.dialog.autoClose);
      }

      this.closeDialog = function ( value ) {
          if ( angular.isString(value) ) {
              value = 'close_' + value;
          }
          else if ( angular.isObject(value) ) {
              value.name = 'close';
          }
          $modalInstance.dismiss( value );
      };

      this.confirmDialog = function ( value ) {
        if ( angular.isString(value) ) {
          value = 'confirm_' + value;
        }
        else if ( angular.isObject(value) ) {
            value.name = 'confirm';
        }
        $modalInstance.close(value);
      };

      this.setSelectedView = function ( value ) {

          if (!this.selectedView) {
              this.selectedView = value;
          }
      };

  }]);

})(angular, window);
