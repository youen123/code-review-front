<template>
   <el-container>
     <NavBar/>
     <router-view></router-view>
   </el-container>
</template>

<script>
import NavBar from '@/components/NavBar'
export default {
  name: 'Home',
  components: { NavBar },
  data () {
    return {
      // msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
