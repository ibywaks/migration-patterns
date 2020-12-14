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
// import {event as currentEvent} from 'd3-selection';

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

      const link = svg.selectAll('line')
        .data(data.links)
        .enter()
        .append('line')
        .style('stroke', (d) => {
          if (d.type === 'high') return '#1a75ff';
          if (d.type === 'low') return '#ff8080';
          return '#aaa'; 
        })
        .attr("id",(d,i)=>{ return "link"+i; });

      // const imgClassCode = function(d){ return "flag-" + d.code; }
      // const imgUrl = function(d){ return "url(.flag.flag-" + d.code + ")" }
      // const baseImageUrl = function(){ return "http://i1067.photobucket.com/albums/u434/josh5231/flags_zpskmzyrpsk.png"; }

      // eslint-disable-next-line no-unused-vars
      // const imgPattern = svg.selectAll("pattern").data(data.nodes)
      //   .enter()
      //   .append("pattern")
      //       .attr("class", imgClassCode)
      //       .attr("width", 1)
      //       .attr("height", 1)
      //       .attr("patternUnits", "objectBoundingBox")
      //     .append("image")
      //       .attr("x", 0)
      //       .attr("y", 0)
      //       .attr("width", 150)
      //       .attr("height", 150)
      //       .attr("xlink:href", baseImageUrl)

      // Initialize the nodes
      const node = svg.selectAll('circle')
        .data(data.nodes)
        .enter()
        .append('circle')
        .attr('r', 25)
        .style("fill", "#69b3a2")
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
        .force('link', d3.forceLink()
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

.flag {
  background-image: url('http://i1067.photobucket.com/albums/u434/josh5231/flags_zpskmzyrpsk.png');
  position: absolute;
  width: 25px;
  height: 15px;
  border:1px solid black;
}

.flag.flag-ad {
    background-position: 0 0;
}

.flag.flag-pa {
    background-position: -100px -150px;
}

.flag.flag-za {
    background-position: -275px -210px;
}

.flag.flag-fj {
    background-position: 0 -60px;
}

.flag.flag-cf {
    background-position: -75px -30px;
}

.flag.flag-vc {
    background-position: -25px -210px;
}

.flag.flag-tf {
    background-position: -300px -180px;
}

.flag.flag-do {
    background-position: -125px -45px;
}

.flag.flag-ls {
    background-position: -300px -105px;
}

.flag.flag-lb {
    background-position: -175px -105px;
}

.flag.flag-mo {
    background-position: -275px -120px;
}

.flag.flag-an {
    background-position: -175px 0;
}

.flag.flag-gl {
    background-position: -325px -60px;
}

.flag.flag-lc {
    background-position: -200px -105px;
}

.flag.flag-mx {
    background-position: -100px -135px;
}

.flag.flag-si {
    background-position: -375px -165px;
}

.flag.flag-gn {
    background-position: -375px -60px;
}

.flag.flag-rw {
    background-position: -175px -165px;
}

.flag.flag-om {
    background-position: -75px -150px;
}

.flag.flag-cn {
    background-position: -250px -30px;
}

.flag.flag-af {
    background-position: -50px 0;
}

.flag.flag-ma {
    background-position: -25px -120px;
}

.flag.flag-bj {
    background-position: -150px -15px;
}

.flag.flag-fr {
    background-position: -100px -60px;
}

.flag.flag-jp {
    background-position: -250px -90px;
}

.flag.flag-tr {
    background-position: -125px -195px;
}

.flag.flag-ve {
    background-position: -50px -210px;
}

.flag.flag-cg {
    background-position: -100px -30px;
}

.flag.flag-mk {
    background-position: -175px -120px;
}

.flag.flag-gd {
    background-position: -175px -60px;
}

.flag.flag-ca {
    background-position: -25px -30px;
}

.flag.flag-pf {
    background-position: -150px -150px;
}

.flag.flag-am {
    background-position: -150px 0;
}

.flag.flag-yt {
    background-position: -250px -210px;
}

.flag.flag-gr {
    background-position: -50px -75px;
}

.flag.flag-mc {
    background-position: -50px -120px;
}

.flag.flag-ch {
    background-position: -125px -30px;
}

.flag.flag-mz {
    background-position: -150px -135px;
}

.flag.flag-gu {
    background-position: -125px -75px;
}

.flag.flag-no {
    background-position: -350px -135px;
}

.flag.flag-co {
    background-position: -275px -30px;
}

.flag.flag-md {
    background-position: -75px -120px;
}

.flag.flag-vi {
    background-position: -100px -210px;
}

.flag.flag-cu {
    background-position: -325px -30px;
}

.flag.flag-as {
    background-position: -250px 0;
}

.flag.flag-mq {
    background-position: -325px -120px;
}

.flag.flag-au {
    background-position: -300px 0;
}

.flag.flag-bf {
    background-position: -75px -15px;
}

.flag.flag-ag {
    background-position: -75px 0;
}

.flag.flag-sa {
    background-position: -200px -165px;
}

.flag.flag-ir {
    background-position: -100px -90px;
}

.flag.flag-ps {
    background-position: -350px -150px;
}

.flag.flag-km {
    background-position: -375px -90px;
}

.flag.flag-np {
    background-position: -375px -135px;
}

.flag.flag-mr {
    background-position: -350px -120px;
}

.flag.flag-tw {
    background-position: -200px -195px;
}

.flag.flag-pn {
    background-position: -300px -150px;
}

.flag.flag-kp {
    background-position: -25px -105px;
}

.flag.flag-so {
    background-position: -100px -180px;
}

.flag.flag-ae {
    background-position: -25px 0;
}

.flag.flag-by {
    background-position: -375px -15px;
}

.flag.flag-sn {
    background-position: -75px -180px;
}

.flag.flag-uy {
    background-position: -350px -195px;
}

.flag.flag-lr {
    background-position: -275px -105px;
}

.flag.flag-ye {
    background-position: -225px -210px;
}

.flag.flag-lu {
    background-position: -350px -105px;
}

.flag.flag-nz {
    background-position: -50px -150px;
}

.flag.flag-um {
    background-position: -300px -195px;
}

.flag.flag-tj {
    background-position: -375px -180px;
}

.flag.flag-rs {
    background-position: -125px -165px;
}

.flag.flag-sg {
    background-position: -325px -165px;
}

.flag.flag-br {
    background-position: -250px -15px;
}

.flag.flag-ru {
    background-position: -150px -165px;
}

.flag.flag-al {
    background-position: -125px 0;
}

.flag.flag-tm {
    background-position: -50px -195px;
}

.flag.flag-eh {
    background-position: -250px -45px;
}

.flag.flag-nf {
    background-position: -250px -135px;
}

.flag.flag-hr {
    background-position: -275px -75px;
}

.flag.flag-ws {
    background-position: -200px -210px;
}

.flag.flag-mm {
    background-position: -225px -120px;
}

.flag.flag-vg {
    background-position: -75px -210px;
}

.flag.flag-sv {
    background-position: -175px -180px;
}

.flag.flag-fo {
    background-position: -75px -60px;
}

.flag.flag-nl {
    background-position: -325px -135px;
}

.flag.flag-bw {
    background-position: -350px -15px;
}

.flag.flag-ga {
    background-position: -125px -60px;
}

.flag.flag-ng {
    background-position: -275px -135px;
}

.flag.flag-pt {
    background-position: -375px -150px;
}

.flag.flag-kh {
    background-position: -325px -90px;
}

.flag.flag-sb {
    background-position: -225px -165px;
}

.flag.flag-aw {
    background-position: -325px 0;
}

.flag.flag-tc {
    background-position: -250px -180px;
}

.flag.flag-gh {
    background-position: -275px -60px;
}

.flag.flag-de {
    background-position: -25px -45px;
}

.flag.flag-ci {
    background-position: -150px -30px;
}

.flag.flag-ck {
    background-position: -175px -30px;
}

.flag.flag-id {
    background-position: -350px -75px;
}

.flag.flag-wf {
    background-position: -175px -210px;
}

.flag.flag-fi {
    background-position: -375px -45px;
}

.flag.flag-cm {
    background-position: -225px -30px;
}

.flag.flag-kz {
    background-position: -125px -105px;
}

.flag.flag-sd {
    background-position: -275px -165px;
}

.flag.flag-tk {
    background-position: 0 -195px;
}

.flag.flag-ne {
    background-position: -225px -135px;
}

.flag.flag-gw {
    background-position: -150px -75px;
}

.flag.flag-th {
    background-position: -350px -180px;
}

.flag.flag-at {
    background-position: -275px 0;
}

.flag.flag-bv {
    background-position: -325px -15px;
}

.flag.flag-pe {
    background-position: -125px -150px;
}

.flag.flag-gt {
    background-position: -100px -75px;
}

.flag.flag-gm {
    background-position: -350px -60px;
}

.flag.flag-jo {
    background-position: -225px -90px;
}

.flag.flag-re {
    background-position: -75px -165px;
}

.flag.flag-bb {
    background-position: 0 -15px;
}

.flag.flag-ec {
    background-position: -175px -45px;
}

.flag.flag-kw {
    background-position: -75px -105px;
}

.flag.flag-mp {
    background-position: -300px -120px;
}

.flag.flag-my {
    background-position: -125px -135px;
}

.flag.flag-es {
    background-position: -300px -45px;
}

.flag.flag-mh {
    background-position: -150px -120px;
}

.flag.flag-pk {
    background-position: -225px -150px;
}

.flag.flag-tl {
    background-position: -25px -195px;
}

.flag.flag-pl {
    background-position: -250px -150px;
}

.flag.flag-gs {
    background-position: -75px -75px;
}

.flag.flag-bh {
    background-position: -125px -15px;
}

.flag.flag-mn {
    background-position: -250px -120px;
}

.flag.flag-is {
    background-position: -125px -90px;
}

.flag.flag-ms {
    background-position: -375px -120px;
}

.flag.flag-je {
    background-position: -175px -90px;
}

.flag.flag-ai {
    background-position: -100px 0;
}

.flag.flag-se {
    background-position: -300px -165px;
}

.flag.flag-az {
    background-position: -350px 0;
}

.flag.flag-qa {
    background-position: -50px -165px;
}

.flag.flag-sz {
    background-position: -225px -180px;
}

.flag.flag-hm {
    background-position: -225px -75px;
}

.flag.flag-tn {
    background-position: -75px -195px;
}

.flag.flag-py {
    background-position: -25px -165px;
}

.flag.flag-us {
    background-position: -325px -195px;
}

.flag.flag-ge {
    background-position: -200px -60px;
}

.flag.flag-jm {
    background-position: -200px -90px;
}

.flag.flag-ar {
    background-position: -225px 0;
}

.flag.flag-sc {
    background-position: -250px -165px;
}

.flag.flag-be {
    background-position: -50px -15px;
}

.flag.flag-hu {
    background-position: -325px -75px;
}

.flag.flag-pw {
    background-position: 0 -165px;
}

.flag.flag-uz {
    background-position: -375px -195px;
}

.flag.flag-ao {
    background-position: -200px 0;
}

.flag.flag-ph {
    background-position: -200px -150px;
}

.flag.flag-lv {
    background-position: -375px -105px;
}

.flag.flag-to {
    background-position: -100px -195px;
}

.flag.flag-et {
    background-position: -325px -45px;
}

.flag.flag-ki {
    background-position: -350px -90px;
}

.flag.flag-bn {
    background-position: -200px -15px;
}

.flag.flag-ba {
    background-position: -375px 0;
}

.flag.flag-fm {
    background-position: -50px -60px;
}

.flag.flag-bd {
    background-position: -25px -15px;
}

.flag.flag-io {
    background-position: -50px -90px;
}

.flag.flag-kg {
    background-position: -300px -90px;
}

.flag.flag-pg {
    background-position: -175px -150px;
}

.flag.flag-mt {
    background-position: 0 -135px;
}

.flag.flag-ni {
    background-position: -300px -135px;
}

.flag.flag-sl {
    background-position: -25px -180px;
}

.flag.flag-gg {
    background-position: -250px -60px;
}

.flag.flag-eg {
    background-position: -225px -45px;
}

.flag.flag-tg {
    background-position: -325px -180px;
}

.flag.flag-mu {
    background-position: -25px -135px;
}

.flag.flag-bs {
    background-position: -275px -15px;
}

.flag.flag-dm {
    background-position: -100px -45px;
}

.flag.flag-ke {
    background-position: -275px -90px;
}

.flag.flag-cv {
    background-position: -350px -30px;
}

.flag.flag-st {
    background-position: -150px -180px;
}

.flag.flag-bm {
    background-position: -175px -15px;
}

.flag.flag-sm {
    background-position: -50px -180px;
}

.flag.flag-tv {
    background-position: -175px -195px;
}

.flag.flag-tz {
    background-position: -225px -195px;
}

.flag.flag-zw {
    background-position: -325px -210px;
}

.flag.flag-pm {
    background-position: -275px -150px;
}

.flag.flag-bg {
    background-position: -100px -15px;
}

.flag.flag-me {
    background-position: -100px -120px;
}

.flag.flag-ht {
    background-position: -300px -75px;
}

.flag.flag-dz {
    background-position: -150px -45px;
}

.flag.flag-bo {
    background-position: -225px -15px;
}

.flag.flag-dj {
    background-position: -50px -45px;
}

.flag.flag-mg {
    background-position: -125px -120px;
}

.flag.flag-ee {
    background-position: -200px -45px;
}

.flag.flag-ua {
    background-position: -250px -195px;
}

.flag.flag-gi {
    background-position: -300px -60px;
}

.flag.flag-td {
    background-position: -275px -180px;
}

.flag.flag-ky {
    background-position: -100px -105px;
}

.flag.flag-sy {
    background-position: -200px -180px;
}

.flag.flag-vn {
    background-position: -125px -210px;
}

.flag.flag-cr {
    background-position: -300px -30px;
}

.flag.flag-kr {
    background-position: -50px -105px;
}

.flag.flag-in {
    background-position: -25px -90px;
}

.flag.flag-hn {
    background-position: -250px -75px;
}

.flag.flag-zm {
    background-position: -300px -210px;
}

.flag.flag-tt {
    background-position: -150px -195px;
}

.flag.flag-ro {
    background-position: -100px -165px;
}

.flag.flag-lt {
    background-position: -325px -105px;
}

.flag.flag-it {
    background-position: -150px -90px;
}

.flag.flag-cl {
    background-position: -200px -30px;
}

.flag.flag-na {
    background-position: -175px -135px;
}

.flag.flag-gp {
    background-position: 0 -75px;
}

.flag.flag-pr {
    background-position: -325px -150px;
}

.flag.flag-gq {
    background-position: -25px -75px;
}

.flag.flag-sh {
    background-position: -350px -165px;
}

.flag.flag-gy {
    background-position: -175px -75px;
}

.flag.flag-cy {
    background-position: -375px -30px;
}

.flag.flag-ly {
    background-position: 0 -120px;
}

.flag.flag-lk {
    background-position: -250px -105px;
}

.flag.flag-mv {
    background-position: -50px -135px;
}

.flag.flag-ug {
    background-position: -275px -195px;
}

.flag.flag-eu {
    background-position: -350px -45px;
}

.flag.flag-kn {
    background-position: 0 -105px;
}

.flag.flag-nu {
    background-position: -25px -150px;
}

.flag.flag-va {
    background-position: 0 -210px;
}

.flag.flag-hk {
    background-position: -200px -75px;
}

.flag.flag-cd {
    background-position: -50px -30px;
}

.flag.flag-gb {
    background-position: -150px -60px;
}

.flag.flag-bt {
    background-position: -300px -15px;
}

.flag.flag-mw {
    background-position: -75px -135px;
}

.flag.flag-fk {
    background-position: -25px -60px;
}

.flag.flag-ie {
    background-position: -375px -75px;
}

.flag.flag-il {
    background-position: 0 -90px;
}

.flag.flag-er {
    background-position: -275px -45px;
}

.flag.flag-vu {
    background-position: -150px -210px;
}

.flag.flag-iq {
    background-position: -75px -90px;
}

.flag.flag-gf {
    background-position: -225px -60px;
}

.flag.flag-bz {
    background-position: 0 -30px;
}

.flag.flag-la {
    background-position: -150px -105px;
}

.flag.flag-cz {
    background-position: 0 -45px;
}

.flag.flag-nr {
    background-position: 0 -150px;
}

.flag.flag-sr {
    background-position: -125px -180px;
}

.flag.flag-sk {
    background-position: 0 -180px;
}

.flag.flag-ml {
    background-position: -200px -120px;
}

.flag.flag-dk {
    background-position: -75px -45px;
}

.flag.flag-li {
    background-position: -225px -105px;
}

.flag.flag-nc {
    background-position: -200px -135px;
}
</style>