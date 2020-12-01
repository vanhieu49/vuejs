export default {
    CHANGE_TASKS(state, newTasks) {
        localStorage.setItem("tasks", JSON.stringify(newTasks));
        state.listTask = newTasks;
    },
    TOGGLE_FORM(state) {
        if (state.isShowForm) state.taskSeleted = null;
        state.isShowForm = !state.isShowForm;
    },
    HANDLE_SEARCH(state, strsearch) {
        state.strSearch = strsearch;
    },
    HANDLE_SORT(state, { orderBy, orderDir }) {
        state.orderBy = orderBy;
        state.orderDir = orderDir;
    },
    ADD_NEWTASK(state, task) {
        state.listTask.push(task)
        localStorage.setItem("tasks", JSON.stringify(state.listTask));
    },
    HANDLE_EDIT(state, taskEdit) {
        state.isShowForm = true;
        state.taskSeleted = taskEdit;
    }
}