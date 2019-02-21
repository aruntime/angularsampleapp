(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'GitService', 'UserService', '$rootScope', '$http'];

    function HomeController($scope, GitService, UserService, $rootScope, $http) {
        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;
        vm.sortOrder = '';
        $scope.searchText = '';
        initController();

        function initController() {
            loadCurrentUser();
            loadAllUsers();
            // loadGitUser();
            takeGitUser();
        }


        $scope.sortIt = function () {
            vm.sortOrder == 'login' ? vm.sortOrder = 'id' : vm.sortOrder = 'login';
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