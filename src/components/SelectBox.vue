<template>
  <div class="relative">
    <span class="text-gray-700 text-md ml-1">{{ label }}</span>
    <div
      class="w-full h-10 border rounded-lg cursor-pointer flex items-center bg-gray-50"
      @click="toggleDropdown"
    >
      <span class="text-gray-400 pl-4" v-if="!selectValue">Select</span>
      <span class="text-gray-800 pl-4" v-else>{{ selectValue }}</span>
      <span
        class="text-gray-400 block mr-2 ml-auto p-2"
        @click="clear"
        v-if="selectValue"
      >
        {{ "x" }}
      </span>
    </div>
    <div
      class="bg-white border absolute w-full px-2 py-4 rounded-lg z-10 left-0 right-0 mt-1"
      v-if="dropdown"
    >
      <ul v-if="options.length > 0">
        <li
          v-for="(value, index) in lists"
          :key="index"
          @click="select(value)"
          class="w-full mb-2 py-2 pl-1 cursor-pointer"
          :class="{
            'rounded-2xl bg-blue-100 text-blue-400': value === selectValue,
          }"
        >
          {{ value }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectBox",
  props: {
    label: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      selectValue: null,
      dropdown: false,
    };
  },

  computed: {
    lists() {
      return [...new Set(this.options.map(item => item.city_name))]
    },
  },

  methods: {
    toggleDropdown() {
      this.dropdown = !this.dropdown;
    },

    onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    },

    select(value) {
      this.selectValue = value;
      this.dropdown = false;
      return this.$emit("input", value);
    },

    clear() {
      this.selectValue = null;
      return this.$emit("input", "");
    },
  },
};
</script>

<style scoped>

</style>