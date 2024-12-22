// 获取按钮和输入框的 DOM 元素
const loginButton = document.getElementById('loginButton');
const registerButton = document.getElementById('registerButton');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

// 简单的邮箱格式验证函数
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 注册功能
registerButton.addEventListener('click', () => {
    let email = usernameInput.value.trim();
    const password = passwordInput.value;

    // 检查输入是否为空
    if (!email || !password) {
        alert('用户名和密码不能为空');
        return;
    }

    // 如果不是有效邮箱，则自动补全为合法邮箱格式
    if (!isValidEmail(email)) {
        email = `${email}@example.com`; // 将普通用户名补全为邮箱
        alert('提示：您的用户名已被自动转换为邮箱格式 -> ' + email);
    }

    // 使用 Firebase Authentication 注册用户
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // 注册成功后将用户数据存储到 Firebase Realtime Database
            const userId = user.uid; // 获取用户的唯一 ID
            firebase.database().ref('users/' + userId).set({
                username: usernameInput.value.trim(), // 原始用户名
                email: email, // 补全后的邮箱
                createdAt: new Date().toISOString() // 注册时间
            }).then(() => {
                alert('注册成功！用户数据已存储到数据库');
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
    const email = usernameInput.value.trim();
    const password = passwordInput.value;

    // 检查输入是否为空
    if (!email || !password) {
        alert('用户名和密码不能为空');
        return;
    }

    // 登录用户
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // 登录成功后，从 Firebase Realtime Database 中获取用户数据
            const userId = user.uid; // 获取用户的唯一 ID
            firebase.database().ref('users/' + userId).once('value')
                .then((snapshot) => {
                    const userData = snapshot.val();
                    if (userData) {
                        alert(`登录成功！欢迎：${userData.username || userData.email}`);
                        console.log('用户数据：', userData);

                        // 登录成功后跳转到指定网页
                        window.location.href = "https://jiruan.xyz";
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



