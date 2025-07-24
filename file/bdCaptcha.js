var checkBox, spinner, overlay, dialogBox, swpGridContainer, verifyBtn, selected;
checkBox = document.querySelector('.checkBox');
spinner = document.getElementById('spinner');
overlay = document.getElementById('overlay');
dialogBox = document.getElementById('dialogBox');
swpGridContainer = document.getElementById('imageGrid');
verifyBtn = document.getElementById('verifyBtn');


let swpCorrectImages = [];

const swpPalestineImages = [
	"https://samiulalim1.github.io/swpCaptcha/images/1.png",
	"https://samiulalim1.github.io/swpCaptcha/images/2.png",
	"https://samiulalim1.github.io/swpCaptcha/images/3.png",
	"https://samiulalim1.github.io/swpCaptcha/images/4.png",
	"https://samiulalim1.github.io/swpCaptcha/images/5.png",
	"https://samiulalim1.github.io/swpCaptcha/images/6.png",
	"https://samiulalim1.github.io/swpCaptcha/images/7.png",
	"https://samiulalim1.github.io/swpCaptcha/images/8.png",
	"https://samiulalim1.github.io/swpCaptcha/images/9.png",
	"https://samiulalim1.github.io/swpCaptcha/images/10.png",
	"https://samiulalim1.github.io/swpCaptcha/images/11.png",
	"https://samiulalim1.github.io/swpCaptcha/images/12.png",
	"https://samiulalim1.github.io/swpCaptcha/images/13.png",
];
const swpNonPalestineImages = [
	"https://samiulalim1.github.io/swpCaptcha/images/1.jpg",
	"https://samiulalim1.github.io/swpCaptcha/images/2.jpg",
	"https://samiulalim1.github.io/swpCaptcha/images/3.jpg",
	"https://samiulalim1.github.io/swpCaptcha/images/4.jpg",
	"https://samiulalim1.github.io/swpCaptcha/images/5.jpg",
	"https://samiulalim1.github.io/swpCaptcha/images/6.jpg",
	"https://samiulalim1.github.io/swpCaptcha/images/7.jpg",
	"https://samiulalim1.github.io/swpCaptcha/images/8.jpg",
	"https://samiulalim1.github.io/swpCaptcha/images/9.jpg",
	"https://samiulalim1.github.io/swpCaptcha/images/10.jpg",
];


function showCaptchaDialog() {
  overlay.style.display = 'block';
  dialogBox.style.display = 'block';
  swpShuffleImages();
}
function hideCaptchaDialog() {
  overlay.style.display = 'none';
  dialogBox.style.display = 'none';
}

function swpShuffleArray(arr) {
	return arr.sort(() => Math.random() - 0.5);
}

function swpShuffleImages () {
	swpGridContainer.innerHTML = '';
	const palestineCount = Math.floor(Math.random() * 2) + 3;
	const selectedPalestine = swpShuffleArray(swpPalestineImages).slice(0, palestineCount);
	const selectedNon = swpShuffleArray(swpNonPalestineImages).slice(0, 9 - palestineCount);
	const allImages = swpShuffleArray([...selectedPalestine, ...selectedNon]);
	swpCorrectImages = selectedPalestine;

	allImages.forEach(src => {
		const img = document.createElement('img');
		img.src = src;
		img.onclick = () => img.classList.toggle('selected');
		swpGridContainer.appendChild(img);
	});
}

verifyBtn.addEventListener("click", () => {
  const selectedImages = Array.from(document.querySelectorAll(".grid img.selected")).map(img => img.src);

  const allCorrectSelected = swpCorrectImages.every(img => selectedImages.includes(img));
  const noExtraSelected = selectedImages.every(img => swpCorrectImages.includes(img));

  const isCorrect = allCorrectSelected && noExtraSelected;

  if (isCorrect) {
    localStorage.setItem('captcha', 'solved');
    hideCaptchaDialog();
    checkBox.checked = true;
    checkBox.style.display = 'inline-block';
    spinner.style.display = 'none';
  } else {
    alert("❌ Incorrect selection. Try again.");
    swpShuffleImages(); // regenerate
  }
});

checkBox.addEventListener("change", () => {
  if (checkBox.checked === !true) {
    return;
  }

  spinner.style.display = 'inline-block';
  checkBox.style.display = 'none';
  setTimeout(function() {
    let captchaCacked = null;
    try {
      captchaCacked = localStorage.getItem('captcha');
    }catch(e) {
      console.log(e);
    }
    if(captchaCacked === 'solved') {
      spinner.style.display = 'none';
      checkBox.style.display = 'block';
      checkBox.checked = true;
    } else {
      showCaptchaDialog();
    }
  }, 800);
});
