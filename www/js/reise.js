function reise() 
            {
                var reise_til_id = null;
                var reise_fra_id = null;
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
                var reise_fra = document.getElementById('reise_fra');
                
                var til_autocomplete = new google.maps.places.Autocomplete(reise_til);
                til_autocomplete.bindTo('bounds', map);
                
                var fra_autocomplete =
                        new google.maps.places.Autocomplete(reise_fra);
                
                fra_autocomplete.bindTo('bounds', map);

                //*************sette inn radio button**********////
                
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

                function autoFitViewport(map, place) 
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

                  
                til_autocomplete.addListener('place_changed', function () 
                {
                    var place = til_autocomplete.getPlace();
                    if (!place.geometry) 
                    {
                        window.alert("Finner ikke location data");
                        return;
                    }
                    autoFitViewport(map, place);

                    reise_til_id = place.place_id;
                    route(reise_til_id, reise_fra_id, travel_mode,
                            directionsService, directionsDisplay);
                });

                fra_autocomplete.addListener('place_changed', function () 
                {
                    var place = fra_autocomplete.getPlace();
                    if (!place.geometry) {
                        window.alert("Finner ikke noe ved denne adressen");
                        return;
                    }
                    autoFitViewport(map, place);

                   reise_fra_id = place.place_id;
                    route(reise_til_id, reise_fra_id, travel_mode,
                            directionsService, directionsDisplay);
                });

                //koble seg til google maps service og finne den riktig reise ruter.
                function route(reise_til_id, reise_fra_id, travel_mode,
                        directionsService, directionsDisplay) {
                    if (!reise_til_id || !reise_fra_id) 
                    {
                        return;
                    }
                    directionsService.route(
                       {
                        origin: {'placeId': reise_til_id},
                        destination: {'placeId': reise_fra_id},
                        travelMode: travel_mode
                       }
                        , 
                    
                //Gir en melding tilbake om det er noe feil, og hva slags feil det er.
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


