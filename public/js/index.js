/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// To Do:
// clear the forms after submit
// Login
//logic for sorting posts by category

///////////////////////////////////////

//global variables
var postFeed = $("#allPostFeed");
var nameInput = $("#userNameInput");
var emailInput = $("#inputEmail4");
var passwordInput = $("#inputPassword4");
var regUserNameInput = $("#registeredUserName");
var regUserPassword = $("#registeredPass");

//AJAX GET and display all posts from db

$.get("api/posts", function(data) {
  console.log(data);

  if (data.length !== 0) {
    for (var i = 0; i < data.length; i++) {
      var row = $("<div>");
      row.addClass("post");
      row.append("<p>" + data[i].User.username + " posted.. </p>");
      row.append("<p>" + data[i].category + "</p>");
      row.append("<p>" + data[i].body + "</p>");
      row.append(
        "<p>At " + moment(data[i].createdAt).format("h:mma on dddd") + "</p>"
      );
      row.append("____________________________________________");

      postFeed.prepend(row);
    }
  }
});

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
    },
    type: "POST",
    url: "api/signin",
    data: JSON.stringify({
      username: username,
      password: password,
    }),
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
      "Content-Type": "application/json",
    },
    type: "POST",
    url: "api/user",
    data: JSON.stringify({
      username: username,
      password: password,
      email: email,
    }),
  });
});

//this handles when a user makes a new post
$("#newPostSubmit").on("click", function(event) {
  let subjInput = $("#subjectLineInput")
    .val()
    .trim();
  let categoryInput = $("#categorySelect").val();
  let bodyInput = $("#textPostInput")
    .val()
    .trim();

  $.ajax({
    headers: {
      "Content-Type": "application/json",
    },
    type: "POST",
    url: "api/post",
    data: JSON.stringify({
      subject: subjInput,
      category: categoryInput,
      body: bodyInput,
      saved: false,
    }),
  });
});
