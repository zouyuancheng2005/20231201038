import React from 'react';
import { Card, Avatar, Tag, Space } from 'antd';
import { MessageOutlined, HeartOutlined, EyeOutlined } from '@ant-design/icons';

const PostList = ({ posts = [] }) => {
  const formatCount = (count) => {
    if (count >= 10000) {
      return (count / 10000).toFixed(1) + '万';
    }
    return count;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {posts.map((post) => (
        <Card
          key={post.id}
          hoverable
          style={{ 
            borderRadius: '12px',
            border: '1px solid #f0f0f0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
          }}
          bodyStyle={{ padding: '16px' }}
          onClick={() => console.log('查看帖子:', post.id)}
        >
          <div style={{ display: 'flex', gap: '12px' }}>
            {/* 作者信息 */}
            <Avatar 
              size={40} 
              style={{ 
                backgroundColor: '#007AFF',
                flexShrink: 0 
              }}
            >
              {post.author.avatar}
            </Avatar>
            
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* 标题和贴吧标签 */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                marginBottom: '8px'
              }}>
                <h3 style={{ 
                  margin: 0,
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#333',
                  flex: 1,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {post.title}
                </h3>
                <Tag color="blue" style={{ margin: 0, flexShrink: 0 }}>
                  {post.tieba}
                </Tag>
              </div>
              
              {/* 内容预览 */}
              <p style={{ 
                margin: '0 0 12px 0',
                fontSize: '14px',
                color: '#666',
                lineHeight: 1.5,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {post.content}
              </p>
              
              {/* 统计信息 */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '16px',
                fontSize: '12px',
                color: '#999'
              }}>
                <Space>
                  <span>{post.author.name}</span>
                  <span>•</span>
                  <span>{post.createTime}</span>
                </Space>
                
                <Space style={{ marginLeft: 'auto' }}>
                  <span>
                    <MessageOutlined style={{ marginRight: '4px' }} />
                    {formatCount(post.replyCount)}
                  </span>
                  <span>
                    <HeartOutlined style={{ marginRight: '4px' }} />
                    {formatCount(post.likeCount)}
                  </span>
                </Space>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default PostList;