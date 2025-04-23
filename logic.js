const dictionary = {
  A: 0, B: 1, C: 1, D: 1, E: 2, F: 3, G: 3, H: 3,
  I: 4, J: 5, K: 5, L: 5, M: 5, N: 5, O: 6, P: 7,
  Q: 7, R: 7, S: 7, T: 7, U: 8, V: 9, W: 9, X: 9,
  Y: 9, Z: 9,
  a: 9, b: 8, c: 8, d: 8, e: 7, f: 6, g: 6, h: 6,
  i: 5, j: 4, k: 4, l: 4, m: 4, n: 4, o: 3, p: 2,
  q: 2, r: 2, s: 2, t: 2, u: 1, v: 0, w: 0, x: 0,
  y: 0, z: 0, " ": 0
};

function generateStep3Digits(target) {
  const pattern = [0, 1, 2, 3, 4, 0, 1, 0, 1];
  let sum = 0;
  const result = [];

  for (let digit of pattern) {
    if (sum + digit > target) break;
    result.push(digit);
    sum += digit;
  }

  while (sum < target) {
    result.push(1);
    sum += 1;
  }

  return result;
}

function processInput() {
  const input = document.getElementById('inputText').value;
  const output = document.getElementById('output');
  if (!input.trim()) return output.innerHTML = '<div class="text-red-600">Masukan tidak boleh kosong.</div>';

  const chars = Array.from(input);
  const step1 = chars.map(ch => dictionary[ch] ?? 0);

  let step2 = step1[0];
  let step2str = `${step1[0]}`;

  for (let i = 1; i < step1.length; i++) {
    const sign = i % 2 === 1 ? '+' : '-';
    step2str += ` ${sign} ${step1[i]}`;
    step2 = i % 2 === 1 ? step2 + step1[i] : step2 - step1[i];
  }

  const step3Digits = generateStep3Digits(Math.abs(step2));

  const digitToLetterMap = {
    0: 'A',
    1: 'B',
    2: 'E',
    3: 'F',
    4: 'I',
    5: 'J',
    6: 'L',
    7: 'N',
    8: 'U',
    9: 'V'
  };

  const step3 = step3Digits.map(d => digitToLetterMap[d] ?? 'A');
    const step4 = [...step3];
    if (step4.length >= 9) {
      step4[7] = 'B';
      step4[8] = 'E';
    }  

  const letterToDigitMap = Object.fromEntries(
    Object.entries(digitToLetterMap).map(([k, v]) => [v, parseInt(k)])
  );

  const step5Mapping = {
    A: 1,
    B: 1,
    E: 3,
    F: 3,
    I: 5
  };

  const step5 = step4.map(ch => step5Mapping[ch] ?? 0);

  output.innerHTML = `
    <div class="mb-4">
      <strong>Step 1: Konversi karakter ke angka</strong>
      <table class="table-auto w-full mt-2 text-left border border-gray-300">
        <thead class="bg-gray-100">
          <tr><th class="border px-2">Char</th><th class="border px-2">Value</th></tr>
        </thead>
        ${chars.map((ch, i) => `
          <tr>
            <td class="border px-2">${ch}</td>
            <td class="border px-2">${step1[i]}</td>
          </tr>
        `).join('')}
      </table>
    </div>

    <div class="mb-4">
      <strong>Step 2: Operasi Tambah Kurang Bergantian</strong>
      <pre class="bg-black text-green-400 p-3 rounded font-mono">${step2str} = ${step2}</pre>
    </div>

    <div class="mb-4">
      <strong>Step 3: Konversi hasil ke huruf</strong>
      <p>${step2} → ${step3.join(' ')}</p>
    </div>

    <div class="mb-4">
      <strong>Step 4: Modifikasi huruf akhir sesuai aturan</strong>
      <p>${step4.join(' ')}</p>
    </div>

     <div class="mb-4">
      <strong>Step 5: Konversi huruf ke angka akhir</strong>
      <p>${step5.join(' ')}</p>
    </div> 

  `;
}
