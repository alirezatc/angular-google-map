weatherApp
.config(
        ['uiGmapGoogleMapApiProvider', function (GoogleMapApiProviders) {
            GoogleMapApiProviders.configure({
                china: true
            });
        }])
//configing the theme of angular material
.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('pink')
      .accentPalette('orange');
})