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

    // 2. Dynamic Image Injection for Feature Maps
    const profileImgSrc = document.getElementById('source-img').src;
    const fMapImages = document.querySelectorAll('.f-map');
    
    // Assign the source image to all the tiny feature maps automatically
    fMapImages.forEach(img => {
        img.src = profileImgSrc;
    });

    // 3. Simulated CNN "Training Epochs" Text Output
    const nameElement = document.getElementById("output-text");
    
    if (nameElement) {
        const finalText = "Rushill Nair"; // Now just the name inside the box
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#%&*<>";
        let epoch = 0;
        const maxEpochs = 50; 
        
        // Short delay to let the page load
        setTimeout(() => {
            const interval = setInterval(() => {
                epoch++;
                let currentText = "";
                let progress = epoch / maxEpochs;

                for (let i = 0; i < finalText.length; i++) {
                    if (finalText[i] === " ") {
                        currentText += " ";
                        continue;
                    }
                    
                    let charThreshold = i / finalText.length;
                    
                    if (progress > charThreshold + (Math.random() * 0.15)) {
                        currentText += finalText[i]; // Lock in correct letter
                    } else {
                        currentText += chars[Math.floor(Math.random() * chars.length)]; // Noise
                    }
                }

                nameElement.innerText = currentText;

                // Stop loop when finished
                if (epoch >= maxEpochs) {
                    clearInterval(interval);
                    nameElement.innerHTML = "Rushill Nair";
                }
                
            }, 60);
        }, 1500);
    }
});