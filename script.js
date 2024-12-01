// script.js

// 获取登录按钮、注册按钮、账号和密码输入框
const loginButton = document.getElementById('loginButton');
const registerButton = document.getElementById('registerButton');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

// 模拟数据库，账号和密码范围从22000000到24000000
function isValidAccount(account, password) {
    // 将账号和密码都视作字符串，如果账号和密码相等且在范围内返回 true
    const accountNum = parseInt(account, 10);
    const passwordNum = parseInt(password, 10);
    return accountNum >= 22000000 && accountNum <= 24000000 && accountNum === passwordNum && passwordNum === passwordNum;
}

// 点击登录按钮时进行验证
loginButton.addEventListener('click', function() {
    const enteredUsername = usernameInput.value;
    const enteredPassword = passwordInput.value;

    // 使用模拟数据库检查账号和密码
    if (isValidAccount(enteredUsername, enteredPassword)) {
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

    // 注册时，检查账号和密码是否相同并在有效范围内
    if (enteredUsername === enteredPassword && isValidAccount(enteredUsername, enteredPassword)) {
        alert("注册成功！");
    } else {
        // 如果账号和密码不相同或不在范围内，显示注册未成功
        alert("注册未成功，请确保账号和密码相同并在有效范围内！");
    }
});


