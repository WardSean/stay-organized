document.addEventListener('DOMContentLoaded', function () {
    const userSelect = document.getElementById('userSelect');
    const viewTasksBtn = document.getElementById('viewTasksBtn');
    const taskList = document.getElementById('taskList');
  
    // Fetch users and populate the dropdown
    fetch('http://localhost:8083/api/users')
      .then(response => response.json())
      .then(users => {
        users.forEach(user => {
          const option = document.createElement('option');
          option.value = user.id;
          option.textContent = user.name;
          userSelect.appendChild(option);
        });
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  
    // Handle view tasks button click
    viewTasksBtn.addEventListener('click', function () {
      const userId = userSelect.value;
      if (!userId) {
        alert('Please select a user.');
        return;
      }
  
      // Fetch user's tasks
      fetch(`http://localhost:8083/api/todos/byuser/${userId}`)
        .then(response => response.json())
        .then(tasks => {
          taskList.innerHTML = ''; // Clear previous tasks
  
          tasks.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.innerHTML = `<input type="checkbox" ${task.completed ? 'checked' : ''}> ${task.description} - ${task.deadline}`;
            taskList.appendChild(taskItem);
          });
        })
        .catch(error => {
          console.error('Error fetching tasks:', error);
        });
    });
  });
  