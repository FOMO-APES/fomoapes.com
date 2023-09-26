// FAQ Auto Close
$('[data-click="faq"]').click(function() {
  if (!$(this).is('.open')) {
    $('[data-click="faq"].open').each((i, item) => {
      item.click();
    });
    $(this).addClass('open');
  } else {
    $(this).removeClass('open');
  }
});

// Number Counter Up
$('.counter').counterUp({
 delay: 1,
 time: 200,
});
$('.counter').addClass('animated fadeIn');

// Number RNG
function getRandomNumber() {
  return Math.floor(Math.random() * 10000000);
}

function formatNumberWithCommasAndZeros(number) {
  const formattedNumber = number.toString().padStart(7, '0');
  const parts = [
    formattedNumber.slice(0, 1),
    formattedNumber.slice(1, 4),
    formattedNumber.slice(4)
  ];
  return parts.join(',');
}

function updateNumberDisplay() {
  const elements = document.querySelectorAll('.random, .end-card-usdc-text');
  const randomNumber = getRandomNumber();
  const formattedNumber = formatNumberWithCommasAndZeros(randomNumber) + ' USDC';
  elements.forEach(element => {
    element.textContent = formattedNumber;
  });
}

function animateNumber() {
  setInterval(() => {
    for (let i = 0; i < 20; i++) {
      setTimeout(updateNumberDisplay, 50 * i);
    }
    setTimeout(updateNumberDisplay, 1000);
  }, 2050);
  updateNumberDisplay();
}

document.addEventListener('DOMContentLoaded', () => {
  animateNumber();
});

// Volume Slider
document.querySelectorAll(".slider").forEach(function(slider) {
  slider.addEventListener("input", function(e) {
    let value = ((e.target.value - e.target.min) / (e.target.max - e.target.min)) * 100;
    e.target.style.backgroundImage = `linear-gradient(to right, #ff0004 ${value}%, #ff000426 ${value}%)`;
  });
});

// FAQ Red Text
$('.fs_accordion-2_item.dropdown').on("click", function() {
  $('.fs_accordion-2_header.dropdown-toggle').css('color', '#d4d8e7');
  if ($(this).hasClass("is-active-accordion"))
    $(this).children().children('.fs_accordion-2_header.dropdown-toggle').css('color', 'red');
});

// Volume Slider Tracking
for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
  e.style.setProperty("--value", e.value);
  e.style.setProperty("--min", e.min == "" ? "0" : e.min);
  e.style.setProperty("--max", e.max == "" ? "100" : e.max);
  e.addEventListener("input", () => e.style.setProperty("--value", e.value));
}

// Play/Pause Animation
document.addEventListener("DOMContentLoaded", function() {
  const video = document.querySelector('[f-data-video="video-element"]');
  const playIcon = document.querySelector('[f-data-video="play-icon"]');
  const pauseIcon = document.querySelector('[f-data-video="pause-icon"]');
  video.addEventListener('play', function() {
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
  });
  video.addEventListener('pause', function() {
    pauseIcon.style.display = 'none';
    playIcon.style.display = 'block';
  });
});

// Auto-pause Video on scroll
document.addEventListener("DOMContentLoaded", function() {
  const video = document.querySelector('video');
  function handleIntersection(entries) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        video.pause();
      }
    });
  }
  const observer = new IntersectionObserver(handleIntersection, {
    root: null,
    threshold: 0.25
  });
  observer.observe(video);
});

// Show/Hide Controls
document.addEventListener("DOMContentLoaded", function() {
  const videoWrapper = document.querySelector('.video-wrapper');
  const videoControls = document.querySelector('.video-controls');
  let hoverTimeout;
  let movementTimeout;
  let lastMoveTime = Date.now();
  let lastMousePosition = { x: null, y: null };
  function hideControls() {
    videoControls.style.opacity = '0';
    videoControls.style.transition = 'opacity 500ms';
  }
  function showControls() {
    videoControls.style.opacity = '1';
    videoControls.style.transition = 'opacity 50ms';
  }
  videoWrapper.addEventListener('mouseover', function() {
    clearTimeout(hoverTimeout);
    clearTimeout(movementTimeout);
    showControls();
  });
  videoWrapper.addEventListener('mousemove', function(e) {
    const now = Date.now();
    if (now - lastMoveTime < 50) return;
    lastMoveTime = now;
    clearTimeout(hoverTimeout);
    clearTimeout(movementTimeout);
    showControls();
    if (Math.abs(lastMousePosition.x - e.clientX) > 5 || Math.abs(lastMousePosition.y - e.clientY) > 5) {
      lastMousePosition.x = e.clientX;
      lastMousePosition.y = e.clientY;
      movementTimeout = setTimeout(hideControls, 1000);
    }
  });
  videoWrapper.addEventListener('mouseleave', function() {
    hoverTimeout = setTimeout(hideControls, 250);
  });
  if (videoWrapper.matches(":hover")) {
    hideControls();
  }
});

// Play/Pause Video Controls Button Initial State
document.addEventListener("DOMContentLoaded", function() {
  const playButton = document.querySelector('[f-data-video="play-button"]');
  const pauseButton = document.querySelector('[f-data-video="pause-button"]');
  const videoElement = document.querySelector('video');
  function updateButtons() {
    if (videoElement.paused) {
      playButton.style.display = 'block';
      pauseButton.style.display = 'none';
    } else {
      playButton.style.display = 'none';
      pauseButton.style.display = 'block';
    }
  }
  setInterval(updateButtons, 100);
});

// End Card Hide/Show
document.addEventListener("DOMContentLoaded", function() {
  const videoElement = document.querySelector('video');
  const button = document.querySelector('.tell-me-more');
  const endCard = document.querySelector('.end-card');
  videoElement.addEventListener('ended', function() {
    button.classList.add('show');
    endCard.classList.add('show');
  });
  videoElement.addEventListener('play', function() {
    button.classList.remove('show');
    endCard.classList.remove('show');
  });
});

// Preload Video
document.addEventListener("DOMContentLoaded", function() {
  const videoElement = document.querySelector('video');
  videoElement.load();
});

// Autoplay Video
document.addEventListener("DOMContentLoaded", function() {
  const video = document.querySelector('video');
  const thumbnail = document.querySelector('.video-thumbnail');
  if(thumbnail) {
    thumbnail.addEventListener('click', function() {
      video.play();
    });
  }
});

// Video End Card
document.addEventListener("DOMContentLoaded", function() {
    const videoElement = document.querySelector('video');
    const endCard = document.querySelector('.end-card');
    const videoPlayOverlay = document.querySelector('.video-play-overlay');
    const tellMeMoreButton = document.querySelector('.tell-me-more');
    let isVideoPlaying = false;

    videoElement.addEventListener('ended', function() {
        endCard.classList.add('show');
        videoPlayOverlay.style.display = 'none';
        isVideoPlaying = false;
    });

    videoElement.addEventListener('play', function() {
        videoPlayOverlay.style.display = 'flex';
        endCard.classList.remove('show');
        isVideoPlaying = true;
    });

    videoElement.addEventListener('pause', function() {
        isVideoPlaying = false;
    });

    videoPlayOverlay.addEventListener('click', function() {
        if (isVideoPlaying) {
            videoElement.pause();
        } else {
            videoElement.play();
        }
    });

    endCard.addEventListener('click', function(e) {
        let target = e.target;
        while (target != null) {
            if (target.isSameNode(tellMeMoreButton)) {
                return;
            }
            target = target.parentElement;
        }
        videoElement.play();
    });
});
