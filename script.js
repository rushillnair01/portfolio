.cursor-glow {

    position: fixed;

    width: 300px;
    height: 300px;

    border-radius: 50%;

    background:
        radial-gradient(
            circle,
            rgba(255,255,255,.06),
            transparent 70%
        );

    pointer-events: none;

    transform:
        translate(-50%, -50%);

    z-index: -1;
}