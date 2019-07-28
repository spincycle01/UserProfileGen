const url = 'https://randomuser.me/api/';
const btn = document.querySelector('#btn');
const img = document.querySelector('#avatar');
const name = document.querySelector('#fullname');
const username = document.querySelector('#username');
const email = document.getElementById('email');
const city = document.getElementById('city');

btn.addEventListener('click', () => {
  fetch(url)
    .then(handleErrors)
    .then(response => response.json())
    .then(updateProfile)
    .catch(error => {
      //check if connection error
      console.log(`there is a connection problem \n${error}`);
    });
});

const handleErrors = response => {
  //check if error in response
  if (!response.ok) {
    throw Error(`Response status: ${response.status}`);
  }
  return response;
};

const getName = user => {
  let first = user['name']['first'];
  let last = user['name']['last'];

  first = first[0].toUpperCase() + first.slice(1);
  last = last[0].toUpperCase() + last.slice(1);

  return `${first} ${last}`;
};

const getUsername = user => user['login']['username'];

const getEmail = user => user['email'];

const getPic = user => user['picture']['medium'];

const getCity = user => user['location']['city'];

const updateProfile = data => {
  const user = data.results[0];
  img.src = getPic(user);
  name.innerHTML = getName(user);
  username.innerHTML = getUsername(user);
  email.innerHTML = getEmail(user);
  city.innerHTML = getCity(user);
};
