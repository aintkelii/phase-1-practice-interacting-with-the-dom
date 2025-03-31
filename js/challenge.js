document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  const counter = document.getElementById("counter");
  const plusBtn = document.getElementById("plus");
  const minusBtn = document.getElementById("minus");
  const heartBtn = document.getElementById("heart");
  const pauseBtn = document.getElementById("pause");
  const commentForm = document.getElementById("comment-form");
  const commentsList = document.getElementById("list");
  const likesList = document.querySelector(".likes");

  // State variables
  let count = 0;
  let timer;
  let isPaused = false;
  const likes = {};

  // Timer functions
  function startTimer() {
    timer = setInterval(() => {
      if (!isPaused) {
        count++;
        counter.textContent = count;
      }
    }, 1000);
  }

  // Like functions
  function updateLikesDisplay() {
    likesList.innerHTML = "";
    for (const num in likes) {
      const li = document.createElement("li");
      li.textContent = `${num} has been liked ${likes[num]} times`;
      likesList.appendChild(li);
    }
  }

  // Event listeners
  plusBtn.addEventListener("click", () => {
    if (!isPaused) {
      count++;
      counter.textContent = count;
    }
  });

  minusBtn.addEventListener("click", () => {
    if (!isPaused) {
      count--;
      counter.textContent = count;
    }
  });

  heartBtn.addEventListener("click", () => {
    if (!isPaused) {
      likes[count] = (likes[count] || 0) + 1;
      updateLikesDisplay();
    }
  });

  pauseBtn.addEventListener("click", () => {
    isPaused = !isPaused;

    if (isPaused) {
      clearInterval(timer);
      pauseBtn.textContent = "resume";
      plusBtn.disabled = true;
      minusBtn.disabled = true;
      heartBtn.disabled = true;
    } else {
      startTimer();
      pauseBtn.textContent = "pause";
      plusBtn.disabled = false;
      minusBtn.disabled = false;
      heartBtn.disabled = false;
    }
  });

  commentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const commentInput = document.getElementById("comment-input");
    const commentText = commentInput.value.trim();

    if (commentText) {
      const commentDiv = document.createElement("div");
      commentDiv.textContent = commentText;
      commentsList.appendChild(commentDiv);
      commentInput.value = "";
    }
  });

  // Start the timer
  startTimer();
});
