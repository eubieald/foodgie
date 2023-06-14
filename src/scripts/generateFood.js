import authenticateApi from './authenticateApi';

// JSONbin with our JSON
const apiKey = '$2b$10$MjLDGc2yCUewqIFpHvHtTOf8QfIVoPGforji6s/KEAX7zimE8hlq.',
binId = '6481dfb7b89b1e2299abd3f8',
apiUrl = `https://api.jsonbin.io/v3/b/${binId}/latest`;

let isRequestPending = false;

function generateFood(btnElement) {
  if (isRequestPending) {
    return; // Ignore the request if a previous request is still pending
  }
  isRequestPending = true;

  authenticateApi(apiUrl, apiKey)
  .then(data => {
    let filteredArray = '';
    if(btnElement.id === 'foodBtnMeal') {      
      filteredArray = data.filter(item => item.category === 'Meal');
    } else if(btnElement.id === 'foodBtnBeverage') {
      filteredArray = data.filter(item => item.category === 'Beverage');
    } else {
      filteredArray = data.filter(item => item.category === 'Sweets');
    }  

    let food = randomPick(filteredArray);
    populateText(food);
  })
  .catch(error => {
    console.error('Error:', error);
  })
  .finally(() => {
    isRequestPending = false; // Reset the flag after the request is completed (success or failure)
  });
}

// Populate text verbiages
function populateText(food) {
  const foodName = document.getElementById('foodName'),
  restaurant = document.getElementById('restaurant'),
  type = document.getElementById('type');

  foodName.innerText = food['name'];
  restaurant.innerText = food['restaurant'];
  type.innerText = food['type'];
}

// Pick random item from filtered array
function randomPick(filteredArray) {
  const keys = Object.keys(filteredArray);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  const randomItem = filteredArray[randomKey];
  return randomItem;
}

export default generateFood;
