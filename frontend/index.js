// Import Axios for making API requests
import axios from 'axios';

async function sprintChallenge5() {
  // Fetch the learner data from the server
  const learnersUrl = '/api/learners';
  const mentorsUrl = '/api/mentors';
  let learners, mentors;

  try {
    // Perform parallel requests for learners and mentors
    const [learnersRes, mentorsRes] = await Promise.all([
      axios.get(learnersUrl),
      axios.get(mentorsUrl),
    ]);

    learners = learnersRes.data;
    mentors = mentorsRes.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return;
  }

  const cardsContainer = document.querySelector('.cards');
  const infoParagraph = document.querySelector('p.info');
  let selectedCard = null;

  // Function to create a card element for each learner
  const createLearnerCard = (learner) => {
    const card = document.createElement('div');
    card.className = 'card';

    const name = document.createElement('h3');
    name.textContent = learner.fullName;

    const email = document.createElement('div');
    email.textContent = learner.email;

    const mentorsTitle = document.createElement('h4');
    mentorsTitle.textContent = 'Mentors';
    mentorsTitle.className = 'closed';

    const mentorsList = document.createElement('ul');
    mentorsList.hidden = true; // Hide mentors list initially
    learner.mentors.forEach((id) => {
      const mentor = mentors.find((m) => m.id === id);
      const mentorItem = document.createElement('li');
      mentorItem.textContent = `${mentor.firstName} ${mentor.lastName}`;
      mentorsList.appendChild(mentorItem);
    });

    card.append(name, email, mentorsTitle, mentorsList);
    card.addEventListener('click', () => {
      // Toggle selected state
      if (selectedCard) selectedCard.classList.remove('selected');
      if (selectedCard !== card) {
        card.classList.add('selected');
        infoParagraph.textContent = `The selected learner is ${learner.fullName}`;
        selectedCard = card;
      } else {
        infoParagraph.textContent = 'No learner is selected';
        selectedCard = null;
      }
    });

    mentorsTitle.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent card click
      mentorsList.hidden = !mentorsList.hidden;
      mentorsTitle.className = mentorsList.hidden ? 'closed' : 'open';
    });

    return card;
  };

  // Render the cards
  learners.forEach((learner) => {
    const card = createLearnerCard(learner);
    cardsContainer.appendChild(card);
  });

  infoParagraph.textContent = 'No learner is selected'; // Set initial info text
}

// Export the function for testing
export { sprintChallenge5 };

// ❗ DO NOT CHANGE THIS CODE. WORK ONLY INSIDE TASKS 1, 2, 3
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5();