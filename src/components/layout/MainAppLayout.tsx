import React from 'react';
import TopHeader from './TopHeader';
import SidebarNav from './SidebarNav';
import { cn } from '@/lib/utils';

interface MainAppLayoutProps {
  children: React.ReactNode;
  // Prop to pass a custom right sidebar content if needed, otherwise use placeholder
  rightSidebarContent?: React.ReactNode;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, rightSidebarContent }) => {
  // These classes define the grid structure based on project requirements
  // Sidebar Left: w-72 (288px) -> theme('spacing.72')
  // Header: h-[60px] -> theme('spacing.15') (using 4px base unit for Tailwind spacing)
  // Main Content: 2fr (flexible width)
  // Sidebar Right: w-64 (256px) -> theme('spacing.64')
  const gridContainerClasses = cn(
    "grid h-screen bg-background text-foreground",
    "grid-cols-[theme('spacing.72')_minmax(0,2fr)_theme('spacing.64')]", // Left Sidebar, Main Content (2fr), Right Sidebar
    "grid-rows-[theme('spacing.15')_minmax(0,1fr)]" // Header, Content Row
  );

  // Styling for grid areas from layout requirements
  const headerAreaClasses = "col-span-3 row-start-1 bg-surface z-20"; // z-20 for sticky header to be on top
  
  const sidebarLeftAreaClasses = cn(
    "row-start-2 col-start-1",
    "bg-sidebar flex flex-col overflow-y-auto border-r border-border"
    // layoutRequirements.sidebarLeft.layout: "flex flex-col bg-sidebar h-screen overflow-y-auto"
    // h-screen changed to h-full implicitly by grid row, overflow-y-auto is key.
  );

  const mainContentAreaClasses = cn(
    "row-start-2 col-start-2",
    "min-w-0 overflow-y-auto bg-background", // From overall.sizing.mainContent and ensuring bg
    "p-6" // From layoutRequirements.mainContent.layout (padding)
  );

  const mainContentInnerWrapperClasses = cn(
    "max-w-[750px] mx-auto", // From layoutRequirements.mainContent.container
    "flex flex-col gap-4" // From layoutRequirements.mainContent.layout (gap)
  );

  const sidebarRightAreaClasses = cn(
    "row-start-2 col-start-3",
    "bg-surface flex flex-col overflow-y-auto p-4 border-l border-border"
    // From layoutRequirements.sidebarRight.layout (adjusted for grid context)
  );

  const defaultRightSidebarContent = (
    <div>
      <h3 className="text-md font-semibold mb-3 text-foreground">Stories</h3>
      <div className="bg-muted/50 rounded-lg p-3 h-48 mb-4 border border-border/50 flex items-center justify-center">
        <p className="text-sm text-muted-foreground text-center">Stories component will be rendered here.</p>
      </div>
      <h3 className="text-md font-semibold mb-3 text-foreground">Suggested Groups</h3>
      <div className="bg-muted/50 rounded-lg p-3 h-64 border border-border/50 flex items-center justify-center">
        <p className="text-sm text-muted-foreground text-center">Suggested Groups component will be rendered here.</p>
      </div>
      {/* Other right sidebar elements like contacts/chat can be added here */} 
    </div>
  );

  return (
    <div className={gridContainerClasses}>
      <header className={headerAreaClasses}>
        <TopHeader />
      </header>

      <aside className={sidebarLeftAreaClasses}>
        <SidebarNav />
      </aside>

      <main className={mainContentAreaClasses}>
        <div className={mainContentInnerWrapperClasses}>
          {children}
        </div>
      </main>

      <aside className={sidebarRightAreaClasses}>
        {rightSidebarContent || defaultRightSidebarContent}
      </aside>
    </div>
  );
};

export default MainAppLayout;
