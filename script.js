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

    revealElements.forEach(element => {
        observer.observe(element);
    });

    // 2. CNN Feature Map Simulation
    const profileImgSrc = document.querySelector('.profile-pic').src;
    const featureMaps = document.querySelectorAll('.feature-map');
    
    // Array of the CSS filter classes we created to simulate different layers
    const cnnFilters = [
        'filter-edges',       // Layer 1: Edge detection
        'filter-relu',        // Layer 2: High activation mapping
        'filter-pool',        // Layer 3: Max pooling / blur
        'filter-abstract',    // Layer 4: Deep feature abstraction
        'filter-activation'   // Layer 5: Final conceptual mapping
    ];

    // Inject the image into each 3D layer and apply a unique filter
    featureMaps.forEach((map, index) => {
        const imgElement = document.createElement('img');
        imgElement.src = profileImgSrc;
        // Assign the base class and a specific filter class
        imgElement.className = `feature-map-img ${cnnFilters[index % cnnFilters.length]}`;
        map.appendChild(imgElement);
    });

    // 3. AI Output Name Decoding Effect
    const nameElement = document.getElementById("output-name");
    
    if (nameElement) {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const finalName = nameElement.dataset.value;
        let iterations = 0;
        
        // Wait 1.2 seconds before starting to sync with the "processing" flow
        setTimeout(() => {
            const interval = setInterval(() => {
                nameElement.innerText = finalName
                    .split("")
                    .map((letter, index) => {
                        if(index < iterations) {
                            return finalName[index];
                        }
                        if (letter === " ") return " ";
                        return letters[Math.floor(Math.random() * 26)];
                    })
                    .join("");
                
                if(iterations >= finalName.length){
                    clearInterval(interval);
                    nameElement.innerHTML = "Rushill <span>Nair</span>";
                }
                
                iterations += 1 / 3;
            }, 30);
        }, 1200);
    }
});