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

    // 2. AI Output Name Decoding Effect
    const nameElement = document.getElementById("output-name");
    
    if (nameElement) {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const finalName = nameElement.dataset.value;
        let iterations = 0;
        
        // Wait 800ms before starting the effect to let the page load
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
                    // Stylize the last name as per your original design
                    nameElement.innerHTML = "Rushill <span>Nair</span>";
                }
                
                iterations += 1 / 3;
            }, 30);
        }, 800);
    }
});