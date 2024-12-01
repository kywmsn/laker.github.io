// script.js

// 获取登录按钮、注册按钮、账号和密码输入框
const loginButton = document.getElementById('loginButton');
const registerButton = document.getElementById('registerButton');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

// 假设正确的用户名和密码（用于登录验证）
const correctUsername = "admin";
const correctPassword = "123456";

// 点击登录按钮时进行验证
loginButton.addEventListener('click', function() {
    const enteredUsername = usernameInput.value;
    const enteredPassword = passwordInput.value;

    // 检查用户名和密码是否匹配
    if (enteredUsername === correctUsername && enteredPassword === correctPassword) {
        // 如果匹配，跳转到 jiruan.xyz
        window.location.href = "https://jiruan.xyz";
    } else {
        // 如果不匹配，提示错误
        alert("账号或密码错误，请重新输入！");
    }
});

// 点击注册按钮时进行注册验证
registerButton.addEventListener('click', function() {
    const enteredUsername = usernameInput.value;
    const enteredPassword = passwordInput.value;

    // 如果账号和密码相同，显示注册成功
    if (enteredUsername === enteredPassword) {
        alert("注册成功！");
    } else {
        // 如果账号和密码不相同，显示注册未成功
        alert("注册未成功，请确保账号和密码正确！");
    }
});
