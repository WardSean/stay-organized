document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const todoId = urlParams.get('id');
    const todoDetails = document.getElementById('todoDetails');
    const markCompletedBtn = document.getElementById('markCompletedBtn');
  
    // Fetch ToDo details
    fetch(`http://localhost:8083/api/todos/${todoId}`)
      .then(response => response.json())
      .then(todo => {
        const todoItem = document.createElement('div');
        todoItem.innerHTML = `<strong>Description:</strong> ${todo.description}<br>
                              <strong>Deadline:</strong> ${todo.deadline}<br>
                              <strong>Priority:</strong> ${todo.priority}`;
        todoDetails.appendChild(todoItem);
  
        if (todo.completed) {
          markCompletedBtn.disabled = true;
        }
      })
      .catch(error => {
        console.error('Error fetching ToDo details:', error);
      });
  
    // Handle mark completed button click
    markCompletedBtn.addEventListener('click', function () {
      // Send PUT request to mark ToDo as completed
      fetch(`http://localhost:8083/api/todos/${todoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (response.ok) {
            alert('ToDo marked as completed.');
            markCompletedBtn.disabled = true;
          } else {
            throw new Error('Error marking ToDo as completed.');
          }
        })
        .catch(error => {
          console.error('Error marking ToDo as completed:', error);
        });
    });
  });
  