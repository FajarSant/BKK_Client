import React from 'react';
import Users from '../Content/users';

interface MainContentProps {
  activeItem: string;
}

interface ContentMap {
  [key: string]: JSX.Element;
}

const MainContent: React.FC<MainContentProps> = ({ activeItem }) => {
  const content: ContentMap = {
    Dashboard: <Users/>,
    Profile: <h2>Profile Content</h2>,
    Settings: <h2>Settings Content</h2>,
  };

  return (
    <div className="container">
      {content[activeItem] || <h2>No Content Selected</h2>}
    </div>
  );
};

export default MainContent;
