// To toggle the product details on and off
function toggleDropdown() {
  const dropdown = document.querySelector(".product-details");
  const arrowDown = document.querySelector(".icon-arrow-down");
  const arrowUp = document.querySelector(".icon-arrow-up");

  dropdown.classList.toggle("open");

  if (dropdown.classList.contains("open")) {
    arrowDown.style.display = "none";
    arrowUp.style.display = "inline-block";
  } else {
    arrowDown.style.display = "inline-block";
    arrowUp.style.display = "none";
  }
}

function toggleIconState() {
  const dashedCircleIcons = document.querySelectorAll(".icon-dashed-circle");
  const spinnerCircleIcons = document.querySelectorAll(".icon-spinner-circle");
  const checkmarkCircleIcons = document.querySelectorAll(
    ".icon-checkmark-circle"
  );
  const dropdownItems = document.querySelectorAll(".dropdown-item");

  const progressBar = document.querySelector(".progress-indicator");
  const progressText = document.querySelector(".progress-bar p");

  let completedItems = 0; // To initialize the complete item state

  function handleIconClick(index) {
    dashedCircleIcons[index].style.display = "none";
    spinnerCircleIcons[index].style.display = "block";

    setTimeout(function () {
      spinnerCircleIcons[index].style.display = "none";
      checkmarkCircleIcons[index].style.display = "block";
      completedItems++;
      updateProgressBar();

      checkmarkCircleIcons[index].classList.add("animate-checkmark");

      // To open the next dropdown item when the previous icon is clicked
      if (index < dropdownItems.length - 1) {
        handleToggleDropdown(dropdownItems[index + 1]);
      }
    }, 800);
  }

  function handleCheckmarkClick(index) {
    checkmarkCircleIcons[index].style.display = "none";
    dashedCircleIcons[index].style.display = "block";
    completedItems--;
    updateProgressBar();
  }

  dashedCircleIcons.forEach((dashedCircleIcon, index) => {
    dashedCircleIcon.addEventListener("click", function () {
      handleIconClick(index);
    });

    dashedCircleIcon.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        handleIconClick(index);
      }
    });

    checkmarkCircleIcons[index].addEventListener("click", function () {
      handleCheckmarkClick(index);
    });

    checkmarkCircleIcons[index].addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        handleCheckmarkClick(index);
      }
    });
  });

  // To update the progress bar number of completed as the icon is clicked
  function updateProgressBar() {
    const totalItems = dashedCircleIcons.length;
    const progress = (completedItems / totalItems) * 100;
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${completedItems} / ${totalItems} completed`;
  }
}

toggleIconState();

function handleButtonClick(event) {
  event.stopPropagation();
}

// To show only one active dropdown item at a time
const dropdownItems = document.querySelectorAll(".dropdown-item");
function handleToggleDropdown(item) {
  item.classList.toggle("active");

  dropdownItems.forEach((dropdownItem) => {
    if (dropdownItem !== item) {
      dropdownItem.classList.remove("active");
    }
  });

  item.focus();
}

// To close the select plan container when the close icon is clicked
const closeIcon = document.querySelector(".close-icon");
const selectPlanContainer = document.querySelector(".select-plan-container");

closeIcon.addEventListener("click", () => {
  selectPlanContainer.classList.add("closed");
  setTimeout(() => {
    selectPlanContainer.remove();
  }, 300);
});

// To toggle the profile settings dropdown on and off
function toggleSettingsDropdown() {
  const settingDropdown = document.querySelector(".setting-dropdown");
  const settingsContainer = document.querySelector(".settings-container");

  settingDropdown.classList.toggle("open");
  settingsContainer.classList.toggle("active");

  const notificationDropdown = document.querySelector(".notification-dropdown");
  const notificationContainer = document.querySelector(
    ".notification-container"
  );
  notificationDropdown.classList.remove("open");
  notificationContainer.classList.remove("active");
}

// To toggle the notification settings dropdown on and off
function toggleNotificationDropdown() {
  const notificationDropdown = document.querySelector(".notification-dropdown");
  const notificationContainer = document.querySelector(
    ".notification-container"
  );

  notificationDropdown.classList.toggle("open");
  notificationContainer.classList.toggle("active");

  const settingDropdown = document.querySelector(".setting-dropdown");
  const settingsContainer = document.querySelector(".settings-container");
  settingDropdown.classList.remove("open");
  settingsContainer.classList.remove("active");
}

// To change the color of the active dropdown
const setingPSpan = document.querySelector(".settings-container");
setingPSpan.addEventListener("click", toggleSettingsDropdown);

const notificationContainer = document.querySelector(".notification-container");
notificationContainer.addEventListener("click", toggleNotificationDropdown);

// To close the notifi and settings dropdowns when clicking outside the container
document.addEventListener("click", function (event) {
  const isClickInsideSettings = document
    .querySelector(".settings-container")
    .contains(event.target);
  const isClickInsideNotification = document
    .querySelector(".notification-container")
    .contains(event.target);

  if (!isClickInsideSettings) {
    document.querySelector(".setting-dropdown").classList.remove("open");
    document.querySelector(".settings-container").classList.remove("active");
  }

  if (!isClickInsideNotification) {
    document.querySelector(".notification-dropdown").classList.remove("open");
    document
      .querySelector(".notification-container")
      .classList.remove("active");
  }
});

// for keyboard accessibility
document.addEventListener("DOMContentLoaded", function () {
  const clickableElements = document.querySelectorAll(
    '[role="button"], [tabindex]'
  );

  clickableElements.forEach(function (element) {
    element.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        element.click();
      }

      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault();
        event.stopPropagation();
        navigateList(event.key);
      }
    });
  });

  function navigateList(direction) {
    const listItems = document.querySelectorAll(
      ".profile-settings-dropdown li[tabindex]"
    );
    const focusedElement = document.activeElement;
    let index = Array.from(listItems).indexOf(focusedElement);

    if (direction === "ArrowUp" && index > 0) {
      index -= 1;
    } else if (direction === "ArrowDown" && index < listItems.length - 1) {
      index += 1;
    }

    listItems[index].focus();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const dropdownItems = document.querySelectorAll(".dropdown-item[tabindex]");

  dropdownItems.forEach(function (item, index) {
    item.addEventListener("keydown", function (event) {
      const key = event.key;
      const lastIndex = dropdownItems.length - 1;

      if (key === "ArrowUp" || key === "ArrowDown") {
        event.preventDefault();

        const direction = key === "ArrowUp" ? -1 : 1;
        let newIndex = index + direction;

        if (newIndex < 0) {
          newIndex = lastIndex;
        } else if (newIndex > lastIndex) {
          newIndex = 0;
        }

        dropdownItems[newIndex].focus();
      }
    });
  });
});
