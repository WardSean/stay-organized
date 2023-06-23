document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const todoId = urlParams.get('id');
  const todoDetails = document.getElementById('todoDetails');

  // Fetch ToDo details
  fetch(`http://localhost:8083/api/todos/${todoId}`)
    .then(response => response.json())
    .then(todo => {
      const todoItem = document.createElement('div');
      todoItem.innerHTML = `<strong>Description:</strong> ${todo.description}<br>
                              <strong>Category:</strong> ${todo.category}<br>
                              <strong>Deadline:</strong> ${todo.deadline}<br>
                              <strong>Priority:</strong> ${todo.priority}`;

      if (todo.time) {
        const timeElement = document.createElement('strong');
        timeElement.textContent = 'Time:';
        const timeValue = document.createElement('span');
        timeValue.textContent = todo.time;
        todoItem.appendChild(document.createElement('br'));
        todoItem.appendChild(timeElement);
        todoItem.appendChild(timeValue);
      }

      todoDetails.appendChild(todoItem);
    })
    .catch(error => {
      console.error('Error fetching ToDo details:', error);
    });
});
