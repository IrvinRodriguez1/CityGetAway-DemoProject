
          mapboxgl.accessToken =
            'pk.eyJ1IjoiaXJ2aW5zMTciLCJhIjoiY2t2b3J4MGRyMGxlejJucXZ2a3p6M2NxeiJ9.TKQibbTv-zrwALpHBxJAIA';
          const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [<%= vacationID.geometry.coordinates %>], // starting position [lng, lat]
            zoom: 9 // starting zoom
          });

          // Create a new marker.
          const marker = new mapboxgl.Marker()
          .setLngLat([<%= vacationID.geometry.coordinates %>])
          .addTo(map);
  