describe('UserCtlr', function(){
  let controller, scope, $httpbackend;
  beforeEach(angular.mock.module('Jkitchen'));
  beforeEach(inject(function($controller, $rootScope, $injector){
    scope = $rootScope.$new();
    $httpBackend = $injector.get('$httpBackend');
    controller = (function() {
      return $controller('UserCtlr', {
        $scope: scope
      });
    })();
  }));
  
  it('should be defined', function() {
    expect(controller).toBeDefined();
  });
});