
const initialJson = [
    { "id": 1, "name": "Йога", "time": "10:00 - 11:00", "maxParticipants": 15, "currentParticipants": 8, "participants": [] },
    { "id": 2, "name": "Пилатес", "time": "11:30 - 12:30", "maxParticipants": 10, "currentParticipants": 5, "participants": [] },
    { "id": 3, "name": "Кроссфит", "time": "13:00 - 14:00", "maxParticipants": 20, "currentParticipants": 15, "participants": [] },
    { "id": 4, "name": "Танцы", "time": "14:30 - 15:30", "maxParticipants": 12, "currentParticipants": 10, "participants": [] },
    { "id": 5, "name": "Бокс", "time": "16:00 - 17:00", "maxParticipants": 8, "currentParticipants": 6, "participants": [] }];

const coursKey = "courses";

if (!localStorage.getItem(coursKey)) {
    localStorage.setItem(coursKey, JSON.stringify(initialJson))
}
let courses = JSON.parse(localStorage.getItem(coursKey));

function buildTable(initialJson) {
    const table = document.createElement("table");
    const keys = Object.keys(initialJson[0]);

    let tableHead = `
    <tr>
    <th>${keys[0]}</th>
    <th>${keys[1]}</th>
    <th>${keys[2]}</th>
    <th>${keys[3]}</th>
    <th>${keys[4]}</th>
    </tr>`;

    table.innerHTML = tableHead;

    let tableBody = initialJson.reduce((acc, elem, index) => {
        return acc + `
    <tr>
    <td>${elem.id}</td>
    <td>${elem.name}</td>
    <td>${elem.time}</td>
    <td>${elem.maxParticipants}</td>
    <td>${elem.currentParticipants}</td>
    <td><button class="add-btn" data-index="${index}">Записаться</button></td>
    <td><button class="cancel-btn" data-index="${index}">Отменить запись</button></td>
    </tr>`
    }, '');

    table.innerHTML += tableBody;

    return table
}
const table = buildTable(courses);
document.body.appendChild(table);

const addBtn = document.querySelectorAll(".add-btn");

addBtn.forEach((btn, index) => {
    btn.addEventListener("click", (event) => {
        const course = courses[index];
        let userName = prompt("Введите ваше ФИО");

        if (course.currentParticipants < course.maxParticipants) {
            if (!course.participants.includes(userName)) {
                course.currentParticipants++;
                course.participants.push(userName);
                localStorage.setItem(coursKey, JSON.stringify(courses));
                table.innerHTML = "";
                table.appendChild(buildTable(courses));
                alert("Вы успешно записались на курс");
                document.location.reload();
            } else {
                alert("Вы уже записаны на этот курс.");
            }
        } else {
            alert("Места на этот курс закончились.");
            btn.setAttribute('disabled', 'disabled');
        }
    });
});

const cancelBtn = document.querySelectorAll(".cancel-btn");
cancelBtn.forEach((Cbtn, index) => {
    Cbtn.addEventListener("click", () => {
        const course = courses[index];

        let userName = prompt("Введите ваше ФИО для отмены записи");

        if (course.currentParticipants > 0 && course.participants.includes(userName)) {
            course.currentParticipants--;
            course.participants = course.participants.filter(participant => participant !== userName);
            localStorage.setItem(coursKey, JSON.stringify(courses));
            table.innerHTML = "";
            table.appendChild(buildTable(courses));
            alert("Вы успешно отменили запись на курс");
            document.location.reload();
        } else {
            alert("Вы не были записаны на этот курс или ввели неверное ФИО.");
        }
    });
});

