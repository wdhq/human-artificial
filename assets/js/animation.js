// This script handles loading and displaying ASCII frames in a loop
fetch('assets/js/data.json')
  .then(response => response.json())
  .then(frames => {
    const asciiArt = document.getElementById('ascii-art');
    let currentFrame = 0;

    function playAnimation() {
      asciiArt.textContent = frames[currentFrame];

      currentFrame = (currentFrame + 1) % frames.length;

      setTimeout(playAnimation, 60);
    }

    playAnimation();
  })
  .catch(error => console.error('Error loading ASCII frames:', error));
