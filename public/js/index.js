//API//
//GET all posts from database

//container that holds feed of all the posts
var postFeed = $("#allPostFeed");
var nameInput = $("#userNameInput");
var emailInput = $("#inputEmail4");
var passwordInput = $("#inputPassword4");

//AJAX GET and display posts from db

$.get("api/posts", function(data) {
  console.log(data);

  if (data.length !== 0) {
    for (var i = 0; i < data.length; i++) {
      var row = $("<div>");
      row.addClass("post");

      row.append("<p>" + data[i].UserId + " posted.. </p>");
      row.append("<p>" + data[i].body + "</p>");
      row.append(
        "<p>At " + moment(data[i].createdAT).format("h:mma on dddd") + "</p>"
      );

      postFeed.prepend(row);
    }
  }
});

//func to handle what happens when form submitted to create a new user

$("#newUserSubmit").on("click", function(event) {
  event.preventDefault();
  // Don't do anything if the field hasn't been filled out
  if (
    !nameInput
      .val()
      .trim()
      .trim() ||
    !passwordInput.val().trim() ||
    !emailInput.val().trim()
  ) {
    alert("please fill out form completely");
  }

  var newUser = {
    username: nameInput.val().trim(),
    password: passwordInput.val().trim(),
    email: emailInput.val().trim(),
  };

  $.ajax({
    headers: {
      "Content-Type": "application/json",
    },
    type: "POST",
    url: "api/user",
    data: JSON.stringify({
      username: "username",
      password: "password",
      email: "email",
    }),
  });
});

//make sure inside greater context (submit)
// $.ajax({
//   headers: {
//     "Content-Type": "application/json",
//   },
//   type: "POST",
//   url: "api/blogpost",
//   data: JSON.stringify({
//     subject: "title",
//     category: "Fitness",
//     body: "fitness is great",
//     saved: false,
//   }),
// });
