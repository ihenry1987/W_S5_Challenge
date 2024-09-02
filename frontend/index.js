async function sprintChallenge5() {
  // 👇 WORK ONLY BELOW THIS LINE 👇

  // 👇 ==================== TASK 1 START ==================== 👇

  let learners = [];
  let mentors = [];

  try {
    const [learnersResponse, mentorsResponse] = await Promise.all([
      axios.get('http://localhost:3003/api/learners'),
      axios.get('http://localhost:3003/api/mentors'),
    ]);

    learners = learnersResponse.data;
    mentors = mentorsResponse.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  // 👆 ==================== TASK 1 END ====================== 👆

  // 👇 ==================== TASK 2 START ==================== 👇

  const mentorMap = new Map(mentors.map(mentor => [mentor.id, mentor.name]));

  learners = learners.map(learner => ({
    id: learner.id,
    fullName: learner.fullName,
    email: learner.email,
    mentors: learner.mentorIds.map(mentorId => mentorMap.get(mentorId)),
  }));

  // 👆 ==================== TASK 2 END ====================== 👆

  const cardsContainer = document.querySelector('.cards');
  const info = document.querySelector('.info');
  info.textContent = 'No learner is selected';

  // 👇 ==================== TASK 3 START ==================== 👇

  for (let learner of learners) {
    const card = document.createElement('div');
    card.className = 'card';

    const heading = document.createElement('h3');
    heading.textContent = learner.fullName;
    card.appendChild(heading);

    const email = document.createElement('div');
    email.className = 'email';
    email.textContent = learner.email;
    card.appendChild(email);

    const mentorsHeading = document.createElement('h4');
    mentorsHeading.className = 'closed';
    mentorsHeading.textContent = 'Mentors'; // Ensuring the text is "Mentors"
    card.appendChild(mentorsHeading);

    const mentorsList = document.createElement('ul');
    mentorsList.className = 'mentor-list'; // Initial class name
    mentorsList.style.display = 'none'; // Hide the mentors list on page load

    // Loop over each mentor name and create a list item
    learner.mentors.forEach(mentorName => {
      const li = document.createElement('li');
      li.textContent = mentorName;
      mentorsList.appendChild(li);
    });

    card.appendChild(mentorsList);

    // 👆 ==================== TASK 3 END ====================== 👆

    card.dataset.fullName = learner.fullName;
    cardsContainer.appendChild(card);

    card.addEventListener('click', evt => {
      const mentorsHeading = card.querySelector('h4');
      const mentorsList = card.querySelector('.mentor-list');
      const didClickTheMentors = evt.target === mentorsHeading;
      const isCardSelected = card.classList.contains('selected');

      document.querySelectorAll('.card').forEach(crd => {
        crd.classList.remove('selected');
        crd.querySelector('h3').textContent = crd.dataset.fullName;
        crd.querySelector('.mentor-list').style.display = 'none'; // Hide mentors on deselection
      });
      info.textContent = 'No learner is selected';

      if (!didClickTheMentors) {
        if (!isCardSelected) {
          card.classList.add('selected');
          heading.textContent += `, ID ${learner.id}`;
          info.textContent = `The selected learner is ${learner.fullName}`;
        }
      } else {
        card.classList.add('selected');
        if (mentorsHeading.classList.contains('open')) {
          mentorsHeading.classList.replace('open', 'closed');
          mentorsList.style.display = 'none'; // Hide the list
        } else {
          mentorsHeading.classList.replace('closed', 'open');
          mentorsList.style.display = 'block'; // Show the list
        }
        if (!isCardSelected) {
          heading.textContent += `, ID ${learner.id}`;
          info.textContent = `The selected learner is ${learner.fullName}`;
        }
      }
    });
  }

  const footer = document.querySelector('footer');
  const currentYear = new Date().getFullYear();
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`;
}

// ❗ DO NOT CHANGE THIS CODE. WORK ONLY INSIDE TASKS 1, 2, 3
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 };
else sprintChallenge5();
