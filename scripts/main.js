//#1
async function connectMetamask() {
    // Проверяем, доступен ли Metamask
    if (window.ethereum) {
        try {
            // Запрашиваем доступ к аккаунтам
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            // Отображаем первый аккаунт (адрес кошелька)
            document.getElementById('accountAddress').innerText = `Connected: ${accounts[0]}`;
        } catch (error) {
            console.error("User denied account access or an error occurred", error);
        }
    } else {
        alert("Metamask is not installed");
    }
}

document.getElementById('connectButton').addEventListener('click', connectMetamask);
//#1

//#2
async function generateSHA256Hash(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer); 
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

document.getElementById('generateHashButton').addEventListener('click', async () => {
    const textInput = document.getElementById('shaText').value;
    if (textInput.split('').length > 0) {
        const hash = await generateSHA256Hash(textInput);
        document.getElementById('output').innerText = `sha256 Hash: ${hash}`;
    }
    else alert('Teaxtaera empty')

});
//#2

//#3
const apssBlock = document.querySelector('.apps');
const iframe = document.querySelector('iframe');

const apps = [
    {
        name: 'uniswap',
        url: 'https://app.uniswap.org/'
    },
    {
        name: '1inch',
        url: 'https://app.1inch.io/'
    },
    {
        name: 'denet',
        url: 'https://bugs.denet.pro/'
    },
    {
        name: 'revert',
        url: 'https://revert.finance/'
    }
]

function panel(apps) {
    let contain = document.createDocumentFragment();
    for (let i = 0; i <= apps.length - 1; i++) {
        let app = apps[i];
        let wrapApp = document.createElement('div');
        wrapApp.classList.add('wrap-app');
        wrapApp.innerHTML = app.name;
      
        contain.appendChild(wrapApp);
        wrapApp.addEventListener('click', () => {
            loadSite(app.url);
        });
        if (i === apps.length - 1) {
            apssBlock.appendChild(contain);
        }
    }
}


function loadSite(url) {
    iframe.src = url;
}

panel(apps)
//#3


//#4
const aesInput = document.querySelector('.aes-input');
const aesKey = document.querySelector('.aes-key');
const aesOutput = document.querySelector('.aes-output');
const aesBtn = document.querySelector('.aes-encrypt-btn');


aesBtn.addEventListener('click', encrypt)
function encrypt() {
    if (aesInput.value === '') {
        alert('Введите значение для шифровки');
        return false
    }
    if (aesKey.value === '') {
        aesKey.value = 1234567890123456;
    }
    const keyShablon = CryptoJS.enc.Utf8.parse(aesKey.value);
    if (keyShablon.sigBytes !== 16 && keyShablon.sigBytes !== 24 && keyShablon.sigBytes !== 32) {
        alert('Введите корректное значение ключа');
        return false
    }
    const encrypted = CryptoJS.AES.encrypt(aesInput.value, aesKey.value).toString();
    aesOutput.textContent = encrypted
}
//#4

//#5
const aesInputDecrypt = document.querySelector('.aes-input-decrypt');
const aesKeyDecrypt = document.querySelector('.aes-key-decrypt');
const aesOutputDecrypt = document.querySelector('.aes-decrypt-output');
const aesBtnDecrypt = document.querySelector('.aes-decrypt-btn');

aesBtnDecrypt.addEventListener('click', decrypt)
function decrypt() {

    if (aesKeyDecrypt.value === '') {
        aesKeyDecrypt.value = 1234567890123456;
    }
    const keyShablon = CryptoJS.enc.Utf8.parse(aesKeyDecrypt.value);

    if (keyShablon.sigBytes !== 16 && keyShablon.sigBytes !== 24 && keyShablon.sigBytes !== 32) {
        alert('Введите корректное значение ключа');
        return false
    }

    const decrypted = (CryptoJS.AES.decrypt(aesInputDecrypt.value, aesKeyDecrypt.value)).toString(CryptoJS.enc.Utf8);
    aesOutputDecrypt.textContent = decrypted
}
//#5

//#6
const loadPanelBtn = document.querySelector('.load-panel-btn');
const appsPanel = document.querySelector('.apps-panel');

loadPanelBtn.addEventListener('click', () => {
    appsPanel.innerHTML = '';
    fetch('./scripts/apps.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            panel(data.apps)
        })
        .catch(error => {
            console.error('Error loading JSON:', error);
        });
})
//#6

