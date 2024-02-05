import React, { useState } from "react";
import styles from "./dropdown.module.css";

import { MdKeyboardArrowDown } from "react-icons/md";

export default function Dropdown({ options, handleSelection, handleSameSelection }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState();

  function toggleDropdown() {
    setOpen(!open);
  }

  function selectOption(newSelection) {
    if (selected === newSelection.name) {
      handleSameSelection();
    } else {
      setSelected(newSelection.name);
      handleSelection(newSelection.filter);
    }

    toggleDropdown();
  }

  return (
    <div className={styles.select__menu + " " + (open ? styles.active : "")}>
      <div className={styles.select__button} onClick={toggleDropdown}>
        <span className={styles.sButton__text}>{selected ? "Sort by: " + selected : "Sort by"}</span>
        <MdKeyboardArrowDown className={styles.sButton__icon} />
      </div>
      <ul className={styles.options}>
        {options.map((option) => (
          <li
            key={option.name}
            className={styles.option}
            onClick={() => {
              selectOption(option);
            }}
          >
            <span className={styles.option__text}>{option.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
