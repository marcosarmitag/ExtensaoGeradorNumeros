function isFormattingEnabled() {
  return document.getElementById("formatOption").checked;
}

function isAutoCopyEnabled() {
  return document.getElementById("autoCopyOption").checked;
}

function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let c = cookies[i].trim();
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
  }
  return null;
}

function saveFormatOption() {
  const isFormatted = isFormattingEnabled();
  setCookie("formatOption", isFormatted, 365);
  carregarHistorico();
}

function loadFormatOption() {
  const formatOption = getCookie("formatOption");

  if (formatOption !== null) {
    document.getElementById("formatOption").checked = (formatOption === 'true');
  } else {
    console.log("Nenhuma opção de formatação salva encontrada.");
  }
}

function saveAutoCopyOption() {
  const isAutoCopy = isAutoCopyEnabled();
  setCookie("autoCopyOption", isAutoCopy, 365);
  carregarHistorico();
}

function loadAutoCopyOption() {
  const autoCopyOption = getCookie("autoCopyOption");

  if (autoCopyOption !== null) {
    document.getElementById("autoCopyOption").checked = (autoCopyOption === 'true');
  } else {
    console.log("Nenhuma opção salva encontrada.");
  }
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    //alert("Valor copiado para a área de transferência!");
  }).catch((error) => {
    console.error("Erro ao copiar para a área de transferência:", error);
  });
}

function generateCPF() {
  let n = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));
  let d1 = n.reduce((acc, num, i) => acc + num * (10 - i), 0) % 11;
  d1 = d1 < 2 ? 0 : 11 - d1;
  let d2 = n.reduce((acc, num, i) => acc + num * (11 - i), 0) + d1 * 2;
  d2 = d2 % 11 < 2 ? 0 : 11 - (d2 % 11);
  const cpf = `${n.join('')}${d1}${d2}`;
  const formattedCPF = isFormattingEnabled() ? formatCPF(cpf) : cpf;

  if(isAutoCopyEnabled()) {
    copyToClipboard(formattedCPF);
  }

  setCookie("h_cpf", cpf, 365);

  return formattedCPF;
}

function formatCPF(cpf) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

function generateCNPJ() {
  let n = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)); // 8 dígitos base
  n.push(0, 0, 0, 1); // Completa com sufixo de empresa padrão (0001)

  let d1 = calculateCNPJVerifierDigit(n);
  n.push(d1);

  // Calcula o segundo dígito verificador
  let d2 = calculateCNPJVerifierDigit(n);
  n.push(d2);

  const cnpj = n.join('');
  const formattedCNPJ = isFormattingEnabled() ? formatCNPJ(cnpj) : cnpj;

  if(isAutoCopyEnabled()) {
    copyToClipboard(formattedCNPJ);
  }

  setCookie("h_cnpj", cnpj, 365);

  return formattedCNPJ;
}

function calculateCNPJVerifierDigit(numbers) {
  const multipliers = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const sum = numbers.reduce((acc, num, i) => acc + num * multipliers[i + (multipliers.length - numbers.length)], 0);
  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
}

function formatCNPJ(cnpj) {
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
}

function generateRG() {
  let rg = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)); // Gera os 8 primeiros dígitos

  // Calcula o dígito verificador usando o método de módulo 11 com pesos
  let verifierDigit = calculateRGVerifierDigit(rg);
  rg.push(verifierDigit);

  const rgString = rg.join('');
  const formattedRG = isFormattingEnabled() ? formatRG(rgString) : rgString;

  if(isAutoCopyEnabled()) {
    copyToClipboard(formattedRG);
  }

  setCookie("h_rg", rgString, 365);
  return formattedRG;
}

function calculateRGVerifierDigit(numbers) {
  const sum = numbers.reduce((acc, num, i) => acc + num * (9 - i), 0);
  const remainder = sum % 11;

  if (remainder === 10) {
    return 0; // Em alguns estados, quando o resto é 10, o dígito verificador é 'X'
  } else {
    return remainder;
  }
}

