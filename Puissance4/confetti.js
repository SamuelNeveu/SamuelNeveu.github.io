var colors = ["#FFD700", "#FF8C00"];
let requestId = null;

export function frame() {
    confetti({
        particleCount: 2,
        angle: 50,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
    });
    confetti({
        particleCount: 2,
        angle: 130,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
    });

    if (Date.now() < Date.now() + 15000) {
        requestId = requestAnimationFrame(frame);
    }
}

export function endFrame() {
    if (requestId != null) {
        cancelAnimationFrame(requestId);
        requestId = null;
    }
}