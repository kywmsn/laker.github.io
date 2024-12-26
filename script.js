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

// 创建模态框
function createModal(message) {
    // 创建模态框元素
    const modal = document.createElement('div');
    modal.id = 'modal';
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.zIndex = '1000';
    modal.style.background = 'white';
    modal.style.padding = '20px';
    modal.style.borderRadius = '8px';
    modal.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    modal.style.textAlign = 'center';

    // 创建模态框消息
    const modalMessage = document.createElement('p');
    modalMessage.textContent = message;
    modalMessage.style.margin = '0 0 10px';
    modalMessage.style.fontSize = '16px';

    // 创建关闭按钮
    const closeButton = document.createElement('button');
    closeButton.textContent = '确定';
    closeButton.style.padding = '5px 10px';
    closeButton.style.border = 'none';
    closeButton.style.background = '#007BFF';
    closeButton.style.color = 'white';
    closeButton.style.borderRadius = '4px';
    closeButton.style.cursor = 'pointer';

    // 点击关闭模态框
    closeButton.addEventListener('click', () => {
        modal.remove();
        overlay.remove();
    });

    // 模态框背景
    const overlay = document.createElement('div');
    overlay.id = 'modalOverlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'rgba(0, 0, 0, 0.5)';
    overlay.style.zIndex = '999';

    overlay.addEventListener('click', () => {
        modal.remove();
        overlay.remove();
    });

    // 组装模态框
    modal.appendChild(modalMessage);
    modal.appendChild(closeButton);
    document.body.appendChild(overlay);
    document.body.appendChild(modal);
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
                            createModal(`注册成功！您注册的邮箱为：${email}，请前往登录。`);
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
