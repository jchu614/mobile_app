const url = "https://gentle-retreat-28783.herokuapp.com";
export default {
  getMoney: () => {
    return fetch(url + "/api/account/money").then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else return { message: { msgBody: "Unauthorized" }, msgError: true };
    });
  },
  postAmount: (money) => {
    return fetch(url + "/api/account/money", {
      method: "post",
      body: JSON.stringify(money),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else return { message: { msgBody: "Unauthorized" }, msgError: true };
    });
  },
  editAmount: (id, amount) => {
    return fetch(url + "/api/money/" + id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ moneyLeft: amount }),
    }).then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else return { message: { msgBody: "Unauthorized" }, msgError: true };
    });
  },
  editStart: (id, amount) => {
    return fetch(url + "/api/money/" + id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ moneyStart: amount, moneyLeft: amount }),
    }).then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else return { message: { msgBody: "Unauthorized" }, msgError: true };
    });
  },
};
