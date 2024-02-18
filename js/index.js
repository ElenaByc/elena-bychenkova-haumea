// add new element to the footer with current year
const footer = document.querySelector('.footer');
const copyrightDiv = document.createElement('div');
const currentYear = new Date().getFullYear();
copyrightDiv.classList.add('footer__copyright');
copyrightDiv.innerHTML = `&copy;&nbsp;Elena&nbsp;Bychenkova&nbsp;${currentYear}`;
footer.prepend(copyrightDiv);

// add skills from the array to the UL element in the Skills section
const mySkillsArray = ['Java', 'Python', 'JavaScript', 'HTML', 'CSS', 'Figma', 'Bootstrap', 'SpringBoot', 'Flask', 'PostgreSQL'];
const skillsSection = document.querySelector('#skills');
const skillsListElement = skillsSection.querySelector('.skills__list');
let listItem;
mySkillsArray.forEach(skill => {
  listItem = document.createElement('li');
  listItem.innerText = skill;
  skillsListElement.appendChild(listItem);
});

// handle message form submit
const messageForm = document.querySelector('.message__form');
messageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const usersName = event.target.name.value;
  const usersEmail = event.target.email.value;
  const messageText = event.target.message.value;
  const messagesSection = document.querySelector('#messages');
  const messagesList = messagesSection.querySelector('ul');

  if (getComputedStyle(messagesSection, null).display === 'none' || messagesSection.style.display === 'none') {
    messagesSection.style.display = 'block';
  }

  const listItem = document.createElement('li');
  // const messageDiv = document.createElement('div');
  const mailto = document.createElement('div');
  mailto.innerHTML = `From: <a href="mailto${usersEmail}">${usersName}</a>`;
  listItem.appendChild(mailto);
  const messageBody = document.createElement('div');
  messageBody.innerText = messageText;
  messageBody.classList.add('message-text');
  listItem.appendChild(messageBody);
  // listItem.appendChild(messageDiv);
  const deleteBtn = document.createElement('div');
  deleteBtn.classList.add('remove-btn');
  deleteBtn.title = 'Delete this message';
  deleteBtn.addEventListener('click', (event) => {
    const entry = event.target.parentNode;
    if (messagesList.children.length === 1) {
      messagesSection.style.display = 'none'
    }
    entry.remove();

  });
  listItem.appendChild(deleteBtn);
  messagesList.appendChild(listItem);
  event.target.reset()
});
