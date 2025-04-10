// Função para verificar se a formatação está habilitada
function isFormattingEnabled() {
  return document.getElementById("formatOption").checked;
}

// Função para definir um cookie
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Função para obter um cookie
function getCookie(name) {
  const nameEQ = name + "=";
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let c = cookies[i].trim();
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
  }
  return null;
}

// Função para salvar a opção de formatação usando cookie e localmente
function saveFormatOption() {
  const isFormatted = isFormattingEnabled();
  setCookie("formatOption", isFormatted, 365);
}

// Função para carregar a opção de formatação salva no cookie
function loadFormatOption() {
  const formatOption = getCookie("formatOption");

  if (formatOption !== null) {
    document.getElementById("formatOption").checked = (formatOption === 'true');
    console.log("Opção de formatação carregada:", formatOption);
  } else {
    console.log("Nenhuma opção de formatação salva encontrada. Usando padrão (desmarcado).");
  }
}

// Função para copiar texto para a área de transferência e mostrar uma notificação
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    //alert("Valor copiado para a área de transferência!");
  }).catch((error) => {
    console.error("Erro ao copiar para a área de transferência:", error);
  });
}

// Função para gerar CPF válido com opção de formatação e copiar para área de transferência
function generateCPF() {
  let n = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));
  let d1 = n.reduce((acc, num, i) => acc + num * (10 - i), 0) % 11;
  d1 = d1 < 2 ? 0 : 11 - d1;
  let d2 = n.reduce((acc, num, i) => acc + num * (11 - i), 0) + d1 * 2;
  d2 = d2 % 11 < 2 ? 0 : 11 - (d2 % 11);
  const cpf = `${n.join('')}${d1}${d2}`;
  const formattedCPF = isFormattingEnabled() ? formatCPF(cpf) : cpf;
  copyToClipboard(formattedCPF);
  return formattedCPF;
}

// Função para formatar CPF como 000.000.000-00
function formatCPF(cpf) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

// Função para gerar CNPJ válido com opção de formatação e copiar para área de transferência
function generateCNPJ() {
  let n = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)); // 8 dígitos base
  n.push(0, 0, 0, 1); // Completa com sufixo de empresa padrão (0001)

  // Calcula o primeiro dígito verificador
  let d1 = calculateCNPJVerifierDigit(n);
  n.push(d1);

  // Calcula o segundo dígito verificador
  let d2 = calculateCNPJVerifierDigit(n);
  n.push(d2);

  const cnpj = n.join('');
  const formattedCNPJ = isFormattingEnabled() ? formatCNPJ(cnpj) : cnpj;
  copyToClipboard(formattedCNPJ);
  return formattedCNPJ;
}

// Função auxiliar para calcular um dígito verificador de CNPJ
function calculateCNPJVerifierDigit(numbers) {
  const multipliers = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const sum = numbers.reduce((acc, num, i) => acc + num * multipliers[i + (multipliers.length - numbers.length)], 0);
  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
}

// Função para formatar CNPJ como 00.000.000/0000-00
function formatCNPJ(cnpj) {
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
}

// Função para gerar RG válido com opção de formatação e copiar para área de transferência
function generateRG() {
  let rg = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)); // Gera os 8 primeiros dígitos

  // Calcula o dígito verificador usando o método de módulo 11 com pesos
  let verifierDigit = calculateRGVerifierDigit(rg);
  rg.push(verifierDigit);

  const rgString = rg.join('');
  const formattedRG = isFormattingEnabled() ? formatRG(rgString) : rgString;
  copyToClipboard(formattedRG);
  return formattedRG;
}

// Função auxiliar para calcular o dígito verificador do RG usando módulo 11
function calculateRGVerifierDigit(numbers) {
  const sum = numbers.reduce((acc, num, i) => acc + num * (9 - i), 0);
  const remainder = sum % 11;

  if (remainder === 10) {
    return 0; // Em alguns estados, quando o resto é 10, o dígito verificador é 'X'
  } else {
    return remainder;
  }
}

// Função para formatar RG como 00.000.000-0
function formatRG(rg) {
  return rg.replace(/(\d{2})(\d{3})(\d{3})([\dX])/, "$1.$2.$3-$4");
}


// Função para formatar Celular como (00) 00000-0000
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
  copyToClipboard(numeroCelular);

  return numeroCelular;
}


// Configurações iniciais e evento de mudança no switch
document.addEventListener('DOMContentLoaded', () => {
  loadFormatOption();

  document.getElementById("formatOption").addEventListener("change", saveFormatOption);

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
});