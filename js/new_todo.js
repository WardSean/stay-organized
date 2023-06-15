document.addEventListener('DOMContentLoaded', function () {
    const newTodoForm = document.getElementById('newTodoForm');
    const addTodoBtn = document.getElementById('addTodoBtn');
  
    // Fetch users and populate the dropdown
    fetch('http://localhost:8083/api/users')
      .then(response => response.json())
      .then(users => {
        const userSelect = document.createElement('select');
        users.forEach(user => {
          const option = document.createElement('option');
          option.value = user.id;
          option.textContent = user.name;
          userSelect.appendChild(option);
        });
        newTodoForm.prepend(userSelect);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  
    // Handle add todo button click
    addTodoBtn.addEventListener('click', function () {
      const formData = new FormData(newTodoForm);
      const todoData = Object.fromEntries(formData.entries());
  
      // Send POST request to create a new ToDo
      fetch('http://localhost:8083/api/todos', {
        method: 'POST',
        body: JSON.stringify(todoData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (response.ok) {
            alert('ToDo added successfully.');
            // Reset form fields
            newTodoForm.reset();
          } else {
            throw new Error('Error adding ToDo.');
          }
        })
        .catch(error => {
          console.error('Error adding ToDo:', error);
        });
    });
  });
  