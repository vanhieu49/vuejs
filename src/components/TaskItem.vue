<template>
  <div class="backlogs-item" v-if="task">
    <div class="project">{{ task.name }}</div>
    <router-link
      :to="{ name: 'edit-task-page', params: { id: task.id } }"
      tag="div"
      :activeClass="undefined"
      :exactActiveClass="undefined"
      class="title"
      >{{ task.title }}</router-link
    >
    <div class="due-date">
      Deadline: <span>{{ formatDate }}</span>
    </div>
    <div class="phase">
      Giai đoạn: <span>{{ HASH_TEAM_CONFIG[task.team] }}</span>
    </div>
    <div class="assign">
      @{{ task.email_member.split("@")[0] }}
      <button 
      v-if="
      isAdmin &&
      task.status === STATUS_CONFIG.DONE.value"
      @click="hanldeDelete"
      class="delete">Delete</button>
    </div>
  </div>
</template>

<script>
import { HASH_TEAM_CONFIG,STATUS_CONFIG } from "../config/const";
import {mapGetters} from 'vuex'
import { tasksRef } from '../config/firebase'

export default {
  name: "task-item",
  props: {
    task: { type: Object, default: null },
  },
  data() {
    return {
      HASH_TEAM_CONFIG,
      STATUS_CONFIG
    };
  },
  computed: {
    ...mapGetters(['isAdmin']),
    formatDate() {
      if (this.task) {
        return new Date(this.task.end_at).toLocaleString();
      }
    },
  },
  methods:{
    hanldeDelete(){
      tasksRef.child(this.task.id).remove()
      
    }
  }
};
</script>

<style>
.title {
  cursor: pointer;
}
.assign {
  position: relative;
}
.assign .delete {
  position: absolute;
  right: 2px;
  top: 3px;
  background-color: red;
  color: white;
  border-radius: 3px;
  padding: 2px 3px;
  border: 1px solid red;
  visibility: hidden;
  opacity: 0;
  transition: all 0.3s;
}
.backlogs-item:hover .delete{
  visibility: visible;
  opacity: 1;
}
</style>