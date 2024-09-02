async function sprintChallenge5() { 
  // 👇 WORK ONLY BELOW THIS LINE 👇
  
  // 👇 ==================== TASK 1 START ==================== 👇

  // Use Axios to GET learners and mentors.
  const [learnersResponse, mentorsResponse] = await Promise.all([
    axios.get('http://localhost:3003/api/learners'),
    axios.get('http://localhost:3003/api/mentors')
  ]);

  let mentors = mentorsResponse.data;
  let learners = learnersResponse.data;

  // 👆 ==================== TASK 1 END ====================== 👆

  // 👇 ==================== TASK 2 START ==================== 👇

  // Combine learners and mentors.
  learners = learners.map(learner => {
    return {
      id: learner.id,
      email: learner.email,
      fullName: learner.fullName,
      mentors: learner.mentorIds.map(id => {
        const mentor = mentors.find(mentor => mentor.id === id);
        return mentor ? mentor.name : 'Unknown Mentor';
      })
    };
  });

  // 👆 ==================== TASK 2 END ====================== 👆

  const cardsContainer = document.querySelector('.cards');
  const info = document.querySelector('.info');
  info.textContent = 'No learner is selected';

  // 👇 ==================== TASK 3 START ==================== 👇

  for (let learner of learners) { 
    const card = document.createElement('div');
    const heading = document.createElement('h3');
    const email = document.createElement('div');
    const mentorsHeading = document.createElement('h4');
    const mentorsList = document.createElement('ul');

    // Set classes and initial content
    card.classList.add('card');
    heading.textContent = learner.fullName;
    email.textContent = learner.email;
    mentorsHeading.textContent = 'Mentors';
    mentorsHeading.classList.add('mentors-heading', 'closed'); // Initially hidden
    mentorsList.classList.add('mentor-list');

    // Append mentor list items
    learner.mentors.forEach(mentorName => {
      const mentorItem = document.createElement('li');
      mentorItem.textContent = mentorName;
      mentorsList.appendChild(mentorItem);
    });

    // Append elements to card
    card.appendChild(heading);
    card.appendChild(email);
    card.appendChild(mentorsHeading);
    card.appendChild(mentorsList);
    card.dataset.fullName = learner.fullName;

    // Append card to container
    cardsContainer.appendChild(card);

    card.addEventListener('click', evt => {
      const mentorsHeading = card.querySelector('h4');
      const didClickTheMentors = evt.target === mentorsHeading;
      const isCardSelected = card.classList.contains('selected');
      
      // Reset all learner names, selected statuses, info message
      document.querySelectorAll('.card').forEach(crd => {
        crd.classList.remove('selected');
        crd.querySelector('h3').textContent = crd.dataset.fullName;
        crd.querySelector('h4').classList.add('closed');
      });
      info.textContent = 'No learner is selected';

      // Conditional logic
      if (!didClickTheMentors) {
        // Selecting the card
        if (!isCardSelected) {
          card.classList.add('selected');
          heading.textContent += `, ID ${learner.id}`;
          info.textContent = `The selected learner is ${learner.fullName}`;
        }
      } else {
        // Toggling mentors visibility
        card.classList.add('selected');
        if (mentorsHeading.classList.contains('closed')) {
          mentorsHeading.classList.replace('closed', 'open');
        } else {
          mentorsHeading.classList.replace('open', 'closed');
        }
        if (!isCardSelected) {
          heading.textContent += `, ID ${learner.id}`;
          info.textContent = `The selected learner is ${learner.fullName}`;
        }
      }
    });
  }

  // 👆 ==================== TASK 3 END ====================== 👆

  const footer = document.querySelector('footer');
  const currentYear = new Date().getFullYear();
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`;
}

// ❗ DO NOT CHANGE THIS CODE. WORK ONLY INSIDE TASKS 1, 2, 3
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
