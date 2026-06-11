import React, { useState } from 'react';
import { MessageSquare, Megaphone, Send, User } from 'lucide-react';

const mockTeachers = [
  { id: 1, name: 'Sarah Jenkins', lastMessage: 'Got the new schedule, thanks!', unread: 0 },
  { id: 2, name: 'Michael Chen', lastMessage: 'Can we move the Grade 10 exam?', unread: 2 },
  { id: 3, name: 'Emily Roberts', lastMessage: 'Syllabus updated in system.', unread: 0 },
];

const mockChatHistory = [
  { sender: 'Michael Chen', text: 'Hi Admin, regarding the upcoming exams for Grade 10...', isMine: false, time: '10:30 AM' },
  { sender: 'Admin', text: 'Yes, I saw your request. We can push it to next Thursday.', isMine: true, time: '10:45 AM' },
  { sender: 'Michael Chen', text: 'Can we move the Grade 10 exam to Friday instead?', isMine: false, time: '11:02 AM' },
];

const mockAnnouncements = [
  { id: 1, title: 'Term 2 Result Declaration', date: '10 Jun', text: 'All teachers must submit final grades by end of week.' },
  { id: 2, title: 'Server Maintenance', date: '08 Jun', text: 'The teacher portal will be down for 2 hours this Sunday.' },
];

export default function Communications() {
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' or 'announcements'
  
  // Chat state
  const [activeChat, setActiveChat] = useState(mockTeachers[1]);
  const [chatHistory, setChatHistory] = useState(mockChatHistory);
  const [messageInput, setMessageInput] = useState('');

  // Announcement state
  const [announcements, setAnnouncements] = useState(mockAnnouncements);
  const [announceTitle, setAnnounceTitle] = useState('');
  const [announceText, setAnnounceText] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    setChatHistory([...chatHistory, { sender: 'Admin', text: messageInput, isMine: true, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setMessageInput('');
  };

  const handlePostAnnouncement = (e) => {
    e.preventDefault();
    if (!announceTitle || !announceText) return;
    setAnnouncements([{
      id: Date.now(),
      title: announceTitle,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
      text: announceText
    }, ...announcements]);
    setAnnounceTitle('');
    setAnnounceText('');
  };

  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 100px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' }}>
        <div>
          <h1 className="text-gradient">Communications Hub</h1>
          <p>Chat with teachers and broadcast global announcements.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', background: 'rgba(0,0,0,0.3)', padding: '5px', borderRadius: '12px' }}>
          <button 
            className={`btn ${activeTab === 'chat' ? 'btn-primary' : 'btn-ghost'}`} 
            style={{ border: 'none' }}
            onClick={() => setActiveTab('chat')}
          >
            <MessageSquare size={16} /> Chat
          </button>
          <button 
            className={`btn ${activeTab === 'announcements' ? 'btn-primary' : 'btn-ghost'}`} 
            style={{ border: 'none' }}
            onClick={() => setActiveTab('announcements')}
          >
            <Megaphone size={16} /> Announcements
          </button>
        </div>
      </div>

      <div className="glass-panel" style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {activeTab === 'chat' ? (
          <>
            {/* Chat Sidebar */}
            <div style={{ width: '300px', borderRight: '1px solid var(--panel-border)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '20px', borderBottom: '1px solid var(--panel-border)' }}>
                <h3 style={{ margin: 0 }}>Teachers</h3>
              </div>
              <div style={{ overflowY: 'auto', flex: 1 }}>
                {mockTeachers.map(t => (
                  <div 
                    key={t.id} 
                    onClick={() => setActiveChat(t)}
                    style={{ 
                      padding: '15px 20px', 
                      borderBottom: '1px solid rgba(255,255,255,0.05)', 
                      cursor: 'pointer',
                      background: activeChat.id === t.id ? 'rgba(0, 229, 255, 0.1)' : 'transparent'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <span style={{ color: '#fff', fontWeight: 500 }}>{t.name}</span>
                      {t.unread > 0 && (
                        <span style={{ background: 'var(--accent-cyan)', color: '#000', fontSize: '10px', padding: '2px 6px', borderRadius: '10px', fontWeight: 'bold' }}>
                          {t.unread}
                        </span>
                      )}
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {t.lastMessage}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Window */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '20px', borderBottom: '1px solid var(--panel-border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <User size={24} color="var(--accent-cyan)" />
                <h3 style={{ margin: 0 }}>{activeChat.name}</h3>
              </div>
              <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {chatHistory.map((msg, idx) => (
                  <div key={idx} style={{ 
                    alignSelf: msg.isMine ? 'flex-end' : 'flex-start', 
                    maxWidth: '70%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: msg.isMine ? 'flex-end' : 'flex-start'
                  }}>
                    <div style={{ 
                      background: msg.isMine ? 'linear-gradient(90deg, var(--accent-cyan), var(--accent-blue))' : 'rgba(255,255,255,0.1)',
                      color: '#fff', 
                      padding: '12px 16px', 
                      borderRadius: msg.isMine ? '16px 16px 0 16px' : '16px 16px 16px 0' 
                    }}>
                      {msg.text}
                    </div>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '11px', marginTop: '4px' }}>{msg.time}</span>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendMessage} style={{ padding: '20px', borderTop: '1px solid var(--panel-border)', display: 'flex', gap: '10px' }}>
                <input 
                  type="text" 
                  value={messageInput}
                  onChange={e => setMessageInput(e.target.value)}
                  placeholder="Type your message..." 
                  style={{ flex: 1, padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--panel-border)', color: '#fff', borderRadius: '8px', outline: 'none' }} 
                />
                <button type="submit" className="btn btn-primary" style={{ padding: '12px 20px', borderRadius: '8px' }}>
                  <Send size={18} />
                </button>
              </form>
            </div>
          </>
        ) : (
          /* Announcements Section */
          <div style={{ flex: 1, display: 'flex', padding: '20px', gap: '30px' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ marginBottom: '20px' }}>Recent Announcements</h3>
              <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {announcements.map(ann => (
                  <div key={ann.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--panel-border)', padding: '20px', borderRadius: '12px', borderLeft: '4px solid var(--accent-purple)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <h4 style={{ color: '#fff', margin: 0 }}>{ann.title}</h4>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>{ann.date}</span>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '14px', lineHeight: '1.5' }}>{ann.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--panel-border)', padding: '20px', borderRadius: '12px' }}>
                <h3 style={{ marginBottom: '20px' }}>Broadcast New Announcement</h3>
                <form onSubmit={handlePostAnnouncement}>
                  <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '14px' }}>Title</label>
                    <input type="text" value={announceTitle} onChange={e => setAnnounceTitle(e.target.value)} placeholder="Enter title" required
                      style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--panel-border)', color: '#fff', borderRadius: '8px', outline: 'none' }} />
                  </div>
                  <div className="form-group" style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '14px' }}>Message Body</label>
                    <textarea value={announceText} onChange={e => setAnnounceText(e.target.value)} rows="5" placeholder="Write your announcement..." required
                      style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--panel-border)', color: '#fff', borderRadius: '8px', outline: 'none', resize: 'vertical' }}></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Post Announcement</button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
