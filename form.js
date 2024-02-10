document.addEventListener("DOMContentLoaded", function () {
  const loginCard = document.getElementById("loginCard");
  const signupCard = document.getElementById("signupCard");
  const showSignupLink = document.getElementById("showSignup");
  const showLoginLink = document.getElementById("showLogin");
  const userContainer = document.getElementById("userContainer");

  function showSignupForm() {
    loginCard.style.display = "none";
    document.getElementById('signupCard').reset();
    signupCard.style.display = "block";
  }

  function showLoginForm() {
    signupCard.style.display = "none";
    document.getElementById('loginForm').reset();
    loginCard.style.display = "block";
  }

  function showUserInfo(username) {
    userContainer.innerHTML = `
      <li>Welcome, ${username}</li>
      <li><button id="logoutBtn">Logout</button></li>
    `;
    userContainer.style.display = "flex";
  }

  function hideUserInfo() {
    userContainer.innerHTML = "";
    userContainer.style.display = "none";
  }

  const loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser) {
    showUserInfo(loggedInUser);
  } else {
    showLoginForm();
  }

  showSignupLink.addEventListener("click", function (event) {
    event.preventDefault();
    showSignupForm();
  });

  showLoginLink.addEventListener("click", function (event) {
    event.preventDefault();
    showLoginForm();
  });

  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const userData = JSON.parse(localStorage.getItem(username));

    if (userData && userData.password === password) {
      alert("Login successful!");
      localStorage.setItem("loggedInUser", username);
      window.location.href = "index.html";
      showUserInfo(username);
    } else {
      alert("Invalid username or password. Click on Sign Up to register.");
    }
  });

  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const newUsername = document.getElementById("newUsername").value;
    const newPassword = document.getElementById("newPassword").value;

    if (!newUsername || !newPassword) {
      alert("Please enter both username and password.");
      return;
    }

    if (localStorage.getItem(newUsername)) {
      alert("Username already exists. Please choose another.");
      return;
    }

    const userData = {
      username: newUsername,
      password: newPassword,
    };
    localStorage.setItem(newUsername, JSON.stringify(userData));

    alert("Signup successful!");
    showLoginForm();
  });

  document.addEventListener("click", function (event) {
    if (event.target.id === "logoutBtn") {
      localStorage.removeItem("loggedInUser");
      hideUserInfo();
      showLoginForm();
    }
  });
});
