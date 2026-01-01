
const spades = "♠", hearts = "♥", diamonds = "♦", clubs = "♣", nt = "NT";

// Функция для правильного склонения
function getDeclension(i, suits) {
    if (i === 1) return suits[0];  // трефа, бубна, черва, пика
    if (i >= 2 && i <= 4) return suits[1];  // трефы, бубны, червы, пики
    return suits[2];  // треф, бубён, червей, пик
}

const suitsNames = {
    '♣': ['трефа', 'трефы', 'треф'],
    '♦': ['бубна', 'бубны', 'бубён'],
    '♥': ['черва', 'червы', 'червей'],
    '♠': ['пика', 'пики', 'пик'],
    'NT': ['без козыря', 'без козыря', 'без козыря']
};

let tableHTML = `<table border="1">`;

// Создаем строки с кнопками для ставок 1-7
for(let i = 1; i <= 7; i++) {
    tableHTML += `<tr>
        <td><button onclick="makeBid(${i}, '${clubs}')">${i} ${clubs}<br>${getDeclension(i, suitsNames['♣'])}</button></td>
        <td><button onclick="makeBid(${i}, '${diamonds}')">${i} ${diamonds}<br>${getDeclension(i, suitsNames['♦'])}</button></td>
        <td><button onclick="makeBid(${i}, '${hearts}')">${i} ${hearts}<br>${getDeclension(i, suitsNames['♥'])}</button></td>
        <td><button onclick="makeBid(${i}, '${spades}')">${i} ${spades}<br>${getDeclension(i, suitsNames['♠'])}</button></td>
        <td><button onclick="makeBid(${i}, '${nt}')">${i} ${nt}<br>${suitsNames['NT'][i === 1 ? 0 : 2]}</button></td>
    </tr>`;
}

// Добавляем строку с действиями (пас, контра, реконтра)
tableHTML += `<tr>
    <td colspan="5" style="padding: 0;">
        <table style="width: 100%;" border="1">
            <tr>
                <td style="width: 33.33%; text-align: center;"><button onclick="makeBid('X', 'контра')">контра</button></td>
                <td style="width: 33.33%; text-align: center;"><button onclick="makeBid('PASS', 'пас')">пас</button></td>
                <td style="width: 33.33%; text-align: center;"><button onclick="makeBid('XX', 'реконтра')">реконтра</button></td>
            </tr>
        </table>
    </td>
</tr>`;

tableHTML += `</table>`;

// Вставляем таблицу в контейнер
document.getElementById('table-container').innerHTML = tableHTML;

// Функция для обработки ставок
function makeBid(level, suit) {
    const dealer = document.getElementById('selectdealer').value;
    const Nname = document.getElementById('Nname').value;
    const Sname = document.getElementById('Sname').value;
    const Ename = document.getElementById('Ename').value;
    const Wname = document.getElementById('Wname').value;
    const autopass = document.getElementById('autopass').checked;
    
    let bidText;
    if (level === 'PASS') {
        bidText = 'пас';
    } else if (level === 'X') {
        bidText = 'контра';
    } else if (level === 'XX') {
        bidText = 'реконтра';
    } else {
        bidText = `${level} ${suit} (${getDeclension(level, suitsNames[suit])})`;
    }
    
    console.log(`Ставка: ${bidText}`);
    console.log(`Дилер: ${dealer}`);
    console.log(`Игроки: N=${Nname}, S=${Sname}, E=${Ename}, W=${Wname}`);
    console.log(`Авто-пас врагов: ${autopass ? 'включен' : 'выключен'}`);
    
    // Здесь можно добавить логику обработки ставки
    alert(`Сделана ставка: ${bidText}`);
}

// Инициализация выбора дилера
document.getElementById('selectdealer').value = 'N';

// Обработчики для чекбокса авто-пас
document.getElementById('autopass').addEventListener('change', function() {
    if (this.checked) {
        console.log('Авто-пас врагов включен');
    } else {
        console.log('Авто-пас врагов выключен');
    }
});

// Обработчики для изменения имен игроков
['Nname', 'Sname', 'Ename', 'Wname'].forEach(id => {
    document.getElementById(id).addEventListener('input', function() {
        console.log(`${id}: ${this.value}`);
    });
});