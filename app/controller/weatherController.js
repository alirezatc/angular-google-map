weatherApp
    .controller('weatherCtrl', function ($scope, uiGmapGoogleMapApi, LocationService, $filter, $timeout) {
        //defining the icons 
        $scope.iconList = ['assets/image/marker-sunny.png', 'assets/image/marker-sunAndRain.png', 'assets/image/marker-cloud.png', 'assets/image/marker-lightning.png'];
        $scope.locObject = [];
        $scope.filteredData = [];
        $scope.cityFilter = '';
        $scope.dateTime = '';

        //calling the service
        $scope.getAllLocations = function () {
            LocationService.getAll()
                .success(function (result) {
                    $scope.locObject = result;
                    $scope.locObject2 = $scope.locObject;
                })
                .error(function (error) {
                    console.log(error);
                })
        };

        //method for pressing each tab
        $scope.activeTab = function (dateTime) {
            $scope.dateTime = dateTime;
            $timeout(function () {
                $scope.map.markers = $scope.dateAndTempSetter($scope.locObject, dateTime);
            }, 100)
        }

        // giving one second to user to write the whole name of city, although search performs on any character
        $scope.$watch('cityFilter', function (val) {
            $timeout(function () {
                $scope.map.markers = $scope.dateAndTempSetter($scope.locObject, $scope.dateTime);
            }, 1000)
        });

        // a method to set the date (for making the code some kind of dynamic for other days)
        // this method has two filtering
        $scope.dateAndTempSetter = function (obj, dateTime) {
            var i = 1;
            var filteredData = [];
            //first filter by city name (it can be left empty)
            $scope.locObject = $filter('filter')($scope.locObject2, $scope.cityFilter);
            //second filter by min_temprature to pick the proper icon for each place
            $filter('filter')($scope.locObject, function (val) {
                var t = parseFloat(val.temperature_min);
                if (val.datetime == dateTime) {
                    val.id = i;
                    val.title = val.place_name;
                    if (t < 12) {
                        val.icon = $scope.iconList[3];
                        filteredData.push(val);
                    }
                    else if ((t => 12) && (t < 14)) {
                        val.icon = $scope.iconList[2];
                        filteredData.push(val);
                    }
                    else if ((t => 14) && (t < 15)) {
                        val.icon = $scope.iconList[1];
                        filteredData.push(val);
                    }
                    else if (t => 15) {
                        val.icon = $scope.iconList[0];
                        filteredData.push(val);
                    }
                    i++;
                }
            });
            return filteredData;
        };
        
        $scope.windowOptions = {
            visible: false
        };
        
        //first value of the object map must be initiated
        $scope.map = {
            control: {},
            center: {
                latitude: 35.69611100, longitude: 51.42305600
            },
            zoom: 10,
            options: {
                streetViewControl: false,
                panControl: false,
                maxZoom: 10,
                minZoom: 5
            },
            dragging: false,
            bounds: {},
            markers: []
        }
        // when you click on marker
        $scope.markersEvents = {
            click: function (gMarker, eventName, model) {
                if (model.$id) {
                    model = model.coords;
                }
            }
        };

        //var markerToClose = null;
        //$scope.onMarkerClicked = function (marker) {
        //    markerToClose = marker; // for next go around
        //    marker.showWindow = true;
        //    $scope.$apply();
        //};

        // fake data for high chart
        $scope.chartOptions = {
            title: {
                text: 'Humidity'
            },
            xAxis: {
                categories: ['2a', '6a', '10a', '2p', '6p', '10p']
            },

            series: [{
                data: [75.9, 75.5, 75.4, 75.2, 76.0, 76.0]
            }]
        };
       
       // calling the main method (could be used bootstrap instead)
        $scope.getAllLocations();
    });
