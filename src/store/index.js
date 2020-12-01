import Vue from 'vue'
import Vuex from 'vuex'
import { v4 as uuidv4 } from 'uuid';
import { tasksRef, auth, userRef } from '../config/firebase'
import { STATUS_CONFIG } from "../config/const";

Vue.use(Vuex)


const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        currentUser: {
            email: '',
            uid: '',
            role: ''
        },
        listTasks: {},
        listUsers: {},
        isLoading: false,
    },
    getters: {
        getListTaskFilter: (state) => {
            const listTasks = state.listTasks;
            let todo = [],
                inprogress = [],
                toVerity = [],
                done = [];
            for (let key in listTasks) {
                let value = listTasks[key];
                let data = {
                    id: key,
                    ...value
                }
                if (value.status === STATUS_CONFIG.TODO.value) {
                    todo.push(data)
                } else if (value.status === STATUS_CONFIG.IN_PROGRESS.value) {
                    inprogress.push(data)
                } else if (value.status === STATUS_CONFIG.TO_VERIFY.value) {
                    toVerity.push(data)
                } else if (value.status === STATUS_CONFIG.DONE.value) {
                    done.push(data)
                }
            }
            // console.log("todo", todo)
            // console.log("inprogree", inprogress)
            // console.log("toVerity", toVerity)
            // console.log("done", done)
            return {
                todo,
                inprogress,
                toVerity,
                done
            }
        },
        isLogin: (state) => {
            if (state.currentUser.email !== '' && state.currentUser.uid !== '') return true;
            return false
        },
        getListEmailUser: (state) => {
            let arrUser = [];
            let listUser = state.listUsers;
            for (let key in listUser) {
                let value = listUser[key]
                arrUser.push(value.email)
            }
            return arrUser;
        },
        getCurrentUser: (state) => {
            return state.currentUser;
        },
        isAdmin: (state) => {
            return state.currentUser.role === 'admin'
        }

    },
    mutations: {
        SET_LOADING: (state, loading = false) => {
            state.isLoading = loading;
        },
        SET_LIST_TASKS: (state, data) => {
            state.listTasks = data
        },
        SET_LIST_USERS: (state, data) => {
            state.listUsers = data
        },
        SET_CURRENT_USER: (state, user) => {
            state.currentUser = user
        },
        SET_ROLE: (state, data) => {
            state.currentUser = {
                ...state.currentUser,
                role: data.role
            }
        }
    },
    actions: {
        onListenerTask({ commit }) {
            let flag = false;
            commit('SET_LOADING', true)
            tasksRef.on("value", function(snaphot) {
                if (flag === false) {
                    flag = true;
                    commit('SET_LOADING', false)
                }
                commit('SET_LIST_TASKS', snaphot.toJSON())
            })
        },
        onListenerUsers({ commit }) {
            userRef.on("value", function(snaphot) {
                commit('SET_LIST_USERS', snaphot.toJSON())
            })
        },
        setLoading({ commit }, loading = false) {
            commit('SET_LOADING', loading)
        },
        async createTask({ commit }, objData) {
            commit('SET_LOADING', true)
            try {
                let taskid = uuidv4();

                await tasksRef.child(taskid).set(objData)
                commit('SET_LOADING', false)
                return {
                    ok: true,
                    error: null
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error
                }
            }
        },
        async register({ commit }, { email, password }) {
            commit('SET_LOADING', true)
            try {
                let result = await auth.createUserWithEmailAndPassword(email, password)
                await userRef.child(result.user.uid).set({
                    email: result.user.email,
                    role: 'member'
                })
                let user = {
                    email,
                    uid: result.user.uid
                }
                commit('SET_CURRENT_USER', user)
                commit('SET_LOADING', false)
                return {
                    ok: true,
                    error: null
                }
            } catch (error) {
                commit('SET_LOADING', false)
                return {
                    ok: false,
                    error: error.message
                }
            }
        },
        async login({ commit }, { email, password }) {
            commit('SET_LOADING', true)
            try {
                let result = await auth.signInWithEmailAndPassword(email, password)
                let user = {
                    email,
                    uid: result.user.uid
                }
                commit('SET_CURRENT_USER', user)
                commit('SET_LOADING', false)
                return {
                    ok: true,
                    error: null
                }
            } catch (error) {
                commit('SET_LOADING', false)
                return {
                    ok: false,
                    error: error.message
                }
            }
        },
        async logOut({ commit }) {
            try {
                await auth.signOut()
                return {
                    ok: true,
                    error: null
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message
                }
            }
        },
        async getTaskById({ commit }, id) {
            try {
                let result = await tasksRef.child(id).once('value')
                if (result.val()) {
                    return {
                        ok: true,
                        task: result.val()
                    }
                }
                return {
                    ok: false,
                    error: null
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message
                }
            }
        },
        async getUserCustomField({ commit, state }) {
            let uid = state.currentUser.uid;
            try {
                let result = await userRef.child(uid).once('value')
                console.log(result.val())
                if (result.val()) {
                    commit("SET_ROLE", result.val())
                    return {
                        ok: true,
                        data: result.val()
                    }
                }
                return {
                    ok: false,
                    error: null
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message
                }
            }
        }
    },

})

export default store;