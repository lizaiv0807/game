document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const fullName = document.getElementById('fullName').value;
    const birthDate = document.getElementById('birthDate').value;
    const email = document.getElementById('email').value;
    const nick = document.getElementById('nick').value;
    const password = btoa(document.getElementById('password').value); // Просте шифрування

    // Зберегти дані в локальному сховищі
    const userData = { fullName, birthDate, email, nick, password };
    let users = JSON.parse(localStorage.getItem('gameData')) || [];
    users.push(userData);
    localStorage.setItem('gameData', JSON.stringify(users));

    // Зберігання у форматі XML
    const xmlData = `<user>
        <fullName>${fullName}</fullName>
        <birthDate>${birthDate}</birthDate>
        <email>${email}</email>
        <nick>${nick}</nick>
        <password>${password}</password>
    </user>`;

    let xmlUsers = localStorage.getItem('xmlGameData') || '';
    xmlUsers += xmlData + '\n';
    localStorage.setItem('xmlGameData', xmlUsers);

    //alert('Реєстрація успішна!');
    //document.getElementById('registrationForm').reset();

    
});
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Скасувати стандартну відправку форми

        // (опціонально: збереження даних у localStorage, перевірки тощо)

        // Переадресація на сторінку гри
        window.location.href = "game.html";
    });
});
