const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredPrompt = event;
  butInstall.style.display = "block";
});


butInstall.addEventListener("click", async () => {
  butInstall.style.display = "none";
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;

  console.log(`User response to the install prompt: ${outcome}`);
  defferedPrompt = null;
});


window.addEventListener("appinstalled", (event) => {
    butInstall.style.display = "none";
    console.log('PWA was installed');
});
