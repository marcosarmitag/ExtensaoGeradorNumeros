// Escuta mensagens do background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "fillInput") {
    const activeElement = document.activeElement;

    // Verifica se o elemento ativo é um input ou textarea
    if (activeElement && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA")) {
      activeElement.value = request.value; // Preenche o campo com o valor gerado
    }
  }
});