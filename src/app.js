//selecting dom elements
const jobContainer = document.querySelector(".job-listing");
// Function for fetching data
const fetchData = async () => {
  const res = await fetch("./data.json");
  const data = await res.json();

  return data;
};

//Make cards/list
const makeCards = (item) => {
  return `
   <div class = "job featured-job">
   <div class="job-description">
   <img
     alt="Job logo"
     class="company-logo"
     src=${item.logo}
   />
   <div class="job-name">
     <p class="company-name">${item.company}</p>
     <p class="job-position">${item.position}</p>
     <div class="deadline">
       <ul class="job-duration">
         <li class="job-du no-style">${item.postedAt}</li>
         <li class="job-du">${item.contract}</li>
         <li class="job-du">${item.location}</li>
       </ul>
     </div>
   </div>
 </div>
 <div class="job-tags">
   <ul class="tag-container">
     <li class="tag-list">${item.role}</li>
     <li class="tag-list">${item.level}</li>
     ${createLang(item.languages)}
     ${createTools(item.tools)}
   </ul>
   </ul>
 </div>
   </div>
  `;
};

//show cards
const showCards = () => {
  let cards = "";
  fetchData().then((data) => {
    data.forEach((text) => {
      cards += makeCards(text);
      jobContainer.innerHTML = cards;
    });
  });
};
showCards();

const createLang = (data) => {
  let langsCard = "";
  data.forEach((item) => {
    langsCard += `<li class="tag-list">${item}</li>`;
  });
  return langsCard;
};

const createTools = (data) => {
  let toolsCard = "";
  data.forEach((item) => {
    toolsCard += `<li class="tag-list">${item}</li>`;
  });
  return toolsCard;
};
