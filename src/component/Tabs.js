import React from "react";

export const TabType = {
    HISTORY: "HISTORY",
};

const TabLabel = {
    [TabType.HISTORY]: "최근 검색어",
};

const Tabs = ({ selectedTab, onChange }) => (
    <ul className="tabs">
        {Object.values(TabType).map((tabType) => (
            <li
                key={tabType}
                className={selectedTab === tabType ? "active" : ""}
                onClick={() => onChange(tabType)}
            >
                {TabLabel[tabType]}
            </li>
        ))}
    </ul>
);

export default Tabs;