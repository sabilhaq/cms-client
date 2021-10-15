<template>
  <div class="line">
    <h1 class="text-center mb-5">Line Chart</h1>
    <LineChart
      v-if="state.isLoaded"
      :chartData="state.chartData"
      :chartOptions="state.chartOptions"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import LineChart from "../components/LineChart.vue";
import api from "../../services/api";

export default defineComponent({
  name: "Line",
  components: {
    LineChart,
  },
  data() {
    return {
      state: {
        isLoaded: false,
        chartData: {
          datasets: [],
          labels: [],
        },
        chartOptions: {
          responsive: true,
        },
      },
    };
  },

  mounted() {
    this.state.isLoaded = false;

    api
      .get("/datadate")
      .then((res) => {
        let datasets = [];
        let labels = [];
        let chartData = {};
        let obj = {
          label: "DataDate",
          data: [],
          borderColor: "#2E8BC0",
        };
        res.data.map((item) => {
          obj.data.push(item.frequency);
          labels.push(item.letter);
        });

        datasets.push(obj);

        chartData.datasets = datasets;
        chartData.labels = labels;

        this.state.chartData = chartData;
        this.state.isLoaded = true;
      })
      .catch((err) => console.log(err));
  },
});
</script>

<style scoped>
</style>
