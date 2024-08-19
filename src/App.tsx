import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import "./App.css";
import React from "react";

const App = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY!,
  });

  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      center: { lat: -25.15636926865387, lng: -53.85677086930864 }, //initialize map centered at fravins house
      zoom: 15,
    }
  );

  function dothisonclick() {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          console.log("I'm here");
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true);
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false);
    }
  }
  function handleLocationError(browserHasGeolocation: boolean) {
    console.log("erm so like you clicked no on geolocation");
  }

  return (
    <div className="App">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div id="map"> </div>
          <button onClick={dothisonclick}> Pressmee</button>
        </>
      )}
    </div>
  );
};

export default App;
