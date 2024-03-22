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

            const task_id = ui.draggable.find('i').text();
            const task_column = $(this).attr('id').slice(5);
            const task_row = ui.draggable.index();
            $.ajax({
                type: 'POST',
                url: `${window.location.href}/update-task-location`,
                data: {
                    id: task_id, 
                    column: task_column,
                    row: task_row
                }
            });
        }
    });

    // $('.delete-button').click(() => {
    //     const task_id = $(this).find('i').text();
    //     $.ajax({
    //         type: 'POST',
    //         url: `${window.location.href}/delete-task`,
    //         data: {
    //             id: task_id
    //         }
    //     });
    // })
    
});







document.getElementById('addTaskButton').addEventListener('click', function() {
    document.getElementById('formContainerWrapper').style.display = 'block';
});


function promptForNewText(item) {
    let newText = prompt("Wprowadź nowy tekst:", item.textContent);
    if (newText && newText.trim()) {
        item.textContent = newText;
        $.ajax({
            type: 'POST',
            url: `${window.location.href}/change-columns`,
            data: {id: item.getAttribute('id'), value: newText}
        });
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




let dropbtns = document.getElementsByClassName('dropbtn');

for (let i = 0; i < dropbtns.length; i++) {
dropbtns[i].addEventListener('click', function() {
  let dropdownContent = this.nextElementSibling;

  dropdownContent.style.display === 'block' ?
          dropdownContent.style.display = 'none' :
          dropdownContent.style.display = 'block';
});
}

let editbtns = document.getElementsByClassName('editbtn');

for (let i = 0; i < dropbtns.length; i++) {
  editbtns[i].addEventListener('click', function() {
    let dropdownContent = this.nextElementSibling;

    dropdownContent.style.display === 'block' ?
            dropdownContent.style.display = 'none' :
            dropdownContent.style.display = 'block';
  });
}

