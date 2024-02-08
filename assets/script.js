document.addEventListener("DOMContentLoaded", function () {
  const loginCard = document.getElementById("loginCard");
  const signupCard = document.getElementById("signupCard");
  const userContainer = document.getElementById("userContainer");
  const loginLink = document.getElementById("loginLink");

  function showSignupForm() {
    if (loginCard && signupCard) {
      loginCard.style.display = "none";
      signupCard.style.display = "block";
    }
  }

  function showLoginForm() {
    if (signupCard && loginCard) {
      signupCard.style.display = "none";
      loginCard.style.display = "block";
    }
  }

  function showUserInfo(username) {
    if (userContainer) {
      userContainer.innerHTML = `
        <li>Welcome, ${username}</li>
        <li><button id="logoutBtn">Logout</button></li>
      `;
      userContainer.style.display = "flex";
      if (loginLink) {
        loginLink.style.display = "none";
      }
    }
  }

  function showLoginSignupLinks() {
    if (userContainer) {
      userContainer.innerHTML = "";
      userContainer.style.display = "none";
      if (loginLink) {
        loginLink.style.display = "block";
      }
    }
  }

  const loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser) {
    showUserInfo(loggedInUser);
  } else {
    showLoginSignupLinks();
  }

  const showSignupLink = document.getElementById("showSignup");
  if (showSignupLink) {
    showSignupLink.addEventListener("click", function (event) {
      event.preventDefault();
      showSignupForm();
    });
  }

  const showLoginLink = document.getElementById("showLogin");
  if (showLoginLink) {
    showLoginLink.addEventListener("click", function (event) {
      event.preventDefault();
      showLoginForm();
    });
  }

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (event) {
      event.preventDefault();
      localStorage.removeItem("loggedInUser");
      showLoginSignupLinks();
    });
  }
});
