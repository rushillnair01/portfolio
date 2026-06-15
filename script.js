// =========================
// REVEAL ANIMATIONS
// =========================

const revealElements =
    document.querySelectorAll(".reveal");

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");
                }

            });

        },
        {
            threshold: 0.15
        }
    );

revealElements.forEach(element => {

    observer.observe(element);

});

// =========================
// NAVBAR EFFECT
// =========================

const navbar =
    document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.style.background =
            "rgba(10,10,10,0.9)";

        navbar.style.backdropFilter =
            "blur(20px)";

    } else {

        navbar.style.background =
            "rgba(10,10,10,0.65)";
    }

});

// =========================
// COUNTER ANIMATION
// =========================

function animateValue(
    element,
    start,
    end,
    duration,
    suffix = ""
) {

    let startTime = null;

    function step(timestamp) {

        if (!startTime)
            startTime = timestamp;

        const progress =
            Math.min(
                (timestamp - startTime) / duration,
                1
            );

        const value =
            Math.floor(
                progress * (end - start) + start
            );

        element.innerHTML =
            value + suffix;

        if (progress < 1) {

            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}

const impactCards =
    document.querySelectorAll(".impact-card h2");

const counterObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting &&
                    !entry.target.dataset.done
                ) {

                    const text =
                        entry.target.innerText;

                    if (text.includes("10M")) {

                        animateValue(
                            entry.target,
                            0,
                            10,
                            1500,
                            "M+"
                        );
                    }

                    entry.target.dataset.done =
                        true;
                }
            });

        },
        {
            threshold: 0.5
        }
    );

impactCards.forEach(card => {

    counterObserver.observe(card);

});

// =========================
// SMOOTH CARD HOVER
// =========================

const cards =
    document.querySelectorAll(
        ".project-card"
    );

cards.forEach(card => {

    card.addEventListener(
        "mousemove",
        e => {

            const rect =
                card.getBoundingClientRect();

            const x =
                e.clientX - rect.left;

            const y =
                e.clientY - rect.top;

            const rotateY =
                ((x - rect.width / 2)
                    / rect.width) * 8;

            const rotateX =
                -((y - rect.height / 2)
                    / rect.height) * 8;

            card.style.transform =
                `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-6px)
                `;
        }
    );

    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "perspective(1000px) rotateX(0deg) rotateY(0deg)";
        }
    );

});

// =========================
// CURSOR GLOW
// =========================

const glow =
    document.createElement("div");

glow.classList.add("cursor-glow");

document.body.appendChild(glow);

document.addEventListener(
    "mousemove",
    e => {

        glow.style.left =
            e.clientX + "px";

        glow.style.top =
            e.clientY + "px";
    }
);