const yearSlider = document.querySelector("#year-slider");
const selectedYear = document.querySelector("#selected-year");
const educationList = document.querySelector("#education-at-year");
const projectList = document.querySelector("#projects-at-year");

const educationPeriods = [
  { start: 2020, end: 2022, title: "Diploma in Computer Systems Technology — BCIT" },
  { start: 2023, end: 2025, title: "B.Sc. in Applied Computer Science — BCIT" },
  { start: 2025, end: 2027, title: "M.S. in Computer Science — Northeastern University" },
];

const projectMilestones = [
  { year: 2020, title: "CST Calendar App" },
  { year: 2021, title: "Java Calculator" },
  { year: 2023, title: "Ballard Customer Portal" },
  { year: 2024, title: "LENZ Photo Gallery" },
  { year: 2025, title: "Order Entry and Sales Prediction" },
];

function showItems(list, titles, emptyMessage) {
  list.replaceChildren();
  const items = titles.length ? titles : [emptyMessage];

  for (const title of items) {
    const item = document.createElement("li");
    item.textContent = title;
    list.append(item);
  }
}

function showYear() {
  const year = Number(yearSlider.value);
  const education = educationPeriods
    .filter((entry) => entry.start <= year && year <= entry.end)
    .map((entry) => entry.title);
  const projects = projectMilestones
    .filter((entry) => entry.year === year)
    .map((entry) => entry.title);

  selectedYear.value = String(year);
  showItems(educationList, education, "No education entry for this year.");
  showItems(projectList, projects, "No featured project for this year.");
}

yearSlider.addEventListener("input", showYear);
showYear();
