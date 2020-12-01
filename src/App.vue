<template>
  <div id="app">
    <b-container>
      <comp-title />
      <b-row>
        <comp-control
          v-bind:strSearch="strSearch"
          v-bind:orderBy="orderBy"
          v-bind:orderDir="orderDir"
          v-on:handleSort="handleSort"
          v-on:handleSearch="handleSearch"
        />
        <comp-form
          v-bind:taskSeleted="taskSeleted"
          v-bind:isShowForm="isShowForm"
          v-on:toggleForm="toggleForm"
          v-on:handleAddNewTask="handleAddNewTask"
          v-on:handleEditTaskId="handleEditTaskId"
        />
      </b-row>
      <todo-list-table
        v-bind:listTask="listTaskSort"
        v-on:handlDelete="handlDelete"
        v-on:handleEdit="handleEdit"
      />
    </b-container>
  </div>
</template>

<script>
import TodoListTable from "./components/TodoListTable";
import CompTitle from "./components/CompTitle";
import CompControl from "./components/CompControl";
import CompForm from "./components/CompForm";

// import data
import listTask from "./mocks/tasks";

export default {
  name: "app",
  components: {
    CompForm,
    CompControl,
    TodoListTable,
    CompTitle,
  },
  data() {
    return {
      listTask: null,
      isShowForm: false,
      strSearch: "",
      orderBy: "name",
      orderDir: "asc",
      taskSeleted:null
    };
  },
  watch:{
      listTask(newData){
        let taskLocalStore = localStorage.setItem("tasks", JSON.stringify(newData))
      }
  },
  created(){
    let tasks = localStorage.getItem("tasks");
    if(tasks!== null){
        this.listTask = JSON.parse(tasks)
    }else{
      this.listTask = [];
    }
    
  },
  computed: {
    listTaskSearch() {
      //Tìm kiếm - logic search
      const { strSearch } = this;

      // ------------cách 1----------
      // var newItem = []
      // this.listTask.forEach(e=>{
      //   if(e.name.toLowerCase().includes(strSearch.toLowerCase())){
      //     newItem.push(e)
      //   }
      // })
      // console.log("newItem: ", newItem)
      // return newItem;

      //------------Cách 2-------------
      return this.listTask.filter((item) => {
        return item.name.toLowerCase().includes(strSearch.toLowerCase());
      });
    },
    listTaskSort() {
      var listTask = [...this.listTaskSearch];
      listTask.sort(this.compareSort);
      // if(this.orderBy === 'name'){
      //   listTask.sort(this.compareName)
      // }else if(this.orderBy === 'level'){
      //    listTask.sort(this.compareLevel)
      // }
      return listTask;
    },
  },
  methods: {
    handleEditTaskId(data){
        // console.log("app.vue:",data)
        let index = this.listTask.findIndex(item => item.id === data.id)
       if(index !== -1){
           this.listTask.splice(index,1,data);
           this.toggleForm();
       }
       
    },
    handleEdit(taskEdit){
      this.isShowForm = true;
      this.taskSeleted = taskEdit;
    },
    handleAddNewTask(data){
      this.listTask.push(data)
      console.log("app.vue",data)
    },
    handlDelete(taskDelete) {
      // cách 1:
        // this.listTask = this.listTask.filter(item => {
        //   return item.id !== taskDelete.id
        // })
       //Cách 2:
       let idxDelete = -1;
      //  this.listTask.forEach((element,index) => {
      //    if(element.id === taskDelete.id){
      //      idxDelete = index
      //    }
      //  });
      
      for(let index = 0;index < this.listTask.length; index++){
        console.log(index)
        if(this.listTask[index].id === taskDelete.id){
          idxDelete = index;
          break;
        }
      }
      if(idxDelete !== -1){
        this.listTask.splice(idxDelete,1)
      }
    },
    compareSort(a, b) {
      let numOrder = this.orderDir === "asc" ? -1 : 1;
      //a b c d e f
      if (a[this.orderBy] < b[this.orderBy]) return numOrder;
      else if (a[this.orderBy] > b[this.orderBy]) return numOrder * -1;
      return 0;
    },
    // compareName(a,b){
    //   let numOrder = this.orderDir === 'asc' ? -1 : 1;
    //   //a b c d e f
    //   if(a.name < b.name)
    //     return numOrder;
    //   else if( a.name > b.name)
    //     return numOrder * (-1)
    //   return 0;
    // },
    //  compareLevel(a,b){
    //   let numOrder = this.orderDir === 'asc' ? -1 : 1;
    //   //a b c d e f
    //   if(a.level < b.level)
    //     return numOrder;
    //   else if( a.level > b.level)
    //     return numOrder * (-1)
    //   return 0;
    // },
    handleSort(data) {
      this.orderBy = data.orderBy;
      this.orderDir = data.orderDir;
      console.log(this.orderDir);
    },
    handleSearch(data) {
      this.strSearch = data;
    },
    toggleForm() {
      this.taskSeleted = null;
      this.isShowForm = !this.isShowForm;
    },
  },
};
</script>

<style>
body {
  padding: 100px 0;
}

.table > tbody > tr > td,
.table > tbody > tr > th,
.table > tfoot > tr > td,
.table > tfoot > tr > th,
.table > thead > tr > td,
.table > thead > tr > th {
  vertical-align: middle;
}

.container > .row {
  margin-top: 20px;
  margin-bottom: 30px;
}

span.badge-medium {
  padding: 11px 10px;
  margin: 0px 8px;
  font-size: 16px;
  display: inline-block;
  vertical-align: top;
}

@media (max-width: 992px) {
  .add-task {
    margin-top: 50px;
  }
}
</style>
