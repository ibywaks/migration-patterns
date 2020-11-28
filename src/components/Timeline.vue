<template>
  <div>
    <transition-group name="migration" tag="div">
      <timeline-item v-for="timeline in visibleTimelines"
        :key="timeline.date"
        :date="timeline.date"
        :description="timeline.description"
        :numberOfImmigrants="timeline.numberOfImmigrants"
        :percentageOfPopulation="timeline.percentageOfPopulation"
      ></timeline-item>
    </transition-group>
  </div>
  <div>
    <button :disabled="showStart <= 0" @click="moveLeft()">Move Left</button>
    <button :disabled="showStart >= timelineSize" @click="moveRight()">Move Right</button>
  </div>
</template>

<script>
// import * as d3 from 'd3';
import TimelineItem from './TimelineItem';

export default {
  name: 'TimeLine',
  components: {TimelineItem},
  data() {
    return {
      numberShown: 5,
      showStart: 0,
      timelines: [{
        description: 'Aliens of African nativity became eligible for citizenship',
        date: 1870,
        numberOfImmigrants: 5567200,
        percentageOfPopulation: 14.4
      },{
        description: 'The first exclusionary act. The page act, banning criminals, prostitues and chineese crontract labourers from entry',
        date: 1875
      },{
        description: '',
        date: 1880,
        numberOfImmigrants: 6679900,
        percentageOfPopulation: 13.3
      },{
        description: 'Ammendments to the Chineese exclusionary acts',
        date: 1888
      },{
        description: '',
        date: 1890,
        numberOfImmigrants: 9249500,
        percentageOfPopulation: 14.8
      },{
        description: 'The bureau of immigration was established',
        date: 1891
      },{
        description: 'Aliens of African nativity became eligible for citizenship',
        date: 1900,
        numberOfImmigrants: 10341300,
        percentageOfPopulation: 13.6
      },{
        description: '',
        date: 2000,
        numberOfImmigrants: 31107900,
        percentageOfPopulation: 11.1
      },]
    };
  },
  computed: {
    timelineSize() {
      return this.timelines.length;
    },
    visibleTimelines() {
      return this.timelines.slice(this.showStart, this.numberShown)
    }
  },
  methods: {
    moveLeft() {
      this.showStart -= 1;
    },
    moveRight() {
      this.showStart += 1;
    }
  },
  // created() {
  //   d3.selectAll('.timeline-item')
  // }
};
</script>