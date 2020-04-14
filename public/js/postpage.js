/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

//global variables
var postFeed = $("#allPostFeed");

//AJAX GET and display all posts from db
function displayAllPosts() {
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
}
displayAllPosts();

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
  if (category === "All") {
    return displayAllPosts();
  } else {
    $.get("api/category/" + category, function(data) {
      // console.log(data);
      renderPosts(data);
    });
  }
});

//function for rendering posts
function renderPosts(data) {
  if (data.length !== 0) {
    postFeed.empty();
    for (var i = 0; i < data.length; i++) {
      var row = $("<div>");
      row.addClass("card w-100");
      var innerRow = $("<div class='card-body'>");

      row.append(innerRow);
      // row.append("<p>" + data[i].User.username + " posted.. </p>");
      innerRow.append("<h5 class='card-title'>" + data[i].subject + "</h5>");
      innerRow.append("<hr>");
      innerRow.append(
        "<p class='card-text' id='cardTextCategory'>Category: " +
          data[i].category +
          "</p>"
      );
      innerRow.append("<p class='card-text'>" + data[i].body + "</p>");
      innerRow.append(
        "<p class='card-text' id='card-text-moment'>At " +
          moment(data[i].createdAt).format("h:mma on dddd") +
          "</p>"
      );

      postFeed.prepend(row);
    }
  }
}
