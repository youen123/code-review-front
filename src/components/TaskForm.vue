<template>
  <el-container>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="任务名称">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="仓库地址">
        <el-input v-model="form.repo"></el-input>
      </el-form-item>
      <el-form-item label="目的分支">
        <el-select v-model="form.destBranch" placeholder="请选择分支">
          <el-option label="master" value="master"></el-option>
          <el-option label="branch" value="branch"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="审核分支">
        <el-select v-model="form.type" placeholder="请选择分支类型">
          <el-option label="bug修复" value="0"></el-option>
          <el-option label="新功能开发" value="1"></el-option>
        </el-select>
        <el-select v-model="form.sourceBranch" placeholder="请选择分支">
          <el-option label="master" value="master"></el-option>
          <el-option label="branch" value="branch"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="commit">
        <el-input type="input" v-model="form.startCommit"></el-input>
      </el-form-item>
      <el-form-item label="任务描述">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="截止时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="审核人">
        <el-input v-model="form.reviewers"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
import * as TaskService from '../service/task.js'

  export default {
    name: 'TaskForm',
    data() {
      return {
        form: {
          title: '',
          repo: '',
          sourceBranch: 'master',
          destBranch: 'dest',
          type: '',
          date1: '',
          date2: '',
          description: '',
          startCommit: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入任务名称', trigger: 'blur' },
          ],
          repository: [
            { required: true, message: '请输入任务名称', trigger: 'blur' },
          ],
          desc: [
            { required: true, message: '请输入任务名称', trigger: 'blur' },
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      onSubmit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            alert('submit!');
            TaskService.newTask(this.form).then(() => {

            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>
.el-form {
  margin-top: 10px;
}
.line {
  text-align: center;
}

</style>
