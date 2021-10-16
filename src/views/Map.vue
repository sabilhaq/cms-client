<template>
  <div id="root-app" style="width: 100%; height: 100vh">
    <google-map
      :config="mapConfig"
      apikey="AIzaSyClxgH2RjmNsnkFMCzhjxFP0Xpbjif7-TA"
      :markers="mapMarkers"
    >
    </google-map>
  </div>
</template>

<script>
import GoogleMap from "./gmap/GoogleMap";
import api from "../../services/api";

export default {
  components: {
    GoogleMap,
  },
  data() {
    return {
      mapConfig: {
        zoom: 17,
        center: {
          lat: -6.924703,
          lng: 107.63646,
        },
      },
      mapMarkers: [],
    };
  },

  mounted() {
    this.loadData();
  },

  methods: {
    loadData() {
      api
        .get("/maps")
        .then((res) => {
          console.log(res.data);
          this.mapMarkers = res.data;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
}
</style>