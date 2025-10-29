import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const SearchBox = ({ placeholder = '搜索...', onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim() && onSearch) {
      onSearch(query.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      maxWidth: '600px', 
      margin: '0 auto',
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '25px',
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    }}>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        style={{
          flex: 1,
          border: 'none',
          padding: '12px 20px',
          fontSize: '16px',
          background: 'transparent',
          outline: 'none'
        }}
      />
      <Button
        type="primary"
        icon={<SearchOutlined />}
        onClick={handleSearch}
        style={{
          height: 'auto',
          border: 'none',
          borderRadius: '0',
          background: 'linear-gradient(135deg, #007AFF, #5856D6)',
          padding: '0 24px',
          fontSize: '16px'
        }}
      >
        搜索
      </Button>
    </div>
  );
};

export default SearchBox;