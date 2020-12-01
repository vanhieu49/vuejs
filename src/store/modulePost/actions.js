import axiosInstance from "../../plugins/axios"
import { PAGE_SIZE, CURRENT_PAGE, CONFIG_ACCESS_TOKEN } from '../../constants'


export default {
    async getListPostHasPaging({ commit }, { pagesize = PAGE_SIZE, currPage = CURRENT_PAGE, tagIndex = null }) {
        commit('SET_LOADING', true)
        try {

            let config = {
                params: {
                    pagesize,
                    currPage
                }
            }
            if (tagIndex) {
                config.params.tagIndex = tagIndex
                var result = await axiosInstance.get('/post/getListByCategory.php?', config)
            } else {
                var result = await axiosInstance.get('/post/getListPagination.php?', config)
            }
            commit('SET_LOADING', false)
            if (result.data && result.data.status === 200) {
                if (currPage === 1) {
                    commit('SET_LIST_POSTS', result.data.posts)
                } else if (currPage > 1) {
                    commit('PUSH_LIST_POST', result.data.posts)
                }

            }
        } catch (error) {
            commit('SET_LOADING', false);
            console.log(error)
        }
    },
    async getPostDetailById({ commit, dispatch }, postid) {
        commit('SET_LOADING', true)
        try {
            var result = await axiosInstance.get('/post/post.php?postid=' + postid)
            if (result.data && result.data.status === 200) {
                var promiseUser = dispatch('getUserById', result.data.data.post.USERID);
                var promiseComments = dispatch('getListCommentByPostid', postid);

                let [resultUser, resultComments] = await Promise.all([promiseUser, promiseComments]);

                let dataPostDetail = {
                    ...result.data.data,
                    comments: []
                }
                if (resultComments) {
                    dataPostDetail.comments = resultComments.comments
                }

                commit('SET_LOADING', false);
                commit('SET_POST_DETAIL', dataPostDetail);
                return {
                    ok: true,
                    data: dataPostDetail,
                    error: null
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
    async getListPostSearch({ commit }, searchStr) {
        commit('SET_LOADING', true)
        try {

            var result = await axiosInstance.get('/post/search.php?query=' + searchStr)
            commit('SET_LOADING', false)
            if (result.data.status === 200) {
                return {
                    ok: true,
                    posts: result.data.posts
                }
            } else {
                return {
                    ok: false,
                }
            }
        } catch (error) {
            commit('SET_LOADING', false)
            return {
                ok: false,
                error: error.message
            }
        }
    },
    async createNewPost({ commit }, { post_content = '', category = '', url_image = '', obj_image = null }) {
        commit('SET_LOADING', false)
        try {
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN)
                }
            }
            let bodyFormData = new FormData();
            bodyFormData.append('post_content', post_content);
            bodyFormData.append('category', category);
            bodyFormData.append('url_image', url_image);
            if (obj_image) {
                bodyFormData.append('obj_image', obj_image);
            }
            // console.log("post_content:", post_content);
            // console.log("category:", category);
            // console.log("url_image:", url_image);
            // console.log("obj_image:", obj_image);
            var result = await axiosInstance.post('/post/addNew.php', bodyFormData, config)
                // console.log("result:", result)
            if (result.status === 200) {
                return {
                    ok: true,
                    data: result.data.data
                }
            } else {
                return {
                    ok: true,
                    error: result.error
                }
            }
            commit('SET_LOADING', false)
        } catch (error) {
            commit('SET_LOADING', false)
            return {
                ok: false,
                error: error.message
            }
        }
    },
    async getListCommentByPostid({ commit }, postid) {
        try {
            var result = await axiosInstance.get('/comment/comments.php?postid=' + postid);
            if (result.data.status === 200) {
                return {
                    ok: true,
                    comments: result.data.comments
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
    async addNewComment({ commit, rootState }, { comment = '', postid = null }) {
        commit('SET_LOADING', true)
        try {
            let data = {
                comment,
                postid
            }
            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN)
                }
            }
            var result = await axiosInstance.post('/comment/add_new.php', data, config);
            commit('SET_LOADING', false)
            if (result.data.status === 200) {
                let comment = {
                    ...result.data.body,
                    fullname: rootState.user.currentUser.fullname,
                    profilepicture: rootState.user.currentUser.profilepicture
                }
                console.log("comment:", comment)
                commit('PUSH_LIST_COMMENT', comment)
                return {
                    ok: true,
                    comment: comment
                }
            } else {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch (error) {
            commit('SET_LOADING', false)
            return {
                ok: false,
                error: error.message
            }
        }
    },

}