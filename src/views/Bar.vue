<template>
  <div class="bar">
    <h1 class="text-center mb-5">Bar Chart</h1>
    <BarChart
      v-if="state.isLoaded"
      :chartData="state.chartData"
      :chartOptions="state.chartOptions"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import BarChart from "../components/BarChart.vue";
import api from "../../services/api";

export default defineComponent({
  name: "Bar",
  components: {
    BarChart,
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
    console.log(this.state);

    api
      .get("/data")
      .then((res) => {
        console.log(res.data);
        let datasets = [];
        let labels = [];
        let chartData = {};
        let obj = {
          label: "Data",
          data: [],
          backgroundColor: "#2E8BC0",
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
