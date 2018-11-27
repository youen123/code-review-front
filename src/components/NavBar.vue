<template>
  <el-aside width="200px" style="border-right: 1px solid #ece9e9; margin-right: 20px;">
    <el-menu
  default-active="2"
  class="el-menu-vertical-demo"
  style="border-right: none;"
  @open="handleOpen"
  @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span><router-link to="taskList">任务</router-link></span>
        </template>
        <el-menu-item index="1">我提出的任务</el-menu-item>
        <el-menu-item index="2">我要解决的任务</el-menu-item>
      </el-submenu>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title"><router-link to='bugList'>bug反馈</router-link></span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: 'NavBar',
  methods: {
    handleOpen() {},
    handleClose() {}
  }
}
</script>
<style scoped>
a {
  text-decoration: none;
}
a:visited {
  color: #303133;
}
a.router-link-exact-active, a.router-link-active {
  text-decoration: none;
  color: #409EFF;
}

</style>
