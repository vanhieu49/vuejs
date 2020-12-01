<template>
  <div class="col-12 col-lg-6">
    <div class="row">
      <!-- SORT : START -->
        <control-sort
        v-bind:orderBy="orderBy"
        v-bind:orderDir="orderDir"
        v-on:handleSort="handleSort"
        />
      <!-- SORT : END -->

      <!-- SEARCH : START -->
        <control-search
        v-bind:strSearch="strSearch"
        v-on:handleSearch="handleSearch"
        />
      <!-- SEARCH : END -->
    </div>
  </div>
</template>

<script>
import ControlSort from './ControlSort'
import ControlSearch from './ControlSearch'

export default {
  name: "comp-control",
  props:{
    strSearch:String,
    orderBy:String,
    orderDir:String,

  },
  components:{
      ControlSort,
      ControlSearch
  },
  data() {
    return {};
  },
  methods:{
    handleSort(data){
      this.$emit('handleSort',data);
    },
    handleSearch(data){
      this.$emit('handleSearch',data)
    }
  }
};
</script>

<style>
</style>