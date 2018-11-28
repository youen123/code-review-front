<template>
  <div class="clearfix">
    <div>
      <div class="d2h-wrapper">
        <div class="d2h-file-wrapper" :data-lang="file.language">
          <div class="d2h-file-header">
            <span class="d2h-file-name-wrapper">
              <span class="d2h-icon-wrapper">
                <svg
                  aria-hidden="true"
                  class="d2h-icon"
                  height="16"
                  version="1.1"
                  viewBox="0 0 12 16"
                  width="12"
                >
                  <path
                    d="M6 5H2v-1h4v1zM2 8h7v-1H2v1z m0 2h7v-1H2v1z m0 2h7v-1H2v1z m10-7.5v9.5c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1V2c0-0.55 0.45-1 1-1h7.5l3.5 3.5z m-1 0.5L8 2H1v12h10V5z"
                  ></path>
                </svg>
              </span>
              <template v-if="file.isNew">
                <span class="d2h-file-name">{{file.newName}}</span>
                <span class="d2h-tag d2h-added d2h-added-tag">Add</span>
              </template>
              <template v-else-if="file.isDeleted">
                <span class="d2h-file-name">{{file.oldName}}</span>
                <span class="d2h-tag d2h-deleted d2h-deleted-tag">Deleted</span>
              </template>
              <template v-else-if="file.isRename">
                <span class="d2h-file-name">{{file.oldName}} rename {{file.newName}}</span>
                <span class="d2h-tag d2h-moved d2h-moved-tag">Rename</span>
              </template>
              <template v-else-if="file.isCopy">
                <span class="d2h-file-name">{{file.newName}} copy from {{file.oldName}}</span>
                <span class="d2h-tag d2h-changed d2h-changed-tag">Copy</span>
              </template>
              <template v-else>
                <span class="d2h-file-name">{{file.newName}}</span>
                <span class="d2h-tag d2h-changed d2h-changed-tag">Change</span>
              </template>
            </span>
          </div>
          <div class="d2h-file-diff">
            <div class="d2h-code-wrapper">
              <table class="d2h-diff-table">
                <tbody class="d2h-diff-tbody">
                  <template v-for="(block, index1) in file.blocks">
                    <tr :key="index1">
                      <td class="d2h-code-linenumber d2h-info"></td>
                      <td class="d2h-info">
                        <div class="d2h-code-line d2h-info">{{block.header}}</div>
                      </td>
                    </tr>
                    <template v-for="(line, index2) in block.lines">
                      <tr>
                        <td
                          :class="'d2h-code-linenumber '+line.type"
                          @click="showComment(index1, index2)"
                        >
                          <div class="line-num1">{{line.oldNumber}}</div>
                          <div class="line-num2">{{line.newNumber}}</div>
                        </td>
                        <td :class="line.type">
                          <div :class="'d2h-code-line ' + line.type">
                            <span class="d2h-code-line-prefix"></span>
                            <span class="d2h-code-line-ctn">{{line.content}}</span>
                          </div>
                        </td>
                      </tr>
                      <tr v-if="isShow(index1, index2)">
                        <td colspan="2">
                          <Comment
                            :position="[index1, index2]"
                            v-on:submitComment="addComment"
                            v-on:close="hideComment"
                          />
                        </td>
                      </tr>
                      <tr/>
                    </template>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Comment from "./Comment";
import * as TaskService from "../service/task.js";

export default {
  name: "Code",
  data() {
    return {
      file: this.code,
      commentForm: []
    };
  },
  props: ["code", "commit1", "commit2"],
  components: { Comment },

  methods: {
    addComment(content, position) {
      TaskService.addComment({ 
        taskId: this.$route.query.id, 
        type: 0, 
        content,
        commit1: this.commit1,
        commit2: this.commit2,
        file: this.file.newName,
        block_index: position[0],
        line_index: position[1] 
      }).then(data => {
        this.getComments();
      })
      .catch(e => {
        alert((e && e.errmsg) || "失败");
      });
    },
    getComments() {
      console.log('haah');
    },
    showComment(index1, index2) {
      this.commentForm.push(index1 + "-" + index2);
    },
    hideComment(index1, index2) {
      let index = this.commentForm.indexOf(index1 + "-" + index2);
      this.commentForm.splice(index, 1);
    },
    isShow(index1, index2) {
      return this.commentForm.indexOf(index1 + "-" + index2) !== -1;
    }
  }
};
</script>
<style>
</style>
