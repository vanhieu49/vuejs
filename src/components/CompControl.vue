<template>
  <div class="col-12 col-lg-6">
    <div class="row">
      <!-- SORT : START -->
        <control-sort
        v-on:handleSort="handleSort"
        />
      <!-- SORT : END -->

      <!-- SEARCH : START -->
        <control-search/>
      <!-- SEARCH : END -->
    </div>
  </div>
</template>

<script>
import ControlSort from './ControlSort'
import ControlSearch from './ControlSearch'

export default {
  name: "comp-control",
  components:{
      ControlSort,
      ControlSearch
  },
  data() {
    return {};
  },
  methods:{
    handleSort(data){
      // this.$emit('handleSort',data);
    },
    
  }
};
</script>

<style>
</style>