// -- ----- ----- ----- AOS ----- ----- ----- --
AOS.init();

// -- ----- ----- ----- TYPED JS ----- ----- ----- --
const typed = new Typed('.typed', {
  strings: [
    '<i class="typedText">Designer</i>',
    '<i class="typedText">Developer</i>',
    '<i class="typedText">Darko!</i>'
  ],

  typeSpeed: 75, // Velocidad en mlisegundos para poner una letra,
  startDelay: 300, // Tiempo de retraso en iniciar la animacion. Aplica tambien cuando termina y vuelve a iniciar,
  backSpeed: 100, // Velocidad en milisegundos para borrrar una letra,
  smartBackspace: true, // Eliminar solamente las palabras que sean nuevas en una cadena de texto.
  shuffle: false, // Alterar el orden en el que escribe las palabras.
  backDelay: 500, // Tiempo de espera despues de que termina de escribir una palabra.
  loop: false, // Repetir el array de strings
  loopCount: false, // Cantidad de veces a repetir el array.  false = infinite
  showCursor: true, // Mostrar cursor palpitanto
  cursorChar: '|', // Caracter para el cursor
  contentType: 'html', // 'html' o 'null' para texto sin formato
  onComplete: function () {
    $(".typed-cursor").css("display", "none");
  }
});

// -- ----- ----- ----- MENU ----- ----- ----- --

// ACTIVE LINK
$("#links li").click(function(){
  $("#links li").removeClass("active")
    $(this).addClass("active");
    $(":root").css("--width-active", $(this).width() + "px");
});

// // OPEN
// $('#toggleMenu').on('click', function () {
//   $("#menu").addClass('collapse');
//   $("html").css("overflow", "hidden");
// });

// // CLOSE
// $('#closeMenu').on('click', function () {
//   $("#menu").removeClass('collapse');
//   $("html").css("overflow", "scroll");
// });

document.addEventListener('DOMContentLoaded', function() {
  const toggleMenu = document.querySelector('.toggleMenu');
  const closeMenu = document.querySelector('.closeMenu');
  const menu = document.querySelector('.menu');

  toggleMenu.addEventListener('click', function() {
      menu.classList.add('collapse');
      setTimeout(() => {
          menu.classList.add('open');
      }, 10); // Pequeña demora para permitir la transición
  });

  closeMenu.addEventListener('click', function() {
      menu.classList.remove('open');
      // setTimeout(() => {
           menu.classList.remove('collapse');
      // }, 300); // Debe coincidir con la duración de la transición de cierre
  });
});


// CLOSE ON CLICK LINK
$('#links').on('click', function () {
  $("#menu").removeClass('collapse');
  $("html").css("overflow", "scroll");
});

// STICKY MENU
$(window).scroll(function () {
  if (this.scrollY > 20) {
    $('.menu').addClass("sticky");
  } else {
    $('.menu').removeClass("sticky");
  }
});


// ANCHOR TO SECTION ON CLICK LINK
// $('a[href*="#"]').on('click', function (e) {
//   $('html,body').animate({
//     scrollTop: $($(this).attr('href')).offset().top - 100
//   }, 200);
//   e.preventDefault();
// });

// Función de desplazamiento suave con recalculación dinámica
document.querySelectorAll('a[href*="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    // Recalcula dinámicamente el offset en caso de que el menú cambie
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    
    // Retardo para asegurar que cualquier cambio en el menú se complete
    setTimeout(() => {
      if (targetElement) {
        const headerOffset = document.querySelector('#menu').offsetHeight || 100; // Ajusta según el tamaño del menú
        const targetPosition = targetElement.offsetTop - headerOffset; // Calcula la posición correcta con offset
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 200; // Duración de la animación en milisegundos
        let startTime = null;

        function animateScroll(currentTime) {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const run = ease(timeElapsed, startPosition, distance, duration);
          window.scrollTo(0, run);

          if (timeElapsed < duration) requestAnimationFrame(animateScroll);
        }

        function ease(t, b, c, d) {
          t /= d / 2;
          if (t < 1) return c / 2 * t * t + b;
          t--;
          return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animateScroll);
      }
    }, 300); // Retardo de 300ms para dar tiempo a la animación del menú
  });
});

// Escucha cuando la ventana se redimensiona y recalcula los offsets
window.addEventListener('resize', () => {
  // Ajusta dinámicamente la altura de los elementos como headers o menús
  const header = document.querySelector('header');
  if (header) {
    const headerOffset = header.offsetHeight;
    // Puedes hacer aquí otros ajustes si es necesario.
  }
});




// -- ----- ----- ----- LOAD MORE ----- ----- ----- --
$(document).ready(function () {
  $(".item").slice(0, 3).show();
  if ($(".item:hidden").length != 0) {
    $("#loadMore").show();
  }
  $("#loadMore").on('click', function (e) {
    e.preventDefault();
    $(".item:hidden").slice(0, 6).slideDown();
    if ($(".item:hidden").length == 0) {
      $("#loadMore").fadeOut('slow');
    }
  });
});

// -- ----- ----- ----- LIGHT/DARK MODE ----- ----- ----- --
const btnSwitch = $("#switch");
$(btnSwitch).on('click', function () {
  $(btnSwitch).toggleClass('active');
  if ($(btnSwitch).hasClass('active')) {
    day();
  } else {
    dark();
  }

// LOCAL STORAGE

  if ($(btnSwitch).hasClass('active')) {
    localStorage.setItem('dark-mode', 'false');
  } else {
    localStorage.setItem('dark-mode', 'true');
  }
});

if (localStorage.getItem('dark-mode') === 'true') {
  $(btnSwitch).removeClass('active');
  dark();
} else {
  $(btnSwitch).addClass('active');
  day();
}


// -- ----- ----- ----- LIGHT MODE FUNCTION ----- ----- ----- --
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

$(window).on('load resize', function () {
  let width = $(".experience .item").width(),
    img = $(".experience .item img"),
    line = $(".experience .item .line"),
    leftImg = Math.round((width * - 0.1) - 4);
  leftLine = Math.round((width * - 0.085));

  img.css("left", leftImg);
  line.css("margin-left", leftLine);
});