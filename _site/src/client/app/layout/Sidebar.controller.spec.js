/* jshint -W117, -W030 */
describe('SidebarController', function() {
  var controller;

  beforeEach(function() {
    bard.appModule('app.layout');
    bard.inject('$controller', '$q', '$rootScope', '$timeout', 'dataservice');
  });

  beforeEach(function() {
    controller = $controller('SidebarController');
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Sidebar controller', function() {
    it('should be created successfully', function() {
      expect(controller).to.be.defined;
    });

    it('should show splash screen', function() {
      expect($rootScope.showSplash).to.be.true;
    });

    it('should hide splash screen after timeout', function(done) {
      $timeout(function() {
        expect($rootScope.showSplash).to.be.false;
        done();
      }, 1000);
      $timeout.flush();
    });
  });
});
