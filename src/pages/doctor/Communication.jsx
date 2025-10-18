import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
const Communication = () => {
  const [activeTab, setActiveTab] = useState('messages');
  const [newMessage, setNewMessage] = useState('');

  const messages = [
    {
      id: 1,
      from: 'Dr. Sarah Johnson',
      to: 'You',
      subject: 'Patient Transfer Update',
      content: 'Patient in Room 204 has been stabilized and is ready for transfer to the ward.',
      timestamp: '2024-01-15 14:30',
      type: 'urgent',
      read: false
    },
    {
      id: 2,
      from: 'Nurse Emily Davis',
      to: 'You',
      subject: 'Medication Adjustment',
      content: 'Please review the dosage adjustment for Patient ID 12345.',
      timestamp: '2024-01-15 13:15',
      type: 'normal',
      read: true
    },
    {
      id: 3,
      from: 'Dr. Michael Chen',
      to: 'Cardiology Team',
      subject: 'Consultation Request',
      content: 'Requesting cardiology consult for chest pain patient in ER.',
      timestamp: '2024-01-15 12:45',
      type: 'consultation',
      read: true
    }
  ];

  const announcements = [
    {
      id: 1,
      title: 'New COVID-19 Protocols',
      content: 'Updated testing and isolation protocols effective immediately.',
      author: 'Chief Medical Officer',
      timestamp: '2024-01-15 09:00',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Staff Meeting - Tomorrow',
      content: 'Mandatory staff meeting at 8 AM in Conference Room A.',
      author: 'Department Head',
      timestamp: '2024-01-14 16:30',
      priority: 'medium'
    }
  ];

  const contacts = [
    { name: 'Dr. Sarah Johnson', role: 'Cardiologist', department: 'Cardiology', status: 'online' },
    { name: 'Nurse Emily Davis', role: 'RN', department: 'Medical Ward', status: 'busy' },
    { name: 'Dr. Michael Chen', role: 'Neurologist', department: 'Neurology', status: 'offline' },
    { name: 'Dr. Lisa Wong', role: 'Pediatrician', department: 'Pediatrics', status: 'online' }
  ];

  const getMessageTypeColor = (type) => {
    switch (type) {
      case 'urgent': return 'border-l-red-400 bg-red-50';
      case 'consultation': return 'border-l-blue-400 bg-blue-50';
      case 'normal': return 'border-l-gray-400 bg-gray-50';
      default: return 'border-l-gray-400 bg-gray-50';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-400';
      case 'busy': return 'bg-yellow-400';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="c h-font text-3xl font-bold text-gray-900">Communication Hub</h1>
          <p className="w c mt-2 text-gray-600">Secure messaging and announcements for healthcare professionals</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'messages', label: 'Messages', count: messages.filter(m => !m.read).length },
                { id: 'announcements', label: 'Announcements', count: announcements.length },
                { id: 'contacts', label: 'Contacts', count: contacts.filter(c => c.status === 'online').length }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  {tab.count > 0 && (
                    <span className="ml-2 py-0.5 px-2 rounded-full text-xs bg-red-100 text-red-600">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'messages' && (
              <div className="bg-white rounded-lg shadow-md">
                <div className="p-6 border-b">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Messages</h2>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                      New Message
                    </button>
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  {messages.map(message => (
                    <div key={message.id} className={`p-6 ${getMessageTypeColor(message.type)}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-medium text-gray-900">{message.subject}</h3>
                            {!message.read && (
                              <span className="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            From: {message.from} • To: {message.to}
                          </p>
                          <p className="text-gray-700 mb-3">{message.content}</p>
                          <p className="text-xs text-gray-500">{message.timestamp}</p>
                        </div>
                        <div className="ml-4 flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800 text-sm">Reply</button>
                          <button className="text-gray-600 hover:text-gray-800 text-sm">Archive</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'announcements' && (
              <div className="bg-white rounded-lg shadow-md">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold">Announcements</h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {announcements.map(announcement => (
                    <div key={announcement.id} className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-medium text-gray-900">{announcement.title}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(announcement.priority)}`}>
                              {announcement.priority}
                            </span>
                          </div>
                          <p className="text-gray-700 mb-2">{announcement.content}</p>
                          <p className="text-sm text-gray-600">
                            By: {announcement.author} • {announcement.timestamp}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'contacts' && (
              <div className="bg-white rounded-lg shadow-md">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold">Team Contacts</h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {contacts.map((contact, index) => (
                    <div key={index} className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-gray-700">
                                {contact.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(contact.status)}`}></div>
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{contact.name}</h3>
                            <p className="text-sm text-gray-600">{contact.role} • {contact.department}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800 text-sm">Message</button>
                          <button className="text-green-600 hover:text-green-800 text-sm">Call</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="font-medium text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-sm">
                  Emergency Broadcast
                </button>
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 text-sm">
                  Consult Specialist
                </button>
                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 text-sm">
                  Request Transfer
                </button>
                <button className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 text-sm">
                  Report Incident
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-medium text-gray-900 mb-4">Compose Message</h3>
              <div className="space-y-3">
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Select Recipient</option>
                  <option>Dr. Sarah Johnson</option>
                  <option>Nurse Emily Davis</option>
                  <option>Dr. Michael Chen</option>
                  <option>All Staff</option>
                </select>
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  rows="4"
                  placeholder="Message"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-sm">
                    Send
                  </button>
                  <button className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 text-sm">
                    Save Draft
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Communication;
