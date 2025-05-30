import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, X } from 'lucide-react';

interface Group {
  id: string;
  name: string;
  memberCount: number;
  bannerImageUrl: string;
  memberPreviewAvatars?: string[];
}

interface SuggestedGroupsProps {
  className?: string;
}

const initialGroupsData: Group[] = [
  {
    id: 'g1',
    name: 'Mad Men (MADdicts)',
    memberCount: 6195,
    bannerImageUrl: 'https://images.unsplash.com/photo-1604906298045-339602690495?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=100&q=80',
    memberPreviewAvatars: [
      'https://i.pravatar.cc/150?img=10',
      'https://i.pravatar.cc/150?img=11',
      'https://i.pravatar.cc/150?img=12',
    ],
  },
  {
    id: 'g2',
    name: 'Dexter Morgan Fans', // Longer name to test truncation
    memberCount: 6984,
    bannerImageUrl: 'https://images.unsplash.com/photo-1580920469292-9490b70506cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=100&q=80',
     memberPreviewAvatars: [
      'https://i.pravatar.cc/150?img=15',
      'https://i.pravatar.cc/150?img=16',
    ],
  },
  {
    id: 'g3',
    name: 'React Developers World Community Hub Long Name For Testing', // Extremely long name
    memberCount: 120500,
    bannerImageUrl: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=100&q=80',
    memberPreviewAvatars: [
      'https://i.pravatar.cc/150?img=18',
      'https://i.pravatar.cc/150?img=19',
      'https://i.pravatar.cc/150?img=20',
      'https://i.pravatar.cc/150?img=21',
    ],
  },
];

const SuggestedGroups: React.FC<SuggestedGroupsProps> = ({ className }) => {
  const [suggestedGroups, setSuggestedGroups] = React.useState<Group[]>(initialGroupsData);

  const handleDismissGroup = (groupId: string) => {
    setSuggestedGroups(prevGroups => prevGroups.filter(group => group.id !== groupId));
  };
  
  const handleJoinGroup = (groupId: string) => {
    console.log(`Joining group ${groupId}`);
    // In a real app, this would likely involve an API call and UI update (e.g., button text changes to "Joined" or item is removed)
    // For this example, we'll just dismiss the group after attempting to join.
    handleDismissGroup(groupId);
  };

  return (
    <Card className={cn("w-full bg-card text-card-foreground shadow-sm rounded-lg", className)}>
      <div className="p-3 sm:p-4 flex justify-between items-center border-b border-border">
        <h2 className="text-base sm:text-md font-semibold text-foreground">Suggested Groups</h2>
        <Button variant="link" className="text-xs text-fbAccentBlue p-0 h-auto hover:no-underline hover:text-fbAccentBlue/80">
          See All
        </Button>
      </div>
      <CardContent className="p-2 space-y-2 max-h-[calc(100vh_-_400px)] overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
        {suggestedGroups.length > 0 ? (
          <ul className="space-y-0">
            {suggestedGroups.map((group) => (
              <li key={group.id} className="p-1 sm:p-1.5">
                <Card className="overflow-hidden shadow-sm bg-card hover:bg-accent/30 transition-colors">
                  <div className="relative">
                    <img 
                      src={group.bannerImageUrl} 
                      alt={`${group.name} banner`}
                      className="w-full h-20 sm:h-24 object-cover"
                    />
                    {group.memberPreviewAvatars && group.memberPreviewAvatars.length > 0 && (
                      <div className="absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2 flex -space-x-1.5 sm:-space-x-2">
                        {group.memberPreviewAvatars.slice(0, 4).map((avatarUrl, index) => (
                          <Avatar key={index} className="h-5 w-5 sm:h-6 sm:w-6 border-2 border-card">
                            <AvatarImage src={avatarUrl} alt={`Member ${index + 1}`} />
                            <AvatarFallback />
                          </Avatar>
                        ))}
                      </div>
                    )}
                    <Button 
                      variant="secondary"
                      size="icon" 
                      className="absolute top-1 right-1 h-6 w-6 bg-black/40 hover:bg-black/60 text-white rounded-full p-0.5"
                      onClick={() => handleDismissGroup(group.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  <CardContent className="p-2 sm:p-3">
                    <h3 className="text-sm font-semibold text-foreground truncate" title={group.name}>{group.name}</h3>
                    <p className="text-xs text-muted-foreground mb-1.5 sm:mb-2">{group.memberCount.toLocaleString()} members</p>
                    <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full text-xs sm:text-sm border-border text-fbAccentBlue hover:bg-fbAccentBlue/10 hover:border-fbAccentBlue focus-visible:ring-fbAccentBlue"
                        onClick={() => handleJoinGroup(group.id)}
                    >
                      <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> Join Group
                    </Button>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground p-4 text-center">No group suggestions at the moment.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default SuggestedGroups;
