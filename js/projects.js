const toolSearch = document.querySelector(".project-search-input");
const projectCards = document.querySelectorAll(".project-card");
const searchResults = document.querySelector(".project-search-results");
const emptyMessage = document.querySelector(".project-search-empty");

function filterProjects() {
  const searchText = toolSearch.value.trim().toLowerCase();
  // Split the search into words at spaces or commas.
  const searchWords = searchText.split(/[\s,]+/);
  let matchingProjects = 0;

  // Check each project's list of tools.
  for (let i = 0; i < projectCards.length; i += 1) {
    const card = projectCards[i];
    const toolNames = card
      .querySelector(".project-tech")
      .textContent.toLowerCase();
    let matches = true;

    // A project must contain every search word.
    for (let j = 0; j < searchWords.length; j += 1) {
      const word = searchWords[j];

      if (word !== "" && !toolNames.includes(word)) {
        matches = false;
        break;
      }
    }

    card.hidden = !matches;
    if (matches) {
      matchingProjects += 1;
    }
  }

  if (matchingProjects === 1) {
    searchResults.textContent = "1 project";
  } else {
    searchResults.textContent = matchingProjects + " projects";
  }

  if (matchingProjects === 0) {
    emptyMessage.hidden = false;
  } else {
    emptyMessage.hidden = true;
  }
}

toolSearch.addEventListener("input", filterProjects);
filterProjects();
