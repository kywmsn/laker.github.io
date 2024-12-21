// script.js

// 获取登录按钮、注册按钮、账号和密码输入框
const loginButton = document.getElementById('loginButton');
const registerButton = document.getElementById('registerButton');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

// 检查密码长度是否小于等于8个字符
function isPasswordValid(password) {
    return password.length <= 8;  // 密码最大长度为8位
}

// 从 localStorage 获取存储的账号和密码数据
function getStoredAccountPassword(account) {
    const storedData = localStorage.getItem(account);
    return storedData ? JSON.parse(storedData) : null;  // 返回存储的账号密码对象，或 null
}

// 将账号和密码存储到 localStorage
function storeAccountPassword(account, password) {
    const data = { account, password };
    localStorage.setItem(account, JSON.stringify(data));  // 存储为 JSON 格式
}

// 点击登录按钮时进行验证
loginButton.addEventListener('click', function() {
    const enteredUsername = usernameInput.value;
    const enteredPassword = passwordInput.value;

    // 从 localStorage 获取该账号的密码
    const storedData = getStoredAccountPassword(enteredUsername);

    if (storedData && storedData.password === enteredPassword) {
        // 如果账号存在且密码匹配，跳转到指定页面
        window.location.href = "https://jiruan.xyz/bhcbshacbhdscuygdsvhdsbcvdc";
    } else if (storedData && storedData.password !== enteredPassword) {
        // 如果账号存在，但密码不匹配，提示修改密码
        alert("密码不正确，请重新输入或点击注册修改密码！");
    } else {
        // 如果账号不存在，提示注册
        alert("账号不存在，请注册！");
    }
});

// 点击注册按钮时进行注册验证（密码等于账号）
registerButton.addEventListener('click', function() {
    const enteredUsername = usernameInput.value;
    const enteredPassword = passwordInput.value;

    // 从 localStorage 获取该账号的密码
    const storedData = getStoredAccountPassword(enteredUsername);

    if (storedData) {
        // 如果账号已存在，直接更新密码
        if (isPasswordValid(enteredPassword)) {
            storeAccountPassword(enteredUsername, enteredPassword);
            alert("密码已成功更新！");
        } else {
            alert("密码必须为8位以内的字符！");
        }
    } else {
        // 如果账号不存在，执行注册操作，密码等于账号
        if (enteredUsername >= 22000000 && enteredUsername <= 24000000) {
            // 初始密码等于账号
            storeAccountPassword(enteredUsername, enteredUsername.toString());
            alert("注册成功！密码已设置为账号！");
        } else {
            alert("账号不在有效范围内！");
        }
    }
});




