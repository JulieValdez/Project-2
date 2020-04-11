/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// TO DO:///////////////////////////////
// clear the forms after submit? or will we take user somewhere new?
// Login --getting an error, work w/Julie to understand database communication
// logic for sorting posts by category - tied to db?
// Logout?
// click on save button to save to a user's profile
// make posts look better

///////////////////////////////////////

//global variables
var postFeed = $("#allPostFeed");
var nameInput = $("#userNameInput");
var emailInput = $("#inputEmail4");
var passwordInput = $("#inputPassword4");
var regUserNameInput = $("#registeredUserName");
var regUserPassword = $("#registeredPass");

//AJAX GET and display all posts from db

$.ajax({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`
  },
  type: "GET",
  url: "api/posts"
}).then(function(data) {
  // console.log(data);
  renderPosts(data);
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
      "Content-Type": "application/json"
    },
    type: "POST",
    url: "api/post",
    data: JSON.stringify({
      subject: subjInput,
      category: categoryInput,
      body: bodyInput,
      saved: false
    })
  }).then(function() {
    // Reload the page to get the updated list
    location.reload();
  });
});

//func to handle when a specific category is selected for viewing
$("select#viewCategoryDrop").change(function() {
  // alert($(this).val());
  let category = $(this).val();

  $.get("api/category/" + category, function(data) {
    // console.log(data);
    renderPosts(data);
  });
});

//function for rendering posts
function renderPosts(data) {
  if (data.length !== 0) {
    postFeed.empty();
    for (var i = 0; i < data.length; i++) {
      var row = $("<div>");
      row.addClass("post");
      // row.append("<p>" + data[i].User.username + " posted.. </p>");
      row.append("<p>" + data[i].category + "</p>");
      row.append("<p>" + data[i].body + "</p>");
      row.append(
        "<p>At " + moment(data[i].createdAt).format("h:mma on dddd") + "</p>"
      );
      row.append("____________________________________________");

      postFeed.prepend(row);
    }
  }
}
