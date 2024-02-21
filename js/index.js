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
  const mailto = document.createElement('div');
  mailto.innerHTML = `From: <a href="mailto:${usersEmail}">${usersName}</a>`;
  listItem.appendChild(mailto);
  const messageBody = document.createElement('div');
  messageBody.innerText = messageText;
  messageBody.classList.add('message-text');
  listItem.appendChild(messageBody);
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


// get repositories from github
const requestUrl = 'https://api.github.com/users/ElenaByc/repos?per_page=100';
fetch(requestUrl).then((response) => {
  if (response.ok) {
    return response.json();
  }
  throw new Error('Something went wrong');
})
  .then((responseJson) => handleResponse(responseJson))
  .catch((error) => handleError(error));

const handleResponse = (repos) => {
  const projectSection = document.querySelector('#projects');
  const projectList = projectSection.querySelector('.projects__list');
  let projectElement;
  // there are 51 repos total, I decided to show only recent repos
  lastYearFirstDay = Date.parse(`${currentYear - 1}-01-01`);
  myLastProjects = repos.filter(repo => Date.parse(repo.created_at.substring(0, 10)) > lastYearFirstDay
    && !repo.name.startsWith('hb')      // exclude my Hackbright Academy projects
    && !repo.name.includes('codewars-') // exclude codewars problems
    && !repo.name.includes('leetcode')  // exclude leetcode problem
    && !repo.fork);                     // exclude repos I forked
  console.log(myLastProjects);
  // sort by created date
  myLastProjects.sort((a, b) => Date.parse(b.created_at.substring(0, 10)) - Date.parse(a.created_at.substring(0, 10)));

  console.log(myLastProjects);


  myLastProjects.forEach((repo) => {
    projectElement = createProjectElement(repo);
    projectList.appendChild(projectElement);
  })
}

const createProjectElement = ({ name, html_url, created_at }) => {
  const liElement = document.createElement('li');
  liElement.classList.add('projects__list-item');
  liElement.innerHTML = `<a href="${html_url}" target="_blank">${name}</a> created at ${created_at.substring(0, 10)}`;
  return liElement;
}

const handleError = (error) => {
  // add error message to the Projects section
  console.log(error);
  const errorElement = document.createElement('p');
  errorElement.innerText = 'ERROR: No response from GitHub API';
  const projectSection = document.querySelector('#projects');
  projectSection.appendChild(errorElement);
}


// burger menu for small screens <= 480px
const burgerBtn = document.querySelector('.header__burger-btn');
const navList = document.querySelector('.header__nav-list');
const navLinks = document.querySelectorAll('.nav-link');
const menuShadow = document.querySelector('.menu-shadow');

const toggleMenu = () => {
  if (window.screen.width < 481) {
    burgerBtn.classList.toggle('active');
    navList.classList.toggle('active');
    menuShadow.classList.toggle('active');
  }
};

burgerBtn.addEventListener('click', toggleMenu);
menuShadow.addEventListener('click', toggleMenu);
navLinks.forEach(link => link.addEventListener('click', toggleMenu));
