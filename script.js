let currentBanner = 0;
const banners = [
  document.getElementById('bannerVideo'),
  document.getElementById('bannerImage1'),
];
const indicators = document.querySelectorAll('.indicator');
const bannerVideo = document.getElementById('bannerVideo');

function showBanner(index) {
  banners.forEach((banner, i) => {
    if (i === index) {
      banner.style.opacity = '0';
      setTimeout(() => {
        banner.style.display = 'block';
        setTimeout(() => {
          banner.style.opacity = '1';
          if (banner.classList.contains('banner-image')) {
            const bannerText = banner.querySelector('.banner-text');
            bannerText.classList.add('active');
          }
        }, 50);
      }, 500);
      if (banner.tagName === 'VIDEO') {
        banner.currentTime = 0;
        banner.play();
      }
    } else {
      banner.style.opacity = '0';
      setTimeout(() => {
        banner.style.display = 'none';
        if (banner.classList.contains('banner-image')) {
          const bannerText = banner.querySelector('.banner-text');
          bannerText.classList.remove('active');
        }
      }, 500);
    }
  });
  indicators.forEach((indicator, i) => {
    indicator.classList.toggle('active', i === index);
  });
  currentBanner = index;
}

function nextBanner() {
  const nextIndex = (currentBanner + 1) % banners.length;
  showBanner(nextIndex);
}

function prevBanner() {
  const prevIndex = (currentBanner - 1 + banners.length) % banners.length;
  showBanner(prevIndex);
}

indicators.forEach(indicator => {
  indicator.addEventListener('click', () => {
    showBanner(parseInt(indicator.getAttribute('data-index')));
  });
});

bannerVideo.addEventListener('ended', () => {
  nextBanner();
});

showBanner(currentBanner); 

function updateSliderValue(value) {
  document.getElementById('sliderValue').textContent = value + '/10';
}

document.addEventListener('DOMContentLoaded', function() {
  var form = document.getElementById("feedbackForm");
  
  if(form) { 
      async function handleSubmit(event) {
          event.preventDefault();
          var status = document.getElementById("form-status");
          var data = new FormData(event.target);
          
          try {
              const response = await fetch(event.target.action, {
                  method: form.method,
                  body: data,
                  headers: {
                      'Accept': 'application/json'
                  }
              });
              
              if (response.ok) {
                  alert("Thank you! Your feedback has been submitted successfully!");
                  form.reset();
              } else {
                  const errorData = await response.json();
                  console.error("Error:", errorData);
                  alert("Oops! There was a problem submitting your form");
              }
          } catch (error) {
              console.error("Error:", error);
              alert("Oops! There was a problem submitting your form");
          }
      }
      
      form.addEventListener("submit", handleSubmit);
  }
});