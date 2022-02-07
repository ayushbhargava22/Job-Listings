//selecting dom elements
const jobContainer = document.querySelector(".job-listing");
const searchContainer = document.querySelector(".search-bar");
const searchContent = document.querySelector(".search-container");

// Function for fetching data
const fetchData = async () => {
  const res = await fetch("./data.json");
  const data = await res.json();

  return data;
};

//Make cards/list
const makeCards = (item) => {
  return `
   <div class = "${item.featured === true ? "job featured" : "job"}">
   <div class="job-description">
   <img
     alt="Job logo"
     class="company-logo"
     src=${item.logo}
   />
   <div class="job-name">
     <div class="job-tags-name">
      <p class="company-name">${item.company}</p>
      ${item.new === true ? '<p class="new-tag">New</p>' : ""}
      ${item.featured === true ? '<p class="featured-tag">Featured</p>' : ""}
     </div>
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
     <li class="tag-list filter">${item.role}</li>
     <li class="tag-list filter">${item.level}</li>
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
    langsCard += `<li class="tag-list filter">${item}</li>`;
  });
  return langsCard;
};

const createTools = (data) => {
  let toolsCard = "";
  data.forEach((item) => {
    toolsCard += `<li class="tag-list filter">${item}</li>`;
  });
  return toolsCard;
};

//function to display search bar
const showSearch = (e) => {
  if (e.target.classList.contains("filter")) {
    searchContainer.classList.remove("hidden");
    displayFilter(e.target);
  }
};

let filterArray = [];
const displayFilter = (ele) => {
  let filter = "";
  if (!filterArray.includes(ele.textContent)) {
    filterArray.push(ele.textContent);
  }

  filterArray.forEach((element) => {
    filter += `
      <div class="search-tag">
         <p class="tag-names">${element}</p>
         <span class="delete-tag">╳</span>
      </div>
     `;
    searchContent.innerHTML = filter;
    filterJob();
  });
};

const filterJob = (data) => {
  if (filterArray.length !== 0) {
    fetchData().then((data) => {
      let cards = "";
      data.forEach((text) => {
        if (validJobs(text)) {
          cards += makeCards(text);
          jobContainer.innerHTML = cards;
        }
      });
    });
  }
};

// Jobs are valid or not
const validJobs = (item) => {
  let isValid = true;
  filterArray.forEach((elem) => {
    if (
      item.role !== elem &&
      item.level !== elem &&
      !item.languages.includes(elem) &&
      !item.tools.includes(elem)
    ) {
      isValid = false;
    }
  });
  return isValid;
};

// event to dislay search bar
jobContainer.addEventListener("click", showSearch);
