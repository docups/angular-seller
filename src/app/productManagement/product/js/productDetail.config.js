angular.module('orderCloud')
    .config(ProductDetailConfig)
;

function ProductDetailConfig($stateProvider) {
    $stateProvider
        .state('productDetail', {
            parent: 'base',
            url: '/products/:productid',
            templateUrl: 'productManagement/product/templates/productDetail.html',
            controller: 'ProductDetailCtrl',
            controllerAs: 'productDetail',
            data: {
                pageTitle: 'Product Info'
            },
            resolve: {
                SelectedProduct: function ($stateParams, sdkOrderCloud) {
                    return sdkOrderCloud.Products.Get($stateParams.productid)
                        .then(function(product) {
                            if (!product.DefaultPriceScheduleID) {
                                return product;
                            } else {
                                return sdkOrderCloud.PriceSchedules.Get(product.DefaultPriceScheduleID)
                                    .then(function(priceSchedule) {
                                        product.DefaultPriceSchedule = priceSchedule;
                                        return product;
                                    });
                            }
                        });
                }
            }
        })
    ;
}