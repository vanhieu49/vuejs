<template>
  <b-col cols="12" lg="6">
    <!-- ADD : START -->
    <form-add
      v-bind:isShowForm="isShowForm"
      v-on:handleToggleForm="handleToggleForm"
    />
    <!-- ADD : END -->

    <form
      v-if="isShowForm"
      action=""
      method="POST"
      class="form-inline justify-content-between"
    >
      <div class="form-group">
        <label class="sr-only" for="">label</label>
        <input
          v-model="taskName"
          type="text"
          class="form-control"
          placeholder="Task Name"
        />
      </div>
      <div class="form-group">
        <label class="sr-only" for="">label</label>
        <select
          v-model="level"
          name="ds"
          class="form-control"
          required="required"
        >
          <option value="0">Small</option>
          <option value="1">Medium</option>
          <option value="2">High</option>
        </select>
      </div>

      <button
        v-if="taskSeleted === null"
        v-on:click="handleAddNew"
        type="button"
        class="btn btn-primary"
      >
        Submit
      </button>
      <button
       v-else
        v-on:click="handleEditTask"
        type="button"
        class="btn btn-primary"
      >
        Update
      </button>
      <button v-on:click="handleCancel" type="button" class="btn btn-secondary">
        Cancel
      </button>
    </form>
  </b-col>
</template>

<script>
import FormAdd from "./FormAdd";
import { v4 as uuidv4 } from "uuid";
export default {
  name: "comp-form",
  props: {
    isShowForm: Boolean,
    taskSeleted: Object,
  },
  components: {
    FormAdd,
  },
  data() {
    return {
      taskName: "",
      level: 0,
    };
  },
  watch: {
    taskSeleted: function (newData, oldData) {
      if (newData !== null) {
        this.taskName = newData.name;
        this.level = parseInt(newData.level) ;
      }
    },
  },
  beforeUpdate() {},
  methods: {
    handleEditTask(){
      let objEditTask = {
        id: this.taskSeleted.id,
        name:this.taskName,
        level:parseInt(this.level)  
      }
      this.$emit("handleEditTaskId",objEditTask);
      this.handleResetData();
    },
    handleAddNew() {
      let objTask = {
        id: uuidv4(),
        name: this.taskName,
        level: +this.level,
      };
      if (objTask.name === "") {
        alert("Bạn vui lòng nhập tên task");
      } else {
        this.$emit("handleAddNewTask", objTask);
        this.handleCancel();
      }
    },
    handleToggleForm() {
      this.$emit("toggleForm");
    },
    handleCancel() {
      this.$emit("toggleForm");
      // reset data
      this.handleResetData();
    },
    handleResetData() {
      (this.taskName = ""), (this.level = 0);
    },
  },
};
</script>

<style>
</style>