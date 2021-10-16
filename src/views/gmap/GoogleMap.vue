<template>
  <div id="map">
    <!-- suspend mount children until google or map value is valid. -->
    <template v-if="this.google && this.map">
    </template>
  </div>
</template>
<script>
import GoogleMapsApiLoader from "google-maps-api-loader";

export default {
  props: {
    config: Object,
    apikey: String,
    markers: Array,
  },
  data() {
    return {
      google: null,
      map: null,
    };
  },
  mounted() {
    GoogleMapsApiLoader({
      apiKey: this.apikey,
    }).then((google) => {
      this.google = google;
      this.initMap();
    });
  },
  methods: {
    initMap() {
      const mapContainer = this.$el;
      const { Map } = this.google.maps;
      this.map = new Map(mapContainer, this.config);
      this.drawMarkers();
    },

    drawMarkers() {
      this.markers.forEach((marker) => {
        const { Marker, LatLng } = this.google.maps;
        var mapMarker = new Marker({
          title: marker.title,
          position: new LatLng(marker.lat, marker.lng),
          map: this.map,
        });

        var contentString = `
          <h3>${marker.title}</h3>
          <p>this is marker for ${marker.title}</p>
        `;

        const { InfoWindow } = this.google.maps;
        var infoWindow = new InfoWindow({
          content: contentString,
          position: new LatLng(marker.lat, marker.lng),
        });

        mapMarker.addListener("click", function () {
          infoWindow.open(this.map, mapMarker);
        });
      });
    },
  },
};
</script>

<style>
#map {
  height: 100vh;
  width: 100%;
}
</style>