document.addEventListener("DOMContentLoaded", () => {
    const circles = document.querySelectorAll(".social-circle");
    const overlay = document.getElementById("actionOverlay");
    const closeOverlay = document.getElementById("closeOverlay");
    const exitBtn = document.querySelector(".exit-btn");
    const modal = document.getElementById("exitModal");
    const confirmExit = document.getElementById("confirmExit");
    const cancelExit = document.getElementById("cancelExit");
    // trying to add more buttons, currently not working
    const leaderboard = document.getElementById('leaderboard-btn');
    const descriptions = document.getElementById('descriptions-btn');

  
    let selectedCircleIndex = null;
  
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
      
          // for errors but there honestly shouldnt be.....
          if (!actionType) {
            console.error("Unknown action button:", label);
            return;
          }
      
          // Submit a POST form to /game/action - credit to chatgpt here
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


      // Redirect to leaderboard but this isnt working 
    leaderboard.addEventListener("click", () => {
        window.location.href = "/leaderboard";
    });

    // Redirect to character descriptions but this isnt working
    descriptions.addEventListener("click", () => {
        window.location.href = "/descriptions";
    });

  
    // Exit button opens confirmation modal
    exitBtn.addEventListener("click", () => {
      modal.style.display = "block";
    });
  
    // Cancel exit
    cancelExit.addEventListener("click", () => {
      modal.style.display = "none";
    });
  
    // Confirm exit and send POST request - credit to chatgpt but check this to make sure!!!
    confirmExit.addEventListener("click", () => {
      fetch("/game/exit", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      }).then(() => {
        window.location.href = "/login";
      });
    });
  });
  