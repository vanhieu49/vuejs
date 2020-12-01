<template>
   <div class="col-12">
        <div class="input-group">
          <input 
          v-bind:value="strSearch"
          v-on:input="handleSearch"
          type="text" class="form-control" placeholder="Search for..." />
          <span class="input-group-append">
            <button 
            v-on:click="handleClear"
            class="btn btn-info" type="button">Clear!</button>
          </span>
        </div>
      </div>
</template>

<script>
export default {
    name:"control-search",
    props:{
      strSearch:String
    },
    data(){
        return{
            
        }
    },
    methods:{
      handleClear(){
        this.$emit('handleSearch','')
      },
      handleSearch(event){
        this.$emit('handleSearch',event.target.value)
      }
    }

}
</script>

<style>

</style>