describe('UserCtlr', function(){
  var controller, scope, $httpbackend;
  beforeEach(module('Jkitchen'));
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