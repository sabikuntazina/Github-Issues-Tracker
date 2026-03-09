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
 
  const issueContainer = document.getElementById("issue-container");
  issueContainer.innerHTML = "";
  
  issues.forEach((issue) => {
    const issueSection= document.getElementById('issue-section')

  issueSection.innerHTML=`<div>

          <div >

          <div><div>

            <img src="./assets/Aperture.png" alt="">

          </div>

             <div><h2>${issues.length}  Issues</h2>

            <p>Track and manage your project issues</p></div>

           </div>

          </div>

          <div>

            <div>

              <div><div></div><h2>Open</h2></div>

           <div><div></div><h2>Closed</h2></div>

            </div>

          </div>

        </div>`
    const card = document.createElement("div");
    card.innerHTML = `
    
        <div class="space-y-4 h-full shadow bg-white py-8 px-4 rounded-md border-t-6 ${issue.status==="open" ? "border-green-500": "border-purple-600" }">
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

const activeButton = (id) => {

  removeActive();

  const activeTab = document.getElementById(id);

  activeTab.classList.remove('btn-outline');

  activeTab.classList.add('btn-primary', 'text-white');

};

// id="lesson-btn-${issueTab.level_no}" onclick="loadLevelWord(${issueTab.status})"
