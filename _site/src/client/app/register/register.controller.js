(function () {
  'use strict';

  angular
    .module('app.register')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['UserService', '$location', 'toastr', 'AuditViewService', 'CustomerService'];

  function RegisterController(UserService, $location, toastr, AuditViewService, CustomerService) {



    var vm = this;
    vm.signUpText = 'Sign Up';
    vm.category = "CUST";
    vm.popup1 = {
      opened: false
    };
    vm.open1 = function () {
      vm.popup1.opened = true;
    };

    vm.dateOptions = {};
    vm.user = null;
    vm.register = register;
    vm.allCities = [];
    vm.allBrands = [];
    vm.shoppingCategoryList = [];
    vm.selectCategory = selectCategory;
       vm.dataLoading = false;
    
    activate();


    function activate() {

      getShoppingCategory();
      getAllCities();
      getAllBrands();
    }


    function resetForm(form) {

      var controlNames = Object.keys(form).filter(function (key) {
        return key.indexOf('$') !== 0;
      });


      controlNames.forEach(function (value) {
        vm.form[value] = '';
      });

      form.$setPristine();
      form.$setUntouched();

    }

    function selectCategory(category, form) {

      vm.category = category;

      vm.user = null;

      /*   if (vm.form !== undefined) {

        resetForm(vm.form);
        vm.user = null;
        vm.form.$rollbackViewValue();
        vm.form.$setPristine();

        vm.form.$setUntouched();
      }*/
    }

    function register(form) {
 vm.dataLoading = true;
        
      if (vm.category === 'CUST') {
        UserService.custRegistration(vm.user)
          .then(function (response) {


            if (response.status === 'success') {

              toastr.success('Registration Successfull');
              vm.dataLoading = false;
              vm.user = null;
              form.$setPristine();
              form.$setUntouched();
              /* $location.path('/login');*/
            } else {

              if (!response.message) {
                response.message = 'Error In Registration. Please send a mail to contactus@hashworks.co.';
              } else if (response.message === '\'username should be unique\'') {
                response.message = 'Username Already Exists';
              } else if (response.message === '\'email_ID should be unique\'') {
                response.message = 'Email ID Already Registered';
              } else if (response.message === '\'mob should be unique\'') {
                response.message = 'Mobile Number Already Registered';
              } //''
              toastr.error(response.message);
              vm.dataLoading = false;
            }
          });
      } else if (vm.category === 'MYB') {
        UserService.mybRegistration(vm.user)
          .then(function (response) {

            if (response.status === 'success') {
              toastr.success('Registration Successfull.Check Your Email To Verify Your Account');

              vm.user = null;
              form.$setPristine();
              form.$setValidity();
              form.$setUntouched();
              /* $location.path('/login');*/
                   vm.dataLoading = false;
            } else {

              if (!response.message) {
                response.message = 'Error In Registration.Please Send A Mail To contactus@hashworks.co.';
              } else if (response.message === '\'username should be unique\'') {
                response.message = 'Username Already Exists';
              } else if (response.message === '\'email_ID should be unique\'') {
                response.message = 'Email ID Already Registered';
              } else if (response.message === '\'mob should be unique\'') {
                response.message = 'Mobile Number Already Registered';
              } //''
              toastr.error(response.message);
              vm.dataLoading = false;
            }
          });
      } else if (vm.category === 'MYS') {
        UserService.mysRegistration(vm.user)
          .then(function (response) {

            if (response.status === 'success') {
              toastr.success('Registration Successfull.Check Your Email To Verify Your Account');

              vm.user = null;
              form.$setPristine();
              form.$setValidity();
              form.$setUntouched();
              /* $location.path('/login');*/
                vm.dataLoading = false;
            } else {

              if (!response.message) {
                response.message = 'Error In Registration.Please Send A Mail To contactus@hashworks.co.';
              } else if (response.message === '\'username should be unique\'') {
                response.message = 'Username already exists';
              } else if (response.message === '\'email_ID should be unique\'') {
                response.message = 'Email ID already registered';
              } else if (response.message === '\'mob should be unique\'') {
                response.message = 'Mobile Number already registered';
              } //''
              toastr.error(response.message);
              vm.dataLoading = false;
            }
          });
      }
    }


    function getShoppingCategory() {
      AuditViewService.getShoppingCatergory()
        .then(function (res) {
          if (res.status === 'fail') {
            toastr.error('Error In Fetching The Shopping Category');
          } else {
            vm.shoppingCategoryList = res.results;
          }
        });
    }

    function getAllCities() {
      AuditViewService.getAllCities()
        .then(function (res) {
          if (res.status === 'fail') {
            toastr.error('Error In Fetching The Shopping Category');
          } else {
            vm.allCities = res.results;
          }
        });
    }

    function getAllBrands() {
      CustomerService.getAllBrand()
        .then(function (res) {
          if (res.statusa === 'fail') {
            toastr.error('Error In Getting Brands');
          } else {
            vm.allBrands = res.results;
          }
        });
    }


  }

})();
