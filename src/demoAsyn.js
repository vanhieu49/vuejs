const { data } = require("jquery");

console.log("================================================")
console.log("demo asynchronous")

function first() {
    console.log("first run")

    setTimeout(() => {
        console.log("tuong tac voi server")
    }, 5000);
}

function second() {
    console.log("Truoc khi chay first");
    first();
    console.log("sau khi chay first")
}

// second()

function login(username, password) {
    return new Promise((resolve, reject) => {
        console.log("server đang xử lý...");
        setTimeout(() => {
            console.log("server xử lý thành công");

            let data = {
                usename: username,
                password: '3430dgdfkdghd-435345khd',
                userId: 'kdhfgdjkfk-dgkdhd-dgd',
                isLogin: true
            };
            resolve(data);

            // let dataError = {
            //     error: 'đăng nhập thất bại',
            //     isLogin: false
            // }
            // reject(dataError)
        }, 2000);
    })
}
// login('admin', 'admin').then((data) => {
//         console.log("Bên trong này là những đoạn code");
//         console.log("Sau khi promise xử lý thành công")
//         return {
//             demo: 'abc',
//             demo2: 'Xử lý xong công việc thứ 2',
//             data: data
//         }
//     })
//     .then((data) => {
//         console.log("xử lý lần thứ 3:", data)
//     })
function getPostUserId(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Server xử lý thành công, userId", userId);
            let data = [{
                    postId: 1,
                    userId,
                    content: 'dgdfg'
                }, {
                    postId: 2,
                    userId,
                    content: 'awer'
                }]
                // resolve(data)
            reject({ data, error: 'error getpostuserid' })
        }, 4000);
    })
}
// login('admin', 'admin')
//     .then((data) => {
//         console.log("success", data);
//         getPostUserId(data.userId)
//             .then((data) => {
//                 console.log("data getpost", data)
//             })
//     })
//     .catch(error => {
//         console.log(error)
//     })
async function handleLoginUser() {
    try {
        let resultLogin = await login('admin', 'admin');
        let resultPost = await getPostUserId(resultLogin.userId)
        console.log("result login", resultLogin);
        console.log("result  getpostUser", resultPost);
    } catch (error) {
        // xử lý thông tin về về error.
        console.log("error:", error)
    }

}
// handleLoginUser()
// console.log("Một số đoạn code khác không liên quan gì tới login")

let resultPost = fetch('http://api-meme-zendvn-01.herokuapp.com/api/post/getListPagination.php?pagesize=6&currPage=1')
let dataList = [];
resultPost.then((response => {
        // console.log(response.json());
        return response.json();
    }))
    .then((data) => {
        // console.log("data", data.posts)
        dataList.push(data.posts);
        console.log(dataList)
    })

console.log("================================================")