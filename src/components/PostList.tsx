import React from 'react';
import { ExternalLink, ThumbsUp } from 'lucide-react';

interface Post {
  id: number;
  platform: string;
  url: string;
  thumbnail: string;
  engagements?: number;
  postedAt?: string;
  engagedAt?: string;
  username?: string;
}

interface PostListProps {
  posts: Post[];
  timeframe: string;
  onTimeframeChange: (timeframe: string) => void;
  type: 'engaged' | 'my-posts';
}

const PostList: React.FC<PostListProps> = ({
  posts,
  timeframe,
  onTimeframeChange,
  type
}) => {
  const timeframes = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <select
          value={timeframe}
          onChange={(e) => onTimeframeChange(e.target.value)}
          className="bg-[#022424] border border-[#03ffc3]/20 rounded-lg px-4 py-2 text-[#03ffc3]"
        >
          {timeframes.map((tf) => (
            <option key={tf.value} value={tf.value}>
              {tf.label}
            </option>
          ))}
        </select>
      </div>

      {posts.length === 0 ? (
        <div className="bg-[#022424] border border-[#03ffc3]/20 rounded-xl p-8 text-center">
          <p className="text-[#03ffc3]/80">
            {type === 'engaged' 
              ? 'No engaged posts for this timeframe' 
              : 'No posts created during this timeframe'}
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-[#022424] border border-[#03ffc3]/20 rounded-xl p-4"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <img
                  src={post.thumbnail}
                  alt="Post thumbnail"
                  className="w-full md:w-40 h-40 object-cover rounded-lg"
                />
                <div>
                  {type === 'engaged' && post.username && (
                    <h3 className="font-semibold text-lg">{post.username}</h3>
                  )}
                  {type === 'my-posts' && post.engagements !== undefined && (
                    <div className="flex items-center gap-2 mb-2">
                      <ThumbsUp size={20} className="text-[#00ff3f]" />
                      <span className="font-semibold">
                        {post.engagements} engagements
                      </span>
                    </div>
                  )}
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00ff3f] hover:underline flex items-center gap-1 mt-2"
                  >
                    <ExternalLink size={16} />
                    View on {post.platform}
                  </a>
                  <p className="text-[#03ffc3]/60 mt-2">
                    {type === 'engaged' && post.engagedAt 
                      ? `Engaged ${post.engagedAt}`
                      : post.postedAt 
                      ? `Posted ${post.postedAt}`
                      : ''}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;