<template>
  <div class="form-group add-task">
    <button 
    v-if="!isShowForm"
    v-on:click="onClickAddTask"
    type="button" class="btn btn-info btn-block">Add Task</button>
     <button 
     v-else
    v-on:click="onClickAddTask"
    type="button" class="btn btn-primary btn-block">Close Form</button>
  </div>
</template>

<script>
export default {
  name: "form-add",
  props:{
    isShowForm:Boolean
  },
  data() {
    return {};
  },
  methods:{
    onClickAddTask(){
      this.$emit('handleToggleForm');
    }
  }
};
</script>

<style>
</style>