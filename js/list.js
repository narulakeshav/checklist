(function() {
    'use strict';

    var d = document,
        firstTime = true,
        isDone = true,
        message = d.getElementById('message'),
        input = d.getElementById('input'),
        btnClearTask = d.getElementById('btn-clear-task'),
        btnAdd = d.getElementById('btn-add'),
        btnMarkAllDone = d.getElementById('btn-mark-done');

    // onload function
    (function() {

        // initializing WOW JS
        new WOW().init();

        // add button listeners
        addButtonListener();

        // hide the 'clear all' message & list div
        message.style.display = 'none';

        // focusing on input after page load
        // setting input keypress
        input.focus();

        input.addEventListener('keypress', function(e) {
            if(e.keyCode === 13) {
                e.preventDefault();
                addButton();
                input.value = '';
            } 
        });

        // adding listener to primary button
        btnAdd.addEventListener('click', addButton);

        // adding listener to 'clear task' button
        btnClearTask.addEventListener('click', clearCompletedTasks);

        // adding listener to 'mark done' button
        btnMarkAllDone.addEventListener('click', markAllDone);
    }());

    // function that adds button listeners
    function addButtonListener() {
        var btn = d.getElementsByClassName('mark-done'),
            i = 0;

        for(; i < btn.length; i++) {
            btn[i].addEventListener('click', completeTask);
        }
    }

    // function that sets class to button which was clicked
    function completeTask(e) {
        var object = e.currentTarget,
            value = '';

        value = (object.parentNode.className !== '') ? '' : 'strike';
        if(object.parentNode.className === 'wow flash') value = 'strike';
        object.parentNode.setAttribute('class', value);
    }

    // clearing the default list items if the user enters something for first time
    function isFirstTime() {
        if(firstTime) {
            d.getElementById('list').innerHTML = null;
            firstTime = false;
        }
    }

    // when addbutton is clicked
    function addButton() {
        if(input.value === '') { 
            // checks if input is blank, show an alert(for now)
            alert('Please enter some task.'); 
        } else {
            // stores the input value in 'addtask' variable
            var addTask = input.value,
                doneButton = d.createElement('button');

            // checks if it's first time entering something
            isFirstTime();

            // creates a 'mark-done' button element
            doneButton.className = 'mark-done';
            doneButton.textContent = 'Done';

            // appends the button to the list item first
            addToList(doneButton, addTask);
<<<<<<< HEAD
            $("li").addClass("wow flash");
            // CLEARS THE VALUE IN THE INPUT FIELD
            input.value = "";
        }
    };
=======
>>>>>>> 8b335ecfdfb8bc26a75e52a49b64863f40078ea8

            // wow effect
            doneButton.parentNode.className = 'wow flash';            

            // adds listener to button
            addButtonListener();

            // clears the value in the input field
            input.value = '';            
        }
    }

    function addToList(button, item) {
        var ul = d.getElementById('list'),
            li = d.createElement('li');

        // appends the button to the list item first
        li.appendChild(button);

        // appends the task by user to list item second
        li.appendChild(d.createTextNode(item));

        // adds the list item to the end of the unordered list
        ul.appendChild(li);

        // hides the message when a task is added
        message.style.display = 'none';
    }

    function clearCompletedTasks() {
        var strike = d.getElementsByClassName('strike'),
            li = d.getElementsByTagName('li'),
            i = strike.length - 1;

        if(message.style.display === 'block') {
            alert('All tasks are already cleared.');
        } else {
            // removing
            for(; i >= 0; i--) {
                strike[i].parentNode.removeChild(strike[i]);
            }

            if(li.length === 0) {
                message.style.display = 'block';
            } else {
                message.style.display = 'none';
            }
        }
    }

    // mark everything as done or undone at once
    function markAllDone() {
        var li = d.getElementsByTagName('li'),
            markDoneText = d.getElementById('mark-all'),
            i = 0;

        if(isDone) {
            for(; i < li.length; i++) 
                li[i].className = 'strike';

            markDoneText.textContent = 'Mark All as Not Done';
            isDone = false;
        } else {
            for(; i < li.length; i++) 
                li[i].className = '';

            markDoneText.textContent = 'Mark All as Done';
            isDone = true;           
        }

    }

}());