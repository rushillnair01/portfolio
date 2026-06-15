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
    fMapImages.forEach(img => { img.src = profileImgSrc; });

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

    // 4. Draw Synaptic Connections (Curved SVG Lines + Data Flow)
    function drawConnections() {
        const svg = document.getElementById('connections-svg');
        const container = document.getElementById('cnn-container');
        if(!svg || !container) return;

        svg.innerHTML = ''; // Clear old lines
        const containerRect = container.getBoundingClientRect();
        const isMobile = window.innerWidth <= 1200;

        function connectLayers(layerA, layerB, connectionType = "all") {
            const nodesA = document.querySelectorAll(`${layerA} .connectable`);
            const nodesB = document.querySelectorAll(`${layerB} .connectable`);

            nodesA.forEach((nodeA, indexA) => {
                nodesB.forEach((nodeB, indexB) => {
                    // Straight maps 1-to-1 indexes
                    if (connectionType === "straight" && indexA !== indexB) return;

                    const rectA = nodeA.getBoundingClientRect();
                    const rectB = nodeB.getBoundingClientRect();

                    let startX, startY, endX, endY, cp1X, cp1Y, cp2X, cp2Y;

                    if (isMobile) {
                        // Vertical Flow Layout (Top to Bottom)
                        startX = rectA.left + (rectA.width / 2) - containerRect.left;
                        startY = rectA.bottom - containerRect.top;
                        endX = rectB.left + (rectB.width / 2) - containerRect.left;
                        endY = rectB.top - containerRect.top;

                        cp1X = startX;
                        cp1Y = startY + (endY - startY) / 2;
                        cp2X = endX;
                        cp2Y = startY + (endY - startY) / 2;
                    } else {
                        // Horizontal Flow Layout (Left to Right)
                        startX = rectA.right - containerRect.left;
                        startY = rectA.top + (rectA.height / 2) - containerRect.top;
                        endX = rectB.left - containerRect.left;
                        endY = rectB.top + (rectB.height / 2) - containerRect.top;

                        cp1X = startX + (endX - startX) / 2;
                        cp1Y = startY;
                        cp2X = startX + (endX - startX) / 2;
                        cp2Y = endY;
                    }

                    const pathString = `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;

                    // 1. Draw the faint static base line
                    const pathBase = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    pathBase.setAttribute('d', pathString);
                    pathBase.classList.add('connection-path-base');
                    svg.appendChild(pathBase);

                    // 2. Draw the glowing animated flowing data line on top
                    const pathFlow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    pathFlow.setAttribute('d', pathString);
                    pathFlow.classList.add('connection-path-flow');
                    
                    // Stagger the animation slightly to make it look organic and chaotic
                    const randomDelay = Math.random() * 2;
                    pathFlow.style.animationDelay = `-${randomDelay}s`;
                    
                    svg.appendChild(pathFlow);
                });
            });
        }

        // Draw connections
        connectLayers('.stage-input', '.stage-conv1', 'all');
        connectLayers('.stage-conv1', '.stage-relu1', 'straight');
        connectLayers('.stage-relu1', '.stage-pool1', 'all');
        connectLayers('.stage-pool1', '.stage-conv2', 'all');
        connectLayers('.stage-conv2', '.stage-dense', 'all');
        connectLayers('.stage-dense', '.stage-output', 'all');
    }

    // Wait until layout is fully calculated, then draw lines
    setTimeout(drawConnections, 300);
    window.addEventListener('resize', () => {
        // Debounce resize redrawing
        clearTimeout(window.resizeTimer);
        window.resizeTimer = setTimeout(drawConnections, 100);
    });
});