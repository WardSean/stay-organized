document.addEventListener('DOMContentLoaded', function () {
  const newUserForm = document.getElementById('newUserForm');
  const registerBtn = document.getElementById('registerBtn');

  // Handle register button click
  registerBtn.addEventListener('click', function () {
    const formData = new FormData(newUserForm);
    const userData = Object.fromEntries(formData.entries());

    // Check if passwords match
    if (userData.password !== userData.confirmPassword) {
      document.getElementById('passwordMismatchError').style.display = 'block';
      return;
    } else {
      document.getElementById('passwordMismatchError').style.display = 'none';
    }

    // Remove confirmPassword property
    delete userData.confirmPassword;

    // Send POST request to create a new user
    fetch('http://localhost:8083/api/users', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          alert('User registered successfully.');

          // Add user to dropdowns on todos.html and new_todo.html
          const userSelects = document.querySelectorAll('.userSelect');
          userSelects.forEach(select => {
            const option = document.createElement('option');
            option.value = userData.id;
            option.textContent = userData.name;
            select.appendChild(option);
          });

          // Reset form fields
          newUserForm.reset();
        } else if (response.status === 403) {
          throw new Error('Username is already in use');
        } else {
          throw new Error('Error registering user.');
        }
      })
      .catch(error => {
        console.error('Error registering user:', error);
        if (error.message === 'Username is already in use') {
          alert('Username is already in use');
        } else {
          alert('Error registering user.');
        }
      });
  });
});
