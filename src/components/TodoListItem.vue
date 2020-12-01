<template>
  <tr>
    <td class="text-center">{{ index }}</td>
    <td>
      {{ task.name }}
    </td>
    <td class="text-center">
      <span class="badge" v-bind:class="classLevel">{{ getLevel }}</span>
    </td>
    <td>
      <button 
      v-on:click="handleEdit"
      type="button" class="btn btn-warning">Edit</button>
      <button v-on:click="handlDelete" type="button" class="btn btn-danger">
        Delete
      </button>
    </td>
  </tr>
</template>

<script>
import mapLevel from "../mocks/level";
import {mapActions} from 'vuex'

export default {
  name: "todo-list-item",
  props: {
    task: { type: Object, default: null },
    index: Number,
  },
  data() {
    return {
      mapLevel: mapLevel,
    };
  },
  computed: {
    getLevel() {
      return this.mapLevel[this.task.level].name;
    },
    classLevel() {
      return this.mapLevel[this.task.level].class;
      //  switch(this.task.level){
      //   case 0:
      //     return { 'badge-info':true};
      //   case 1:
      //     return {'badge-warning':true};
      //   case 2:
      //     return {'badge-danger':true}
      //   default:
      //     return {};
      // }
    },
  },
  methods: {
    ...mapActions({
      'actionhandlDelete':'handlDelete',
      'actionhandleEdit':'handleEdit'
    }),
    handleEdit(){
      this.actionhandleEdit(this.task)
    },
    handlDelete() {
      if (confirm("Bạn có muốn xóa Task có tên là " +  this.task.name)) {
        // this.$emit("handlDelete", this.task);
        this.actionhandlDelete(this.task)
      }
    },
  },
};
</script>

<style>
</style>