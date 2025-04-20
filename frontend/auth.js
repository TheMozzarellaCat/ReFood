function showAuthSection(show = null) {
  // Determine which section to show
  const sectionToShow = show || window.location.hash.substring(1);

  if (sectionToShow === "register") {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("registerSection").style.display = "block";
    window.location.hash = "#register";
  } else {
    document.getElementById("loginSection").style.display = "block";
    document.getElementById("registerSection").style.display = "none";
    window.location.hash = "#login";
  }
}

// Handle form submissions
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      showMessage("loginMessage", `Welcome, ${data.user.username}!`, true);
      // Clear form
      document.getElementById("loginUsername").value = "";
      document.getElementById("loginPassword").value = "";
    } else {
      showMessage("loginMessage", data.message, false);
    }
  } catch (error) {
    showMessage("loginMessage", "Error connecting to server", false);
  }
});

document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("regUsername").value;
    const password = document.getElementById("regPassword").value;

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        showMessage("regMessage", data.message, true);
        // Clear form
        document.getElementById("regUsername").value = "";
        document.getElementById("regPassword").value = "";
      } else {
        showMessage("regMessage", data.message, false);
      }
    } catch (error) {
      showMessage("regMessage", "Error connecting to server", false);
    }
  });

// Switch between forms when links are clicked
document.querySelectorAll(".switch-form").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    showAuthSection(link.dataset.show);
  });
});

// Handle browser back/forward buttons
window.addEventListener("hashchange", () => {
  showAuthSection();
});

showAuthSection();
