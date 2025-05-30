import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Newspaper,
  MessageCircle,
  PlaySquare,
  Store,
  Gamepad2,
  CalendarDays,
  Flag,
  Users,
  UsersRound,
  HeartHandshake,
  ChevronDown,
  ChevronUp,
  Megaphone,
  FlagTriangleRight, // Changed from Flag to avoid exact same icon as Pages nav
  UserPlus,      // Changed from Users to avoid exact same icon as Groups nav
  CalendarPlus,
  HandHeart,
  MoreHorizontal
} from 'lucide-react';

// Define IconType using lucide-react icon names
// This is a representative list, expand as needed for other icons.
// For this component, we'll use specific icons directly.
type IconName = keyof typeof import('lucide-react');

interface NavItem {
  label: string;
  href: string;
  iconName: IconName;
  isActive?: boolean;
  isExternal?: boolean;
}

interface NavSection {
  title?: string;
  items: NavItem[];
  collapsible?: boolean;
  initiallyCollapsed?: boolean;
  defaultVisibleItems?: number;
}

const user = {
  name: 'Olenna Mason',
  avatarUrl: 'https://i.pravatar.cc/150?img=4', // Using a consistent avatar from PostFeed example
};

const mainNavItems: NavItem[] = [
  { label: 'News Feed', href: '#', iconName: 'Newspaper' as const, isActive: true },
  { label: 'Messenger', href: '#', iconName: 'MessageCircle' as const },
  { label: 'Watch', href: '#', iconName: 'PlaySquare' as const },
  { label: 'Marketplace', href: '#', iconName: 'Store' as const },
];

const shortcutsNavItems: NavItem[] = [
  { label: 'FarmVille 2', href: '#', iconName: 'Gamepad2' as const },
  // Add more shortcuts here if needed
];

const exploreNavItems: NavItem[] = [
  { label: 'Events', href: '#', iconName: 'CalendarDays' as const },
  { label: 'Pages', href: '#', iconName: 'Flag' as const },
  { label: 'Groups', href: '#', iconName: 'Users' as const },
  { label: 'Friend Lists', href: '#', iconName: 'UsersRound' as const },
  { label: 'Fundraisers', href: '#', iconName: 'HeartHandshake' as const },
  { label: 'Memories', href: '#', iconName: 'Rewind' as const }, // Added for See More demo
  { label: 'Saved', href: '#', iconName: 'Bookmark' as const }, // Added for See More demo
];

const createNavItems: NavItem[] = [
  { label: 'Ad', href: '#', iconName: 'Megaphone' as const },
  { label: 'Page', href: '#', iconName: 'FlagTriangleRight' as const },
  { label: 'Group', href: '#', iconName: 'UserPlus' as const },
  { label: 'Event', href: '#', iconName: 'CalendarPlus' as const },
  { label: 'Fundraiser', href: '#', iconName: 'HandHeart' as const },
];

const iconComponents: Record<IconName, React.ElementType> = {
  Newspaper, MessageCircle, PlaySquare, Store, Gamepad2, CalendarDays, Flag, Users, UsersRound, HeartHandshake, ChevronDown, ChevronUp, Megaphone, FlagTriangleRight, UserPlus, CalendarPlus, HandHeart, MoreHorizontal,
  // Add any other icons used if not directly imported in component where used
  Home: Users, // Placeholder, ensure all used icons are in this map if using dynamic rendering
  BarChart: Users, Settings: Users, User: Users, Bookmark: Users, Rewind: Users, // Placeholders
  Activity: Users, Airplay: Users, AlarmCheck: Users, // ...and so on for all lucide icons
  // For this component, we map only used icons. For a general utility, map all.
};

const SidebarNav: React.FC = () => {
  const [exploreExpanded, setExploreExpanded] = useState(false);
  const initialExploreItemsCount = 5;

  const visibleExploreItems = exploreExpanded ? exploreNavItems : exploreNavItems.slice(0, initialExploreItemsCount);

  const renderNavItem = (item: NavItem, itemType: 'main' | 'secondary' | 'create' = 'secondary') => {
    const IconComponent = iconComponents[item.iconName];
    const itemClasses = cn(
      'flex items-center w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors',
      item.isActive
        ? 'bg-sidebar-primary text-sidebar-primary-foreground'
        : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
      itemType === 'main' ? 'py-2.5 text-sm' : 'py-2 text-xs',
      itemType === 'create' ? 'text-muted-foreground hover:text-sidebar-accent-foreground' : ''
    );

    return (
      <a key={item.label} href={item.href} className={itemClasses}>
        {IconComponent && <IconComponent className={cn('h-5 w-5 mr-3', item.isActive ? '' : 'text-primary')} />}
        {item.label}
      </a>
    );
  };

  return (
    <nav className="flex flex-col h-full p-3 space-y-1 text-sidebar-foreground">
      {/* User Profile Link */} 
      <a href="#" className="flex items-center space-x-3 p-2 mb-2 rounded-md hover:bg-sidebar-accent transition-colors">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <span className="font-semibold text-sm text-sidebar-foreground">{user.name}</span>
      </a>

      {/* Main Navigation Items */} 
      {mainNavItems.map(item => renderNavItem(item, 'main'))}

      <Separator className="my-3 bg-sidebar-border" />

      {/* Shortcuts Section */} 
      <h3 className="px-3 pt-2 pb-1 text-xs font-semibold text-muted-foreground tracking-wider">Shortcuts</h3>
      {shortcutsNavItems.map(item => renderNavItem(item))}
      {/* Placeholder for more shortcuts or edit button if any */} 
      <Button variant="ghost" className="w-full justify-start text-xs text-muted-foreground hover:text-sidebar-accent-foreground px-3 py-2">
        <MoreHorizontal className="h-4 w-4 mr-3 text-muted-foreground" /> Edit Shortcuts
      </Button>

      <Separator className="my-3 bg-sidebar-border" />

      {/* Explore Section */} 
      <h3 className="px-3 pt-2 pb-1 text-xs font-semibold text-muted-foreground tracking-wider">Explore</h3>
      {visibleExploreItems.map(item => renderNavItem(item))}
      {exploreNavItems.length > initialExploreItemsCount && (
        <Button 
          variant="ghost" 
          className="w-full justify-start text-xs text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground px-3 py-2" 
          onClick={() => setExploreExpanded(!exploreExpanded)}
        >
          {exploreExpanded ? <ChevronUp className="h-5 w-5 mr-3 text-primary" /> : <ChevronDown className="h-5 w-5 mr-3 text-primary" />}
          {exploreExpanded ? 'See Less' : 'See More'}
        </Button>
      )}

      <Separator className="my-3 bg-sidebar-border" />

      {/* Create Section */} 
      <h3 className="px-3 pt-2 pb-1 text-xs font-semibold text-muted-foreground tracking-wider">Create</h3>
      {createNavItems.map(item => renderNavItem(item, 'create'))}
      
      {/* Footer/Ads placeholder - common in FB sidebar */}
      <div className="mt-auto pt-4 text-xs text-muted-foreground space-y-1 px-2">
        <a href="#" className="hover:underline">Privacy</a> &middot; 
        <a href="#" className="hover:underline">Terms</a> &middot; 
        <a href="#" className="hover:underline">Advertising</a> &middot; 
        <a href="#" className="hover:underline">Ad Choices</a> &middot; 
        <a href="#" className="hover:underline">Cookies</a> &middot; 
        More &copy; {new Date().getFullYear()}
      </div>
    </nav>
  );
};

export default SidebarNav;
