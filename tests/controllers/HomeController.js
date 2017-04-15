describe('HomeController', function(){
    //Method provided by Jasmine to run code before each test.
    // beforeEach(module('practice'));
    beforeEach(module('practice'));

    var $controller;

    //Injecting $controller, the service that is responsible for instanting controllers.
    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));

    // describe('$scope.items', function(){
    //     it('property should have items inside it', function(){
          
    //         var $scope = {};
    //         // expect($scope).toBeDefined();
    //         var $controller = $controller('HomeController', {$scope: $scope});
    //         expect($scope.items.length).toBeGreaterThan(10);
    //     });
    // });
});