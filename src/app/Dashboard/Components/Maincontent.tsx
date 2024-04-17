import React from "react";

interface MainContentProps {
  activeItem: string;
}

const MainContent: React.FC<MainContentProps> = ({ activeItem }) => {
  return (
    <div className="flex-1 p-4">
      <h1 className="text-3xl font-semibold mb-4">Main Content</h1>
      {activeItem === "user" && <div>Lamaran User Content</div>}
      {activeItem === "analysis" && <div>Analisis Content</div>}
    </div>
  );
};

export default MainContent;
