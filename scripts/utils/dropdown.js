export class Dropdown {
  constructor() {
    this.keyCode = { SPACEBAR: [0, 32], ENTER: 13, DOWN_ARROW: 40, UP_ARROW: 38, ESCAPE_KEY: 27 };
    this.list = document.querySelector(".dropdown__list");
    this.listContainer = document.querySelector(".dropdown__list-container");
    this.dropdownArrow = document.querySelector(".dropdown__arrow");
    this.listItems = document.querySelectorAll(".dropdown__list-item");
    this.dropdownSelected = document.querySelector("#dropdown__selected");
    this.listItemIds = [];
  }

  setSelectedListItem(e) {
    let selectedTextToAppend = document.createTextNode(e.target.innerText);
    this.list.setAttribute("aria-activedescendant", e.target.id);
    this.dropdownSelected.innerHTML = null;
    this.dropdownSelected.appendChild(selectedTextToAppend);
  }

  closeList() {
    this.list.classList.remove("open");
    this.dropdownArrow.classList.remove("expanded");
    this.list.setAttribute("aria-expanded", false);
    this.listItems.forEach((item) => {
      item.removeAttribute("tabindex");
    });
  }

  toggleListVisibility(e) {
    let openDropDown = this.keyCode.SPACEBAR.includes(e.keyCode) || e.keyCode === this.keyCode.ENTER;

    if (e.keyCode === this.keyCode.ESCAPE) {
      this.closeList();
    }

    if (e.type === "click" || openDropDown) {
      this.list.classList.toggle("open");
      this.dropdownArrow.classList.toggle("expanded");
      this.list.classList.contains("open");
      this.list.setAttribute("aria-expanded", true);
      this.list.setAttribute("tabindex", 0);
      this.listItems.forEach((item) => {
        item.setAttribute("tabindex", 0);
      });
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
