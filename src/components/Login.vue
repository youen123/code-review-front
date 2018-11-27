<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" v-if="!isLogin">
      <el-form-item label="用户名">
        <el-input v-model="formInline.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="formInline.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">log in</el-button>
      </el-form-item>
    </el-form>
    <div v-if="isLogin">
      <span>{{username}}</span>
      <span @click="logout">退出登录</span>
    </div>
  </div>
</template>

<script>
import * as UserService from '../service/user.js';
import * as Cookie from '../util/cookie';

export default {
  data() {
    return {
      isLogin: false,
      username: '',
      formInline: {
        username: '',
        password: ''
      }
    }
  },
  mounted() {
    this.getName();
  },
  methods: {
    getName() {
      let name = Cookie.getCookie('username')
      if (name) {
        this.isLogin = true;
        this.username = name;
      }
    },
    login() {
      UserService.login({name: this.formInline.username, password: this.formInline.password}).then(() => {
        this.getName();
      }, (data) => {
        alert(data.msg);
      })
    },
    logout() {
      UserService.logout().then(() => {
        Cookie.setCookie('username', '');
        this.isLogin = false;
        this.username = this.formInline.username;
      }, (data) => {
        alert(data.msg);
      })
    }
  }
}
</script>

<style scoped>
.el-form-item {
  margin-bottom: 0;
}
</style>
