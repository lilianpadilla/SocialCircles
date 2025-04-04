
// Script for User Interaction in Circles
document.addEventListener("DOMContentLoaded", () => {

    // Get elements
    const circles = document.querySelectorAll(".social-circle");
    const overlay = document.getElementById("actionOverlay");
    const closeOverlay = document.getElementById("closeOverlay");
    
    // Show open modal when a Social Circle is clicked
    circles.forEach(circle => {
        circle.addEventListener("click", () => {
            overlay.style.display = "flex";
        });
    });
    
    // Hide overlay when the close button is clicked
    closeOverlay.addEventListener("click", () => {
        overlay.style.display = "none";
        });
    });
    
    // Exit Button to Return to Home Page
    const exitBtn = document.querySelector(".exit-btn");
    const modal = document.getElementById("exitModal");
    const confirmExit = document.getElementById("confirmExit");
    const cancelExit = document.getElementById("cancelExit");
    
    exitBtn.addEventListener('click', () => {
        modal.style.display = "block";
    });
    
    confirmExit.addEventListener("click", () => {
        window.location.href = "/login";
    });
    
    cancelExit.addEventListener("click", () => {
        modal.style.display = "none";
    });
    
    