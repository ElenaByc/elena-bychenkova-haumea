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
})
