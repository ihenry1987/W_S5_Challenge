async function sprintChallenge5() { 
  // 👇 WORK ONLY BELOW THIS LINE 👇
  // 👇 WORK ONLY BELOW THIS LINE 👇
  // 👇 WORK ONLY BELOW THIS LINE 👇

  // 👇 ==================== TASK 1 START ==================== 👇
  const axios = require('axios');

  let mentors = []; 
  let learners = []; 

  async function fetchData() {
    try {
      const [learnersResponse, mentorsResponse] = await Promise.all([
        axios.get('http://localhost:3003/api/learners'),
        axios.get('http://localhost:3003/api/mentors'),
      ]);

      learners = learnersResponse.data;
      mentors = mentorsResponse.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  await fetchData();

  // 👆 ==================== TASK 1 END ====================== 👆

  // 👇 ==================== TASK 2 START ==================== 👇

  learners = learners.map(learner => {
    const mentorNames = learner.mentors.map(id => {
      const mentor = mentors.find(mentor => mentor.id === id);
      return mentor ? mentor.fullName : 'Unknown Mentor';
    });
  
    return {
      id: learner.id,
      fullName: learner.fullName,
      email: learner.email,
      mentors: mentorNames,
    };
  });

  // 👆 ==================== TASK 2 END ====================== 👆

  if (typeof document !== 'undefined') {
    const cardsContainer = document.querySelector('.cards');
    const info = document.querySelector('.info');
    info.textContent = 'No learner is selected';

    // 👇 ==================== TASK 3 START ==================== 👇

    for (let learner of learners) {
      // Create the card and its elements
      const card = document.createElement('div');
      const heading = document.createElement('h3');
      const email = document.createElement('div');
      const mentorsHeading = document.createElement('h4');
      const mentorsList = document.createElement('ul');
    
      // Set initial class names and text content
      card.classList.add('card');
      heading.classList.add('name');
      email.classList.add('email');
      mentorsHeading.classList.add('closed');
      mentorsList.classList.add('mentors-list');
      
      mentorsHeading.textContent = 'Mentors'; // This will display "Mentors"
    
      // Fill elements with learner data
      heading.textContent = learner.fullName;
      email.textContent = learner.email;
    
      // Add mentors to the list
      for (const mentorId of learner.mentorIds) {
        const mentor = mentors.find(m => m.id === mentorId);
        if (mentor) {
          const mentorItem = document.createElement('li');
          mentorItem.textContent = mentor.name; // Use the mentor's name
          mentorsList.appendChild(mentorItem);
        } else {
          console.error(`Mentor with ID ${mentorId} not found`);
        }
      }
    
      // Assemble the card
      card.appendChild(heading);
      card.appendChild(email);
      card.appendChild(mentorsHeading);
      card.appendChild(mentorsList);
    
      // Add card to the container
      cardsContainer.appendChild(card);
    
      // Add click event listener to handle card selection and mentor list toggle
      card.addEventListener('click', evt => {
        // existing click event handling code
      });
    }
    
    // Ensure mentors are hidden on page load
    const mentorLists = document.querySelectorAll('.mentors-list');
    mentorLists.forEach(list => list.classList.add('hidden'))
      // 👆 ==================== TASK 3 END ====================== 👆

      // 👆 WORK ONLY ABOVE THIS LINE 👆
      // 👆 WORK ONLY ABOVE THIS LINE 👆
      // 👆 WORK ONLY ABOVE THIS LINE 👆
      
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
    });

    const footer = document.querySelector('footer');
    const currentYear = new Date().getFullYear();
    footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`;
  }
}

// ❗ DO NOT CHANGE THIS CODE. WORK ONLY INSIDE TASKS 1, 2, 3
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5();