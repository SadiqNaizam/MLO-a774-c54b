import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Facebook,
  Search,
  Home,
  Users,
  UserPlus, // Matches one of the icons in the image for actions
  MessageCircle, // Matches Messenger icon
  Bell,          // Matches Notifications icon
  HelpCircle,   // Matches Help icon (question mark)
  LayoutGrid    // Matches Menu icon (grid)
} from 'lucide-react';

const user = {
  name: 'Olenna',
  avatarUrl: 'https://i.pravatar.cc/150?img=4', // Consistent with SidebarNav
};

const TopHeader: React.FC = () => {
  const friendRequestsCount = 8;
  const messagesCount = 0; // Image doesn't show count, so 0 or hide badge
  const notificationsCount = 36;

  // Layout requirements
  const headerHeight = 'h-[60px]';
  const headerLayout = 'flex items-center justify-between px-4 bg-surface text-foreground';
  const headerPosition = 'sticky top-0 left-0 right-0 z-20'; // z-20 to be above MainAppLayout's z-10 for sidebar scrollbars if any overlap

  return (
    <div className={cn(headerHeight, headerLayout, headerPosition, 'border-b border-border shadow-sm')}>
      {/* Left Section: Logo and Search */} 
      <div className="flex items-center space-x-2">
        <a href="#" aria-label="Facebook home">
          <Facebook className="h-10 w-10 text-fbAccentBlue" />
        </a>
        <div className="relative hidden sm:block">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search Facebook" 
            className="pl-9 pr-3 py-2 h-10 w-60 rounded-full bg-muted border-transparent focus:bg-background focus:border-primary"
          />
        </div>
        <Button variant="ghost" size="icon" className="sm:hidden rounded-full bg-muted hover:bg-muted/80">
          <Search className="h-5 w-5 text-foreground" />
        </Button>
      </div>

      {/* Middle Section: Navigation Tabs */} 
      <nav className="hidden lg:flex flex-grow justify-center items-center space-x-2">
        <Button variant="ghost" className="px-8 py-5 text-fbAccentBlue border-b-2 border-fbAccentBlue rounded-none hover:bg-accent">
          <Home className="h-7 w-7" />
          <span className="sr-only">Home</span>
        </Button>
        <Button variant="ghost" className="px-8 py-5 text-muted-foreground hover:text-foreground hover:bg-accent rounded-none">
          <Users className="h-7 w-7" />
          <span className="sr-only">Find Friends</span>
        </Button>
        {/* Add other main navigation items like Watch, Marketplace, Groups if they belong in header for some designs */} 
      </nav>

      {/* Right Section: Actions and User Profile */} 
      <div className="flex items-center space-x-1.5">
        <Button variant="ghost" size="icon" className="rounded-full bg-muted hover:bg-muted/80 text-foreground aspect-square w-10 h-10 hidden md:flex">
          <LayoutGrid className="h-5 w-5" />
          <span className="sr-only">Menu</span>
        </Button>

        <div className="relative hidden md:flex">
          <Button variant="ghost" size="icon" className="rounded-full bg-muted hover:bg-muted/80 text-foreground aspect-square w-10 h-10">
            <UserPlus className="h-5 w-5" />
            <span className="sr-only">Friend Requests</span>
          </Button>
          {friendRequestsCount > 0 && (
            <Badge variant="destructive" className="absolute -top-1 -right-1.5 h-5 min-w-[20px] px-1 flex items-center justify-center rounded-full text-xs">
              {friendRequestsCount > 99 ? '99+' : friendRequestsCount}
            </Badge>
          )}
        </div>

        <div className="relative hidden md:flex">
          <Button variant="ghost" size="icon" className="rounded-full bg-muted hover:bg-muted/80 text-foreground aspect-square w-10 h-10">
            <MessageCircle className="h-5 w-5" />
            <span className="sr-only">Messages</span>
          </Button>
          {messagesCount > 0 && (
             <Badge variant="destructive" className="absolute -top-1 -right-1.5 h-5 min-w-[20px] px-1 flex items-center justify-center rounded-full text-xs">
              {messagesCount > 99 ? '99+' : messagesCount}
            </Badge>
          )}
        </div>
        
        <div className="relative">
          <Button variant="ghost" size="icon" className="rounded-full bg-muted hover:bg-muted/80 text-foreground aspect-square w-10 h-10">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          {notificationsCount > 0 && (
            <Badge variant="destructive" className="absolute -top-1 -right-1.5 h-5 min-w-[20px] px-1 flex items-center justify-center rounded-full text-xs">
              {notificationsCount > 99 ? '99+' : notificationsCount}
            </Badge>
          )}
        </div>

        <Button variant="ghost" className="flex items-center space-x-2 rounded-full hover:bg-accent p-0.5 pr-2">
          <Avatar className="h-7 w-7">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{user.name.substring(0,1)}</AvatarFallback>
          </Avatar>
          <span className="font-medium text-sm hidden xl:inline text-foreground">{user.name}</span>
          <span className="sr-only">User Account</span>
        </Button>
      </div>
    </div>
  );
};

export default TopHeader;
