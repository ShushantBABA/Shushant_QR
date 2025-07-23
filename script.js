function clearQRCode() {
  document.getElementById("qrcode").innerHTML = "";
}

function generateQRCodeFromURL(url) {
  clearQRCode();
  new QRCode(document.getElementById("qrcode"), {
    text: url,
    width: 256,
    height: 256,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });
}

function generateQR() {
  const text = document.getElementById("qrText").value.trim();
  if (text === "") {
    alert("Please enter some text.");
    return;
  }
  generateQRCodeFromURL(text);
}

function generateQRFromImage() {
  const imageInput = document.getElementById("imageInput");
  const file = imageInput.files[0];

  if (!file) {
    alert("Please select an image file.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: "POST",
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.secure_url) {
        generateQRCodeFromURL(data.secure_url);
      } else {
        throw new Error("Image upload failed.");
      }
    })
    .catch(err => {
      console.error(err);
      alert("Image upload failed. Please check console or try again.");
    });
}
