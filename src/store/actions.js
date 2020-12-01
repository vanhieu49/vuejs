export default {
    changeTasks({ commit }, newTasks) {
        commit('CHANGE_TASKS', newTasks)
    },
    toggleForm({ commit }) {

        commit('TOGGLE_FORM');
    },
    handleSearch({ commit }, strSearch) {
        commit('HANDLE_SEARCH', strSearch)
    },
    handleSort({ commit }, { orderBy, orderDir }) {
        commit('HANDLE_SORT', { orderBy, orderDir })
    },
    handlDelete({ commit, state }, taskDelete) {
        state.listTask = state.listTask.filter(item => {
            return item.id !== taskDelete.id
        })
        commit('CHANGE_TASKS', state.listTask)
    },
    handleAddNewTask({ commit, state }, data) {
        // state.listTask.push(data);
        commit('ADD_NEWTASK', data)
    },
    handleEdit({ commit }, taskSelected) {
        commit('HANDLE_EDIT', taskSelected)
    },
    handleEditTaskId({ state, commit, dispatch }, taskEdit) {
        // console.log("app.vue:",data)
        let index = state.listTask.findIndex(item => item.id === taskEdit.id)
        let listTasckClone = [...state.listTask];

        if (index !== -1) {
            listTasckClone.splice(index, 1, taskEdit);
            // dispatch('toggleForm');
            commit('TOGGLE_FORM');
            commit('CHANGE_TASKS', listTasckClone)
        }

    },
};