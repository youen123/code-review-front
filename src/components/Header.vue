<template>
  <header>
    <h2 class="pull-left">Review Board</h2>
    <Login class="pull-right"/>
  </header>
</template>

<script>
import Login from '@/components/Login'
export default {
  name: 'VHeader',
  components: {Login}
}
</script>

<style>
header {
  overflow: hidden;
  /* background: #e4e2e2; */
  padding: 10px;
}
header h2 {
  margin: 0 10px;
}
.pull-left {
  float: left;
}
.pull-right {
  float: right;
}
</style>
