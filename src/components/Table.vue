<template>
  <div>
    <table>
      <thead>
        <tr>
          <th v-for="(header, index) in headers" :key="index">
            <span>{{ header.label }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in rows"
          :key="index"
          :class="{
            'bg-red-500 text-white': row.temp >= 30,
            'bg-blue-500 text-white': row.temp < 4,
          }"
        >
          <td v-for="(header, index) in headers" :key="index">
            <span>{{ row[header.key] }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "CustomTable",
  props: {
    headers: {
      type: Array,
      require: true,
    },
    rows: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
table {
  @apply min-w-full;

  td,
  th {
    @apply p-4;
  }

  thead {
    tr {
      th {
        @apply text-sm bg-gray-200 text-gray-700;

        span {
          @apply font-bold text-gray-800;
        }

        &:first-child {
          @apply rounded-tl-lg;
        }

        &:last-child {
          @apply rounded-tr-lg;
        }
      }
    }
  }

  tbody {
    tr {
      @apply py-4 border;

      td {
        @apply text-center border-b;
      }
    }
  }
}
</style>