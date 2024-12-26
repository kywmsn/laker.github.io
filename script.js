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

    email = autoCompleteEmail(email);
    console.log(`注册时补全的邮箱为：${email}`);

    firebase.auth().fetchSignInMethodsForEmail(email)
        .then((methods) => {
            if (methods.length > 0) {
                alert(`该邮箱 ${email} 已被注册，请尝试登录或使用其他用户名。`);
            } else {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then((userCredential) => {
                        const user = userCredential.user;

                        firebase.database().ref('users/' + user.uid).set({
                            username: usernameInput.value.trim(),
                            email: email,
                            createdAt: new Date().toISOString()
                        }).then(() => {
                            alert(`注册成功！您注册的邮箱为：${email}`);
                            const successMessage = document.createElement('p');
                            successMessage.textContent = '注册成功！请前往登录。';
                            successMessage.style.color = 'green';
                            document.querySelector('.box').appendChild(successMessage);
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

    email = autoCompleteEmail(email);
    console.log(`登录时补全的邮箱为：${email}`);

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log('登录成功，用户信息：', userCredential.user);
            alert('登录成功！即将跳转...');
            setTimeout(() => {
                window.location.replace("https://jiruan.xyz/ncudfnvancidciunw384485s");
            }, 1000);
        })
        .catch((error) => {
            console.error('登录失败：', error.message);
            alert('登录失败：' + error.message);
        });
});
