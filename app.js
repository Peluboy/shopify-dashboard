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

  dashedCircleIcons.forEach((dashedCircleIcon, index) => {
    dashedCircleIcon.addEventListener("click", function () {
      dashedCircleIcon.style.display = "none";
      spinnerCircleIcons[index].style.display = "block";

      setTimeout(function () {
        spinnerCircleIcons[index].style.display = "none";
        checkmarkCircleIcons[index].style.display = "block";
        completedItems++;
        updateProgressBar();

        // To open the next dropdown item when the previous icon is clicked
        if (index < dropdownItems.length) {
          handleToggleDropdown(dropdownItems[index + 1]);
        }
      }, 800);
    });

    checkmarkCircleIcons[index].addEventListener("click", function () {
      checkmarkCircleIcons[index].style.display = "none";
      dashedCircleIcon.style.display = "block";
      completedItems--;
      updateProgressBar();
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

// To show only one active dropdown item at a time
const dropdownItems = document.querySelectorAll(".dropdown-item");
function handleToggleDropdown(item) {
  item.classList.toggle("active");

  dropdownItems.forEach((dropdownItem) => {
    if (dropdownItem !== item) {
      dropdownItem.classList.remove("active");
    }
  });
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
const setingPSpan = document.querySelector(".seting-p-span");
setingPSpan.addEventListener("click", toggleSettingsDropdown);

const notificationContainer = document.querySelector(".notification-container");
notificationContainer.addEventListener("click", toggleNotificationDropdown);
