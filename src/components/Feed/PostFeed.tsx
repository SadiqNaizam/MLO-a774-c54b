import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Image as ImageIcon, ListChecks, Tag, Video as VideoIcon, Pencil } from 'lucide-react';
import PostCard, { PostCardProps } from './PostCard';

interface PostFeedProps {
  className?: string;
}

// Dummy data for PostFeed
const postsData: PostCardProps[] = [
  {
    id: '1',
    userName: 'Julia Fillory',
    userAvatarUrl: 'https://i.pravatar.cc/150?img=1',
    postTime: '2 hrs ago',
    content: 'Checking out some new stores downtown!',
    imageUrl: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80', // Placeholder for map
    location: 'Raleigh, North Carolina',
    likes: 152,
    comments: 18,
    shares: 7,
    postType: 'map_checkin' as const,
  },
  {
    id: '2',
    userName: 'Alex Doe',
    userAvatarUrl: 'https://i.pravatar.cc/150?img=2',
    postTime: '5 hrs ago',
    content: 'Just enjoyed a wonderful sunset! #blessed #nature',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b37?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    likes: 230,
    comments: 45,
    shares: 12,
    postType: 'photo' as const,
  },
  {
    id: '3',
    userName: 'Samantha Bee',
    userAvatarUrl: 'https://i.pravatar.cc/150?img=3',
    postTime: '1 day ago',
    content: 'Excited to announce my new project! Stay tuned for more details. This is a longer post to test text wrapping and general content flow. It should span multiple lines and show how text is handled within the card. We can also include some special characters like é, à, ö, etc. and maybe a link: https://example.com',
    likes: 501,
    comments: 88,
    shares: 25,
    postType: 'status' as const,
  },
];

const CreatePost: React.FC = () => {
  const currentUser = { name: 'Olenna Mason', avatarUrl: 'https://i.pravatar.cc/150?img=4' };

  return (
    <Card className="w-full bg-card text-card-foreground shadow-md rounded-lg">
      <CardHeader className="p-3 border-b border-border">
        <div className="flex items-center space-x-1 sm:space-x-2">
          <Button variant="ghost" className="text-xs sm:text-sm font-medium text-foreground hover:bg-accent p-1 sm:p-2 flex-1 sm:flex-none justify-center">
             <Pencil className="h-4 w-4 mr-1 sm:mr-2 text-fbAccentBlue" />
             Make Post
          </Button>
          <Separator orientation="vertical" className="h-6" />
           <Button variant="ghost" className="text-xs sm:text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground p-1 sm:p-2 flex-1 sm:flex-none justify-center">
             <ImageIcon className="h-4 w-4 mr-1 sm:mr-2 text-green-500" />
             Photo/Video
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <Button variant="ghost" className="text-xs sm:text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground p-1 sm:p-2 flex-1 sm:flex-none justify-center">
             <VideoIcon className="h-4 w-4 mr-1 sm:mr-2 text-red-500" />
             Live Video
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
          <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
            <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
            <AvatarFallback>{currentUser.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-grow bg-background rounded-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm text-muted-foreground cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700">
            What's on your mind, {currentUser.name.split(' ')[0]}?
          </div>
        </div>
        <Separator className="my-2 sm:my-3" />
        <div className="flex justify-around">
          <Button variant="ghost" className="flex-1 text-xs sm:text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground py-2">
            <ListChecks className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-purple-500" /> List
          </Button>
          <Button variant="ghost" className="flex-1 text-xs sm:text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground py-2">
            <ImageIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-green-500" /> Photo/Video
          </Button>
          <Button variant="ghost" className="flex-1 text-xs sm:text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground py-2">
            <Tag className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-blue-500" /> Tag Friends
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};


const PostFeed: React.FC<PostFeedProps> = ({ className }) => {
  const [posts, setPosts] = React.useState<PostCardProps[]>(postsData);

  return (
    <div className={cn("w-full space-y-4 sm:space-y-6", className)}>
      <CreatePost />
      {posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
};

export default PostFeed;
