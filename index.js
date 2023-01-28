let player1 = document.getElementById("player1");
let player2 = document.getElementById("player2");
let player1Score = document.getElementById("player1score");
let player2Score = document.getElementById("player2score");
let win = document.getElementById("win");
let ball = document.getElementById("ball");
let startBtn = document.getElementById("start-game");
let gameWidth = document.getElementById("game").offsetWidth;
let gameHeight = document.getElementById("game").offsetHeight;
let ballWidth = ball.offsetWidth;
let ballHeight = ball.offsetHeight;
let ballDirectionX = 1;
let ballDirectionY = 1;
let score1 = 0,
  score2 = 0;

// oyuncu 1 için mouse hareketlerini kontrol et
document.addEventListener("mousemove", movePlayer1);
function movePlayer1(e) {
  let gameHeight = document.getElementById("game").offsetHeight;
  let playerHeight = player1.offsetHeight;
  let top = e.clientY;

  // oyuncu 1'in sınırlarını kontrol et
  if (top > gameHeight - playerHeight) {
    top = gameHeight - playerHeight;
  }
  if (top < 0) {
    top = 0;
  }
  player1.style.top = top + "px";
}

// oyuncu 2 için rastgele hareket oluştur
document.addEventListener("mousemove", movePlayer2);
function movePlayer2(e) {
  let gameHeight = document.getElementById("game").offsetHeight;
  let playerHeight = player2.offsetHeight;
  let top = e.clientY;

  // oyuncu 1'in sınırlarını kontrol et
  if (top > gameHeight - playerHeight) {
    top = gameHeight - playerHeight;
  }
  if (top < 0) {
    top = 0;
  }
  player2.style.top = top + "px";
}

// oyun topunun hareketini oluştur
function startGame() {
  startBtn.style.display = "none";
  player1.style.visibility = "visible";
  player2.style.visibility = "visible";
  ball.style.visibility = "visible";
  let moveInterval = setInterval(moveBall, 1);
  function moveBall() {
    let left = parseInt(getComputedStyle(ball).left);
    let top = parseInt(getComputedStyle(ball).top);
    let player1Top = parseInt(getComputedStyle(player1).top);
    let player1Height = player1.offsetHeight;
    let player2Top = parseInt(getComputedStyle(player2).top);
    let player2Height = player2.offsetHeight;

    // topun oyuncu 1'e çarpması durumunu kontrol et
    if (
      left <= player1.offsetWidth &&
      top >= player1Top &&
      top <= player1Top + player1Height
    ) {
      ballDirectionX = 1;
    }
    // topun oyuncu 2'ye çarpması durumunu kontrol et
    if (
      left >= gameWidth - player2.offsetWidth - ballWidth &&
      top >= player2Top &&
      top <= player2Top + player2Height
    ) {
      ballDirectionX = -1;
    }
    // topun yukarı veya aşağıya çarpması durumunu kontrol et
    if (top <= 0 || top + ballHeight >= gameHeight) {
      ballDirectionY = -ballDirectionY;
    }

    // topun sağ tarafına çarptıysa oyuncu 1 skoru arttır
    if (left + ballWidth >= gameWidth) {
      resetBall();
      score1++;
      player1Score.innerText = score1;
    }
    // topun sol tarafına çarptıysa oyuncu 2 skoru arttır
    else if (left <= 0) {
      resetBall();
      score2++;
      player2Score.innerText = score2;
    } else {
      ball.style.left = left + ballDirectionX + "px";
      ball.style.top = top + ballDirectionY + "px";
    }
    // skor 10'a ulaştıysa oyunu kazananı belirle
    if (score1 === 10) {
      win.innerText = "Player 1 wins!";
      resetGame();
    } else if (score2 === 10) {
      win.innerText = "Player 2 wins!";
      resetGame();
    }
  }

  // oyun topunun pozisyonunu sıfırla
  function resetBall() {
    ball.style.left = gameWidth / 2 - ballWidth / 2 + "px";
    ball.style.top = gameHeight / 2 - ballHeight / 2 + "px";
    ballDirectionX = Math.random() < 0.5 ? -1 : 1;
    ballDirectionY = Math.random() < 0.5 ? -1 : 1;
  }

  function resetGame() {
    clearInterval(moveInterval);
    score1 = 0;
    score2 = 0;
    player1Score.innerText = score1;
    player2Score.innerText = score2;
    startBtn.style.display = "inline-block";
    startBtn.style.top = "35%";
    player1.style.visibility = "hidden";
    player2.style.visibility = "hidden";
    ball.style.visibility = "hidden";
    resetBall();
  }
}

startBtn.addEventListener("click", startGame);
