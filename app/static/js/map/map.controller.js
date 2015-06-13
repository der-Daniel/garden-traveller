var component = require('./map.module');

component.controller('MapController', mapController);

function mapController() {
    var vm = this;

    var map;
    $(document).ready(function() {
        map = new GMaps({
            el: '#map',
            lat: -12.043333,
            lng: -77.028333,
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

}