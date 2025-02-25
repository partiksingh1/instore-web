import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../ui/card';
// Define the Post type
interface Post {
  id: number;
  platform: string;
  content: string;
  image: string;
  link: string;
}

const SocialMediaFeed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]); // Specify the type here

  useEffect(() => {
    // Mock data for demonstration purposes
    const mockPosts: Post[] = [
      {
        id: 1,
        platform: 'Instagram',
        content: 'Check out our latest product!',
        image: 'https://via.placeholder.com/150',
        link: 'https://www.instagram.com/instorenetwork//example'
      },
      {
        id: 2,
        platform: 'Facebook',
        content: 'Join us for our upcoming event!',
        image: 'https://via.placeholder.com/150',
        link: 'https://facebook.com/instorenetworkuk/example'
      },
      {
        id: 3,
        platform: 'X',
        content: 'Exciting news coming soon!',
        image: 'https://via.placeholder.com/150',
        link: 'https://x.com/instorenetwork/example'
      },
      {
        id: 4,
        platform: 'TikTok',
        content: 'Watch our latest video!',
        image: 'https://via.placeholder.com/150',
        link: 'https://tiktok.com/instorenetwork/@example'
      },
    ];

    // Here you would typically fetch data from your API
    // For now, we will use mock data
    setPosts(mockPosts);
  }, []); // No need to include mockPosts in the dependency array

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">Latest Social Media Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-4">
              <a href={post.link} target="_blank" rel="noopener noreferrer">
                <div className="w-full h-40 relative overflow-hidden rounded">
                  <img
                    src={post.image}
                    alt={post.platform}
                    className="rounded"
                  />
                </div>
                <h3 className="font-bold mt-2">{post.platform}</h3>
                <p>{post.content}</p>
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SocialMediaFeed;