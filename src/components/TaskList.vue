<template>
  <div class="my-box">
    <el-form ref="form" :inline="true" :model="form" label-width="0" class="demo-form-inline">
      <el-form-item label="">
        <el-input v-model="form.searchBox"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button @click="getTaskList">搜索</el-button>
      </el-form-item>
      <el-form-item class="pull-right">
        <el-button><router-link to='newTask'>新增任务</router-link></el-button>
      </el-form-item>
    </el-form>
    <div v-if="list.length === 0">暂无审核任务</div>
    <div v-for="item in list" v-bind:key="item.id">
      <router-link :to="{path: '/tasks', query: {id: item.id}}">{{ item.title }}</router-link>
      <span>{{item.statusText}}</span>
      <span>{{item.typeText}}</span>
      <span class="pull-right">评论数：{{ item.commentsNumber }}</span>
      <p>{{ item.repo }} {{item.sourceBranch}} -> {{item.destBranch}} <span>{{item.commit}}</span></p>
      <p>
        <time>{{ item.createTime }}</time>
        <span>{{ item.creator }} 分配给：
          {{ item.reviewers}}
        </span>
      </p>
      <hr/>
    </div>
  </div>
</template>

<script>
const TASK_TYPE = {
  '0': 'bug修复',
  '1': 'feature开发'
} 
const TASK_STATUS = {
  '0': '未开始',
  '1': '进行中',
  '2': '已结束'
}
import * as TaskService from '../service/task.js';

export default {
  name: 'taskList',
  data() {
    return {
      form: {
        searchBox: ''
      },
      list: []
    }
  },
  mounted() {
    let self = this;
    TaskService.getTasks({}).then((data) => {
      self.list = data.map((item) => {
        item.statusText = TASK_STATUS[item.status];
        item.typeText = TASK_TYPE[item.type];
        return item;
      });
    });
  },
  methods: {
    getTaskList() {
      TaskService.getTasks({searchContent: this.form.searchBox}).then((data) => {
        self.list = data.map((item) => {
          item.statusText = TASK_STATUS[item.status];
          item.typeText = TASK_TYPE[item.type];
          return item;
        });
      });
    }
  }
}
</script>

<style scoped>
.my-box {
  flex: 1;
}
</style>
