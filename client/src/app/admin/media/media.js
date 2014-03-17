(function(window, angular, undefined){
'use strict';
//Dependencies ui.router nodblog.api.base nodblog.ui.paginators.elastic
angular.module('nodblog.admin.media',[])
    .config(function($stateProvider,RestangularProvider,pathView) {
        $stateProvider
            .state('media', {
                url: '/media',
                templateUrl: pathView+'media/index.tpl.html',
                resolve: {
                    medias: function(Media){
                        return Media.all();
                    }
                },
                controller:'MediaIndexCtrl'
            });
            RestangularProvider.setBaseUrl('/admin/api');
            RestangularProvider.setRestangularFields({
                id: "_id"
            });
            RestangularProvider.setRequestInterceptor(function(elem, operation, what) {
                if (operation === 'put') {
                    elem._id = undefined;
                    return elem;
                }
                return elem;
            });      
    })
    .factory('Media', function(Base) {
        function NgMedia() {}
        return angular.extend(Base('media'), new NgMedia());
    })
    .controller('MediaIndexCtrl', function ($scope,$state,medias,Paginator) {
        $scope.paginator =  Paginator(2,5,medias);
    });
})(window, angular);    

