async function sprintChallenge5() { // Note the async keyword so you can use `await` inside sprintChallenge5
  // 👇 WORK ONLY BELOW THIS LINE 👇
  // 👇 WORK ONLY BELOW THIS LINE 👇
  // 👇 WORK ONLY BELOW THIS LINE 👇

  // 👇 ==================== TASK 1 START ==================== 👇

  // 🧠 Use Axios to GET learners and mentors.
  // ❗ Use the variables `mentors` and `learners` to store the data.
  // ❗ Use the await keyword when using axios.

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

  // 🧠 Combine learners and mentors.
  // ❗ Fix the `learners` array so that each learner has the required structure.

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

  for (let learner of learners) { // looping over each learner object

    const card = document.createElement('div');
    card.className = 'card'; // Set initial class

    const heading = document.createElement('h3');
    heading.textContent = learner.fullName; // Set the learner's name
    card.appendChild(heading);

    const email = document.createElement('div');
    email.className = 'email'; // Set initial class
    email.textContent = learner.email;
    card.appendChild(email);

    const mentorsHeading = document.createElement('h4');
    mentorsHeading.className = 'closed'; // Set initial class
    mentorsHeading.textContent = 'Mentors';
    card.appendChild(mentorsHeading);

    const mentorsList = document.createElement('ul');
    mentorsList.className = 'mentor-list'; // Set initial class

    // Loop over each mentor name and create a list item
    learner.mentors.forEach(mentorName => {
      const li = document.createElement('li');
      li.textContent = mentorName;
      mentorsList.appendChild(li);
    });

    card.appendChild(mentorsList);

    // 👆 ==================== TASK 3 END ====================== 👆

    // 👆 WORK ONLY ABOVE THIS LINE 👆
    // 👆 WORK ONLY ABOVE THIS LINE 👆
    // 👆 WORK ONLY ABOVE THIS LINE 👆
    card.appendChild(mentorsList);
    card.dataset.fullName = learner.fullName;
    cardsContainer.appendChild(card);

    card.addEventListener('click', evt => {
      const mentorsHeading = card.querySelector('h4');
      // critical booleans
      const didClickTheMentors = evt.target === mentorsHeading;
      const isCardSelected = card.classList.contains('selected');
      // do a reset of all learner names, selected statuses, info message
      document.querySelectorAll('.card').forEach(crd => {
        crd.classList.remove('selected');
        crd.querySelector('h3').textContent = crd.dataset.fullName;
      });
      info.textContent = 'No learner is selected';
      // conditional logic
      if (!didClickTheMentors) {
        // easy case, no mentor involvement
        if (!isCardSelected) {
          // selecting the card:
          card.classList.add('selected');
          heading.textContent += `, ID ${learner.id}`;
          info.textContent = `The selected learner is ${learner.fullName}`;
        }
      } else {
        // clicked on mentors, we toggle and select no matter what
        card.classList.add('selected');
        if (mentorsHeading.classList.contains('open')) {
          mentorsHeading.classList.replace('open', 'closed');
        } else {
          mentorsHeading.classList.replace('closed', 'open');
        }
        if (!isCardSelected) {
          // if card was not selected adjust texts
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
