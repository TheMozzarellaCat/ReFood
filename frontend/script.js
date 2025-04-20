document.getElementById("loginBtn").addEventListener("click", () => {
  window.location.href = "auth.html#login";
});
      

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
