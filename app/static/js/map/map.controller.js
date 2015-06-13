var component = require('./map.module');

component.controller('MapController', mapController);

var GMaps = require('gmaps');

function mapController() {
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
        travelAll([
            [49.8768929, 8.642697],
            [49.8647838, 8.5896493],
            [49.87324, 8.65173],
            [49.8768929, 8.642697]
        ]);
    };

    function travelAll(list) {
        travel(list, 1);
    }

    function travel(list, i) {
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

}