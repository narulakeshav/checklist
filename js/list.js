// FUNCTION THAT CHECKS WHICH WHICH MARK-DONE BUTTON WAS CLICKED
function completeTask(id) {
    var clickedButton = document.getElementById(id);
    $(clickedButton).parent("li").toggleClass("strike");
}

$(document).ready(function() {
 
    // INTIALIZING WOWJS
    new WOW().init();

    // HIDES THE "CLEAR ALL" MESSAGE & LIST DIV
    $("#message").hide();

    // GETS ELEMENT'S REFERENCES FROM HTML DOCUMENT
    var addButton = document.getElementById("btn-add");
    var input = document.getElementById("input");
    var ul = document.getElementById("list");
    var clearCompletedTasks = document.getElementById("btn-clear-task");
    var markAllDone = document.getElementById("btn-mark-done");

    // FOCUSING ON THE INPUT WHEN PAGE LOADS
    input.focus();

    // CREATES A COUNTER THAT WILL BE ASSIGNED TO THE ID
    var counter = 2;

    // ENTER KEY FUNCTIONING AS BUTTON ON CLICK
    $("#input").keypress(function(event){
        if(event.keyCode == 13){
            event.preventDefault();
            addButton.click();
            $("#input").val("");
        }
    });

    // FIRST TIME VARIABLE
    var firstTime = true;

    // CLEARING THE DEFAULT LIST ITEMS IF THE USER ENTERS SOMETHING FOR FIRST TIME
    function isFirstTime() {
        if(firstTime) {
            // REMOVES ALL THE LIST ITEMS IN THE UL
            $("#list").empty();
            firstTime = false;
        }
    }

    // WHEN ADD BUTTON IS CLICKED
    addButton.onclick = function() {
        //CHECKS IF INPUT IS BLANK, SHOW AN ALERT (FOR NOW)
        if(input.value === "") alert("Please enter some task.");
        else {
            // CHECKS IF IT'S FIRST TIME ENTERING SOMETHING
            isFirstTime();
            // STORES THE INPUT VALUE IN 'ADDTASK' VARIABLE
            var addTask = input.value;
            // CREATES A 'MARK-DONE' BUTTON ELEMENT
            var doneButton = document.createElement("button");
            createDoneButton(doneButton);
            // APPENDS THE BUTTON TO THE LIST ITEM FIRST
            addToList(doneButton, addTask);
            $("li").addClass("wow flash");
            // CLEARS THE VALUE IN THE INPUT FIELD
            input.value = "";
        }
    }

    // CREATES A NEW DONE BUTTON TO RIGHT OF TASK ITEM
    function createDoneButton(doneButton) {
        // ASSIGNS BUTTON CLASS AND ID (ID WILL BE UNIQUE FOR EVERY BUTTON)
        doneButton.className = "mark-done";
        doneButton.setAttribute("id", counter);
        // ASSIGNS ANOTHER ATTRIBUTE, WHICH CALLSBACK THE MARKDONE FUCTION WITH UNIQUE ID
        doneButton.setAttribute("onclick", "completeTask(this.id)");
        //INCREMENTS COUNTER VARIABLE
        counter++;
        doneButton.textContent = "Done";
    }

    // ADDS THE BUTTON AND THE TASK ITEM TO THE UNORDERED LIST
    function addToList(button, item) {
        // CREATES A LIST ITEM ELEMENT
        var li = document.createElement("li");
        // APPENDS THE BUTTON TO THE LIST ITEM FIRST
        li.appendChild(button);
        // APPENDS THE TASK BY USER TO LIST ITEM SECOND
        li.appendChild(document.createTextNode(item));
        // ADDS THE LIST ITEM TO THE END OF THE UNORDERED LIST
        ul.appendChild(li);
        // HIDES THE MESSSAGE WHEN A TASK IS ADDED
        $("#message").hide();
    }

    // CLEARS ALL THE REMOVED TASKS FROM THE LIST
    clearCompletedTasks.onclick = function() {
        if($("#message").is(":visible")) {
            alert("All tasks are already cleared.");
        }
        else {
            $(".strike").remove();
            if($("#list li").length === 0) {
                $("#message").show();
            }
            else $("#message").hide();
        }
    }

    // FIRST TIME MARKING DONE
    var firstTimeDone = true;

    // MARK EVERYTHING AS DONE OR UNDONE AT ONCE
    markAllDone.onclick = function() {
        // IF IT IS FIRST TIME, MARK ALL AS DONE
        if(firstTimeDone) {
            $("#list li").addClass("strike");
            markDoneText.textContent = "Mark All as Not Done";
            firstTimeDone = false;
        }
        // CHECK IF ALL THE ITEMS ARE CHECKED, IF SO, REMOVE THAT CLASS
        else if ($("#list li").hasClass("strike")) {
            $("#list li").removeClass("strike");
            markDoneText.textContent = "Mark All as Done";
        }
        // ELSE ADD THE CLASS
        else {
            $("#list li").addClass("strike");
            markDoneText.textContent = "Mark All as Not Done";
        }
    }
});
