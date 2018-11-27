<template>
  <div class="my-box">
    <h1>
      {{ task.title }}
      <span v-if="task.status === 1">已关闭</span>
    </h1>
    <el-button @click="closeTask">close</el-button>
    <p>由 {{ task.creator }} 于{{ task.createTime }}创建</p>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>任务详情</span>
      </div>
      <p>{{ task.description }}</p>
      <p>目的分支: {{ task.repo + '/' + task.destBranch }}</p>
      <p>源分支: {{ task.repo + '/' + task.sourceBranch }}</p>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>commit列表</span>
      </div>
      <p v-for="commit in commits">
        {{ commit.sha }} / {{ commit.msg }} -- {{ commit.date }}
        <span style="float:right">
          <el-radio v-model="baseCommit" :label="commit.sha"></el-radio>
          <el-radio v-model="endCommit" :label="commit.sha"></el-radio>
        </span>
      </p>
      <el-button class="primary-btn pull-right" @click="compare">显示diff</el-button>
    </el-card>
    <p v-for="log in logs" :key="log.id">{{ log.name }} 于 {{ log.time }} 进行了{{ log.desc }}</p>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>修订内容</span>
      </div>
      <el-collapse v-model="activeNames">
        <el-collapse-item title="文件（files changed）" name="1">
          <table>
            <tbody>
              <tr>
                <th>路径</th>
                <th>改变</th>
              </tr>
              <tr v-for="file in fileList" :key="file.name">
                <td>{{ file.name }}</td>
                <td>{{ file.change }}</td>
              </tr>
            </tbody>
          </table>
        </el-collapse-item>
        <!-- <el-collapse-item title="提交(commits)" name="2">
                <p v-for="commit in commits">{{ commit }}</p>
        </el-collapse-item>-->
      </el-collapse>
    </el-card>
    <el-card class="box-card" v-for="(file, index) in fileList" :key="file.name">
      <div slot="header" class="clearfix">
        <div :id="'file' + index"></div>
      </div>
    </el-card>
    <div class="comments-list">
      <div v-for="comment in comments" :key="comment.index">
        <b class="comment-creator">{{comment.creator}}</b>
        评论于
        <span class="comment-date">{{Date(comment.create_time)}}：</span>
        <p class="comment-datail">{{comment.content}}</p>
      </div>
    </div>
    <div>
      <el-input
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 10}"
        placeholder="请输入内容"
        v-model="textarea1"
      ></el-input>
      <el-button type="success" @click="addComment">评论</el-button>
    </div>
    <div class="dash-board">
      <el-button @click="closeTask" type="primary">merge</el-button>
      <el-button @click="closeTask" type="danger">reject</el-button>
    </div>
  </div>
</template>

<script>
import * as TaskService from "../service/task.js";
import * as DiffService from "../service/diff.js";
export default {
  name: "taskDetail",
  data() {
    return {
      taskId: 0,
      activeNames: ["1"],
      commits: [],
      baseCommit: 0,
      endCommit: 0,
      textarea1: "",
      task: {
        title: "",
        creator: "",
        repository: "",
        sourceBranch: "",
        destBranch: "",
        type: "",
        description: ""
      },
      logs: [
        {
          name: "me",
          time: "2018-7-8 12:12:12",
          desc: "创建"
        },
        {
          name: "he",
          time: "2018-7-8 12:12:12",
          desc: "修改"
        }
      ],
      fileList: [],
      comments: []
    };
  },
  mounted() {
    let id = this.$route.query.id;
    this.taskId = id;
    let self = this;
    TaskService.getTaskDetail(id).then(data => {
      self.task = data;
      self.commits = data.commits;
      if (data.commits.length) {
        self.endCommit = data.commits[0].sha;
        self.baseCommit = data.commits[data.commits.length - 1].sha;
      }
    });
    this.getComments();
  },
  methods: {
    closeTask() {
      TaskService.closeTask(this.taskId).then(data => {
        alert("关闭");
        this.task.status = 1;
      });
    },
    addComment() {
      TaskService.addComment({taskId: this.taskId, type: 1, content: this.textarea1}).then(data => {
        this.getComments();
        this.textarea1 = '';
      }).catch((e) => {
        alert(e && e.errmsg || '失败');
      });
    },
    getComments() {
      TaskService.getComments({taskId: this.taskId}).then((data) => {
        this.comments = data
      }).catch((e) => {
        alert(e && e.errmsg || '失败');
      });
    },
    compare() {
      const self = this;
      DiffService.getFileList({
        repo: this.task.repo,
        branch: this.task.sourceBranch,
        commit1: this.baseCommit,
        commit2: this.endCommit
      }).then(data => {
        self.fileList = data;
        self.fileList.forEach((item, index) => {
          self.getDiffHTML(
            self.task.repo,
            self.baseCommit,
            self.endCommit,
            item.name,
            index
          );
        });
      });
    },
    getDiffHTML(repo, commit1, commit2, file, index) {
      DiffService.getDiffHTML({ repo, commit1, commit2, file }).then(data => {
        document.querySelector("#file" + index).innerHTML = data;
      });
    }
  }
};
</script>

<style>
.el-card {
  margin-top: 10px;
}
.el-textarea {
  margin: 10px 0;
}
.dash-board {
  margin: 10px 0;
}
.comment-date {
  font: 12px;
}
.comment-datail {
  background: lightgray;
}
</style>