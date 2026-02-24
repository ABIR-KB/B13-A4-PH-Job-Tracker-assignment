let jobsData = [
    { id: 1, company: "Mobile First Corp", position: "React Native Developer", location: "Remote", type: "Full-time", salary: "$130,000 - $175,000", description: "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.", status: "unassigned" },
    { id: 2, company: "WebFlow Agency", position: "Web Designer & Developer", location: "Los Angeles, CA", type: "Part-time", salary: "$80,000 - $120,000", description: "Create stunning web experiences for high-profile clients. Must have portfolio and experience with modern web design trends.", status: "unassigned" },
    { id: 3, company: "DataViz Solutions", position: "Data Visualization Specialist", location: "Boston, MA", type: "Full-time", salary: "$125,000 - $165,000", description: "Transform complex data into compelling visualizations. Required skills: D3.js, React, and strong analytical thinking.", status: "unassigned" },
    { id: 4, company: "CloudFirst Inc", position: "Backend Developer", location: "Seattle, WA", type: "Full-time", salary: "$140,000 - $190,000", description: "Design and scale our massive backend clusters using Python and AWS. Work in a fast-paced team driving core infrastructure.", status: "unassigned" },
    { id: 5, company: "Innovation Labs", position: "UI/UX Designer", location: "Austin, TX", type: "Full-time", salary: "$90,000 - $120,000", description: "Create beautiful and functional user interfaces for our suite of products. Strong design skills and frontend development workflow required.", status: "unassigned" },
    { id: 6, company: "MegaCorp Solutions", position: "Java Backend Developer", location: "New York, NY", type: "Full-time", salary: "$130,000 - $175,000", description: "Develop enterprise applications with Java/Spring and modern frameworks. We offer competitive compensation, health insurance, and professional development opportunities.", status: "unassigned" },
    { id: 7, company: "StartupXYZ", position: "Full Stack Engineer", location: "Remote", type: "Full-time", salary: "$120,000 - $160,000", description: "Join our fast-growing startup and work on our core platform. Experience with Node.js and React required. Great benefits and equity package included.", status: "unassigned" },
    { id: 8, company: "TechCorp Industries", position: "Senior Frontend Developer", location: "San Francisco, CA", type: "Full-time", salary: "$130,000 - $175,000", description: "We are looking for an experienced Frontend Developer to build scalable web applications using React and TypeScript. You will work with a talented team on cutting-edge projects.", status: "unassigned" }
];

let activeTab = 'all';

const statTotal = document.getElementById('stat-total');
const statInterview = document.getElementById('stat-interview');
const statRejected = document.getElementById('stat-rejected');
const currentTabCount = document.getElementById('current-tab-count');
const jobsGrid = document.getElementById('jobs-grid');
const emptyState = document.getElementById('empty-state');
const tabButtons = document.querySelectorAll('.tab-btn');

function updateDashboardStats() {
    statTotal.textContent = jobsData.length;
    statInterview.textContent = jobsData.filter(job => job.status === 'interview').length;
    statRejected.textContent = jobsData.filter(job => job.status === 'rejected').length;
}

function renderJobs() {
    let filteredJobs = activeTab === 'all' ? jobsData : jobsData.filter(job => job.status === activeTab);
    currentTabCount.textContent = filteredJobs.length;

    if (filteredJobs.length === 0) {
        jobsGrid.innerHTML = '';
        jobsGrid.style.display = 'none';
        emptyState.style.display = 'flex';
        return;
    } else {
        jobsGrid.style.display = 'flex';
        emptyState.style.display = 'none';
    }

    jobsGrid.innerHTML = filteredJobs.map(job => {
        const isInterview = job.status === 'interview';
        const isRejected = job.status === 'rejected';

        let badgeClass = 'default';
        let badgeText = 'NOT APPLIED';
        if (isInterview) { badgeClass = 'interview'; badgeText = 'INTERVIEWING'; } 
        else if (isRejected) { badgeClass = 'rejected'; badgeText = 'REJECTED'; }

        const interviewBtnClass = isInterview ? 'action-btn btn-interview active' : 'action-btn btn-interview';
        const rejectedBtnClass = isRejected ? 'action-btn btn-rejected active' : 'action-btn btn-rejected';

        return `
        <div class="job-card">
            <button onclick="deleteJob(${job.id})" class="btn-delete" title="Delete Job"><i class="ph ph-trash text-lg"></i></button>
            <div class="job-header">
                <h3 class="job-title">${job.company}</h3><p class="job-role">${job.position}</p>
            </div>
            <div class="job-meta">
                <span>${job.location}</span><span>•</span><span>${job.type}</span><span>•</span><span>${job.salary}</span>
            </div>
            <div class="badge ${badgeClass}">${badgeText}</div>
            <p class="job-desc">${job.description}</p>
            <div class="job-actions">
                <button onclick="updateJobStatus(${job.id}, 'interview')" class="${interviewBtnClass}">INTERVIEW</button>
                <button onclick="updateJobStatus(${job.id}, 'rejected')" class="${rejectedBtnClass}">REJECTED</button>
            </div>
        </div>`;
    }).join('');
}


tabButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        activeTab = e.target.getAttribute('data-tab');
        
        tabButtons.forEach(btn => {
            if (btn.getAttribute('data-tab') === activeTab) {
                btn.className = 'tab-btn active';
            } else {
                btn.className = 'tab-btn';
            }
        });
        renderJobs();
    });
});

window.updateJobStatus = function(id, newStatus) {
    const jobIndex = jobsData.findIndex(j => j.id === id);
    if (jobIndex > -1) {
        if (jobsData[jobIndex].status === newStatus) {
            jobsData[jobIndex].status = 'unassigned';
        } else {
            jobsData[jobIndex].status = newStatus;
        }
        updateDashboardStats();
        renderJobs();
    }
};

window.deleteJob = function(id) {
    jobsData = jobsData.filter(job => job.id !== id);
    updateDashboardStats();
    renderJobs();
};

function init() {
    updateDashboardStats();
    renderJobs();
}

init();