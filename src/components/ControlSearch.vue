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
import{mapState} from 'vuex'


export default {
    name:"control-search",
   
    data(){
        return{
            
        }
    },
    computed:mapState(['strSearch']),
    methods:{
      handleClear(){
        // this.$emit('handleSearch','');
         this.$store.dispatch('handleSearch','')
      },
      handleSearch(event){
        // console.log(event.target.value)
        // this.$emit('handleSearch',event.target.value)
        this.$store.dispatch('handleSearch',event.target.value)
      }
    }

}
</script>

<style>

</style>