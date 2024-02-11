document.addEventListener("DOMContentLoaded", function () {
  const loginCard = document.getElementById("loginCard");
  const signupCard = document.getElementById("signupCard");
  const showSignupLink = document.getElementById("showSignup");
  const showLoginLink = document.getElementById("showLogin");
  const userContainer = document.getElementById("userContainer");

  function showSignupForm() {
    loginCard.style.display = "none";
    signupCard.style.display = "block";
    document.getElementById('signupCard').reset();
  }

  function showLoginForm() {
    signupCard.style.display = "none";
    loginCard.style.display = "block";
    document.getElementById('loginForm').reset();
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
      Swal.fire("Login successful!");
      localStorage.setItem("loggedInUser", username);
      window.location.href = "index.html";
      showUserInfo(username);
    } else {
      Swal.fire("Invalid username or password. Click on Sign Up to register.");
    }
  });

  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const newUsername = document.getElementById("newUsername").value;
    const newPassword = document.getElementById("newPassword").value;

    if (!newUsername || !newPassword) {
      Swal.fire("Please enter both username and password.");
      return;
    }

    if (localStorage.getItem(newUsername)) {
      Swal.fire("Username already exists. Please choose another.");
      return;
    }

    const userData = {
      username: newUsername,
      password: newPassword,
    };
    localStorage.setItem(newUsername, JSON.stringify(userData));

    Swal.fire("Signup successful!");
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
