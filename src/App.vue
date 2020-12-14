<template>
  <timeline></timeline>

  <country-map></country-map>
</template>

<script>
import Timeline from './components/Timeline';
import CountryMap from './components/CountryMap';

export default {
  name: 'App',
  components: {
    Timeline,
    CountryMap
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}

div.tooltip {   
  position: absolute;           
  text-align: center;
  /* visibility: hidden; */
  bottom: -350px;
  width: 110px;                  
  height: 28px;                 
  padding: 2px;             
  font: 12px sans-serif;        
  background: #8fb3de;   
  border: 0px;      
  border-radius: 8px;           
  pointer-events: none;         
}

#flag-uk {
    background-position: -325px -120px;
}
</style>
