document.addEventListener('DOMContentLoaded', function() {
    let tasks = document.querySelectorAll('.task');
    let isDown = false;
    let offset = [0, 0];
    let currentElement;

    tasks.forEach(function(task) {
        task.addEventListener('mousedown', function(e) {
            isDown = true;
            currentElement = task;
            offset = [
                task.offsetLeft - e.clientX,
                task.offsetTop - e.clientY
            ];
        }, true);

        task.addEventListener('mouseup', function() {
            isDown = false;
        }, true);
    });

    document.addEventListener('mousemove', function(event) {
        event.preventDefault();
        if (isDown && currentElement) {
            let mousePosition = {
                x: event.clientX,
                y: event.clientY
            };
            currentElement.style.left = (mousePosition.x + offset[0]) + 'px';
            currentElement.style.top = (mousePosition.y + offset[1]) + 'px';
        }
    }, true);
});



document.getElementById('addTaskButton').addEventListener('click', function() {
    document.getElementById('formContainer').style.display = 'block';
    document.querySelector("body").style.backgroundColor = 'Gray';
    document.querySelector("header").style.backgroundColor = '#ABAAAA';
});


function promptForNewText(item) {
    let newText = prompt("Wprowadź nowy tekst:", "");
    if (newText) {
        item.textContent = newText;
        localStorage.setItem(item.className, newText);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    let items = document.querySelectorAll('.item1, .item2, .item3, .item4, .item5');


    items.forEach(function(item) {
        item.addEventListener('click', function() {
            promptForNewText(item);
        });
    });

    items.forEach(function(item) {
        let savedText = localStorage.getItem(item.className);
        if (savedText) {
            item.textContent = savedText;
        }
    });
});


