import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Heart, MessageCircle, Share2, MoreHorizontal, MapPin } from 'lucide-react';

export interface PostCardProps {
  id: string;
  userName: string;
  userAvatarUrl: string;
  postTime: string;
  content?: string;
  imageUrl?: string;
  location?: string;
  taggedUsers?: string[];
  likes: number;
  comments: number;
  shares: number;
  postType: 'status' | 'photo' | 'map_checkin' | 'video';
  className?: string;
}

const PostCard: React.FC<PostCardProps> = ({
  id,
  userName,
  userAvatarUrl,
  postTime,
  content,
  imageUrl,
  location,
  // taggedUsers, // Not directly used in this simplified view but part of props
  likes,
  comments,
  shares,
  className,
}) => {
  const [isLiked, setIsLiked] = React.useState(false);
  const currentLikes = isLiked ? likes + 1 : likes;

  const handleLike = () => {
    setIsLiked(!isLiked);
    // In a real app, you would also make an API call here
  };

  return (
    <Card className={cn("w-full bg-card text-card-foreground shadow-md rounded-lg", className)}>
      <CardHeader className="p-3 sm:p-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-9 w-9 sm:h-10 sm:w-10">
            <AvatarImage src={userAvatarUrl} alt={userName} />
            <AvatarFallback>{userName.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <p className="text-sm font-medium text-foreground">
              {userName}
              {location && <span className="font-normal text-muted-foreground"> is in {location}</span>}
            </p>
            <p className="text-xs text-muted-foreground">{postTime}</p>
          </div>
          <Button variant="ghost" size="icon" className="ml-auto text-muted-foreground hover:text-foreground h-8 w-8 sm:h-9 sm:w-9">
            <MoreHorizontal className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      </CardHeader>
      {content && (
        <CardContent className="px-3 sm:px-4 pb-2 pt-0">
          <p className="text-sm text-foreground whitespace-pre-line break-words">{content}</p>
        </CardContent>
      )}
      {imageUrl && (
        <div className="bg-gray-100 dark:bg-gray-800 max-h-[500px] overflow-hidden">
          <img src={imageUrl} alt="Post content" className="w-full h-auto object-contain max-h-[500px]" />
        </div>
      )}
      {(currentLikes > 0 || comments > 0 || shares > 0) && (
        <div className="px-3 sm:px-4 py-2 flex justify-between items-center text-xs text-muted-foreground border-t border-border">
          <div className="flex items-center space-x-1">
            {currentLikes > 0 && (
              <>
                <Heart className={`h-4 w-4 ${isLiked ? 'text-fbAccentRed fill-fbAccentRed' : 'text-muted-foreground'}`} /> 
                <span>{currentLikes.toLocaleString()}</span>
              </>
            )}
          </div>
          <div className="flex space-x-2 sm:space-x-3">
            {comments > 0 && <span>{comments.toLocaleString()} Comments</span>}
            {shares > 0 && <span>{shares.toLocaleString()} Shares</span>}
          </div>
        </div>
      )}
      <CardFooter className="p-1.5 sm:p-2 border-t border-border">
        <div className="flex justify-around w-full">
          <Button variant="ghost" onClick={handleLike} className={`flex-1 text-xs sm:text-sm ${isLiked ? 'text-fbAccentBlue font-semibold' : 'text-muted-foreground'} hover:bg-accent hover:text-accent-foreground`}>
            <Heart className={`h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 ${isLiked ? 'fill-fbAccentBlue' : ''}`} /> Like
          </Button>
          <Button variant="ghost" className="flex-1 text-xs sm:text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground">
            <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" /> Comment
          </Button>
          <Button variant="ghost" className="flex-1 text-xs sm:text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground">
            <Share2 className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" /> Share
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
