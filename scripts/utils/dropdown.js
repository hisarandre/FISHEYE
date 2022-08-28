class Dropdown {
  constructor() {
    this.keyCode = { SPACEBAR: [0, 32], ENTER: 13, DOWN_ARROW: 40, UP_ARROW: 38, ESCAPE_KEY: 27 };
    this.list = document.querySelector(".dropdown__list");
    this.listContainer = document.querySelector(".dropdown__list-container");
    this.dropdownArrow = document.querySelector(".dropdown__arrow");
    this.listItems = document.querySelectorAll(".dropdown__list-item");
    this.dropdownSelectedNode = document.querySelector("#dropdown__selected");
    this.listItemIds = [];
  }

  setSelectedListItem(e) {
    let selectedTextToAppend = document.createTextNode(e.target.innerText);
    this.dropdownSelectedNode.innerHTML = null;
    this.dropdownSelectedNode.appendChild(selectedTextToAppend);
  }

  closeList() {
    this.list.classList.remove("open");
    this.dropdownArrow.classList.remove("expanded");
    this.listContainer.setAttribute("aria-expanded", false);
  }

  toggleListVisibility(e) {
    let openDropDown = this.keyCode.SPACEBAR.includes(e.keyCode) || e.keyCode === this.keyCode.ENTER;

    if (e.keyCode === this.keyCode.ESCAPE) {
      this.closeList();
    }

    if (e.type === "click" || openDropDown) {
      this.list.classList.toggle("open");
      this.dropdownArrow.classList.toggle("expanded");
      this.listContainer.setAttribute("aria-expanded", this.list.classList.contains("open"));
    }

    if (e.keyCode === this.keyCode.DOWN_ARROW) {
      this.focusNextListItem(this.keyCode.DOWN_ARROW);
    }

    if (e.keyCode === this.keyCode.UP_ARROW) {
      this.focusNextListItem(this.keyCode.UP_ARROW);
    }
  }

  selectSortOption() {
    this.listItems.forEach((item) => this.listItemIds.push(item.id));

    this.listItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        this.setSelectedListItem(e);
        this.closeList();
      });

      item.addEventListener("keydown", (e) => {
        switch (e.keyCode) {
          case this.keyCode.ENTER:
            this.setSelectedListItem(e);
            this.closeList();
            return;

          case this.keyCode.DOWN_ARROW:
            this.focusNextListItem(this.keyCode.DOWN_ARROW);
            return;

          case this.keyCode.UP_ARROW:
            this.focusNextListItem(this.keyCode.UP_ARROW);
            return;

          case this.keyCode.ESCAPE:
            this.closeList();
            return;

          default:
            return;
        }
      });
    });
  }

  focusNextListItem(direction) {
    const activeElementId = document.activeElement.id;
    if (activeElementId === "dropdown__selected") {
      document.querySelector(`#${this.listItemIds[0]}`).focus();
    } else {
      const currentActiveElementIndex = this.listItemIds.indexOf(activeElementId);
      if (direction === this.keyCode.DOWN_ARROW) {
        const currentActiveElementIsNotLastItem = currentActiveElementIndex < this.listItemIds.length - 1;
        if (currentActiveElementIsNotLastItem) {
          const nextListItemId = this.listItemIds[currentActiveElementIndex + 1];
          document.querySelector(`#${nextListItemId}`).focus();
        }
      } else if (direction === this.keyCode.UP_ARROW) {
        const currentActiveElementIsNotFirstItem = currentActiveElementIndex > 0;
        if (currentActiveElementIsNotFirstItem) {
          const nextListItemId = this.listItemIds[currentActiveElementIndex - 1];
          document.querySelector(`#${nextListItemId}`).focus();
        }
      }
    }
  }
}

const dropdown = new Dropdown();
dropdown.selectSortOption();
document.querySelector("#dropdown__selected").addEventListener("click", (e) => dropdown.toggleListVisibility(e));
document.querySelector("#dropdown__selected").addEventListener("keydown", (e) => dropdown.toggleListVisibility(e));
