// Importa as funções de geração
importScripts("generators.js");

// Cria o menu de contexto
chrome.runtime.onInstalled.addListener(() => {
  
  chrome.contextMenus.create({
    id: "generateCPF",
    title: "CPF",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "generateCPFFormatado",
    title: "CPF Formatado",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "generateCNPJ",
    title: "CNPJ",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "generateCNPJFormatado",
    title: "CNPJ Formatado",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "generateRG",
    title: "RG",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "generateRGFormatado",
    title: "RG Formatado",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "generateCel",
    title: "Celular",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "generateCelFormatado",
    title: "Celular Formatado",
    contexts: ["editable"]
  });
});

// Função para lidar com a seleção do menu de contexto
chrome.contextMenus.onClicked.addListener((info, tab) => {
  let generatedValue;
  
  if (info.menuItemId === "generateCPF") {
    generatedValue = generateCPF(getFormatOption("formatOption")); // Gera CPF apenas números
  } else if (info.menuItemId === "generateCPFFormatado") {
    generatedValue = generateCPF(true); // Gera CPF Formatado
  } else if (info.menuItemId === "generateCNPJ") {
    generatedValue = generateCNPJ(false); // Gera CNPJ apenas números
  } else if (info.menuItemId === "generateCNPJFormatado") {
    generatedValue = generateCNPJ(true); // Gera CNPJ Formatado
  } else if (info.menuItemId === "generateRG") {
    generatedValue = generateRG(false); // Gera RG apenas números
  } else if (info.menuItemId === "generateRGFormatado") {
    generatedValue = generateRG(true); // Gera RG Formatado
  } else if (info.menuItemId === "generateCel") {
    generatedValue = generateCel(false); // Gera Número de Celular apenas números
  } else if (info.menuItemId === "generateCelFormatado") {
    generatedValue = generateCel(true); // Gera Número de Celular Formatado (XX) XXXXX-XXXX
  }

  // Envia o valor gerado para o content script
  if (generatedValue) {
    chrome.tabs.sendMessage(tab.id, { action: "fillInput", value: generatedValue });
  }
});