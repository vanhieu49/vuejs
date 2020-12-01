import { FormCheckboxPlugin } from "bootstrap-vue"
import axiosInstance from "../../plugins/axios"
import { parseJwt } from '../../helper'
import { CONFIG_ACCESS_TOKEN } from '../../constants'

export default {
    async getUserById({ commit }, userid) {
        try {
            var result = await axiosInstance.get('/member/member.php?userid=' + userid)
            if (result.data.status === 200) {
                commit('SET_USER_INFOR', result.data.user)
                return {
                    ok: true,
                    data: result.data.user,
                    error: null
                }
            }
            return {
                ok: false,
                error: result.message
            }
        } catch (error) {
            return {
                ok: false,
                error: error.message
            }
        }
    },
    async login({ commit, dispatch }, { email = '', password = '' }) {
        commit('SET_LOADING', true)
        try {
            let data = {
                email: email,
                password: password
            }
            var result = await axiosInstance.post('/member/login.php', data)

            commit('SET_LOADING', false)
            if (result.data.status === 200) {

                commit('SET_USER_INFOR', result.data.user)
                commit('SET_LOGIN_INFO', result.data)
                dispatch('getPostListPostByUser', result.data.user.USERID)
                return {
                    ok: true,
                    error: null,
                    data: result.data
                }
            } else {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch (error) {
            return {
                ok: false,
                error: error.message
            }
        }
    },
    async chekLogin({ commit, dispatch }) {
        try {
            let tokenLocal = localStorage.getItem(CONFIG_ACCESS_TOKEN)
            let userObject = parseJwt(tokenLocal)
            if (userObject) {
                // let resultUser = await dispatch('getUserById', userObject.id)
                // let resultUserPost = await dispatch('getPostListPostByUser', userObject.id)
                let promiseUser = dispatch('getUserById', userObject.id)
                let promiseUserPost = dispatch('getPostListPostByUser', userObject.id)
                let [resultUser, resultUserPost] = await Promise.all([promiseUser, promiseUserPost])
                if (resultUser.ok && resultUserPost.ok) {
                    let data = {
                        user: resultUser.data,
                        token: tokenLocal
                    }
                    commit('SET_LOGIN_INFO', data)
                    return {
                        ok: true,
                        error: null,
                    }
                }
                return {
                    ok: false,
                    error: null
                }
            }
        } catch (error) {
            return {
                ok: false,
                error: error.message
            }
        }
    },
    async logout({ commit }) {
        commit('SET_LOGOUT')
    },
    async getPostListPostByUser({ commit }, userid) {
        try {
            let config = {
                params: {
                    userid: userid,
                },
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN)
                }
            }
            var result = await axiosInstance.get('/post/getListPostUserID.php?', config)
            if (result.data.status === 200) {
                let objData = {
                    posts: result.data.posts,
                    userid
                }
                commit('SET_USER_POST', objData)
                return {
                    ok: true,
                    posts: result.data.posts || [],
                    error: null,

                }
            }
            return {
                ok: false,
                error: null,

            }
        } catch (error) {
            return {
                ok: false,
                error: error.message
            }
        }
    },
    async register({ commit, dispatch }, data) {
        commit('SET_LOADING', true);
        try {
            var result = await axiosInstance.post('/member/register.php', data)
                // console.log(result)
            if (result.data.status === 200) {
                commit('SET_USER_INFOR', result.data.user);
                commit('SET_LOGIN_INFO', result.data);
                dispatch('getPostListPostByUser', result.data.user.USERID);
                return {
                    ok: true,
                    data: result.data,
                    error: null
                }
            } else {
                return {
                    ok: false,
                    error: result.data.error
                }
            }

        } catch (error) {
            commit('SET_LOADING', false);
            return {
                ok: false,
                error: error.message
            }
        }
    },
    async updateProfile({ commit }, {
        fullname = '',
        description = '',
        gender = '',
        objFile = null
    }) {
        commit('SET_LOADING', true);
        try {
            let bodyFormData = new FormData();
            bodyFormData.append("fullname", fullname);
            bodyFormData.append("description", description);
            bodyFormData.append("gender", gender);
            // for avatar
            if (objFile) {
                bodyFormData.append("avatar", objFile);
            }
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN)
                }
            }
            var result = await axiosInstance.post('/member/update.php', bodyFormData, config)
            commit('SET_LOADING', false);
            if (result.data.status === 200) {
                commit('SET_CURRENT_USER', result.data.user)
                return {
                    ok: true,
                    user: result.data.user
                }
            } else {
                return {
                    ok: false,
                    error: error.data.error
                }
            }
        } catch (error) {
            commit('SET_LOADING', false);
            return {
                ok: false,
                error: error.message
            }
        }
    },
    async changePassword({ commit }, data) {
        try {
            commit('SET_LOADING', true);
            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN)
                }
            }
            var result = await axiosInstance.post('/member/password.php', data, config)
            commit('SET_LOADING', false);
            if (result.data.status === 200) {
                return {
                    ok: true,
                    message: result.data.message
                }
            } else {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch (error) {
            commit('SET_LOADING', false);
            return {
                ok: false,
                error: error.message
            }
        }
    }
}