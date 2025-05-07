document.addEventListener("DOMContentLoaded", () => {
  const circles = document.querySelectorAll(".social-circle");
  const overlay = document.getElementById("actionOverlay");
  const closeOverlay = document.getElementById("closeOverlay");
  const exitBtn = document.querySelector(".exit-btn");
  const modal = document.getElementById("exitModal");
  const confirmExit = document.getElementById("confirmExit");
  const cancelExit = document.getElementById("cancelExit");
  const leaderboard = document.getElementById('leaderboard-btn');
  const descriptions = document.getElementById('descriptions-btn');
  const profileBtn = document.querySelector(".profile-btn");


  let selectedCircleIndex = null; // null before any button is selected

  // shows modal/action overlay when circle is clicked
  circles.forEach((circle, index) => {
    circle.addEventListener("click", () => {
      selectedCircleIndex = index;
      overlay.style.display = "flex";
    });
  });

  // close overlay
  closeOverlay.addEventListener("click", () => {
    overlay.style.display = "none";
  });

  // iterating thru action choice buttons
  document.querySelectorAll(".action-button").forEach(btn => {
      btn.addEventListener("click", () => {
        const label = btn.textContent.toLowerCase();
    
        let actionType;
        if (label.includes("compliment")) actionType = "compliment";
        else if (label.includes("help")) actionType = "help";
        else if (label.includes("invite")) actionType = "invite";
    
        // Submit a POST form to /game/action - created with help from chatgpt
        // usually clicking a button leads to a get request, but we wanted post
        // keeps track of which action was chosen for the social circle
        const form = document.createElement("form");
        form.method = "POST";
        form.action = "/game/action";
    
        const actionInput = document.createElement("input");
        actionInput.type = "hidden";
        actionInput.name = "actionType";
        actionInput.value = actionType;
    
        const circleInput = document.createElement("input");
        circleInput.type = "hidden";
        circleInput.name = "circleIndex";
        circleInput.value = selectedCircleIndex;
    
        form.appendChild(actionInput);
        form.appendChild(circleInput);
        document.body.appendChild(form);
        form.submit();
      });
    });

    leaderboard.addEventListener("click", () => {
      window.location.href = '/leaderboard?from=game';
      console.log('leaderboard button was clicked');
    });
    
    descriptions.addEventListener("click", () => {
      window.location.href = "/descriptions";
      console.log('descriptions button was clicked');
    });

    profileBtn.addEventListener("click", () => {
      window.location.href = "/profile";
    });

  // Exit button opens confirmation modal
  exitBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });

  // Cancel exit
  cancelExit.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Confirm exit and send POST request
  confirmExit.addEventListener("click", () => {
    fetch("/game/exit", { //sends post req here
      method: "POST",
      headers: { "Content-Type": "application/json" }
    }).then(() => {
      window.location.href = "/";
    });
  });
});
