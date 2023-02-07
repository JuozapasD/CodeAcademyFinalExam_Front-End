const tableBody = document.querySelector("#cars-table tbody");

const getCookie = name => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let c = cookies[i].trim().split("=");
    if (c[0] === name) {
      return decodeURIComponent(c[1]);
    }
  }
  return "";
};

function parseJwt() {
  let token = getCookie("token");
  let base64Url = token.split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  let jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  console.log(JSON.parse(jsonPayload));
  return JSON.parse(jsonPayload);
}
//parseJwt();
function getRole() {
  let jwt = parseJwt();
  console.log(
    jwt["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
  );
  return jwt["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
}
getRole();

// prideti if, kad getrole == admin // getrole == user

if (getRole() == "Admin" || getRole() == "User") {
  async function fetchCars() {
    try {
      const response = await fetch("http://localhost:5136/Api/Car", {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`
        }
      });
      if (response.ok) {
        const cars = await response.json();
        cars.forEach(car => {
          const row = document.createElement("tr");
          const brandCell = document.createElement("td");
          brandCell.textContent = car.brand;
          const idCell = document.createElement("td");
          idCell.textContent = car.id;
          const colorCell = document.createElement("td");
          colorCell.textContent = car.color;

          // delete button gimimo vieta
          // CIA IKISTI IF, KAD USERIAI NEMATYTU DELETE BUTTON
          /////// PVZ IDETI PARAMETRA :DISABLED

          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.style.marginLeft = "10px";
          deleteButton.addEventListener("click", async () => {
            try {
              const response = await fetch(
                `http://localhost:5136/Api/Car/${car.id}`,
                {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${getCookie("token")}`
                  }
                }
              );
              if (response.ok) {
                row.remove();
              } else {
                console.error("Failed to delete car");
              }
            } catch (error) {
              console.error(error);
            }
          });

          //////////////////////////////////////

          brandCell.style.fontWeight = "bold";
          brandCell.style.textTransform = "uppercase";
          brandCell.style.border = "1px solid gray";
          brandCell.style.padding = "10px";
          idCell.style.padding = "10px";
          idCell.style.border = "1px solid gray";
          idCell.style.padding = "10px";
          colorCell.style.padding = "10px";
          colorCell.style.border = "1px solid gray";
          colorCell.style.padding = "10px";

          row.appendChild(idCell);
          row.appendChild(brandCell);
          row.appendChild(colorCell);
          row.appendChild(deleteButton);
          tableBody.appendChild(row);
        });
      } else {
        console.error("Failed to fetch cars");
      }
    } catch (error) {
      console.error(error);
    }
  }

  fetchCars();
}
