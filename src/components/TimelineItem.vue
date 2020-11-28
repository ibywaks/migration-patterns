<template>
  <div class="timeline-item" :class="{'sub-time': !hasNumbers}">
    <div class="timeline-circle">
      <div style="padding: 40px;">
        <h2>{{ date }}</h2>
        <p v-if="hasNumbers">{{ formattedNumberOfMigrants }} ({{ percentageOfPopulation }}% of pop.)</p>
      </div>
    </div>
    <div class="timeline-vertical"></div>
    <div>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimelineItem',
  props: {
    description: {
      type: String,
      default: () => ''
    },
    date: {
      type: Number,
      default: () => 0
    },
    numberOfImmigrants: {
      type: Number,
      default: () => 0
    },
    percentageOfPopulation: {
      type: Number,
      default: () => 0
    }
  },
  computed: {
    hasNumbers() {
      return !!this.numberOfImmigrants;
    },
    formattedNumberOfMigrants() {
      return this.displayNumbers(this.numberOfImmigrants);
    }
  },
  methods: {
    displayNumbers(value) {
      if (typeof value !== 'number') {
        return value;
      }
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
};
</script>

<style scoped>
  .timeline-item {
    text-align: center;
    width: 200px;
    margin: 0px 20px;
    display: inline-table;
  }
  .sub-time {
    top: 50px;
    position: relative;
  }
  .timeline-circle {
    background: lightgrey;
    border-radius: 50%;
    width: 200px;
    height: 200px;
  }
  .sub-time .timeline-circle {
    background: lightblue;
  }
  .timeline-vertical { 
    border-left: 6px dashed black; 
    height: 200px; 
    margin: 10px 100px;
  }
</style>