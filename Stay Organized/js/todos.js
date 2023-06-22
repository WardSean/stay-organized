document.addEventListener('DOMContentLoaded', function () {
  const userSelect = document.getElementById('userSelect');
  const viewTasksBtn = document.getElementById('viewTasksBtn');
  const taskList = document.getElementById('taskList');

  // Fetch users and populate the dropdown
  fetch('http://localhost:8083/api/users')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch users.');
      }
      return response.json();
    })
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
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch tasks.');
        }
        return response.json();
      })
      .then(tasks => {
        taskList.innerHTML = ''; // Clear previous tasks

        tasks.forEach(task => {
          const taskItem = document.createElement('div');
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.checked = getCheckboxState(userId, task.id); // Retrieve checkbox state from localStorage
          checkbox.addEventListener('change', function () {
            updateCheckboxState(userId, task.id, this.checked); // Update checkbox state in localStorage
          });
          taskItem.appendChild(checkbox);
          taskItem.appendChild(document.createTextNode(`${task.description} - ${task.deadline}`));
          taskList.appendChild(taskItem);
        });
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  });

  // Retrieve the state of a checkbox from localStorage
  function getCheckboxState(userId, taskId) {
    const storageKey = `checkbox_${userId}_${taskId}`;
    const storedValue = localStorage.getItem(storageKey);
    return storedValue === 'true';
  }

  // Update the state of a checkbox in localStorage
  function updateCheckboxState(userId, taskId, checked) {
    const storageKey = `checkbox_${userId}_${taskId}`;
    localStorage.setItem(storageKey, checked);
  }
});
