// console.log("Hello! This is home page")
let activeTab = "all"
let issuesData = [];


// spinner
const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("issue-container").classList.add("hidden");
  } else {
    document.getElementById("issue-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
}

const api = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

// console.log(api.length)
manageSpinner(true);
fetch(api)
  .then(res => res.json())
  .then(data => {
    issuesData = data.data;
    showIssues(issuesData);
    manageSpinner(false);
  })

// modal
const loadIssueDetail = async (id) => {
  manageSpinner(true);
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
  const res = await fetch(url);
  const details = await res.json();
  displayIssueDetails(details.data)
  manageSpinner(false);
}

// api theke data niye card make
const displayIssueDetails = (issue) => {

  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
                    <div>
                        <h1 class="font-bold text-lg">${issue.title}</h1>
                    </div>
                     <div class="flex gap-4 items-center">
                    <button class="btn btn-soft rounded-full">${issue.status === "open" ? "Opened" : "Closed"}</button>
                    <div class="flex gap-4">
                     <p>Opened by ${issue.author}</p>
                     <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
                     </div>
                    </div>
                    <div>
                     ${issue.labels.map(label => `<button class="btn btn-soft btn-secondary rounded-full border">${label.toUpperCase()}</button>`).join(" ")}
                    </div>
                     <div>
                     <p>${issue.description}</p>
                    </div>
        <div class="flex p-4 bg-[#F8FAFC] items-center gap-5 rounded-md">
            <p>Assignee: <span class="font-bold">${issue.assignee}</span></p>
            <p>Priority: <button class="btn btn-soft rounded-full">${issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)}</button></p>
        </div>
    `;
  document.getElementById("issue_modal").showModal();
};

