var hamButton = document.querySelector("#ham-icon");
var navLinks = document.querySelector("#nav-links");

function toggleNav() {
  if (window.innerWidth >= 868) {
    // Check if the screen size is normal (e.g., width >= 768px)
    navLinks.style.display = "block"; // Display the navigation links
  } else {
    // For smaller screens, toggle the navigation links
    if (navLinks.style.display === "block") {
      navLinks.style.display = "none";
    } else {
      navLinks.style.display = "block";
    }
  }
}

// Initial call to set the initial state based on screen size
toggleNav();

hamButton.addEventListener("click", toggleNav);

// Listen for window resize events
window.addEventListener("resize", toggleNav);

$(document).ready(function () {
    function createCard(data) {
      var cardGrid = $("#card-grid");
  
      var cardCell = $("<div>").addClass("container");
  
      var card = $("<div>").addClass("card");
  
      var cardInfo = $("<div>").addClass("card-container");
  
      var cardTitle = $("<p>").addClass("card-divider").text(data.activity);
  
      var participants = $("<p>")
        .addClass("participants")
        .text("Number of Participants: " + data.participants);
  
      var type = $("<p>")
        .addClass("type")
        .text("Type of activity: " + data.type);
  
      var accessibility = $("<p>")
        .addClass("accessibility")
        .text("Accessibility Level: " + data.accessibility);
  
      var price = $("<p>")
        .addClass("price")
        .text("Price Scale: " + data.price);
  
      if (data.link !== "") {
        var link = $("<p>")
          .addClass("link")
          .text("Link: " + data.link);
        cardInfo.append(link);
      }
  
      var button = $('<button>').addClass('button alert large').text("New Activity");
      var buttonContainer = $('<div>').addClass('button-container');
  
      buttonContainer.append(button);
      cardInfo.append(type, participants, accessibility, price);
      card.append(cardTitle);
      card.append(cardInfo);
      card.append(buttonContainer);
      cardCell.append(card);
      cardGrid.append(cardCell);
  
      button.on('click', function () {
        
        activity(card);
      });
    }
  

    function activity(card) {
      $.ajax({
        type: "GET",
        url: "http://www.boredapi.com/api/activity/",
        imageUrl: "#",
        dataType: "json",
      }).then((data) => {
        console.log(data);
        updateCard(card, data);
      });
    }
  
    function updateCard(card, data) {
      card.find(".card-divider").text(data.activity);
      card.find(".participants").text("Number of Participants: " + data.participants);
      card.find(".type").text("Type of activity: " + data.type);
      card.find(".accessibility").text("Accessibility Level: " + data.accessibility);
      card.find(".price").text("Price Scale: " + data.price);
  
      var link = card.find(".link");
      if (data.link !== "") {
        if (link.length === 0) {
          link = $("<p>")
            .addClass("link");
          card.find(".card-container").append(link);
        }
        link.text("Link: " + data.link);
      } else {
        link.remove();
      }
    }
  
    $.ajax({
      type: "GET",
      url: "http://www.boredapi.com/api/activity/",
      imageUrl: "#",
      dataType: "json",
    }).then((data) => {

      createCard(data);
    });
  });
  