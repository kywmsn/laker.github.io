// 获取按钮和输入框的 DOM 元素
const loginButton = document.getElementById('loginButton');
const registerButton = document.getElementById('registerButton');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

// 注册功能
registerButton.addEventListener('click', () => {
    const email = usernameInput.value;
    const password = passwordInput.value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert('注册成功');
            console.log('注册用户：', userCredential.user);
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

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert('登录成功');
            console.log('登录用户：', userCredential.user);
        })
        .catch((error) => {
            console.error('登录失败：', error.message);
            alert('登录失败：' + error.message);
        });
});
