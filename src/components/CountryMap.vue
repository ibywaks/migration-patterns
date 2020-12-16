<template>
  <div ref="mapContainer" class="container">
    <h2 class="text-center">Immigration Travel Path (into the U.S.)</h2>
    <section class="timelines">
      <div ref="myGraph"></div>
    </section>
  </div>
</template>

<script>
import * as d3 from 'd3';
import { kebabCase } from 'lodash';

const countryFixtures = require('../fixtures/country-map.json');

export default {
  name: "CountryMap",
  data () {
    return {}
  },
  mounted() {
    this.paintNetwork();
  },
  methods: {
    paintNetwork() {
      // set the dimensions and margins of the graph
      const margin = {top: 10, right: 30, bottom: 30, left: 40};
      const width = 1000 - margin.left - margin.right;
      const height = 800 - margin.top - margin.bottom;

      // append the svg object to the body of the page
      // const flagDiv = d3.select(this.$refs.myGraph).append("div").attr("class","flags");
      const svg = d3.select(this.$refs.myGraph)
          .append('svg').attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
        .append('g')
          .attr('stroke', 'black')
          .attr('stroke-width', 5)
          .attr('transform', `translate(${margin.left}, ${margin.top})`);

      const tooltip = d3.select("body").append("div")
        .attr("class","tooltip")
        .style("opacity",0);

        // Initialize the links
      const data = countryFixtures;
      const arrowPoints = [[0, 0], [0, 20], [20, 10]];

      svg.append("defs").append("marker")
        .attr("id", "arrow")
        .attr('viewBox', [0, 0, 10, 10])
        .attr("refX", 5)
        .attr("refY", 5)
        .attr("markerWidth", 10)
        .attr("markerHeight", 10)
        .attr('orient', 'auto-start-reverse')
        .append("path")
        .attr('d', d3.line()(arrowPoints))
        .style("fill", "black");

      const link = svg.selectAll('line')
        .data(data.links)
        .enter()
        .append('line')
        .style('stroke', (d) => {
          if (d.type === 'high') return '#1a75ff';
          if (d.type === 'low') return '#ff8080';
          return '#aaa'; 
        })
        // .attr("class", () => "arrow")
        // .attr("marker-end", "url(#arrow)")
        .attr("id",(d,i)=>{ return "link"+i; });

      const imgClassCode = function(d){ return "flag-" + kebabCase(d.name); }
      const baseImageUrl = function(d){
        return `https://www.countries-ofthe-world.com/flags-normal/flag-of-${(d.flagName || d.name).replaceAll(' ', '-')}.png`; 
      }

      // eslint-disable-next-line no-unused-vars
      const imgPattern = svg.selectAll("pattern").data(data.nodes)
        .enter()
        .append("pattern")
            .attr("id", imgClassCode)
            .attr("width", 1)
            .attr("height", 1)
            .attr("patternUnits", "objectBoundingBox")
          .append("image")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 80)
            .attr("height", 80)
            .attr("xlink:href", baseImageUrl)

      // Initialize the nodes
      const node = svg.selectAll('circle')
        .data(data.nodes)
        .enter()
        .append('circle')
        .attr('r', (d) => {
          let radius  = 25
          const { population } = d;

          if (population < 25000) return radius;

          if (population > 25000 && population < 1000000) {
            radius = population/1000;

            return radius < 35 ? radius : 35
          }

          // over 1 million
          radius = population / 10000
          return radius < 45 ? radius : 45
        })
        // .style("fill", "#69b3a2")
        .style('fill', (d) => {
            return `url(#flag-${kebabCase(d.name)})`
        })
        // .style("stroke", color)
        .on("mouseover",(d, item)=>{
            tooltip.transition().duration(400).style("opacity",0.9);
            tooltip.html(item.name)
            .style("left", (d.pageX+15) + "px")
            .style("top", (d.pageY+5) + "px");	
          })
        .on("mouseout",()=>{ tooltip.transition().duration(600).style("opacity",0); });


      // Simulations - list the force you want to apply on the network
      const simulation = d3.forceSimulation(data.nodes)
        .force('link', d3.forceLink().distance(() => 150)
          .id(function(d) { return d.id })
          .links(data.links)
        )
        .force("charge", d3.forceManyBody().strength(-400))         // This adds repulsion between nodes. Play with the -400 for the repulsion strength
        .force("center", d3.forceCenter(width / 2, height / 2));     // This force attracts nodes to the center of the svg area
        
        simulation.on("end", ticked);

        // console.log('Simulation', simulation);
        // This function is run at each iteration of the force algorithm, updating the nodes position.
        function ticked() {
          link
              .attr("x1", function(d) { return d.source.x; })
              .attr("y1", function(d) { return d.source.y; })
              .attr("x2", function(d) { return d.target.x; })
              .attr("y2", function(d) { return d.target.y; });

          node
              .attr("cx", function (d) { return d.x+6; })
              .attr("cy", function(d) { return d.y-6; });
        }
    }
  }
}
</script>

<style scoped>
.container {
  width: 90%;
  margin: 5em auto;
}
.text-center {
  text-align: center;
}

.timelines {
  border: 5px solid #ccc;
  text-align: center;
  padding: 2em 0;
  box-shadow: 20px 38px 34px -26px hsla(0, 0%, 0%, 0.2);
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  background: #f7f5f5;
}
</style>
