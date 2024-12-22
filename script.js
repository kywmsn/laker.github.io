// 获取按钮和输入框的 DOM 元素
const loginButton = document.getElementById('loginButton');
const registerButton = document.getElementById('registerButton');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

// 注册功能
registerButton.addEventListener('click', () => {
    const email = usernameInput.value; // 用户名作为邮箱
    const password = passwordInput.value;

    // 使用 Firebase Authentication 注册用户
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // 注册成功后将用户数据存入 Firebase Realtime Database
            const userId = user.uid; // 获取用户唯一 ID
            firebase.database().ref('users/' + userId).set({
                email: email,
                createdAt: new Date().toISOString(), // 注册时间
            }).then(() => {
                alert('注册成功，用户数据已存储到数据库！');
                console.log('注册用户数据已存储到数据库');
            }).catch((error) => {
                console.error('数据库写入失败：', error.message);
            });
        })
        .catch((error) => {
            console.error('注册失败：', error.message);
            alert('注册失败：' + error.message);
        });
});

// 登录功能
loginButton.addEventListener('click', () => {
    const email = usernameInput.value;
    const password = passwordInput.value;

    // 使用 Firebase Authentication 登录用户
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // 登录成功后，从 Firebase Realtime Database 中获取用户数据
            const userId = user.uid; // 获取用户唯一 ID
            firebase.database().ref('users/' + userId).once('value')
                .then((snapshot) => {
                    const userData = snapshot.val();
                    if (userData) {
                        alert('登录成功！欢迎：' + userData.email);
                        console.log('用户数据：', userData);
                    } else {
                        alert('登录成功，但未找到用户数据！');
                    }
                }).catch((error) => {
                    console.error('数据库读取失败：', error.message);
                });
        })
        .catch((error) => {
            console.error('登录失败：', error.message);
            alert('登录失败：' + error.message);
        });
});

