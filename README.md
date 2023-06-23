# stay-organized
![image](https://github.com/WardSean/stay-organized/assets/130578074/5bf26038-1402-4167-929d-6e36173db6d0)

todos.html:

Description: This page displays a list of to-do tasks. Each task is listed with its description, deadline, priority, and completion status.
Highlighted Code: The interesting piece of code in this page is the event listener that handles the click event on the checkbox. When the checkbox is clicked, it updates the completion status of the task and updates the corresponding checkbox state in the localStorage and the todos.html page.
todo_details.html:

![image](https://github.com/WardSean/stay-organized/assets/130578074/b8e46927-3342-4bed-88b1-56efc36ffad1)

Description: This page shows the details of a specific to-do task. It includes the description, category, deadline, priority, and optionally, the time of the task.
Highlighted Code: The interesting piece of code in this page is the dynamic creation of the time element. It checks if the todo.time is defined and if so, it creates a new element to display the time. This code ensures that the time is displayed only if it is available for the task.
Overall, the code showcases the retrieval and display of to-do task details, the ability to mark tasks as completed, and the communication between the todo_details.html page and the todos.html page to update the checkbox state.
