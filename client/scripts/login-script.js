window.onload = async () => updateNavbarAuthState();

async function loginUser() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  await postData('/auth/login', {
    username,
    password,
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      localStorage.setItem('successLoginUsername', username);
      localStorage.setItem('jwtAccessToken', data.accessToken);
    })
    .then(() => {
      window.location.href = '/';
    })
    .catch((errorStatus) => {
      const message =
        errorStatus === 500 ? 'Server error' : 'Incorrect username or password';
      alert(message);
    });
}
