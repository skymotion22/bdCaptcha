# 🛡️ bdCaptcha — I Stand with Bangladesh CAPTCHA

**bdCaptcha** is a lightweight image-based CAPTCHA solution inspired by Google reCAPTCHA — but with a cause.  
It’s designed to show solidarity with **Bangladesh** every time a human verifies themselves.

---

## 🌟 Features

- "I Stand with Bangladesh" click CAPTCHA  
- Popup with image verification to prove you're not a bot  
- Easy integration (HTML + JS)  
- Secure token generation and PHP-based verification  
- LocalStorage caching for user convenience  
- Fully client and server side ready  


---

## 🚀 Installation & Usage

### 1. HTML (Frontend)

#### 🧠 Include the JS in `<head>`

```html
<script src="https://skymotion22.github.io/bdCaptcha.class.js"></script>
```

#### 📦 Add a Captcha Container in `<body>`
```html
<div id="captcha"></div> <!-- You can change the ID -->
```

#### ⚙️ Initialize the CAPTCHA

```js
let bdCaptcha = null;

if(window.bdCaptchaClass){
  bdCaptcha = new bdCaptchaClass();
  bdCaptcha.setCaptcha("captcha"); // ID used in HTML
  bdCaptcha.setCaptchaSecret("YOUR_SECRET_KEY"); // Optional but recommended for stronger token
}else{
  console.log("bdCaptchaClass class not loaded yet.");
}

```

#### ⚙️ Additional initialize options for

```js
// Set a timeout to re-solve the captcha after a certain period of time.
bdCaptcha.setCaptchaTimeout(60); // Optional; 60 = 60 seconds
// Automatically solve captchas or show image selection challenge
bdCaptcha.setCaptchaAutosolver(false); // Optional; Default: true
```

#### ⚙️ Check if Captcha is solved

```js
let isSolved = bdCaptcha.isCaptchaSolved(); // Returns true or false
```

#### ⚙️ Get the token when Captcha is solved

```js
let captchaToken = bdCaptcha.getCaptchaToken(300); // Returns token or null
// 300 means the token will expire in 300 seconds.You can change this as you wish. 
```

---

## 🇧🇩 MADE FROM BANGLADESH
**bdCaptcha** is a project proudly made in Bangladesh, built to promote justice, freedom, and digital sovereignty.
Every verification is a small stand for something greater. ✊

---

## 👨‍💻 Developer Info

**Made with ❤️ by Niloy Ahmed**  
📱 Telegram: [@niloyABCD](https://t.me/niloyABCD)  

