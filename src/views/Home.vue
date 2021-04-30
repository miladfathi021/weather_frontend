<template>
  <div class="h-screen bg-white">
    <div class="w-3/4 pt-16 mx-auto">
      <div class="ml-4 flex items-center">
        <div class="mb-6 w-1/4 mr-4">
          <selectBox
            :label="'Filter By Name'"
            :options="currentWeatherListBox"
            v-model="filterByName"
          />
        </div>
        <div class="mb-6 w-1/4">
          <DatePicker
              :label="'Filter By Date'"
              v-model="filterByDate"
          />
        </div>
      </div>
      <custom-table :headers="headers" :rows="getCurrentWeather" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CustomTable from "@/components/Table.vue";
import SelectBox from "@/components/SelectBox.vue";
import _ from "lodash";
import DatePicker from "@/components/DatePicker.vue";

export default Vue.extend({
  name: "Home",
  components: { DatePicker, SelectBox, CustomTable },
  data() {
    return {
      filterByName: null,
      filterByDate: null,
      intervalId: null,
      headers: [
        { key: "city_name", label: "City name" },
        { key: "wind_speed", label: "Wind speed" },
        { key: "humidity", label: "Humidity" },
        { key: "pressure", label: "Pressure" },
        { key: "temp", label: "Temp" },
        { key: "temp_min", label: "Temp min" },
        { key: "temp_max", label: "Temp max" },
        { key: "lon", label: "Lon" },
        { key: "lat", label: "Lat" },
        { key: "description", label: "Description" },
      ],
    };
  },

  created() {
    this.$store.dispatch("current/setWeather").then(() => {
      this.$store.dispatch("current/getAll");
    });
    this.intervalId = setInterval(this.setWeather, 2 * 60 * 1000);
  },

  computed: {
    currentWeatherListBox() {
      return this.$store.state.current.all;
    },
    getCurrentWeather() {
      let data = (this.$store.state.current.all || []).map((item) => {
        item.temp = Math.round(item.temp);
        item.created_at = item.created_at.split("T")[0];
        return item;
      });

      return this.filterData(data);
    },
  },

  methods: {
    filterData(data) {
      const byName = this.filterByName;
      const byDate = this.filterByDate;

      return _.filter(data, function (query) {
        const name = byName ? byName === query.city_name : true;
        const date = byDate ? byDate === query.created_at : true;

        return name && date;
      });
    },
    setWeather() {
      this.$store.dispatch("current/setWeather").then(() => {
        this.$store.dispatch("current/getAll");
      });
    },
  },

  beforeDestroy() {
    clearInterval(this.intervalId);
  },
});
</script>
