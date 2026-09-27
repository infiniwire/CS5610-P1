const yearSlider = document.querySelector("#year-slider");
const selectedYear = document.querySelector("#selected-year");
const rulerTrack = document.querySelector(".ruler-track");
const yearTicks = document.querySelector("#year-ticks");
const yearMarker = document.querySelector("#year-marker");
const chapterNumber = document.querySelector("#chapter-number");
const storyHeading = document.querySelector("#story-heading");
const storyYear = document.querySelector("#story-year");
const storyContent = document.querySelector("#story-content");
const educationList = document.querySelector("#education-at-year");
const projectList = document.querySelector("#projects-at-year");

const firstYear = Number(yearSlider.min);
const lastYear = Number(yearSlider.max);
const ticksPerYear = 8;

for (let tick = 0; tick <= (lastYear - firstYear) * ticksPerYear; tick += 1) {
  const mark = document.createElement("span");
  mark.className =
    tick % ticksPerYear === 0 ? "year-tick major-tick" : "year-tick";
  yearTicks.append(mark);
}

let selectedTick;

const educationPeriods = [
  {
    start: 2020,
    end: 2022,
    title: "Diploma in Computer Systems Technology",
    detail: "BCIT · With Distinction",
    description:
      "BCIT offers practical, career-focused education that combines technical skills with real-world experience.",
  },
  {
    start: 2023,
    end: 2025,
    title: "B.Sc. in Applied Computer Science",
    detail: "BCIT · With Distinction",
    description:
      "BCIT offers practical, career-focused education that combines technical skills with real-world experience.",
  },
  {
    start: 2025,
    end: 2027,
    title: "M.S. in Computer Science",
    detail: "Northeastern University · Expected 2027",
    description:
      "Northeastern is a global research university known for experiential learning, research, and partnerships.",
  },
];

const projectsByYear = [
  {
    year: 2020,
    title: "CST Calendar App",
    detail: "Student planning calendar · HTML, CSS, JavaScript, Firebase",
    description:
      "A team-built calendar that helps BCIT students track courses, assignments, and deadlines in one place.",
  },
  {
    year: 2021,
    title: "Java Calculator",
    detail: "Scientific calculator · Java, JavaFX",
    description:
      "A Java desktop calculator with scientific calculations and a history view.",
  },
  {
    year: 2023,
    title: "Ballard Customer Portal",
    detail: "Customer portal · PHP, JavaScript, CSS, SQL, MVC",
    description:
      "A customer-facing portal that integrates third-party services and automates post-sales workflows for Ballard's global customers.",
  },
  {
    year: 2024,
    title: "LENZ Photo Gallery",
    detail: "Team photo gallery · Flutter, Dart",
    description:
      "A team-built Flutter application for browsing and managing photo albums and images.",
  },
  {
    year: 2025,
    title: "Order Entry and Sales Prediction",
    detail: "Bachelor's capstone · Vue, Python, Flask, OCR",
    description:
      "A bachelor's capstone exploring OCR and an LLM to turn purchase-order PDFs and scans into structured data for sales analysis.",
  },
];

const yearHeadlines = {
  2020: "Starting the CST diploma",
  2021: "A calculator built in Java",
  2022: "Completing the CST diploma",
  2023: "Applied CS and customer portals",
  2024: "Photo galleries and applied CS",
  2025: "Capstone and graduate study",
  2026: "Continuing graduate study",
};

function showEntries(list, entries, emptyMessage) {
  list.replaceChildren();

  if (entries.length === 0) {
    const item = document.createElement("li");
    item.className = "empty-year";
    item.textContent = emptyMessage;
    list.append(item);
    return;
  }

  for (const entry of entries) {
    const item = document.createElement("li");
    const title = document.createElement("strong");
    const detail = document.createElement("span");
    const description = document.createElement("p");

    title.textContent = entry.title;
    detail.textContent = entry.detail;
    description.className = "entry-description";
    description.textContent = entry.description;
    item.append(title, detail, description);
    list.append(item);
  }
}

function showYear(animate = false) {
  const year = Number(yearSlider.value);
  const progress = ((year - firstYear) / (lastYear - firstYear)) * 100;
  const activeEducation = educationPeriods.filter(
    (entry) => entry.start <= year && year <= entry.end,
  );
  const activeProjects = projectsByYear.filter((entry) => entry.year === year);

  selectedYear.value = String(year);
  rulerTrack.style.setProperty("--year-progress", `${progress}%`);
  yearMarker.style.left = `${progress}%`;
  if (selectedTick) {
    selectedTick.className = "year-tick major-tick";
  }
  selectedTick = yearTicks.children[(year - firstYear) * ticksPerYear];
  selectedTick.className = "year-tick major-tick selected-tick";
  storyContent.style.setProperty("--connector-y", `${28 + progress * 0.44}%`);
  storyContent.style.setProperty("--connector-x", `${20 + progress * 0.6}%`);
  const chapter = String(year - firstYear + 1).padStart(2, "0");
  const totalChapters = String(lastYear - firstYear + 1).padStart(2, "0");
  chapterNumber.textContent = `Chapter ${chapter} / ${totalChapters}`;
  storyHeading.textContent = yearHeadlines[year];
  storyYear.textContent = String(year);
  showEntries(
    educationList,
    activeEducation,
    "No education entry for this year.",
  );
  showEntries(
    projectList,
    activeProjects,
    "No featured project marks this year. Move the ruler to another milestone.",
  );

  if (
    animate &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    const revealedElements = [
      selectedYear,
      storyHeading,
      ...educationList.children,
      ...projectList.children,
    ];

    for (const [index, element] of revealedElements.entries()) {
      element.getAnimations().forEach((animation) => animation.cancel());
      element.animate(
        [
          { opacity: 0.35, transform: "translateY(14px)", filter: "blur(4px)" },
          { opacity: 1, transform: "translateY(0)", filter: "blur(0)" },
        ],
        { duration: 360, delay: index * 55, easing: "ease-out", fill: "both" },
      );
    }
  }
}

yearSlider.addEventListener("input", () => showYear(true));
showYear();
