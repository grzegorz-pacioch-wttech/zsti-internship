$(document).ready(function() {
    $('.task').draggable({
        revert: 'invalid',
        revertDuration: 200,
        helper: 'clone',
        start: function(event, ui) {
            $('.task').addClass('ui-draggable-dragging');
        },
        stop: function(event, ui) {
            $('.task').removeClass('ui-draggable-dragging');
        }
    });

    $('.item7').droppable({
        accept: '.task',
        drop: function(event, ui) {
            $(this).append(ui.draggable);
            ui.draggable.removeClass('ui-draggable-dragging');
        }
    });
});







document.getElementById('addTaskButton').addEventListener('click', function() {
    document.getElementById('formContainerWrapper').style.display = 'block';
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

document.addEventListener('DOMContentLoaded', function() {
    let svg = document.getElementById('closeSvg');
    svg.addEventListener('click', function() {
        let formContainerWrapper = document.getElementById('formContainerWrapper');
        formContainerWrapper.style.display = 'none';
    });
});



