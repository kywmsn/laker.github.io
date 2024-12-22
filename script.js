const loginButton = document.getElementById('loginButton');
const registerButton = document.getElementById('registerButton');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

// 验证邮箱格式
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 自动补全邮箱逻辑
function autoCompleteEmail(input) {
    if (!isValidEmail(input)) {
        return `${input}@example.com`;
    }
    return input;
}

// 注册功能
registerButton.addEventListener('click', () => {
    let email = usernameInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
        alert('用户名和密码不能为空');
        return;
    }

    // 自动补全邮箱
    email = autoCompleteEmail(email);
    console.log(`注册时补全的邮箱为：${email}`);

    // 检查邮箱是否已注册
    firebase.auth().fetchSignInMethodsForEmail(email)
        .then((methods) => {
            if (methods.length > 0) {
                alert(`该邮箱 ${email} 已被注册，请尝试登录或使用其他用户名。`);
            } else {
                // 邮箱未注册，创建用户
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then((userCredential) => {
                        const user = userCredential.user;

                        // 将用户信息写入数据库
                        const userId = user.uid;
                        firebase.database().ref('users/' + userId).set({
                            username: usernameInput.value.trim(),
                            email: email,
                            createdAt: new Date().toISOString()
                        }).then(() => {
                            alert(`注册成功！您注册的邮箱为：${email}`);
                        }).catch((error) => {
                            console.error('数据库写入失败：', error.message);
                        });
                    })
                    .catch((error) => {
                        console.error('注册失败：', error.message);
                        alert('注册失败：' + error.message);
                    });
            }
        })
        .catch((error) => {
            console.error('检查邮箱是否注册时出错：', error.message);
        });
});

// 登录功能
loginButton.addEventListener('click', () => {
    let email = usernameInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
        alert('用户名和密码不能为空');
        return;
    }

    // 自动补全邮箱
    email = autoCompleteEmail(email);
    console.log(`登录时补全的邮箱为：${email}`);

    // 登录用户
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log('登录成功，用户信息：', userCredential.user);
            // 登录成功后立即跳转
            window.location.replace("https://jiaowu.buaa.edu.cn/");
        })
        .catch((error) => {
            console.error('登录失败：', error.message);
            alert('登录失败：' + error.message);
        });
});
