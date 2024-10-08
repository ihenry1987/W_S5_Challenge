async function sprintChallenge5() { 
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

  learners = learners.map(learner => {
    const mentorNames = learner.mentors.map(id => {
      const mentor = mentors.find(mentor => mentor.id === id);
      return mentor ? `${mentor.firstName} ${mentor.lastName}` : 'Unknown Mentor';
    });
    return {
      id: learner.id,
      fullName: learner.fullName,
      email: learner.email,
      mentors: mentorNames,
    };
  });
   
  if (typeof document !== 'undefined') {
    const cardsContainer = document.querySelector('.cards');
    const info = document.querySelector('.info');
    info.textContent = 'No learner is selected';
    learners.forEach(learner => {
      const card = document.createElement('div');
      const heading = document.createElement('h3');
      const email = document.createElement('div');
      const mentorsHeading = document.createElement('h4');
      const mentorsList = document.createElement('ul');
      card.classList.add('card');
      heading.classList.add('heading');
      email.classList.add('email');
      mentorsHeading.classList.add('closed');
      mentorsList.classList.add('mentors-list')
      heading.textContent = learner.fullName;
      email.textContent = learner.email;
      mentorsHeading.textContent = 'Mentors';
      learner.mentors.forEach(mentorName => {
        const li = document.createElement('li');
        li.textContent = mentorName;
        mentorsList.appendChild(li);
      });
      card.appendChild(heading);
      card.appendChild(email);
      card.appendChild(mentorsHeading);
      card.appendChild(mentorsList);
      cardsContainer.appendChild(card);
      card.dataset.fullName = learner.fullName;
      cardsContainer.appendChild(card);
      card.addEventListener('click', evt => {
        const mentorsHeading = card.querySelector('h4');
        const didClickTheMentors = evt.target === mentorsHeading;
        const isCardSelected = card.classList.contains('selected');
        document.querySelectorAll('.card').forEach(crd => {
          crd.classList.remove('selected');
          crd.querySelector('h3').textContent = crd.dataset.fullName;
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
          } else {
            mentorsHeading.classList.replace('closed', 'open');
          }
          if (!isCardSelected) {
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
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5();
