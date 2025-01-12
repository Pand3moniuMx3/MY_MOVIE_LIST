import { useState } from "react";
import "../styles/Settings.css";

export default function Settings({
  sortBy,
  onSort,
  starColor,
  textColor,
  maxRating,
  setStarColor,
  setTextColor,
  setMaxRating,
}) {
  const [activeTab, setActiveTab] = useState(0);

  // settings state
  const [themeColor, setThemeColor] = useState("#7545f8");
  const [borderRadius, setBorderRadius] = useState("10px");

  // updating css variables
  const updateCSSVariable = (variableName, value) => {
    document.documentElement.style.setProperty(variableName, value);
  };

  // sorting options
  const sortingOptions = [
    {
      id: 1,
      title: "Sort by input order",
      value: "Default",
    },
    {
      id: 2,
      title: "Sort A to Z",
      value: "Alphabet",
    },
    {
      id: 3,
      title: "Sort latest to newest",
      value: "Latest",
    },
    {
      id: 4,
      title: "Sort by completion",
      value: "Completion",
    },
    {
      id: 5,
      title: "Sort by watched date",
      value: "WatchedDate",
    },
  ];

  return (
    <div className="settings">
      <aside>
        <Tab
          num={0}
          title="Styling"
          activeTab={activeTab}
          onSetTab={setActiveTab}
        />
        <Tab
          num={1}
          title="Checklist sorting"
          activeTab={activeTab}
          onSetTab={setActiveTab}
        />
        <Tab
          num={2}
          title="User rating"
          activeTab={activeTab}
          onSetTab={setActiveTab}
        />
      </aside>
      <main>
        {activeTab === 0 && (
          <TabContent>
            <li>
              <p
                onClick={() => {
                  setThemeColor("#7545f8");
                  updateCSSVariable("--clr-theme", "#7545f8");
                }}
              >
                Theme color
              </p>
              <input
                type="color"
                value={themeColor}
                onChange={(e) => {
                  setThemeColor(e.target.value);
                  updateCSSVariable("--clr-theme", e.target.value);
                }}
              />
            </li>
            <li>
              <p onClick={() => setBorderRadius("10px")}>Corners</p>
              <input
                type="range"
                min="0"
                max="20"
                value={parseInt(borderRadius, 10)}
                onChange={(e) => {
                  setBorderRadius(`${Number(e.target.value)}px`);
                  updateCSSVariable(
                    "--border-radius",
                    `${Number(e.target.value)}px`
                  );
                }}
              />
            </li>
          </TabContent>
        )}
        {activeTab === 1 && (
          <TabContent>
            {sortingOptions.map((item) => (
              <li
                key={item.id}
                style={{
                  color:
                    sortBy === item.value
                      ? "var(--clr-white)"
                      : "var(--clr-light-grey)",
                }}
                onClick={() => onSort(item.value)}
              >
                {item.title}
              </li>
            ))}
          </TabContent>
        )}
        {activeTab === 2 && (
          <TabContent>
            <li>
              <p onClick={() => setStarColor("#ffd700")}>Star color</p>
              <input
                type="color"
                value={starColor}
                onChange={(e) => setStarColor(e.target.value)}
              />
            </li>
            <li>
              <p onClick={() => setTextColor("#ffffff")}>Text color</p>
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
              />
            </li>
            <li>
              <p onClick={() => setMaxRating(10)}>Max rating</p>
              <input
                type="range"
                min="3"
                max="10"
                value={maxRating}
                onChange={(e) => setMaxRating(e.target.value)}
              />
            </li>
          </TabContent>
        )}
      </main>
    </div>
  );
}

function Tab({ title, num, activeTab, onSetTab }) {
  return (
    <div className="tab" onClick={() => onSetTab(num)}>
      <b
        style={{
          color:
            activeTab === num ? "var(--clr-white)" : "var(--clr-light-grey)",
        }}
      >
        {title}
      </b>
      <img src="/icons/big-forward-icon.svg" alt="open setting" />
    </div>
  );
}

function TabContent({ children }) {
  return <ul className="tab-content">{children}</ul>;
}
