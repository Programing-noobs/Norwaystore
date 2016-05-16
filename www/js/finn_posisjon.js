function posisjon() 
      {
        var map = new google.maps.Map(document.getElementById('map'), 
        {
            //geolocation adress til hioa. startpunkt.
          center: {lat: 59.9295700, lng: 10.7355620},
          zoom: 19
        
        });

        var infoWindow = new google.maps.InfoWindow({map: map});
     
         if (navigator.geolocation) 
         {
             navigator.geolocation.getCurrentPosition(function(position)
             {
                    var pos = 
                            {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude
                            };
                                          
        
                            
                                
                infoWindow.setPosition(pos);
                infoWindow.setContent(' <strong>Du er her');
                
                map.setCenter(pos);
    
            }, 
             
             //feil håntering. hvis map ikke kan oppdateres seg.
            function() 
            {
                     handleLocationError(true, infoWindow, map.getCenter());
            });
            
        } 
        else 
            {
                // feilmeding for håndtering av browser
                handleLocationError(false, infoWindow, map.getCenter());
            }
          
       
        // lage en input søk box
        
        var input = document.getElementById('sok_input');
        var searchBox = new google.maps.places.SearchBox(input);
        
        // lage en listner til søke box skal koble til google api
        map.addListener('bounds_changed', function() 
        {
          searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        
        
        searchBox.addListener('places_changed', function() 
        {
          var places = searchBox.getPlaces();

          if (places.length == 0) 
          {
                return;
          }

          markers.forEach(function(marker) 
          {
                marker.setMap(null);
          });
          
           markers = [];

        // hent lokasjonen
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) 
          {
                var icon = 
                        {
                            //url: place.icon,
                            size: new google.maps.Size(71, 71),
                            origin: new google.maps.Point(0, 0),
                            anchor: new google.maps.Point(17, 34),
                            scaledSize: new google.maps.Size(25, 25)
                        
                        
                        };
          
                // Create det skal komme opp plasse navn og lokasjon
                
                markers.push(new google.maps.Marker(
                 {
                        map: map,
                        icon: icon,
                        title: place.name,
                        position: place.geometry.location 
                        
                
                }));
          
        if (place.geometry.viewport) 
            {
              bounds.union(place.geometry.viewport);
            } 
            
        else 
            {
              bounds.extend(place.geometry.location);
            }
          
            });
                   map.fitBounds(bounds);
            });
        }
        
        //feilmelding for håndtere når browser ikke funker.
      function handleLocationError(browserHasGeolocation, infoWindow, pos) 
      {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                        'Error: Geolocation service funke ikke' :
                        'Error: Geolocation støtte ikke denne browser');
      }


   
    

