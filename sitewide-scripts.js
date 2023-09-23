// Flicker 
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function animateFlicker() {
    const elements = document.querySelectorAll('.flicker');
    elements.forEach(element => {
        let flickerTimeout;

        function flickerLoop() {
            element.style.opacity = '0.2';
            setTimeout(() => {
                element.style.opacity = '1';
                setTimeout(() => {
                    element.style.opacity = '0.2';
                    setTimeout(() => {
                        element.style.opacity = '1';
                        flickerTimeout = setTimeout(flickerLoop, 1000);
                    }, 33);
                }, 33);
            }, 66);
        }

        function subtleFlicker() {
            const currentOpacity = parseFloat(element.style.opacity);
            let targetOpacity = getRandom(currentOpacity - 0.1, currentOpacity + 0.1);
            if (element.style.opacity <= 0.9 && element.style.opacity >= 0.2) {
                targetOpacity = Math.max(targetOpacity, 0.9);
            }
            element.style.opacity = targetOpacity;
            setTimeout(subtleFlicker, 50);
        }

        flickerLoop();
        subtleFlicker();

        document.addEventListener('DOMContentLoaded', () => {
            flickerTimeout = setTimeout(flickerLoop, 1000);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    animateFlicker();
});

// Hero Animation 
document.addEventListener("DOMContentLoaded", function() {
    function animateText(className) {
        const textElement = document.querySelector(className);
        const staticParts = ['FO:MO', 'AP:ES'];
        const randomLetters = 'ABCDEFGHJKLMNOPQRSTUVWXYZ';

        function getRandomLetter() {
            return randomLetters[Math.floor(Math.random() * randomLetters.length)];
        }

        function updateText() {
            textElement.textContent = staticParts[0];

            setTimeout(() => {
                let dynamicText = '';
                for (let i = 0; i < 2; i++) {
                    dynamicText += getRandomLetter();
                }
                dynamicText += ':';
                for (let i = 0; i < 2; i++) {
                    dynamicText += getRandomLetter();
                }

                textElement.textContent = dynamicText;
                let dynamicInterval = setInterval(() => {
                    let updatedDynamicText = dynamicText.split('');
                    for (let i = 0; i < 2; i++) {
                        updatedDynamicText[i] = getRandomLetter();
                        updatedDynamicText[i + 3] = getRandomLetter();
                    }
                    textElement.textContent = updatedDynamicText.join('');
                }, 25);

                setTimeout(() => {
                    clearInterval(dynamicInterval);
                    textElement.textContent = staticParts[1];

                    setTimeout(() => {
                        dynamicText = '';
                        for (let i = 0; i < 2; i++) {
                            dynamicText += getRandomLetter();
                        }
                        dynamicText += ':';
                        for (let i = 0; i < 2; i++) {
                            dynamicText += getRandomLetter();
                        }

                        textElement.textContent = dynamicText;
                        dynamicInterval = setInterval(() => {
                            let updatedDynamicText = dynamicText.split('');
                            for (let i = 0; i < 2; i++) {
                                updatedDynamicText[i] = getRandomLetter();
                                updatedDynamicText[i + 3] = getRandomLetter();
                            }
                            textElement.textContent = updatedDynamicText.join('');
                        }, 50);

                        setTimeout(() => {
                            clearInterval(dynamicInterval);
                            animateText(className);
                        }, 500);
                    }, 1000);
                }, 500);
            }, 1000);
        }

        updateText();
    }

    animateText('.fomo-hero-title'); // Applying animation to .fomo-hero-title
    animateText('.end-card-text');   // Applying animation to .end-card-text
});

// No Scroll Load 
document.body.style.overflow = 'hidden';
window.addEventListener('load', function() {
    document.body.style.overflow = 'visible';
});
