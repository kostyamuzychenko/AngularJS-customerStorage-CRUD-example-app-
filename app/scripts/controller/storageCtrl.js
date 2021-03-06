'use strict';

angular.module('angularTest', ['ui.bootstrap'])
    .controller('MainCtrl', ['$scope', '$modal', function ($scope, $modal) {
        //Data storage implemented via JSON
        $scope.customers = [{
                name: "Joe", email: "joe@gmail.com", telephone: "123-345", address: "undefined",
                street: "Some street", city: "Some city", state: "Some state", zip: "65"
            },
            {
                name: "John", email: "john@gmail.com", telephone: "234-567", address: "undefined",
                street: "Some street#2", city: "Some city#2", state: "Some state", zip: "66"
            }];

        //List of states to be chosen in modal
        $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas',
            'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
            'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
            'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
            'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
            'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma',
            'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
            'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

        //Modal window
        $scope.open = function (customer) {
            $modal.open({
                templateUrl: 'views/modal/addCustomerModal.html',
                scope: $scope,
                controller: function ($scope, $modalInstance, editCustomer) {
                    if (!editCustomer) {
                        $scope.interim = {};
                    }
                    else {
                        $scope.interim = editCustomer;
                    }

                    //Function called on press to OK button
                    $scope.ok = function () {
                        if (!editCustomer) {
                            $scope.customers.push($scope.interim);
                        }
                        else {
                            for (var i = 0; i < $scope.customers.length; i++) {
                                if ($scope.customers[i].name === editCustomer.name) {
                                    $scope.customers[i] = angular.copy ($scope.interim);
                                    break;
                                }
                            }
                        }
                        $modalInstance.close();
                    };

                    //Function called on press to Cancel button
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                },
                resolve: {
                    editCustomer: function () {
                        return customer;
                    }
                }
            });
        };

        //Function removes customer from storage
        $scope.removeRow = function (name) {
            var i = 0;

            for (i; i < $scope.customers.length; i++) {
                if ($scope.customers[i].name === name) {
                    $scope.customers.splice(i, 1);
                    break;
                }
            }
        };
    }]);

