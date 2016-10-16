var weatherApp = angular
    .module('weatherApp', ['uiGmapgoogle-maps', 'ngMaterial'])
    .directive('hcChart', function () {
        return {
            restrict: 'E',
            template: '<div></div>',
            scope: {
                options: '='
            },
            link: function (scope, element) {
                Highcharts.chart(element[0], scope.options);
            }
        };
    })
        
          
            