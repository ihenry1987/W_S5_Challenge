// TASK 1: Fetch data from the endpoints
const fetchData = async () => {
  try {
    // Use Promise.all to fetch both endpoints concurrently
    const [learnersResponse, mentorsResponse] = await Promise.all([
      axios.get('http://localhost:3003/api/learners'),
      axios.get('http://localhost:3003/api/mentors')
    ]);

    // Store the responses in variables
    const learners = learnersResponse.data;
    const mentors = mentorsResponse.data;

    // Pass the fetched data to the next task
    combineData(learners, mentors);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Call the function to fetch data
fetchData();

// TASK 2: Combine the data from learners and mentors
const combineData = (learnersData, mentorsData) => {
  // Create a map of mentors for quick lookup by ID
  const mentorsMap = new Map(mentorsData.map(mentor => [mentor.id, mentor.name]));

  // Transform learners data to include mentor names instead of IDs
  const learners = learnersData.map(learner => ({
    id: learner.id,
    email: learner.email,
    fullName: learner.fullName,
    mentors: learner.mentors.map(mentorId => mentorsMap.get(mentorId))
  }));

  // Pass the combined data to the next task
  renderLearnerCards(learners);
};


// TASK 3: Render the learners data as cards in the DOM
const renderLearnerCards = (learners) => {
  const container = document.querySelector('#learners-container'); // Assume there's a container element in the HTML

  learners.forEach(learner => {
    // Create elements for each learner
    const card = document.createElement('div');
    card.className = 'card';

    const heading = document.createElement('h2');
    heading.textContent = learner.fullName;
    card.appendChild(heading);

    const email = document.createElement('p');
    email.textContent = learner.email;
    card.appendChild(email);

    const mentorsHeading = document.createElement('h3');
    mentorsHeading.textContent = 'Mentors:';
    card.appendChild(mentorsHeading);

    const mentorsList = document.createElement('ul');
    mentorsList.className = 'mentors-list';
    
    learner.mentors.forEach(mentorName => {
      const mentorItem = document.createElement('li');
      mentorItem.textContent = mentorName;
      mentorsList.appendChild(mentorItem);
    });

    card.appendChild(mentorsList);
    container.appendChild(card);
  });
};


// ❗ DO NOT CHANGE THIS CODE. WORK ONLY INSIDE TASKS 1, 2, 3
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5();