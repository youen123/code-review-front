<template>
    <div>
        <el-input
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 10}"
        placeholder="请输入内容"
        v-model="textarea"
        ></el-input>
        <el-button type="success" @click="addComment">评论</el-button>
        <el-button @click="close">取消</el-button>
    </div>
</template>

<script>
export default {
  name: 'Comment',
  data() {
      return {
          textarea: '',
      }
  },
  props: ['position'],
  methods: {
      addComment: function() {
          this.$emit('submitComment', this.textarea, this.position);
          this.textarea = '';
      },
      close() {
          this.$emit('close');
      }
  }
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