// -- ----- ----- ----- AOS ----- ----- ----- --
AOS.init();

// -- ----- ----- ----- TYPED JS ----- ----- ----- --
new Typed('.typed', {
  //Strings that you want to show
  strings: [
    '<i class="typedText">Designer</i>',
    '<i class="typedText">Developer</i>',
    '<i class="typedText">Darko!</i>'
  ],

  typeSpeed: 75, // Speed ​​in milliseconds to enter a letter
  startDelay: 300, // Delay time to start the animation. It also applies when it ends and starts again,
  backSpeed: 100, // Speed ​​in milliseconds to delete a letter,
  smartBackspace: true, // Delete only words that are new in a text string.
  shuffle: false, // Alter the order in which you write the words.
  backDelay: 500, // Waiting time after it finish typing a word.
  loop: false, // Repeat the array of strings
  loopCount: false, // Number of times to repeat the array.  false = infinite
  showCursor: true, // Show pulsating cursor
  cursorChar: '|', // Character for the cursor
  contentType: 'html', // 'html' or 'null' for plain text
  onComplete: function () {
    $(".typed-cursor").css("display", "none");
  }
});

// -- ----- ----- ----- MENU ----- ----- ----- --

// ACTIVE LINK (SELECTED OPTION)
$("#links li").click(function () { //Click function for the menu options
  $("#links li").removeClass("active") // Remove the active class of all options
  $(this).addClass("active"); // Add .active class to the option clicked
  $(":root").css("--width-active", $(this).width() + "px"); // Adjusts the width of the line below the selected menu option
});


//-- ----- ----- ----- REMOVE ACTIVE CLASS WHEN CLICKED LOGO TO GO MAIN ----- ----- ----- --
$("#logo").click(function () { //Click function for the logo
  $("#links li").removeClass("active") // Remove the active class of all options
});

//-- ----- ----- ----- CLOSE AND OPEN MENU ----- ----- ----- --

//function to mange how and when menu is closed or opened
document.addEventListener('DOMContentLoaded', function () { //Function triggered when document is fully load
  //Variable declaration
  const toggleMenu = document.querySelector('.toggleMenu');
  const closeMenu = document.querySelector('.closeMenu');
  const menu = document.querySelector('.menu');

  toggleMenu.addEventListener('click', function () { //Function that triggered when toggleMenu icon is clicked by user
    menu.classList.add('collapse'); //Add collapse class to show the menu
    setTimeout(() => {
      menu.classList.add('open');//Add open class to manage a menu transitio
    }, 10); // Delay for the transition
  });

  closeMenu.addEventListener('click', function () { //Function that triggered when closeMenu icon is clicked by user
    menu.classList.remove('open'); //Remove open class
    menu.classList.remove('collapse'); //Remove collapse
  });
});


// -- ----- ----- ----- CLOSE ON CLICK LINK ----- ----- ----- --

//function to close menu when some menu option is clicked
$('#links').on('click', function () { //Function that triggered when some option in menu is clicked
  $("#menu").removeClass('collapse'); //Remove collapse class to unshow menu
  $("html").css("overflow", "scroll"); //Show scroll bar in the margin of the page for some seconds
});

// -- ----- ----- ----- STICKY MENU ----- ----- ----- --

//function to style the menu when there is scrolling on the page
$(window).scroll(function () { //the function is triggered when there are a scroll in the page
  if (this.scrollY > 20) { //if the scroll is more than 20 pixels 
    $('.menu').addClass("sticky"); //Add sticky class to the menu to manage the style in css
  } else {
    $('.menu').removeClass("sticky"); //if not moren than 20pixels remove the sticky class
  }
});


