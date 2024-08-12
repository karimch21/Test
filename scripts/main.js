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

// Привязываем функцию к кнопке
document.getElementById('connectButton').addEventListener('click', connectMetamask);

async function generateSHA256Hash(message) {
    const msgBuffer = new TextEncoder().encode(message);   // Преобразуем сообщение в массив байтов
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);  // Вычисляем хэш
    const hashArray = Array.from(new Uint8Array(hashBuffer));  // Преобразуем буфер в массив байтов
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');  // Преобразуем байты в шестнадцатеричную строку
    return hashHex;
}

document.getElementById('generateHashButton').addEventListener('click', async () => {
    const textInput = document.getElementById('shaText').value;
    if(textInput.split('').length > 0){
        const hash = await generateSHA256Hash(textInput);
        document.getElementById('output').innerText = `sha256 Hash: ${hash}`;
    }
    else alert('Teaxtaera empty')
    
});

