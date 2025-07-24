class bdCaptchaClass {
  constructor() {
    this.containerId = null;
    this.secretKey = null;
    this.timeoutSeconds = 60;
    this.autosolver = true;
    this.token = null;
    this.timeoutHandle = null;
    this.container = null;
    this.checkBox = null;
    this.spinner = null;
    this.overlay = null;
    this.dialogBox = null;
    this.grid = null;
    this.verifyBtn = null;

    this.correctImages = [];

    this.palestineImages = [
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
    this.nonPalestineImages = [
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

    this._init = this._init.bind(this);
    this._onCheckboxChange = this._onCheckboxChange.bind(this);
    this._verifySelection = this._verifySelection.bind(this);
  }

  setCaptcha(containerId) {
    this.containerId = containerId;
    this.container = document.getElementById(containerId);
    if (!this.container) {
      throw new Error(`Container with id "${containerId}" not found`);
    }
    this._render();
    this._init();
  }

  setCaptchaSecret(secret) {
    this.secretKey = secret; // For demonstration, no actual secret logic here
  }

  setCaptchaTimeout(seconds) {
    this.timeoutSeconds = seconds;
  }

  setCaptchaAutosolver(enabled) {
    this.autosolver = enabled;
  }

  isCaptchaSolved() {
    return localStorage.getItem('captcha') === 'solved';
  }

  getCaptchaToken(validitySeconds = 300) {
    if (!this.isCaptchaSolved()) return null;
    // Return dummy token with expiry for demonstration
    const token = `token_${Date.now()}_${validitySeconds}`;
    this.token = token;
    return token;
  }

  // Private method: build captcha UI inside container
  _render() {
    this.container.innerHTML = `
      <style>
  @import('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
    #captcha {
      width: 90%;
      max-width: 400px;
      background: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      padding: 10px;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid #ccc;
       box-sizing: border-box;
      font-family: 'Poppins', sans-serif;
    }

    .main_c {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .main_c input[type=checkbox] {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }

    .main_c label {
      font-size: 16px;
      cursor: pointer;
    }

    .term {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 12px;
      text-align: center;
    }

    .term img {
      width: 24px;
      height: 24px;
      margin-bottom: 4px;
    }

    .term h4 {
      margin: 0;
      font-size: 13px;
      font-weight: 600;
    }

    .term a {
      text-decoration: none;
      font-size: 11px;
      color: #1a73e8;
    }
        .spinner {
      display: none;
      width: 18px;
      height: 18px;
      border: 2px solid #ddd;
      border-top: 2px solid #22c55e;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      0%   { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .dialog {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 20px;
      border-radius: 8px;
      border: 1px solid #ccc;
      display: none;
      box-shadow: 0 4px 30px rgba(0,0,0,0.2);
      z-index: 100;
    }

    .dialog h3 {
      margin-bottom: 10px;
      font-size: 16px;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 6px;
      margin-bottom: 10px;
    }

    .grid img {
      width: 90px;
      height: 90px;
      object-fit: cover;
      cursor: pointer;
      border: 2px solid transparent;
      border-radius: 4px;
    }

    .grid img.selected {
      border-color: #22c55e;
    }

    .btn {
      background: #3b82f6;
      color: white;
      padding: 6px 14px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    .overlay {
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: rgba(0, 0, 0, 0.3);
      display: none;
      z-index: 99;
    }

    .verified-msg {
      color: green;
      font-weight: bold;
    }
      </style>

     <div class="main_c">
      <div class="spinner" id="spinner"></div>
      <input class="checkBox" type="checkbox" id="robotCheck" />
      <label for="robotCheck">I'm not a robot</label>
    </div>
    <div class="term">
      <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCaptcha Logo" />
      <h4>reCAPTCHA</h4>
      <a href="#">Privacy - Terms</a>
    </div>
    <div class="overlay" id="overlay"></div>
    <div class="dialog" id="dialogBox">
  <h3>Select all images with <strong>trees</strong></h3>
  <div class="grid" id="imageGrid">
  </div>
  <button class="btn" id="verifyBtn">Verify</button>
  </div>
    `;
  }

  _init() {
    // Query elements
    this.checkBox = this.container.querySelector('.checkBox');
    this.spinner = this.container.querySelector('#spinner');
    this.overlay = this.container.querySelector('#overlay');
    this.dialogBox = this.container.querySelector('#dialogBox');
    this.grid = this.container.querySelector('#imageGrid');
    this.verifyBtn = this.container.querySelector('#verifyBtn');

    this.checkBox.addEventListener('change', this._onCheckboxChange);
    this.verifyBtn.addEventListener('click', this._verifySelection);
    this.overlay.addEventListener('click', () => this._hideCaptchaDialog());

    // If already solved, mark checkbox checked
    if (this.isCaptchaSolved()) {
      this.checkBox.checked = true;
      this.spinner.style.display = 'none';
      this.checkBox.style.display = 'inline-block';
    }
  }

  _onCheckboxChange() {
    if (!this.checkBox.checked) {
      // Unchecked: do nothing
      return;
    }
    this.spinner.style.display = 'inline-block';
    this.checkBox.style.display = 'none';

    setTimeout(() => {
      let cached = null;
      try {
        cached = localStorage.getItem('captcha');
      } catch (e) {
        console.error(e);
      }
      if (cached === 'solved') {
        this.spinner.style.display = 'none';
        this.checkBox.style.display = 'block';
        this.checkBox.checked = true;
      } else {
        this._showCaptchaDialog();
      }
    }, 800);
  }

  _showCaptchaDialog() {
    this.overlay.style.display = 'block';
    this.dialogBox.style.display = 'block';
    this._shuffleImages();
  }

  _hideCaptchaDialog() {
    this.overlay.style.display = 'none';
    this.dialogBox.style.display = 'none';
  }

  _shuffleArray(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }

  _shuffleImages() {
    this.grid.innerHTML = '';

    const palestineCount = Math.floor(Math.random() * 2) + 3;
    const selectedPalestine = this._shuffleArray(this.palestineImages).slice(0, palestineCount);
    const selectedNon = this._shuffleArray(this.nonPalestineImages).slice(0, 9 - palestineCount);
    const allImages = this._shuffleArray([...selectedPalestine, ...selectedNon]);

    this.correctImages = selectedPalestine;

    allImages.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.onclick = () => img.classList.toggle('selected');
      // Mark correct images explicitly
      if (selectedPalestine.includes(src)) {
        img.dataset.correct = '1';
      } else {
        img.dataset.correct = '0';
      }
      this.grid.appendChild(img);
    });
  }

  _verifySelection() {
    const selectedImgs = Array.from(this.grid.querySelectorAll('img.selected'));
    if (selectedImgs.length === 0) {
      alert("Please select at least one image.");
      return;
    }
    let allCorrect = true;
    selectedImgs.forEach(img => {
      if (img.dataset.correct !== '1') allCorrect = false;
    });
    const correctCount = this.correctImages.length;
    if (selectedImgs.length !== correctCount) allCorrect = false;

    if (allCorrect) {
      localStorage.setItem('captcha', 'solved');
      this._hideCaptchaDialog();
      this.spinner.style.display = 'none';
      this.checkBox.style.display = 'block';
      this.checkBox.checked = true;
      alert("Captcha solved successfully!");
    } else {
      alert("Incorrect selection, please try again.");
      this._shuffleImages();
    }
  }
}