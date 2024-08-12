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