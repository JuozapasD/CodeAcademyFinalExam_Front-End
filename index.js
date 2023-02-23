const form = document.querySelector("form");
const username = document.querySelector("input[name='username']");
const password = document.querySelector("input[name='password']");

form.addEventListener("submit", async e => {
  e.preventDefault();
  const name = username.value;
  const pwd = password.value;
  try {
    const response = await fetch("https://localhost:7112/api/Accounts/SignUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userName: name,
        password: pwd
      })
    });
  } catch (error) {
    console.error(error);
  }
});
