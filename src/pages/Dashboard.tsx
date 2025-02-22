import React, { useState } from 'react';
import { Users, ThumbsUp, TrendingUp, Percent, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardStats from '../components/DashboardStats';
import SubscriptionStatus from '../components/SubscriptionStatus';
import PostList from '../components/PostList';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeframe, setTimeframe] = useState('today');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const stats = [
    {
      icon: Users,
      label: 'Community Reach',
      value: '2.4K',
      trend: '+12%',
      color: 'text-[#00ff3f]'
    },
    {
      icon: ThumbsUp,
      label: 'Engagements Made',
      value: '156',
      trend: '+8%',
      color: 'text-[#03ffc3]'
    },
    {
      icon: TrendingUp,
      label: 'Engagement Rate',
      value: '24%',
      trend: '+5%',
      color: 'text-[#00ff3f]'
    },
    {
      icon: Percent,
      label: 'Discount Earned',
      value: '12%',
      trend: '8 to next %',
      color: 'text-[#03ffc3]'
    }
  ];

  const subscriptionData = {
    daysRemaining: 23,
    totalDays: 30,
    nextBillingDate: '2024-04-15',
    isExpiringSoon: false,
    isExpired: false
  };

  const engagedPosts = {
    today: [
      {
        id: 1,
        platform: 'instagram',
        username: '@creator1',
        url: 'https://instagram.com/p/123',
        thumbnail: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0',
        engagedAt: '2h ago'
      }
    ],
    week: [
      {
        id: 2,
        platform: 'youtube',
        username: '@creator2',
        url: 'https://youtube.com/watch?v=abc',
        thumbnail: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb',
        engagedAt: '2 days ago'
      }
    ]
  };

  const myPosts = {
    today: [
      {
        id: 1,
        platform: 'instagram',
        url: 'https://instagram.com/p/xyz',
        thumbnail: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0',
        engagements: 45,
        postedAt: '3h ago'
      }
    ],
    week: [
      {
        id: 2,
        platform: 'youtube',
        url: 'https://youtube.com/watch?v=def',
        thumbnail: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb',
        engagements: 128,
        postedAt: '2 days ago'
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-[#03ffc3]/10 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <div className={`${
          isMenuOpen 
            ? 'absolute top-20 right-4 bg-[#022424] border border-[#03ffc3]/20 rounded-xl p-4 shadow-lg z-50' 
            : 'hidden'
        } md:block md:relative md:top-0 md:right-0 md:bg-transparent md:border-none md:p-0 md:shadow-none`}>
          <div className="flex flex-col md:flex-row gap-2">
            {['overview', 'engaged', 'posts'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setIsMenuOpen(false);
                }}
                className={`px-4 py-2 rounded-lg capitalize ${
                  activeTab === tab
                    ? 'bg-[#00ff3f] text-[#022424]'
                    : 'text-[#03ffc3] hover:bg-[#03ffc3]/10'
                }`}
              >
                {tab === 'posts' ? 'My Posts' : tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeTab === 'overview' && (
        <>
          <DashboardStats stats={stats} />
          <SubscriptionStatus
            {...subscriptionData}
            onRenew={() => navigate('/payment')}
          />
        </>
      )}

      {activeTab === 'engaged' && (
        <PostList
          posts={engagedPosts[timeframe] || []}
          timeframe={timeframe}
          onTimeframeChange={setTimeframe}
          type="engaged"
        />
      )}

      {activeTab === 'posts' && (
        <PostList
          posts={myPosts[timeframe] || []}
          timeframe={timeframe}
          onTimeframeChange={setTimeframe}
          type="my-posts"
        />
      )}
    </div>
  );
};

export default Dashboard;