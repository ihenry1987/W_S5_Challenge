const axios = require('axios');
const { learners, mentors } = require('./backend/data');

async function sprintChallenge5() {
  try {
    const cardsContainer = document.querySelector('.cards');
    const infoParagraph = document.querySelector('.info');
    infoParagraph.textContent = 'No learner is selected';

    const response = await axios.get('/learners');
    const learnerCards = response.data.map(learner => createLearnerCard(learner));

    cardsContainer.append(...learnerCards);

    let selectedCard = null;
    cardsContainer.addEventListener('click', ({ target }) => {
      const card = target.closest('.card');
      if (!card) return;

      if (selectedCard) selectedCard.classList.remove('selected');
      card.classList.toggle('selected', card !== selectedCard);
      selectedCard = card.classList.contains('selected') ? card : null;

      infoParagraph.textContent = selectedCard
        ? `The selected learner is ${card.querySelector('h3').textContent}`
        : 'No learner is selected';
    });
  } catch (error) {
    console.error('Error fetching learner data:', error);
  }
}

function createLearnerCard(learner) {
  const card = document.createElement('div');
  card.className = 'card';

  const h3 = document.createElement('h3');
  h3.textContent = learner.fullName;

  const emailDiv = document.createElement('div');
  emailDiv.textContent = learner.email;

  const h4 = document.createElement('h4');
  h4.className = 'closed';
  h4.textContent = 'Mentors';

  const ul = document.createElement('ul');
  ul.hidden = true;
  learner.mentors.forEach(id => {
    const mentor = mentors.find(m => m.id === id);
    const li = document.createElement('li');
    li.textContent = `${mentor.firstName} ${mentor.lastName}`;
    ul.appendChild(li);
  });

  h4.addEventListener('click', () => {
    const isVisible = ul.hidden;
    ul.hidden = !isVisible;
    h4.className = isVisible ? 'open' : 'closed';
  });

  card.append(h3, emailDiv, h4, ul);
  return card;
}

module.exports = { sprintChallenge5 };


// ❗ DO NOT CHANGE THIS CODE. WORK ONLY INSIDE TASKS 1, 2, 3
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5();