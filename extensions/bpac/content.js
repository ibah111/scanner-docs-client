var port = null;
console.log('content');
document.addEventListener('bpac_send', (event) => {
  console.log(event);
  if (port == null) {
    port = chrome.runtime.connect({ name: 'bpac' });
    console.log(port);
    port.onMessage.addListener((response) => {
      if (typeof cloneInto == 'function') {
        const response2 = cloneInto(response, window);
        const ev = new CustomEvent(response.method, { detail: response2 });
        document.dispatchEvent(ev);
      } else {
        const ev = new CustomEvent(response.method, { detail: response });
        document.dispatchEvent(ev);
      }
    });
    port.onDisconnect.addListener((response) => {
      port = null;
    });
  }
  if (event.detail) port.postMessage(event.detail);
});
document.body.classList.add('bpac-extension-installed');
