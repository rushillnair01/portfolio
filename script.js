document.addEventListener("DOMContentLoaded", () => {
    console.log("Portfolio Loaded");

    // 1. Scroll Reveal Logic
    const revealElements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                }
            });
        },
        { threshold: 0.15 }
    );

    revealElements.forEach(element => { observer.observe(element); });

    // 2. CNN Feature Map Simulation
    const profileImgSrc = document.querySelector('.profile-pic').src;
    const featureMaps = document.querySelectorAll('.feature-map');
    
    const cnnFilters = [
        'filter-edges', 'filter-relu', 'filter-pool', 'filter-abstract', 'filter-activation'
    ];

    featureMaps.forEach((map, index) => {
        const imgElement = document.createElement('img');
        imgElement.src = profileImgSrc;
        imgElement.className = `feature-map-img ${cnnFilters[index % cnnFilters.length]}`;
        map.appendChild(imgElement);
    });

    // 3. Simulated "Training Epochs" Text Stream Output
    const nameElement = document.getElementById("output-text");
    
    if (nameElement) {
        const finalText = "Hey this is, Rushill Nair;\nMachine Learning Engineer";
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*<>";
        let epoch = 0;
        const maxEpochs = 60; // Total frames for the animation to complete
        
        // Wait 1.5 seconds to let the user see the CNN filters load
        setTimeout(() => {
            const interval = setInterval(() => {
                epoch++;
                let currentText = "";
                let progress = epoch / maxEpochs;

                for (let i = 0; i < finalText.length; i++) {
                    if (finalText[i] === " " || finalText[i] === "\n") {
                        currentText += finalText[i];
                        continue;
                    }
                    
                    // Characters lock in sequentially from left to right as "progress" increases
                    let charThreshold = i / finalText.length;
                    
                    if (progress > charThreshold + (Math.random() * 0.15)) {
                        currentText += finalText[i]; // Lock in correct character
                    } else {
                        currentText += chars[Math.floor(Math.random() * chars.length)]; // Random noise
                    }
                }

                // Preserve the line break for the layout
                nameElement.innerText = currentText;

                // Stop the loop and apply final HTML formatting
                if (epoch >= maxEpochs) {
                    clearInterval(interval);
                    nameElement.innerHTML = "Hey this is, <strong>Rushill Nair</strong>;<br><span class='hero-role'>Machine Learning Engineer</span>";
                }
                
            }, 60); // 60ms between each "epoch" update
        }, 1500);
    }
});