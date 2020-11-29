<template>
  <div class="container">
    <h2 class="text-center">immigration timelines</h2>
    <section class="timelines">
      <flickity ref="flickity" :options="flickityOptions">
        <timeline-item
          v-for="timeline in visibleTimelines"
          :key="timeline.date"
          :date="timeline.date"
          :description="timeline.description"
          :numberOfImmigrants="timeline.numberOfImmigrants"
          :percentageOfPopulation="timeline.percentageOfPopulation"
        ></timeline-item>
      </flickity>
    </section>
    <div class="buttons-container text-center" @mouseenter="pauseCarousel()">
      <button @click="moveLeft()">Move Left</button>
      <button @click="moveRight()">Move Right</button>
    </div>
  </div>
</template>

<script>
// import * as d3 from 'd3';
import Flickity from "vue-flickity";
import TimelineItem from "./TimelineItem";

export default {
  name: "TimeLine",
  components: {
    TimelineItem,
    Flickity,
  },
  data() {
    return {
      flickityOptions: {
        initialIndex: 2,
        prevNextButtons: false,
        pageDots: false,
        wrapAround: false,
        autoplay: 400,
        selectedAttraction: 0.005,
        friction: 0.15,
      },
      numberShown: 5,
      showStart: 0,
      timelines: [
        {
          description:
            "Aliens of African nativity became eligible for citizenship",
          date: 1870,
          numberOfImmigrants: 5567200,
          percentageOfPopulation: 14.4,
        },
        {
          description:
            "The first exclusionary act. The page act, banning criminals, prostitues and chineese crontract labourers from entry",
          date: 1875,
        },
        {
          description: "",
          date: 1880,
          numberOfImmigrants: 6679900,
          percentageOfPopulation: 13.3,
        },
        {
          description: "Ammendments to the Chineese exclusionary acts",
          date: 1888,
        },
        {
          description: "",
          date: 1890,
          numberOfImmigrants: 9249500,
          percentageOfPopulation: 14.8,
        },
        {
          description: "The bureau of immigration was established",
          date: 1891,
        },
        {
          description:
            "Aliens of African nativity became eligible for citizenship",
          date: 1900,
          numberOfImmigrants: 10341300,
          percentageOfPopulation: 13.6,
        },
        {
          description: "",
          date: 2000,
          numberOfImmigrants: 31107900,
          percentageOfPopulation: 11.1,
        },
      ],
    };
  },
  computed: {
    timelineSize() {
      return this.timelines.length;
    },
    visibleTimelines() {
      return this.timelines.slice(this.showStart, this.numberShown);
    },
  },
  methods: {
    moveLeft() {
      this.$refs.flickity.previous();
    },
    moveRight() {
      this.$refs.flickity.next();
    },
    pauseCarousel() {
      this.$refs.flickity.pausePlayer();
    },
  },
  mounted() {
    this.$refs.flickity.playPlayer();
  },
  // created() {
  //   d3.selectAll('.timeline-item')
  // }
};
</script>

<style scoped>
.container {
  width: 90%;
  margin: 5em auto;
}
.timelines {
  border: 5px solid #ccc;
  padding: 2em 0;
  box-shadow: 20px 38px 34px -26px hsla(0, 0%, 0%, 0.2);
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  background: #f7f5f5;
}
.text-center {
  text-align: center;
}
</style>