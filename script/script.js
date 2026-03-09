const allTab = document.getElementById("allTab");
const openTab = document.getElementById("openTab");
const closeTab = document.getElementById("closedTab");
let allIssues = [];

const loadAllIssues = () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((json) => {
      allIssues = json.data;
      displayAllIssues(allIssues);
    });
};
// "id": 1,
// "title": "Fix navigation menu on mobile devices",
// "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
// "status": "open",
// "labels": [
// "bug",
// "help wanted"
// ],
// "priority": "high",
// "author": "john_doe",
// "assignee": "jane_smith",
// "createdAt": "2024-01-15T10:30:00Z",
// "updatedAt": "2024-01-15T10:30:00Z"

const displayAllIssues = (issues) => {
  const issueSection= document.getElementById('issue-section')
  issueSection.innerHTML=`<div class="navbar bg-base-100 shadow-sm py-6 px-5">
        
          
          <div class="navbar-start" >
          <div class="flex justify-start items-center gap-3"><div class="">
            <img src="./assets/Aperture.png" alt="">
          </div>
             <div><h2 class="text-3xl font-bold ">${issues.length}  Issues</h2>
            <p class="text-sm text-gray-500">Track and manage your project issues</p></div>
           </div>
          </div>
          <div class="navbar-end">
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-2"><div class="h-[10px] w-[10px] bg-green-700 rounded-full"></div><h2 class="">Open</h2></div>
           <div class="flex items-center gap-2"><div class="h-[10px] w-[10px] bg-purple-700 rounded-full"></div><h2>Closed</h2></div>
            </div>
          </div>
        </div>`
  const issueContainer = document.getElementById("issue-container");
  issueContainer.innerHTML = "";
  
  issues.forEach((issue) => {
    const card = document.createElement("div");
    card.innerHTML = `
    
        <div onclick="loadIssueDetails(${issue.id})" class="space-y-4 h-full shadow bg-white py-8 px-4 rounded-md border-t-6 ${issue.status==="open" ? "border-green-500": "border-purple-600" }">
            <div class="flex justify-between items-center">  ${issue.status==="open" ? '<img src="./assets/Open-Status.png" alt="">':'<img src="./assets/Closed- Status .png" alt="">'  }
              
              <button class="btn btn-soft ${
                issue.priority === "high"
                  ? "btn-error border-red-300"
                  : issue.priority === "medium"
                    ? "btn-warning border-yellow-300"
                    : "bg-gray-300 text-gray-500s  border-gray-400"
              } rounded-xl border-2 ">${issue.priority} </button>
            </div>
            <h2 class="text-lg font-bold text-neutral-950">${issue.title} </h2>
            <p class="text-gray-500 text-sm line-clamp-2 ">
              ${issue.description}
            </p>
            <div class="space-x-4 my-6">
              <button class="btn btn-soft btn-error rounded-xl border-2 border-red-300"><i class="fa-solid fa-bug"></i> Bug</button>
              <button class="btn btn-soft btn-warning border-2 rounded-xl border-yellow-200">help wanted</button>
            </div>
            <hr />
             <p class="text-gray-500 text-sm">
          #${issue.id} by ${issue.author}
        </p>
            <p class="text-gray-500 text-sm ">${issue.updatedAt} </p>
          </div>
        `;
    issueContainer.append(card);
  });
};

const filterIssues = (status) => {

  removeActive();

  if (status === "all") {
    displayAllIssues(allIssues);
  } else {
    const filtered = allIssues.filter(issue => issue.status === status);
    displayAllIssues(filtered);
  }

  const activeTab = document.getElementById(status + "Tab");

  activeTab.classList.remove("text-black","btn-outline");
  activeTab.classList.add("btn-primary","text-white");
};
// const activeButton = (id) => {
//   removeActive();

//   const activeTab = document.getElementById(id);
//   activeTab.classList.remove('btn-outline');
//   activeTab.classList.add('btn-primary', 'text-white');
// };
const removeActive = () => {
  const tabs = document.querySelectorAll(".tab");

  tabs.forEach(tab => {
    tab.classList.remove("btn-primary","text-white");
    tab.classList.add("text-black", "btn-outline");
  });
};
allTab.addEventListener("click", () => {
  filterIssues("all");
});

openTab.addEventListener("click", () => {
  filterIssues("open");
});

closeTab.addEventListener("click", () => {
  filterIssues("closed");
});

const loadIssueDetails=(id)=>{
  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
  .then(res=>res.json())
  .then(data=>{
    issueDetails(data.data)
  })
}
 

// "id": 33,
// "title": "Add bulk operations support",
// "description": "Allow users to perform bulk actions like delete, update status on multiple items at once.",
// "status": "open",
// "labels": [
// "enhancement"
// ],
// "priority": "low",
// "author": "bulk_barry",
// "assignee": "",
// "createdAt": "2024-02-02T10:00:00Z",
// "updatedAt": "2024-02-02T10:00:00Z"
const issueDetails=(details)=>{
console.log(details);
const detailContainer=document.getElementById('details-container');
detailContainer.innerHTML=`
    <h2 class="text-lg font-bold text-neutral-950">${details.title} </h2>

    <ul class="flex items-center">
      <li class="list-none ${details.status==="open"? "bg-green-700": "bg-red-700" } rounded-3xl py-2 px-2 text-white mr-5">${details.status}</li>
      <li class="list-disc list-inside pl-0 mr-5 text-gray-500 text-sm ">${details.status}ed by ${details.author}</li>
      <li class="list-disc mr-5 list-inside text-gray-500 text-sm pl-0"> ${new Date(details.updatedAt).toLocaleDateString("en-GB")}</li>
    </ul>
    <div class="space-x-4 my-6">
              <button class="btn btn-soft btn-error rounded-xl border-2 border-red-300"><i class="fa-solid fa-bug"></i> Bug</button>
              <button class="btn btn-soft btn-warning border-2 rounded-xl border-yellow-200">help wanted</button>
            </div>
            <p class="text-gray-500 text-sm ">
              ${details.description}
            </p>
            <div class="flex items-center bg-gray-100 justify-between py-6 px-4">
              <div class="space-y-2">
                <p class="text-xl text-gray-500" >Assignee:</p>
                <h2 class="text-xl font-bold">${details.author} </h2>
              </div>
              <div class="me-10">
                <p class="text-xl text-gray-500">Priority:</p>
                <p class=" rounded-xl py-1 px-4 ${details.priority==="high" ? "bg-red-700 text-white"
                  : details.priority === "medium"
                    ? "bg-yellow-300/20 text-yellow-600"
                    : "bg-gray-300 text-black"} ">${details.priority}</p>
              </div>
            </div>

`

  document.getElementById('my_modal_1').showModal();

}

loadAllIssues();

document.getElementById('btn-search').addEventListener('click', ()=>{
  const input= document.getElementById('input-search');
  const searchValue= input.value.trim().toLowerCase();
  fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues').then(res=>res.json()).then(data=>{
    const allIssues= data.data;
    const searchIssues= allIssues.filter(issue=>issue.title.toLowerCase().includes(searchValue));
    displayAllIssues(searchIssues)
  })

})