document.addEventListener('DOMContentLoaded', function () {
    const newUserForm = document.getElementById('newUserForm');
    const registerBtn = document.getElementById('registerBtn');
  
    // Handle register button click
    registerBtn.addEventListener('click', function () {
      const formData = new FormData(newUserForm);
      const userData = Object.fromEntries(formData.entries());
  
      // Check if passwords match
      if (userData.password !== userData.confirmPassword) {
        alert('Passwords must match.');
        return;
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
            // Reset form fields
            newUserForm.reset();
          } else if (response.status === 403) {
            throw new Error('USERNAME IS ALREADY IN USE');
          } else {
            throw new Error('Error registering user.');
          }
        })
        .catch(error => {
          console.error('Error registering user:', error);
          if (error.message === 'USERNAME IS ALREADY IN USE') {
            alert('USERNAME IS ALREADY IN USE');
          } else {
            alert('Error registering user.');
          }
        });
    });
  });
  