function initMap() 
            {
                var origin_place_id = null;
                var destination_place_id = null;
                
                var travel_mode = google.maps.TravelMode.WALKING;
                
                var map = new google.maps.Map(document.getElementById('map'), 
                {
                    mapTypeControl: false,
                    center: {lat: 59.9295700, lng: 10.7355620},
                    zoom: 17
                });
                
                var directionsService = new google.maps.DirectionsService;
                var directionsDisplay = new google.maps.DirectionsRenderer;
                
                    directionsDisplay.setMap(map);

                var reise_til = document.getElementById('reise_til');
                var destination_input = document.getElementById('reise_fra');
                //var modes = document.getElementById('transport');

                var origin_autocomplete = new google.maps.places.Autocomplete(reise_til);
                origin_autocomplete.bindTo('bounds', map);
                var destination_autocomplete =
                        new google.maps.places.Autocomplete(destination_input);
                
                destination_autocomplete.bindTo('bounds', map);

                // Sets a listener on a radio button to change the filter type on Places
                // Autocomplete.
                function setupClickListener(id, mode) 
                {
                    var radioButton = document.getElementById(id);
                    radioButton.addEventListener('click', function () 
                    {
                        travel_mode = mode;
                    });
                }
                
                setupClickListener('walking', google.maps.TravelMode.WALKING);
                setupClickListener('buss', google.maps.TravelMode.TRANSIT);
                setupClickListener('bil', google.maps.TravelMode.DRIVING);

                function expandViewportToFitPlace(map, place) 
                {
                    if (place.geometry.viewport) 
                    {
                        map.fitBounds(place.geometry.viewport);
                    } 
                    else 
                    {
                        map.setCenter(place.geometry.location);
                        map.setZoom(16);
                    }
                }

                origin_autocomplete.addListener('place_changed', function () 
                {
                    var place = origin_autocomplete.getPlace();
                    if (!place.geometry) 
                    {
                        window.alert("Autocomplete's returned place contains no geometry");
                        return;
                    }
                    expandViewportToFitPlace(map, place);

                    origin_place_id = place.place_id;
                    route(origin_place_id, destination_place_id, travel_mode,
                            directionsService, directionsDisplay);
                });

                destination_autocomplete.addListener('place_changed', function () 
                {
                    var place = destination_autocomplete.getPlace();
                    if (!place.geometry) {
                        window.alert("Finner ikke noe ved denne adressen");
                        return;
                    }
                    expandViewportToFitPlace(map, place);

                    // If the place has a geometry, store its place ID and route if we have
                    // the other place ID
                    destination_place_id = place.place_id;
                    route(origin_place_id, destination_place_id, travel_mode,
                            directionsService, directionsDisplay);
                });

                function route(origin_place_id, destination_place_id, travel_mode,
                        directionsService, directionsDisplay) {
                    if (!origin_place_id || !destination_place_id) {
                        return;
                    }
                    directionsService.route(
                       {
                        origin: {'placeId': origin_place_id},
                        destination: {'placeId': destination_place_id},
                        travelMode: travel_mode
                       }
                        , 
                    
                function (response, status) 
                {
                        if (status === google.maps.DirectionsStatus.OK) 
                        {
                            directionsDisplay.setDirections(response);
                        } 
                        else 
                        {
                            window.alert('Det er noe noe feil ' + status);
                        }
                });
            }
        }


