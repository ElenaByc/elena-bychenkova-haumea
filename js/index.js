console.log("Hi")

// add new element to the footer with current year
const footer = document.querySelector('.footer');
const copyrightDiv = document.createElement('div');
const currentYear = new Date().getFullYear();
copyrightDiv.classList.add('footer__copyright');
copyrightDiv.innerHTML = `&copy;&nbsp;Elena&nbsp;Bychenkova&nbsp;${currentYear}`;
footer.prepend(copyrightDiv);