// -- ----- ----- ----- SCROLL FUNCTION TO SECTIONS ----- ----- ----- --
document.querySelectorAll('a[href*="#"]').forEach(anchor => {// All <a> links whose href attribute contains # are selected, indicating that they are anchor links pointing to identifiers on the same page 
  anchor.addEventListener('click', function (e) { //Manage the click on the anchor (link)
    e.preventDefault();

    const targetId = this.getAttribute('href').substring(1); //The identifier of the anchor destination is obtained from the href attribute, removing the #
    const targetElement = document.getElementById(targetId); //Get the target element by that we store in the previous variable

    setTimeout(() => { 
      if (targetElement) { //Check if target exists
        const headerOffset = document.querySelector('#menu').offsetHeight || 100; //The height of the fixed or sticky menu (#menu) is obtained to calculate an offset.
        const targetPosition = targetElement.offsetTop - headerOffset; //Calculates the position of the target element from the top of the document (targetElement.offsetTop), subtracting the headerOffset (to offset the height of the menu).
        const startPosition = window.scrollY; // Get the actual position of the page
        const distance = targetPosition - startPosition; // Calculates the distance the window should move.
        const duration = 200; // duration of the animation
        let startTime = null;

        function animateScroll(currentTime) { //It is used to calculate how much time has passed since the start of the animation.
          if (startTime === null) startTime = currentTime; //Sets the start time of the animation when it is called for the first time.
          const timeElapsed = currentTime - startTime; //Calculates the time since the animation started.
          const run = ease(timeElapsed, startPosition, distance, duration); //Call the ease function to calculate the new scroll position based on the elapsed time.
          window.scrollTo(0, run); // Moves the window to the new calculated position

          if (timeElapsed < duration) requestAnimationFrame(animateScroll); //If the elapsed time is still less than the set duration, animateScroll is still called to continue the animation.
        }

        function ease(t, b, c, d) { //It is the smoothing function. It implements a quadratic easing algorithm that generates smooth acceleration and deceleration during the movement.
          t /= d / 2;
          if (t < 1) return c / 2 * t * t + b;
          t--;
          return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animateScroll);
      }
    }, 300);
  });
});


// -- ----- ----- ----- LOAD MORE ----- ----- ----- --

//function to show more than the 4 works that showed when the document load
$(document).ready(function () { //Function that triggered when document is load
  $(".item").slice(0, 3).show(); //Get the elements with .item class. Selected the 3 first and show them. 
  if ($(".item:hidden").length !== 0) { //Check if there are any .items element hidden
    $("#loadMore").show(); //Show the button 'load more'
  }
  $("#loadMore").on('click', function (e) { //Function that triggered when button load more is clicked
    e.preventDefault();
    $(".item:hidden").slice(0, 6).slideDown(); //Get the 6 elements hidden and show them. 
    if ($(".item:hidden").length === 0) { //Check if there are any .items element hidden
      $("#loadMore").fadeOut('slow'); // Unshow the load more button
    }
  });
});

// -- ----- ----- ----- LOAD MORE (credits) ----- ----- ----- --

//function to show all the credits
$(document).ready(function () {
  $("#creditsContent").hide(); // Hide the content when the document load
  $("#toggleCredits").text("Show Credits"); // Set the text of the button

  $("#toggleCredits").on('click', function (e) { //Manage the click in the button
    e.preventDefault();
    $("#creditsContent").slideToggle(() => { //Switch the visibility of the credits
      //Change the text of the button
      if ($("#creditsContent").is(":visible")) {
        $("#toggleCredits").text("Hide credits"); //if the credits are visible
      } else {
        $("#toggleCredits").text("Show credits"); //if not
      }
    });
  });
});


// -- ----- ----- ----- LIGHT/DARK MODE ----- ----- ----- --

//function to switch between dark and light mode
const btnSwitch = $("#switch"); //switch button
$(btnSwitch).on('click', function () { //manage the click on the switch
  $(btnSwitch).toggleClass('active'); // toggle the .active class
  if ($(btnSwitch).hasClass('active')) { //check if have the class .active
    day(); // if have day() function is run
  } else {
    dark(); // if not dark() function is run
  }

// LOCAL STORAGE

  // Function to save the light/dark mode value 
if ($(btnSwitch).hasClass('active')) {
    localStorage.setItem('dark-mode', 'false'); //if light mode is active save dark-mode false
  } else {
    localStorage.setItem('dark-mode', 'true'); //if not save dark-mode true
  }
});

