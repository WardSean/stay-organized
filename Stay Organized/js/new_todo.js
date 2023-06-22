document.addEventListener('DOMContentLoaded', function () {
  const newTodoForm = document.getElementById('newTodoForm');
  const addTodoBtn = document.getElementById('addTodoBtn');
  const categorySelect = document.getElementById('categorySelect');
  const userSelect = document.getElementById('userSelect');

  // Fetch categories and populate the dropdown
  fetch('http://localhost:8083/api/categories')
    .then(response => response.json())
    .then(categories => {
      categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id; // Modify this line if category ID is different
        option.textContent = category.name; // Modify this line if category name property is different
        categorySelect.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Error fetching categories:', error);
    });

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

  // Handle add todo button click
  addTodoBtn.addEventListener('click', function (event) {
    event.preventDefault();

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
        if (!response.ok) {
          throw new Error('Failed to add ToDo.');
        }
        alert('ToDo added successfully.');
        // Reset form fields
        newTodoForm.reset();
      })
      .catch(error => {
        console.error('Error adding ToDo:', error);
      });
  });
});
