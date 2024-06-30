// MainContent.tsx
import React from 'react';
import Users from '../Content/UsersModal/User';
import JobsTable from '../Content/jobs/jobs';

interface MainContentProps {
  activeItem: string;
}

interface ContentMap {
  [key: string]: JSX.Element;
}

const MainContent: React.FC<MainContentProps> = ({ activeItem }) => {
  const content: ContentMap = {
    Users : <Users />,
    Jobs: <JobsTable/>,
    Settings: <h2>Settings Content</h2>,
  };

  return (
    <div className="p-4 md:pl-0">
      {content[activeItem] || <h2>No Content Selected</h2>}
    </div>
  );
};

export default MainContent;
