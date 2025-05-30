import React from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import PostFeed from '../components/Feed/PostFeed';
import StoriesSection from '../components/Stories/StoriesSection';
import SuggestedGroups from '../components/Groups/SuggestedGroups';

/**
 * RightSidebarContent component bundles the content for the right sidebar.
 * It includes StoriesSection and SuggestedGroups, arranged vertically.
 */
const RightSidebarContent: React.FC = () => {
  return (
    <div className="flex flex-col space-y-4">
      <StoriesSection />
      <SuggestedGroups />
      {/* Placeholder for other right sidebar elements like Contacts/Chat could be added here if needed */}
    </div>
  );
};

/**
 * HomeFeedPage is the main page component for the social media home feed.
 * It utilizes MainAppLayout to structure the page and populates the main content area
 * with PostFeed and the right sidebar with StoriesSection and SuggestedGroups.
 */
const HomeFeedPage: React.FC = () => {
  return (
    <MainAppLayout rightSidebarContent={<RightSidebarContent />}>
      <PostFeed />
    </MainAppLayout>
  );
};

export default HomeFeedPage;
