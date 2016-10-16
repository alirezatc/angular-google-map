weatherApp.factory('LocationService', ['$http', function ($http) {
    return {
        getAll: function () {
            return $http.get("app/data/d.json")
        }
    };
}])

