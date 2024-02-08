document.addEventListener("DOMContentLoaded", function () {
  const loginCard = document.getElementById("loginCard");
  const signupCard = document.getElementById("signupCard");
  const showSignupLink = document.getElementById("showSignup");
  const showLoginLink = document.getElementById("showLogin");
  const userContainer = document.getElementById("userContainer");
  const loggedInUser = document.getElementById("loggedInUser");
  const logoutBtn = document.getElementById("logoutBtn");

  // Function to show the signup form and hide the login form
  function showSignupForm() {
    loginCard.style.display = "none";
    signupCard.style.display = "block";
  }

  // Function to show the login form and hide the signup form
  function showLoginForm() {
    signupCard.style.display = "none";
    loginCard.style.display = "block";
  }

  // Function to show user info and logout button
  function showUserInfo(username) {
    loggedInUser.textContent = `Logged in as: ${username}`;
    userContainer.style.display = "flex";
  }

  // Function to hide user info and logout button
  function hideUserInfo() {
    userContainer.style.display = "none";
  }

  // Event listener for the "Sign Up" link
  showSignupLink.addEventListener("click", function (event) {
    event.preventDefault();
    showSignupForm();
  });

  // Event listener for the "Login" link
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
      showUserInfo(username);
    } else {
      alert("Invalid username or password. Please register.");
    }
  });

  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const newUsername = document.getElementById("newUsername").value;
    const newPassword = document.getElementById("newPassword").value;

    // Check if username already exists
    if (localStorage.getItem(newUsername)) {
      alert("Username already exists. Please choose another.");
      return;
    }

    // Store new user data in local storage
    const userData = {
      username: newUsername,
      password: newPassword,
    };
    localStorage.setItem(newUsername, JSON.stringify(userData));

    alert("Signup successful!");
    showLoginForm(); // After successful signup, show the login form
  });

  logoutBtn.addEventListener("click", function () {
    hideUserInfo();
  });
});
