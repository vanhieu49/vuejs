<template>
  <div class="main-content">
    <div class="page-title">
      <span>Task Edit #:{{ id }}</span>
    </div>
    <div class="create-board" v-if="task">
      <div class="row">
        <div class="col-xs-12 input-group">
          <label>Tiêu đề</label>
          <input v-model="task.title" type="text" class="form-control" />
        </div>
        <div class="col-xs-12 input-group">
          <label>Mô tả tác vụ</label>
          <textarea
            v-model="task.description"
            type="text"
            class="form-control"
          ></textarea>
        </div>
        <div class="col-xs-12 input-group">
          <label>Tên Project</label>
          <input v-model="task.name" type="text" class="form-control" />
        </div>
        <div class="col-xs-6 input-group">
          <label>Ngày giờ bắt đầu</label>
          <datetime type="datetime" v-model="task.start_at"></datetime>
        </div>
        <div class="col-xs-6 input-group">
          <label>Deadline</label>
          <datetime type="datetime" v-model="task.end_at"></datetime>
        </div>
        <div class="col-xs-6 input-group">
          <label>Trang thái</label>
          <select class="input-group input-select" v-model="task.status">
            <option
              v-for="el in STATUS_CONFIG"
              :key="el.value + el.text"
              :value="el.value"
            >
              {{ el.text }}
            </option>
          </select>
        </div>
        <div class="col-xs-6 input-group">
          <label>Độ ưu tiên</label>
          <select class="input-group input-select" v-model="task.priority">
            <option
              v-for="el in PRIORITY_CONFIG"
              :key="el.value + el.text"
              :value="el.value"
            >
              {{ el.text }}
            </option>
          </select>
        </div>
        <div class="col-xs-6 input-group">
          <label>Giai đoạn</label>
          <select class="input-group input-select" v-model="task.team">
            <option
              v-for="el in TEAM_CONFIG"
              :key="el.value + el.text"
              :value="el.value"
            >
              {{ el.text }}
            </option>
          </select>
        </div>
        <div class="col-xs-6 input-group">
          <label>Thành viên đảm nhận</label>
          <select class="input-group input-select" v-model="task.email_member">
            <option value="" disabled>Thành viên</option>
            <option
              v-for="(email, index) in getListEmailUser"
              :key="index"
              :value="email"
            >
              @{{ email.split("@")[0] }}
            </option>
          </select>
        </div>
        <div class="col-xs-12 btn-submit-create">
          <button
            @click.prevent="handleEditData"
            class="btn btn-success"
            type="submit"
          >
            Cập nhật Task
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { STATUS_CONFIG, PRIORITY_CONFIG, TEAM_CONFIG } from "../config/const";
import { mapActions, mapGetters } from "vuex";
import { tasksRef } from '../config/firebase'

export default {
  name: "edit-task",
  data() {
    return {
      id: this.$route.params.id,
      task: {
        title: "",
        description: "",
        name: "",
        start_at: null,
        end_at: null,
        status: 1,
        priority: 1,
        team: 1,
        email_member: "",
      },
      STATUS_CONFIG,
      PRIORITY_CONFIG,
      TEAM_CONFIG,
    };
  },
  watch: {
    $route(newRoute, oldRoute) {
      this.id = newRoute.params.id;
      this.fetchDataTask();
    },
  },
  computed: {
    ...mapGetters(["getListEmailUser"]),
  },
  created() {
    this.fetchDataTask();
  },
  methods: {
    ...mapActions(["getTaskById","setLoading"]),
    fetchDataTask() {
      this.getTaskById(this.id).then((res) => {
        if (res.ok) {
          this.task = res.task;
          console.log(this.task);
        } else {
          this.$router.push("/");
        }
      });
    },
    async handleEditData(){
      this.setLoading(true)
      await tasksRef.child(this.id).update(this.task)
      this.setLoading(false)
      alert("Cập nhật thành công")
    }
  },
};
</script>

<style>
.vdatetime .vdatetime-input {
  display: block;
  width: 100%;
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: border-color ease-in-out 0.15s,
    -webkit-box-shadow ease-in-out 0.15s;
  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}
</style>