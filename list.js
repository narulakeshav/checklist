// FUNCTION THAT CHECKS WHICH WHICH MARK-DONE BUTTON WAS CLICKED
function completeTask(id) {
    var clickedButton = document.getElementById(id);
    $(clickedButton).parent("li").toggleClass("strike");
}

$(document).ready(function() {
 
    // HIDES THE "CLEAR ALL" MESSAGE
    $("#message").hide();

    // GETS ELEMENT'S REFERENCES FROM HTML DOCUMENT
    var addButton = document.getElementById("btn-add");
    var input = document.getElementById("input");
    var ul = document.getElementById("list");
    var clearCompletedTasks = document.getElementById("btn-clear-task");

    // CREATES A COUNTER THAT WILL BE ASSIGNED TO THE ID
    var counter = 2;

    // ENTER KEY FUNCTIONING AS BUTTON ON CLICK
    $("#input").keypress(function(event){
        if(event.keyCode == 13){
            event.preventDefault();
            $("#btn-add").click();
        }
    });

    // WHEN ADD BUTTON IS CLICKED
    addButton.onclick = function() {
        //CHECKS IF INPUT IS BLANK, SHOW AN ALERT (FOR NOW)
        if(input.value === "") alert("Please enter some task.");
        else {
            // STORES THE INPUT VALUE IN 'ADDTASK' VARIABLE
            var addTask = input.value;
            // CREATES A 'MARK-DONE' BUTTON ELEMENT
            var doneButton = document.createElement("button");
            createDoneButton(doneButton);
            // APPENDS THE BUTTON TO THE LIST ITEM FIRST
            addToList(doneButton, addTask);
            // STORES THE DATA LOCALLY WHEN CLICKED
            storeListLocally();
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
        $(".strike").remove();
        if($("#list li").length === 0) $("#message").show();
        else $("#message").hide();
    }
});