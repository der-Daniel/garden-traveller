var component = require('./map.module');

component.controller('MapController', mapController);

var GMaps = require('gmaps');

function mapController(apiService, $window, $stateParams) {
    var vm = this;

    var map;
    $(document).ready(function() {
        map = new GMaps({
            el: '#map',
            lat: 49.8768929,
            lng: 8.642697,
            zoomControl: true,
            zoomControlOpt: {
                style: 'SMALL',
                position: 'TOP_LEFT'
            },
            panControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            overviewMapControl: false
        });

    });

    vm.test = function() {
        /*travelAll([
            [49.8768929, 8.642697],
            [49.8647838, 8.5896493],
            [49.87324, 8.65173],
            [49.8768929, 8.642697]
        ]);*/
        loadData();
    };
    vm.startNav = startNav;

    loadData();

    function travelAll(list) {
        //var names = findNamesToLangitudes(list);
        travel(list, 1);
    }

    function travel(list, i) {
        map.addMarker({
            lat: list[i][0],
            lng: list[i][1],
            title: 'title',
            infoWindow: {
                content: '<p>'+'</p>'
            }
        });
        map.travelRoute({
            origin: list[i-1],
            destination: list[i],
            travelMode: 'driving',
            step: function(e) {
                //$('#instructions').append('<li>'+e.instructions+'</li>');
                $('#map').delay(450).fadeIn(200, function() {
                    map.setCenter(e.end_location.lat(), e.end_location.lng());
                    map.drawPolyline({
                        path: e.path,
                        strokeColor: '#131540',
                        strokeOpacity: 0.6,
                        strokeWeight: 6
                    });
                });
            },
            end: function(e) {
                if (i < list.length - 1)
                    travel(list, i+1);
            }
        });
    }

    var nodes;
    function loadData() {
        var promise = $stateParams.poi;//apiService.readRoute();
        console.log(promise);
        promise.then(function(data) {
            nodes = data.via_points;
           travelAll(data.via_points);
        });
    }

    /*function findNamesToLangitudes(list) {
        var promise = apiService.getAllGarden();
        var names = [];
        promise.then(function(gardens) {console.log(gardens);
            angular.forEach(list, function(item) {
                angular.forEach(gardens, function(garden) {
                    if (item[0].latitude == garden.latitude && item[1].longitude == garden.longitude)
                        names.push(garden.name);
                })
            });
            return names;
        })
    }*/

    function startNav() {
        var url = 'http://www.google.de/maps/dir/';
        angular.forEach(nodes, function(item) {
           url += item[0]+','+item[1]+'/';
        });
        $window.open(url, '_blank');
    }

}