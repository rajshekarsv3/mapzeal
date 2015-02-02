var map ;

var freeBus = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [-105.00341892242432, 39.75383843460583],
                    [-105.0008225440979, 39.751891803969535]
                ]
            },
            "properties": {
                "popupContent": "This is free bus that will take you across downtown.",
                "underConstruction": false
            },
            "id": 1
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [-105.0008225440979, 39.751891803969535],
                    [-104.99820470809937, 39.74979664004068]
                ]
            },
            "properties": {
                "popupContent": "This is free bus that will take you across downtown.",
                "underConstruction": true
            },
            "id": 2
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [-104.99820470809937, 39.74979664004068],
                    [-104.98689651489258, 39.741052354709055]
                ]
            },
            "properties": {
                "popupContent": "This is free bus that will take you across downtown.",
                "underConstruction": false
            },
            "id": 3
        }
    ]
};

		var hosur = {
			  "type": "FeatureCollection",
			  "features": [
			    {
			      "type": "Feature",
			      "properties": {
			        "value": "hello"
			      },
			      "geometry": {
			        "type": "Point",
			        "coordinates": [
			          437.8326416015625,
			          12.736800512460297
			        ]
			      }
			    }
			  ]
			};

			var geojsonLayer;
Template.test.rendered = function(){
		geojsonLayer = L.geoJson();
		map = L.map('map').setView([39.74739, -105], 1);

		L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
				'Imagery © <a href="http://mapbox.com">Mapbox</a>',
			id: 'examples.map-20v6611k'
		}).addTo(map);
		

}

Template.test.events({
	'click #zoom13': function(){
		map.setZoom(13);
	},
	'click #add_example': function(){
		geojsonLayer.addData(freeBus);
		map.addLayer(geojsonLayer);
	}
});