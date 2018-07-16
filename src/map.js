import React, { Component } from "react";
import MapGL from "react-map-gl";
import ScatterplotOverlay from "./ScatterplotOverlay";

import "mapbox-gl/dist/mapbox-gl.css";
import markerIcon from "./map-marker-icon-300x300.png";

const TOKEN =
  "pk.eyJ1IjoiYWRhbWdpYWNvbWVsbGkiLCJhIjoiY2pqbzFpdm45MnhkNTNrcXM3Y2NqbjBzbyJ9.c9Yx9BnSeE51_TIIL94GDQ";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 38,
        longitude: -77,
        zoom: 9,
        bearing: 0,
        pitch: 0,
        width: window.innerWidth,
        height: window.innerHeight
      },
      markers: [{ lat: -77, lng: 38 }]
    };

    setInterval(this.updateMarkers, 200);
  }

  updateMarkers = () => {
    const markers = [];
    const ratio = 0.5;
    for (let i = 0; i < 35000; i++) {
      const rand1 = 38 + Math.random() * ratio;
      const rand2 = -77 + Math.random() * ratio;
      markers.push({
        lng: rand1,
        lat: rand2
      });
    }
    this.setState({ markers });
  };

  render() {
    const { viewport } = this.state;

    return (
      <MapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onViewportChange={v => this.setState({ viewport: v })}
        mapboxApiAccessToken={TOKEN}
      >
        <ScatterplotOverlay
          key="scatterplot"
          locations={this.state.markers}
          dotRadius={viewport.zoom}
          globalOpacity={0.8}
          compositeOperation="lighter"
          dotFill="#00a8fe"
          renderWhileDragging={true}
        />
      </MapGL>
    );
  }
}

export default Map;
