const signupForm = document.querySelector(".signup-form");

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(signupForm);

  const response = await fetch("/api/user", {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert("Failed to sign up");
  }
});
