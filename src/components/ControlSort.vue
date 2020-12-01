<template>
  <div class="col-12">
    <div class="form-group">
      <div>
        <b-dropdown id="dropdown-1" text="Sort by">
          <b-dropdown-item
          v-on:click="handleSort('name','asc')"
          >Name ASC</b-dropdown-item>
          <b-dropdown-item
          v-on:click="handleSort('name','desc')"
          >Name DESC</b-dropdown-item>
          <b-dropdown-divider />
          <b-dropdown-item
          v-on:click="handleSort('level','asc')"
          >Level ASC</b-dropdown-item>
          <b-dropdown-item
          v-on:click="handleSort('level','desc')"
          >Level DESC</b-dropdown-item>
        </b-dropdown>
        <span class="badge badge-success badge-medium order">{{orderBy}} - {{orderDir}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
  name: "control-sort",
  data() {
    return {};
  },
  computed:mapState(['orderBy','orderDir']),
  methods:{
    ...mapActions({
      'actionhandleSort':'handleSort'
    }),
    handleSort(orderBy, orderDir){
      let data = {orderBy,orderDir};
      // this.$emit('handleSort',data);
      this.actionhandleSort(data)
    }
  }
};
</script>

<style>
.order{
  text-transform: uppercase;
}
</style>