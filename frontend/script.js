// Code for the search bar appearing from the top
const flexibleSearchBar = document.querySelector(
  ".flexible-search-bar-container"
);
const triggerPosition = window.innerHeight * 0.2;

window.addEventListener("scroll", () => {
  if (window.scrollY > triggerPosition) {
    flexibleSearchBar.classList.add("visible");
  } else {
    flexibleSearchBar.classList.remove("visible");
  }
});  

// All frontend login display logic
const loginButton = document.querySelector(".auth-btn")
const loginPopUpContainer = document.querySelector(".login-pop-up-container")

loginButton.addEventListener('click', (e) =>{
  e.preventDefault();
  window.location.href = "index.html#login";
  if(loginPopUpContainer.classList.contains("login-visible")){
    loginPopUpContainer.classList.remove("login-visible")
  }else{
    loginPopUpContainer.classList.add("login-visible")
  }
  
})


function showAuthSection(show = null) {
  const sectionToShow = show || window.location.hash.substring(1);

  if (sectionToShow === "register") {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("registerSection").style.display = "flex";
    window.location.hash = "#register";
  } else {
    document.getElementById("loginSection").style.display = "flex";
    document.getElementById("registerSection").style.display = "none";
    window.location.hash = "#login";
  }
}
document.querySelectorAll(".close-login").forEach((button) => {
  button.addEventListener("click", () => {
    document
      .querySelector(".login-pop-up-container")
      .classList.remove("login-visible");
  });
});

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
        document.getElementById("regUsername").value = "";
        document.getElementById("regPassword").value = "";
      } else {
        showMessage("regMessage", data.message, false);
      }
    } catch (error) {
      showMessage("regMessage", "Error connecting to server", false);
    }
  });

document.querySelectorAll(".switch-form").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    showAuthSection(link.dataset.show);
  });
});

window.addEventListener("hashchange", () => {
  showAuthSection();
});

showAuthSection();


document.querySelector('.left-scroll-button').addEventListener('click', () => {
    document.querySelector('.product-cards-container').scrollBy({
        left: -400,
        behavior: 'smooth'
    });
});

document.querySelector('.right-scroll-button').addEventListener('click', () => {
    document.querySelector('.product-cards-container').scrollBy({
        left: 400,
        behavior: 'smooth'
    });
});

document.querySelector("#left-scroll-button").addEventListener("click", () => {
  document.querySelector("#product-cards-container").scrollBy({
    left: -400,
    behavior: "smooth",
  });
});

document.querySelector("#right-scroll-button").addEventListener("click", () => {
  document.querySelector("#product-cards-container").scrollBy({
    left: 400,
    behavior: "smooth",
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      const accordionItem = this.parentElement;
      const accordionContent = this.nextElementSibling;

      document.querySelectorAll(".accordion-item").forEach((item) => {
        if (item !== accordionItem) {
          item.querySelector(".accordion-header").classList.remove("active");
          item.querySelector(".accordion-content").classList.remove("active");
        }
      });

      this.classList.toggle("active");
      accordionContent.classList.toggle("active");
    });
  });
});
