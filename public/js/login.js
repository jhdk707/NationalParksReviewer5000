const loginFormHandler = async (event) => {
  event.preventDefault();

  const emailOrUsername = document
    .querySelector("#email-username-login")
    .value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (emailOrUsername && password) {
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ emailOrUsername, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to log in");
    }
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
