// const form = document.querySelector("form");
// const formDel = document.getElementById("delete-form");
// const getButton = document.getElementById("get-button");
// const postButton = form.querySelector("button.request-button[type='submit']");
// const deleteButton = document.getElementById("delete-button");

// getButton.addEventListener("click", async e => {
//   e.preventDefault();

//   try {
//     const response = await fetch("http://localhost:5251/api/Cars");
//     const data = await response.json();
//     console.log(data);

//     data.map(car => {
//       let p = document.createElement("p");
//       p.innerHTML = `Brand: ${car.brand} Year made: ${car.yearMade} Gas Type: ${car.gasType} ID: ${car.id}`;
//       p.classList.add("car-info");
//       document.body.appendChild(p);
//     });
//   } catch (error) {
//     console.error(error);
//   }
// });

// // putButton.addEventListener("click", async e => {
// //   e.preventDefault();
// //   const userInput = form.querySelector("input[type='text']").value;
// //   try {
// //     const response = await fetch("http://localhost:5251/api/Cars" + userInput, {
// //       method: "PUT",
// //       headers: {
// //         "Content-Type": "application/json"
// //       },
// //       body: JSON.stringify({
// //         ///////////////////////////////
// //       })
// //     });
// //     const data = await response.json();
// //     console.log(data);
// //   } catch (error) {
// //     console.error(error);
// //   }
// // });
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

// deleteButton.addEventListener("click", async e => {
//   e.preventDefault();
//   const id = formDel.querySelector("input#delete").value;
//   try {
//     const response = await fetch("http://localhost:5251/api/Cars/" + id, {
//       method: "DELETE"
//     });
//   } catch (error) {
//     console.error(error);
//   }
// });
