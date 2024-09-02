async function fetchData() {
  const [learnersResponse, mentorsResponse] = await Promise.all([
    axios.get('http://localhost:3003/api/learners'),
    axios.get('http://localhost:3003/api/mentors')
  ]);
  const learners = learnersResponse.data;
  const mentors = mentorsResponse.data;
  // Proceed to TASK 2
}

const combinedLearners = learners.map(learner => {
  return {
    id: learner.id,
    email: learner.email,
    fullName: learner.name,
    mentors: learner.mentorIds.map(mentorId => {
      const mentor = mentors.find(m => m.id === mentorId);
      return mentor ? mentor.name : null; // Get the mentor's name
    }).filter(name => name) // Filter out any null values
  };
});

combinedLearners.forEach(learner => {
  const card = document.createElement('div');
  const heading = document.createElement('h2');
  const email = document.createElement('p');
  const mentorsHeading = document.createElement('h3');
  const mentorsList = document.createElement('ul');

  heading.textContent = learner.fullName;
  email.textContent = learner.email;
  mentorsHeading.textContent = 'Mentors:';

  learner.mentors.forEach(mentor => {
    const li = document.createElement('li');
    li.textContent = mentor;
    mentorsList.appendChild(li);
  });

  card.appendChild(heading);
  card.appendChild(email);
  card.appendChild(mentorsHeading);
  card.appendChild(mentorsList);
  document.body.appendChild(card); // Append the card to the body or a specific container
});

// ❗ DO NOT CHANGE THIS CODE. WORK ONLY INSIDE TASKS 1, 2, 3
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5();