function generateCPF(pFormatar = false) {
    let n = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));
    let d1 = n.reduce((acc, num, i) => acc + num * (10 - i), 0) % 11;
    d1 = d1 < 2 ? 0 : 11 - d1;
    let d2 = n.reduce((acc, num, i) => acc + num * (11 - i), 0) + d1 * 2;
    d2 = d2 % 11 < 2 ? 0 : 11 - (d2 % 11);
    const novoCPF = `${n.join('')}${d1}${d2}`;

    return pFormatar ? formatCPF(novoCPF) : novoCPF;
  }
  
  function generateCNPJ(pFormatar = false) {
    let n = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10));
    n.push(0, 0, 0, 1);
  
    let d1 = calculateCNPJVerifierDigit(n);
    n.push(d1);
  
    let d2 = calculateCNPJVerifierDigit(n);
    n.push(d2);
  
    const novoCNPJ = n.join('');
    return pFormatar ? formatCNPJ(novoCNPJ) : novoCNPJ;
  }
  
  function generateRG(pFormatar = false) {
    let rg = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10));
    const verifierDigit = calculateRGVerifierDigit(rg);
    rg.push(verifierDigit);

    const novoRG = rg.join('');
  
    return pFormatar ? formatRG(novoRG) : novoRG;
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

  function generateCel(pFormatar = false) {
    let ddd = generateDDD();
    let cel = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)); 
    cel.push(cel);
    const celString = cel.join('');
    let celNumber = ddd + "9" + celString;
    return pFormatar ? formatCel(celNumber) : celNumber;
  }

  function formatCPF(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }
  
  function formatCNPJ(cnpj) {
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  }
  
  function formatRG(rg) {
    return rg.replace(/(\d{2})(\d{3})(\d{3})([\dX])/, "$1.$2.$3-$4");
  }

  // Função para formatar Celular como (00) 00000-0000
  function formatCel(cel) {
    return cel.replace(/(\d{2})(\d{5})(\d{4})/, "\($1\) $2-$3");
  }
  
  function calculateCNPJVerifierDigit(numbers) {
    const multipliers = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const sum = numbers.reduce((acc, num, i) => acc + num * multipliers[i + (multipliers.length - numbers.length)], 0);
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  }
  
  function calculateRGVerifierDigit(numbers) {
    const sum = numbers.reduce((acc, num, i) => acc + num * (9 - i), 0);
    const remainder = sum % 11;
    return (remainder === 10) ? 0 : remainder;
  }
  