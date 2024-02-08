document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.getElementById("nav-links");
  const loggedInUser = localStorage.getItem("loggedInUser");

  // Create "Go to map" link
  const mapLink = document.createElement("li");
  mapLink.innerHTML = '<a href="/map.html">Go to map</a>';

  if (loggedInUser) {
    // User is logged in
    // Add "Go to map" link
    navLinks.appendChild(mapLink);

    // Add "Log out" button
    const logoutLink = document.createElement("li");
    logoutLink.innerHTML = '<a href="#" id="logoutLink">Log out</a>';
    navLinks.appendChild(logoutLink);

    // Remove the login and signup links
    const loginLink = document.querySelector('a[href="/form.html"]');
    if (loginLink) {
      loginLink.parentElement.remove();
    }

    const signupLink = document.querySelector("a.nav__cta");
    if (signupLink) {
      signupLink.parentElement.remove();
    }
  } else {
    // User is not logged in
    // Remove "Go to map" link
    mapLink.remove();

    // Add "Log in" and "Sign up" links
    const loginLink = document.createElement("li");
    loginLink.innerHTML = '<a href="/form.html">Log in</a>';
    navLinks.appendChild(loginLink);

    const signupLink = document.createElement("li");
    signupLink.innerHTML = '<a href="/form.html" class="nav__cta">Sign up</a>';
    navLinks.appendChild(signupLink);
  }

  // Handle logout
  const logoutLink = document.getElementById("logoutLink");
  if (logoutLink) {
    logoutLink.addEventListener("click", function (event) {
      event.preventDefault();
      localStorage.removeItem("loggedInUser");
      // Redirect to home page or any other page after logout if needed
      window.location.href = "/";
    });
  }
});
