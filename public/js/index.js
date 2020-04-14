/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// TO DO:///////////////////////////////

// Login --getting an error, work w/Julie to understand database communication
// logic for sorting posts by category - tied to db?
// Logout?
// click on save button to save to a user's profile
// make posts look better

///////////////////////////////////////

//global variables

var nameInput = $("#userNameInput");
var emailInput = $("#inputEmail4");
var passwordInput = $("#inputPassword4");
var regUserNameInput = $("#registeredUserName");
var regUserPassword = $("#registeredPass");

//func to handle an already registered user to login
$("#regUserLoginSubmit").on("click", function(event) {
  event.preventDefault();
  // Don't do anything if a field hasn't been filled out
  if (
    !regUserNameInput
      .val()
      .trim()
      .trim() ||
    !regUserPassword.val().trim()
  ) {
    alert("please fill out form completely");
  }

  let username = regUserNameInput.val().trim();
  let password = regUserPassword.val().trim();

  $.ajax({
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    type: "POST",
    url: "api/signin",
    data: JSON.stringify({
      username: username,
      password: password
    })
  });
});

// func to handle what happens when form submitted to create a new user
$("#newUserSubmit").on("click", function(event) {
  event.preventDefault();
  // Don't do anything if a field hasn't been filled out
  if (
    !nameInput.val().trim() ||
    !passwordInput.val().trim() ||
    !emailInput.val().trim()
  ) {
    alert("please fill out form completely");
  }

  let username = nameInput.val().trim();
  let password = passwordInput.val().trim();
  let email = emailInput.val().trim();

  $.ajax({
    headers: {
      "Content-Type": "application/json"
    },
    type: "POST",
    url: "api/user",
    data: JSON.stringify({
      username: username,
      password: password,
      email: email
    })
  });
});
