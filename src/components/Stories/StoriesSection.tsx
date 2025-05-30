import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlusCircle, Archive, Settings } from 'lucide-react';

interface Story {
  id: string;
  userName: string;
  userAvatarUrl: string;
  storyImageUrl: string;
}

interface StoriesSectionProps {
  className?: string;
}

const storiesData: Story[] = [
  { id: 's1', userName: 'Mike R.', userAvatarUrl: 'https://i.pravatar.cc/150?img=5', storyImageUrl: 'https://picsum.photos/seed/s1/100/160' },
  { id: 's2', userName: 'Lana K.', userAvatarUrl: 'https://i.pravatar.cc/150?img=6', storyImageUrl: 'https://picsum.photos/seed/s2/100/160' },
  { id: 's3', userName: 'John B.', userAvatarUrl: 'https://i.pravatar.cc/150?img=7', storyImageUrl: 'https://picsum.photos/seed/s3/100/160' },
  { id: 's4', userName: 'Sara W.', userAvatarUrl: 'https://i.pravatar.cc/150?img=8', storyImageUrl: 'https://picsum.photos/seed/s4/100/160' },
  { id: 's5', userName: 'Ken T.', userAvatarUrl: 'https://i.pravatar.cc/150?img=9', storyImageUrl: 'https://picsum.photos/seed/s5/100/160' },
];

const StoriesSection: React.FC<StoriesSectionProps> = ({ className }) => {
  return (
    <Card className={cn("w-full bg-card text-card-foreground shadow-sm rounded-lg", className)}>
      <div className="p-3 sm:p-4 border-b border-border">
        <div className="flex justify-between items-center mb-2 sm:mb-3">
          <h2 className="text-base sm:text-md font-semibold text-foreground">Stories</h2>
          <div className='flex space-x-1'>
            <Button variant="ghost" size="sm" className="text-xs text-fbAccentBlue hover:bg-accent p-1 h-auto">
              <Archive className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> Archive
            </Button>
            <Button variant="ghost" size="sm" className="text-xs text-fbAccentBlue hover:bg-accent p-1 h-auto">
              <Settings className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> Settings
            </Button>
          </div>
        </div>
        
        <Card className="overflow-hidden hover:shadow-md transition-shadow bg-muted/20 hover:bg-muted/40 cursor-pointer rounded-md">
          <CardContent className="p-0 flex flex-col items-center justify-center h-40 sm:h-48">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-fbAccentBlue text-primary-foreground flex items-center justify-center mb-1 sm:mb-2">
              <PlusCircle className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
            <p className="text-sm font-medium text-foreground">Add to Your Story</p>
            <p className="text-xs text-muted-foreground text-center px-2">Share a photo or video</p>
          </CardContent>
        </Card>
      </div>

      <CardContent className="p-2 sm:p-3">
        <div className="flex space-x-2 overflow-x-auto pb-1 -mb-1 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
          {storiesData.map((story) => (
            <div key={story.id} className="flex-shrink-0 w-[90px] h-[150px] sm:w-[100px] sm:h-[160px] rounded-md overflow-hidden relative cursor-pointer group shadow-sm">
              <img src={story.storyImageUrl} alt={`${story.userName}'s story`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <Avatar className="absolute top-1.5 left-1.5 h-7 w-7 sm:h-8 sm:w-8 border-2 border-fbAccentBlue">
                <AvatarImage src={story.userAvatarUrl} alt={story.userName} />
                <AvatarFallback>{story.userName.substring(0,1)}</AvatarFallback>
              </Avatar>
              <p className="absolute bottom-1.5 left-0 right-0 text-center text-xs text-white font-medium px-1 truncate">
                {story.userName}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StoriesSection;
