const $inputName = document.querySelector('#inputName');
const $btnAddTask = document.querySelector('#btnAdd');
const $listView = document.querySelector('#listView');
const $checkTasks = document.getElementsByClassName('check-task');
const $wrapperAlert = document.querySelector('.wrapper-alert');
const $btnDesfTaskAlert = document.querySelector('.btn-desf-task-alert');
const $btnCloseAlert = document.querySelector('.btn-close-alert');


const Data = JSON.parse(localStorage.getItem('Data')) || [{
    id: Date.now(),
    name: 'Seja Bem vindo!',
    checked: false
}];


//salvar no localStorage
function saveLocal() {
    let dataStrJson = JSON.stringify(Data);
    localStorage.setItem('Data', dataStrJson);
}


$btnAddTask.addEventListener('click', saveTask);

//salva na array
function saveTask() {
    if ($inputName.value != '') {
        Data.push({
            id: Date.now(),
            name: $inputName.value,
            checked: false,
        });

        $inputName.value = '';
        saveLocal();
        setTaskHTML();
    }
}

//insere html
function setTaskHTML() {
    $listView.innerHTML = '';

    Data.forEach(task => {
        const {id,name,checked} = task;

        let taskDiv = document.createElement('div');
        taskDiv.setAttribute('class', 'taskList');

        const controllsTasks = document.createElement('div');
        controllsTasks.setAttribute('class', 'controlls-task');

        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('class', 'check-task');
        checkbox.checked = checked;
        checkbox.addEventListener('click', () => { checkTask(id) });

        const btnDelTask = document.createElement('button');
        btnDelTask.setAttribute('class', 'btn-del-task');
        btnDelTask.addEventListener('click', () => { removeTask(id) });

        const nameTask = document.createElement('p');
        nameTask.setAttribute('class', 'name-task');
        nameTask.innerText = name;

        controllsTasks.append(checkbox, btnDelTask);
        taskDiv.append(controllsTasks, nameTask);
        $listView.append(taskDiv);
    });
}


function removeTask(id) {
    Data.forEach((task, index) => {
        if (task.id === id) {
            DataDeleteds = Data.splice(index, 1);

            // wrapper-alert
            $wrapperAlert.classList.add('open');
            setTimeout(() => {
                $wrapperAlert.classList.remove('open');
            }, 10000);
        }
    });
    saveLocal();
    setTaskHTML();
}


function checkTask(id) {
    Data.forEach(task => {
        if (task.id == id) {
            task.checked = !task.checked;
            saveLocal();
        }
    });
}


//armazena a tarefa apagada 
let DataDeleteds = new Array;

// wrapper-alert
$btnCloseAlert.addEventListener('click', () => {
    $wrapperAlert.classList.remove('open');
});

$btnDesfTaskAlert.addEventListener('click', () => {
    $wrapperAlert.classList.remove('open');
    Data.push(DataDeleteds[0]);
    saveLocal();
    setTaskHTML();
});


window.onload = () => setTaskHTML();