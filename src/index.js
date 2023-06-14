import generateFood from './scripts/generateFood';
import './styles/main.scss';
import logo from './assets/jinhwan.jpeg';

const foodImg = document.getElementById('foodImg'),
buttons = document.querySelectorAll('.btn');

foodImg.src = logo;

buttons.forEach(function(button) {
    button.addEventListener('click', event => generateFood(event.target));
});