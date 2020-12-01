<template>
  <div class="main-content">
    <!-- page-title -->
    <Pagetile />
    <div class="wrapper-board">
      <div class="row">
        <div class="item">
          <div class="col-title">Todo</div>
          <TaskItem 
          v-for="item in getListTaskFilter.todo" 
          :key="item.id" 
          :task="item"
          />
        </div>

        <div class="item">
          <div class="col-title">In Process</div>
          <TaskItem 
            v-for="item in getListTaskFilter.inprogress" 
          :key="item.id" 
          :task="item"
          />
        </div>

        <div class="item">
          <div class="col-title">Bugs</div>
          <TaskItem 
            v-for="item in getListTaskFilter.toVerity" 
          :key="item.id" 
          :task="item"
          />
        </div>

        <div class="item">
          <div class="col-title">Done</div>
          <TaskItem 
            v-for="item in getListTaskFilter.done" 
          :key="item.id" 
          :task="item"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagetile from "../components/PageTitle";
import TaskItem from "../components/TaskItem";
import {mapGetters} from 'vuex'

export default {
  name: "list-task",
  components: {
    Pagetile,
    TaskItem,
  },
  data() {
    return {};
  },
  computed:{
    ...mapGetters(['getListTaskFilter'])
  }
};
</script>

<style>
</style>