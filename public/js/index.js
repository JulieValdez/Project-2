//API
//GET all posts from database
//if a user is logged in, they can create a post which POST to db

//container that holds feed of all the posts
var postFeed = $("#allPostFeed");

//AJAX GET and display posts from db

$.get("api/posts", function(data) {
  if (data.length !== 0) {
    for (var i = 0; i < data.length; i++) {
      var row = $("<div>");
      row.addClass("post");

      row.append("<p>" + data[i].Userid + " posted.. </p>");
      row.append("<p>" + data[i].body + "</p>");
      row.append(
        "<p>At " + moment(data[i].createdAT).format("h:mma on dddd") + "</p>"
      );

      postFeed.prepend(row);
    }
  }
});