if (localStorage.getItem('dark-mode') === 'true') { //Check the value stored
  $(btnSwitch).removeClass('active'); //if dark-mode is true remove .active class
  dark(); // and run dark() function
} else {
  $(btnSwitch).addClass('active'); //if not add .active class
  day(); // and run day() function
}


// -- ----- ----- ----- LIGHT MODE FUNCTION ----- ----- ----- --

//Function that change some variables to see the document in light mode
function day() {
  $(":root").css("--bg-color", "#f8f8f8");
  $(":root").css("--text-color", "#000");
  $(":root").css("--dark-color", "#f1f1f1");
  $(":root").css("--grey-text", "#777777");
  $(":root").css("--color-footer", "#e6e6e6");
  $(":root").css("--blue-color", "#1660f3");
  $(":root").css("--yellow-color", "#f3c337");
  $(":root").css("--color-button", "#fff");

  $("#logo").css("filter", "invert(1)");
  $("#toggleMenu").css("filter", "invert(1)");
  $("#closeMenu").css("filter", "invert(1)");
}

// -- ----- ----- ----- DARK MODE FUNCTION ----- ----- ----- --

//Function that change some variables to see the document in dark mode
function dark() {
  $(":root").css("--bg-color", "#131313");
  $(":root").css("--text-color", "#fff");
  $(":root").css("--dark-color", "#282828");
  $(":root").css("--color-footer", "#181818");
  $(":root").css("--blue-color", "#1660f3");
  $(":root").css("--grey-text", "#999999");
  $(":root").css("--yellow-color", "#f3c337");
  $(":root").css("--color-button", "#fff");

  $("#logo").css("filter", "invert(0)");
  $("#toggleMenu").css("filter", "invert(0)");
  $("#closeMenu").css("filter", "invert(0)");
}


// -- ----- ----- ----- AUTO POSITION LINE AND IMG IN EXPERIENCE SECTION ----- ----- ----- --

//Function to adjust the position of the icon and line in the experience section when the size of the display is different
$(window).on('load resize', function () { //Check if the window is resize after load
  let width = $(".experience .item").width(), //get the width of the item
    img = $(".experience .item img"), //get the icon
    line = $(".experience .item .line"), //get the line
    leftImg = Math.round((width * - 0.1) - 4), //Calculate the left position (in pixels) for icon. Multiply the width by -0.1 (which is 10% to the left) and subtract 4 additional pixels. The resulting value is rounded to an integer using Math.round().
    leftLine = Math.round((width * - 0.085)); //Calculates the left position (in pixels) for the .line element. Multiply the width by -0.085 (which is 8.5% to the left) and round the value.

  img.css("left", leftImg); //Adjusts the CSS left property of the selected images, shifting them to the left by the value calculated in leftImg.
  line.css("margin-left", leftLine); // Adjusts the margin-left property of the .line element, shifting the left margin by the value calculated in leftLine.
});


// -- ----- ----- ----- SHOW A MESSAGE WHEN CONTACT FORM IS SUBMITED ----- ----- ----- --

//function to show a message when the form contact is send correctly
document.getElementById('contactForm').addEventListener('submit', function(e) { // Select the contact form and add a listener for when it is sent
    e.preventDefault();//This method is used to prevent the form's default behavior, which would normally be sending the data to a server and reloading the page. This allows the form submission to be handled with JavaScript without the page reloading.

    const formMessage = document.getElementById('formMessage'); //This element will be used to display a confirmation message.
    formMessage.innerText = 'Message sent successfully.'; //Sets the message that will be shown to the user
    formMessage.style.display = 'block';//Show the message

    setTimeout(() => { //Start timer
        formMessage.classList.add('fade-out'); //This activates the CSS animation which causes the message to fade out which will be shown to the user
        setTimeout(() => { //Second timer to manage how long to wait before completely hiding the message.
            formMessage.style.display = 'none'; //Unshow the message
            formMessage.classList.remove('fade-out'); //Remove the class fade-out. It is important if you want to show the message again in the future
        }, 500); // Waits 500 ms (0.5 seconds) before hiding the message.
    }, 2000); // Waits 2000 ms (2 seconds) before starting to fade out the message.

    this.reset(); // Clean the form
});
