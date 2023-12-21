import './App.css';
import styles from "./styles.module.scss"


import { useState } from "react"
import { Link } from 'react-router-dom'
import cn from "classnames"

const menu = [
  {
    title:'Menu Item 18', link: '/page1', secondLevelMenu: [{title:'Inner Menu Item 1', link: '/page2'},{title:'Inner Menu Item 2', link: '/page3'},{title:'Inner Menu Item 3', link: '/page4'}]
  },
  {
    title:'Menu Item 2', link: null, secondLevelMenu: [{title:'Inner Menu Item 4', link: '/page5'},{title:'Inner Menu Item 5', link: null}, {title:'Inner Menu Item 6', link: 'page6'}]
  },
  {
    title:'Menu Item 33', link: '/dropdown-menu', secondLevelMenu: null
  }
]


const App = () => {
  
  const [dropdownActive, setDropdownActive] = useState(false)
  const [dropdownFocused, setDropdownFocused] = useState(false)

  
  const handleDropdown = (e) => {
    // eslint-disable-next-line default-case
    switch (e.type) {
      case "click":
        if (dropdownFocused && dropdownActive) {
          setDropdownFocused(false)
        }
        break
      case "mouseenter":
        setDropdownActive(true)
        break
      case "mouseleave":
        setDropdownActive(false)
        break
      case "keyup":
        setDropdownFocused(true)
        break
    }
  }

  
  return (
          <nav
            className={styles.navigation}
          >
            <ul className={styles.navigation_list}>
              {menu.map((item, index) => {
                return item.secondLevelMenu ? (
                  <li className={styles.nav__link} key={index}>
                    {item.link ? (
                      <Link
                        to={item.link}
                        title={item.title}
                        onClick={handleDropdown}
                        onMouseEnter={handleDropdown}
                        onMouseLeave={handleDropdown}
                        onKeyUp={handleDropdown}
                      >
                        {item.title}
                      </Link>
                    ) : (
                      <button
                        className={styles.nav__button}
                        onClick={handleDropdown}
                        onMouseEnter={handleDropdown}
                        onMouseLeave={handleDropdown}
                        onKeyUp={handleDropdown}
                      >
                        {item.title}
                      </button>
                    )}

                    <ul
                      className={cn(
                        styles.nav__dropdown,
                        dropdownActive && styles["nav__dropdown--active"],
                        dropdownFocused && styles["nav__dropdown--focused"]
                      )}
                      onMouseEnter={handleDropdown}
                      onMouseLeave={handleDropdown}
                    >
                      {item.secondLevelMenu.map(
                        (innerItem, index) => {
                          return (
                            innerItem.link && (
                              <li
                                className={styles.nav__dropdown_item}
                                key={index}
                              >
                                <Link
                                  className={styles.nav__dropdown_link}
                                  to={innerItem.link}
                                  title={innerItem.title}
                                  onClick={handleDropdown}
                                >
                                  {innerItem.title}
                                </Link>
                              </li>
                            )
                          )
                        }
                      )}
                    </ul>
                  </li>
                ) : (
                  item.link && (
                    <li className={styles.nav__link} key={index}>
                      <Link
                        to={item.link}
                        title={item.title}
                      >
                        {item.title}
                      </Link>
                    </li>
                  )
                )
              })}
            </ul>
          </nav>
        
  )
}

export default App;
