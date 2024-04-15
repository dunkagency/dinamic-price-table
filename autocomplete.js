const fromCityInput = document.getElementById('fromCity');
const toCityInput = document.getElementById('toCity');
const fromCityList = document.getElementById('autocomplete-from-list');
const toCityList = document.getElementById('autocomplete-to-list');

const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];

fromCityInput.addEventListener('input', function () {
  const value = fromCityInput.value.toLowerCase();
  const filteredCities = cities.filter(city => city.toLowerCase().includes(value));

  updateList(filteredCities, fromCityList);
});

toCityInput.addEventListener('input', function () {
  const value = toCityInput.value.toLowerCase();
  const filteredCities = cities.filter(city => city.toLowerCase().includes(value));

  updateList(filteredCities, toCityList);
});

function updateList(filteredCities, list) {
  list.innerHTML = '';

  filteredCities.forEach(city => {
    const li = document.createElement('li');
    li.textContent = city;
    li.setAttribute('role', 'option');
    li.addEventListener('click', function () {
      if (list === fromCityList) {
        fromCityInput.value = city;
      } else {
        toCityInput.value = city;
      }
      list.innerHTML = '';
    });
    list.appendChild(li);
  });
}

function handleKeyDown(e, input, list) {
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault();

    const selected = document.querySelector(`#${list.id} li.selected`);

    if (selected) {
      selected.classList.remove('selected');
    }

    let next;

    if (e.key === 'ArrowDown') {
      next = selected ? selected.nextElementSibling : list.firstElementChild;
    } else {
      next = selected ? selected.previousElementSibling : list.lastElementChild;
    }

    if (next) {
      next.classList.add('selected');
      input.value = next.textContent;
    }
  } else if (e.key === 'Enter') {
    const selected = document.querySelector(`#${list.id} li.selected`);
    if (selected) {
      input.value = selected.textContent;
      list.innerHTML = '';
    }
  }
}

fromCityInput.addEventListener('keydown', function (e) {
  handleKeyDown(e, fromCityInput, fromCityList);
});

toCityInput.addEventListener('keydown', function (e) {
  handleKeyDown(e, toCityInput, toCityList);
});

document.addEventListener('click', function (e) {
  if (!e.target.matches('.city-input') && !e.target.matches('.autocomplete-list li')) {
    fromCityList.innerHTML = '';
    toCityList.innerHTML = '';
  }
});
