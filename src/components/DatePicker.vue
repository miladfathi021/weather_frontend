<template>
  <div>
    <span class="text-gray-700 text-md ml-1">{{ label }}</span>
    <input
      ref="datepicker"
      type="date"
      class="w-full h-10 px-2 text-gray-400 border rounded-lg cursor-pointer flex items-center bg-gray-50"
      v-model="datepicker"
    />
  </div>
</template>

<script>
export default {
  name: "DatePicker",

  props: {
    label: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      showDatePicker: false,
      datepicker: "",
    };
  },

  watch: {
    datepicker(newValue) {
      return this.$emit("input", newValue);
    },
  },

  methods: {
    toggleDatePicker() {
      this.showDatePicker = !this.showDatePicker;
    },
  },
};
</script>

<style scoped>

</style>