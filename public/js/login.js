document.addEventListener("DOMContentLoaded", function () {
  async function loginFormHandler(event) {
    event.preventDefault();

    const emailInput = document.querySelector("#email-login");
    const passwordInput = document.querySelector("#password-login");

    if (emailInput && passwordInput) {
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
      console.log(email, password);

      if (email && password) {
        const response = await fetch("/api/user/login", {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          document.location.replace("/dashboard");
        } else {
          alert(response.statusText);
        }
      }
    }
  }

  const loginForm = document.querySelector(".login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", loginFormHandler);
  }
});