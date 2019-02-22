(function () {
    'use strict';

    angular
        .module('app')
        .controller('DetailsController', DetailsController);

    DetailsController.$inject = ['$scope', 'GitService', 'UserService', '$rootScope', '$http', '$routeParams'];

    function DetailsController($scope, GitService, UserService, $rootScope, $http, $routeParams) {
        
        
        console.log($routeParams.id);
        var vm = this;
        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;
        vm.sortOrder = '';
        $scope.searchText = '';
        initController();
        // pageView
        // vm.pageVice = [];

        function initController() {
            loadCurrentUser();
            loadAllUsers();
            // loadGitUser();
            takeGitUser();
            vm.cPage = 0;
            vm.nDisabled = false;
            vm.pDisabled = true;
        }

        $scope.sortIt = function () {
            vm.sortOrder == 'login' ? vm.sortOrder = 'id' : vm.sortOrder = 'login';
        }

        $scope.setPagePrevious = function () {
            debugger;
            // vm.cPage > 0 && vm.cPage < vm.gitUser.length ? console.log('true'):console.log('false');
            // vm.pageVice = vm.gitUser.slice(vm.cPage, vm.cPage+10);
            // vm.cPage +=10;
            if(vm.cPage > 0){
                vm.cPage -=10;
                vm.pageVice = vm.gitUser.slice(vm.cPage, vm.cPage+10);
            }
            else{
                vm.nDisabled = false;
                vm.pDisabled = true;
            }
        }

        $scope.setPageNext = function () {
            debugger;
            if(vm.cPage < vm.gitUser.length-10){
                vm.cPage +=10;
                vm.pageVice = vm.gitUser.slice(vm.cPage, vm.cPage+10);
            }
            else{
                vm.nDisabled = true;
                vm.pDisabled = false;
            }
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }

        function takeGitUser() {
            debugger;
            vm.gitUser = GitService.GetAll();
            vm.userData = vm.gitUser[$routeParams.id-1];
            console.log(vm.userData);
        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        function deleteUser(id) {
            UserService.Delete(id)
                .then(function () {
                    loadAllUsers();
                });
        }
    }

})();