function formatRG(rg) {
  return rg.replace(/(\d{2})(\d{3})(\d{3})([\dX])/, "$1.$2.$3-$4");
}

function formatCel(cel) {
  const lCelular = cel.replace(/(\d{2})(\d{5})(\d{4})/, "\($1\) $2-$3");
  return lCelular;
}

function generateDDD() {
  const capitaisDDD = {
    "Rio Branco": 68,
    "Maceió": 82,
    "Macapá": 96,
    "Manaus": 92,
    "Salvador": 71,
    "Fortaleza": 85,
    "Brasília": 61,
    "Vitória": 27,
    "Goiânia": 62,
    "São Luís": 98,
    "Cuiabá": 65,
    "Campo Grande": 67,
    "Belo Horizonte": 31,
    "Belém": 91,
    "João Pessoa": 83,
    "Curitiba": 41,
    "Recife": 81,
    "Teresina": 86,
    "Rio de Janeiro": 21,
    "Natal": 84,
    "Porto Alegre": 51,
    "Porto Velho": 69,
    "Boa Vista": 95,
    "Florianópolis": 48,
    "São Paulo": 11,
    "Aracaju": 79,
    "Palmas": 63
  };

  const capitais = Object.keys(capitaisDDD);
  const capitalAleatoria = capitais[Math.floor(Math.random() * capitais.length)];
  const ddd = capitaisDDD[capitalAleatoria];

  return ddd;
}

function generateCel() {
  let ddd = generateDDD();
  let cel = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)); 
  cel.push(cel);
  const celString = cel.join('');
  let celNumber = ddd + "9" + celString;

  const numeroCelular = isFormattingEnabled() ? formatCel(celNumber) : celNumber;

  if(isAutoCopyEnabled()) {
    copyToClipboard(numeroCelular);
  }

  setCookie("h_cel", celNumber, 365);
  return numeroCelular;
}

function carregarHistorico(){
  const h_cpf = getCookie("h_cpf");
  const h_cnpj = getCookie("h_cnpj");
  const h_rg = getCookie("h_rg");
  const h_cel = getCookie("h_cel");

  if(h_cpf) {
    document.getElementById('cpfResult').value = isFormattingEnabled() ? formatCPF(h_cpf) : h_cpf;
  }

  if(h_cnpj) {
    document.getElementById('cnpjResult').value = isFormattingEnabled() ? formatCNPJ(h_cnpj) : h_cnpj;
  }

  if(h_rg) {
    document.getElementById('rgResult').value = isFormattingEnabled() ? formatRG(h_rg) : h_rg;
  }

  if(h_cel) {
    document.getElementById('celResult').value = isFormattingEnabled() ? formatCel(h_cel) : h_cel;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const h_cpf = getCookie("h_cpf");
  const h_cnpj = getCookie("h_cnpj");
  const h_rg = getCookie("h_rg");
  const h_cel = getCookie("h_cel");

  loadFormatOption();
  document.getElementById("formatOption").addEventListener("change", saveFormatOption);

  loadAutoCopyOption();
  document.getElementById("autoCopyOption").addEventListener("change", saveAutoCopyOption);

  carregarHistorico();

  document.getElementById('generateCPF').addEventListener('click', () => {
    document.getElementById('cpfResult').value = generateCPF();
  });

  document.getElementById('generateCNPJ').addEventListener('click', () => {
    document.getElementById('cnpjResult').value = generateCNPJ();
  });

  document.getElementById('generateRG').addEventListener('click', () => {
    document.getElementById('rgResult').value = generateRG();
  });

  document.getElementById('generateCel').addEventListener('click', () => {
    document.getElementById('celResult').value = generateCel();
  });

  document.getElementById('cpfResult').addEventListener('click', () => {
    document.getElementById('cpfResult').select();
  });

  document.getElementById('cnpjResult').addEventListener('click', () => {
    document.getElementById('cnpjResult').select();
  });

  document.getElementById('rgResult').addEventListener('click', () => {
    document.getElementById('rgResult').select();
  });

  document.getElementById('celResult').addEventListener('click', () => {
    document.getElementById('celResult').select();
  });

});