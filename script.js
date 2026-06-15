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
    
    fMapImages.forEach(img => {
        img.src = profileImgSrc;
    });

    // 3. Simulated CNN "Training Epochs" Text Output
    const nameElement = document.getElementById("output-text");
    if (nameElement) {
        const finalText = "Rushill Nair";
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#%&*<>";
        let epoch = 0;
        const maxEpochs = 50; 
        
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
                        currentText += finalText[i];
                    } else {
                        currentText += chars[Math.floor(Math.random() * chars.length)];
                    }
                }
                nameElement.innerText = currentText;

                if (epoch >= maxEpochs) {
                    clearInterval(interval);
                    nameElement.innerHTML = "Rushill Nair";
                }
            }, 60);
        }, 1500);
    }

    // 4. Draw Synaptic Connections (Curved SVG Lines)
    function drawConnections() {
        // Only draw on larger screens (disables on mobile where it stacks vertically)
        if (window.innerWidth <= 1200) {
            document.getElementById('connections-svg').innerHTML = '';
            return; 
        }

        const svg = document.getElementById('connections-svg');
        const container = document.getElementById('cnn-container');
        if(!svg || !container) return;

        svg.innerHTML = ''; // Clear old lines
        const containerRect = container.getBoundingClientRect();

        function connectLayers(layerA, layerB, connectionType = "all") {
            const nodesA = document.querySelectorAll(`${layerA} .connectable`);
            const nodesB = document.querySelectorAll(`${layerB} .connectable`);

            nodesA.forEach((nodeA, indexA) => {
                nodesB.forEach((nodeB, indexB) => {
                    // If straight connection, only connect matching indexes
                    if (connectionType === "straight" && indexA !== indexB) return;

                    const rectA = nodeA.getBoundingClientRect();
                    const rectB = nodeB.getBoundingClientRect();

                    // Calculate center points relative to the SVG container
                    const startX = rectA.right - containerRect.left;
                    const startY = rectA.top + (rectA.height / 2) - containerRect.top;
                    const endX = rectB.left - containerRect.left;
                    const endY = rectB.top + (rectB.height / 2) - containerRect.top;

                    // Calculate Bezier control points for a smooth horizontal curve
                    const cp1X = startX + (endX - startX) / 2;
                    const cp1Y = startY;
                    const cp2X = startX + (endX - startX) / 2;
                    const cp2Y = endY;

                    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    path.setAttribute('d', `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`);
                    path.classList.add('connection-path');
                    svg.appendChild(path);
                });
            });
        }

        // Draw the specific neural network pathways
        connectLayers('.stage-input', '.stage-conv1', 'all');        // Input -> Conv1 (Fully Connected)
        connectLayers('.stage-conv1', '.stage-relu1', 'straight');   // Conv1 -> ReLU1 (1-to-1 Straight Mapping)
        connectLayers('.stage-relu1', '.stage-pool1', 'all');        // ReLU1 -> Pool1 (Fully Connected)
        connectLayers('.stage-pool1', '.stage-conv2', 'all');        // Pool1 -> Conv2 (Fully Connected)
        connectLayers('.stage-conv2', '.stage-dense', 'all');        // Conv2 -> Dense (Flatten / Fully Connected)
        connectLayers('.stage-dense', '.stage-output', 'all');       // Dense -> Output (Output convergence)
    }

    // Wait until images and layout fully load to draw lines, and redraw on window resize
    window.addEventListener('load', drawConnections);
    window.addEventListener('resize', drawConnections);
});