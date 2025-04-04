// Script for User Interaction in Circles
console.log("game.js began running");
document.addEventListener("DOMContentLoaded", () => {
    // Get elements
    const circles = document.querySelectorAll(".social-circle");
    const overlay = document.getElementById("actionOverlay");
    const closeOverlay = document.getElementById("closeOverlay");
    const leaderboard = document.getElementById('leaderboard-btn');
    const descriptions = document.getElementById('descriptions-btn');

    // Show action overlay when a Social Circle is clicked
    circles.forEach(circle => {
        circle.addEventListener("click", () => {
            overlay.style.display = "flex";
        });
    });

    // Hide overlay when the close button is clicked
    closeOverlay.addEventListener("click", () => {
        overlay.style.display = "none";
    });

    // Redirect to leaderboard
    leaderboard.addEventListener("click", () => {
        window.location.href = "/leaderboard";
    });

    // Redirect to character descriptions
    descriptions.addEventListener("click", () => {
        window.location.href = "/descriptions";
    });

    // Exit Button and Modal Logic
    const exitBtn = document.querySelector(".exit-btn");
    const modal = document.getElementById("exitModal");
    const confirmExit = document.getElementById("confirmExit");
    const cancelExit = document.getElementById("cancelExit");

    exitBtn.addEventListener("click", () => {
        modal.style.display = "block";
    });

    confirmExit.addEventListener("click", () => {
        window.location.href = "/login";
    });

    cancelExit.addEventListener("click", () => {
        modal.style.display = "none";
    });
});
console.log("game.js ran last line");