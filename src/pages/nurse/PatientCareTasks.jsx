import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
const PatientCareTasks = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [filter, setFilter] = useState('all');

  const tasks = [
    {
      id: 1,
      patientName: 'John Smith',
      room: '204',
      task: 'Vital Signs Check',
      priority: 'High',
      status: 'Pending',
      dueTime: '9:00 AM',
      notes: 'Check blood pressure, heart rate, temperature'
    },
    {
      id: 2,
      patientName: 'Sarah Johnson',
      room: '206',
      task: 'Medication Administration',
      priority: 'High',
      status: 'Due Soon',
      dueTime: '9:15 AM',
      notes: 'Administer antibiotics and pain medication'
    },
    {
      id: 3,
      patientName: 'Mike Davis',
      room: '208',
      task: 'Wound Care',
      priority: 'Medium',
      status: 'Scheduled',
      dueTime: '9:30 AM',
      notes: 'Change dressing on left leg wound'
    },
    {
      id: 4,
      patientName: 'Emma Wilson',
      room: '210',
      task: 'Physical Therapy Assistance',
      priority: 'Medium',
      status: 'Pending',
      dueTime: '10:00 AM',
      notes: 'Assist with morning exercises'
    },
    {
      id: 5,
      patientName: 'Robert Brown',
      room: '212',
      task: 'Patient Bathing',
      priority: 'Low',
      status: 'Completed',
      dueTime: '8:30 AM',
      notes: 'Morning hygiene routine completed'
    },
    {
      id: 6,
      patientName: 'Lisa Davis',
      room: '214',
      task: 'Meal Assistance',
      priority: 'Medium',
      status: 'Pending',
      dueTime: '11:00 AM',
      notes: 'Help with breakfast feeding'
    }
  ];

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'pending') return task.status === 'Pending' || task.status === 'Due Soon';
    if (filter === 'completed') return task.status === 'Completed';
    return task.priority.toLowerCase() === filter;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Due Soon': return 'bg-orange-100 text-orange-800';
      case 'Pending': return 'bg-gray-100 text-gray-800';
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="w-full px-6 sm:px-8 lg:px-12 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Patient Care Tasks</h1>
          <p className="mt-2 text-gray-600">Manage and track patient care activities</p>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              All Tasks
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-md ${filter === 'pending' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter('high')}
              className={`px-4 py-2 rounded-md ${filter === 'high' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              High Priority
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-md ${filter === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              Completed
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tasks List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">Today's Tasks</h2>
                <p className="text-sm text-gray-500 mt-1">{filteredTasks.length} tasks</p>
              </div>
              <div className="divide-y divide-gray-200">
                {filteredTasks.map(task => (
                  <div
                    key={task.id}
                    onClick={() => setSelectedTask(task)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 ${
                      selectedTask?.id === task.id ? 'bg-blue-50 border-r-4 border-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-medium text-gray-900">{task.patientName}</h3>
                        <span className="text-sm text-gray-500">Room {task.room}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                          {task.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-700">{task.task}</p>
                        <p className="text-sm text-gray-500">{task.notes}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">Due: {task.dueTime}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Task Details */}
          <div className="lg:col-span-1">
            {selectedTask ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Task Details</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Patient</label>
                    <p className="mt-1 text-lg font-medium text-gray-900">{selectedTask.patientName}</p>
                    <p className="text-sm text-gray-500">Room {selectedTask.room}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Task</label>
                    <p className="mt-1 text-gray-900">{selectedTask.task}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Priority</label>
                      <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedTask.priority)}`}>
                        {selectedTask.priority}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedTask.status)}`}>
                        {selectedTask.status}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Due Time</label>
                    <p className="mt-1 text-gray-900">{selectedTask.dueTime}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Notes</label>
                    <p className="mt-1 text-gray-700">{selectedTask.notes}</p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                    Mark as Completed
                  </button>
                  <button className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300">
                    Update Notes
                  </button>
                  <button className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700">
                    Report Issue
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Task</h3>
                <p className="text-gray-500">Choose a task from the list to view details</p>
              </div>
            )}
          </div>
        </div>

        {/* Task Statistics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-900">Total Tasks</h3>
            <p className="text-3xl font-bold text-blue-600">{tasks.length}</p>
            <p className="text-sm text-gray-500">Today</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-900">Completed</h3>
            <p className="text-3xl font-bold text-green-600">
              {tasks.filter(task => task.status === 'Completed').length}
            </p>
            <p className="text-sm text-gray-500">Tasks done</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-900">Pending</h3>
            <p className="text-3xl font-bold text-orange-600">
              {tasks.filter(task => task.status === 'Pending' || task.status === 'Due Soon').length}
            </p>
            <p className="text-sm text-gray-500">Require attention</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-900">High Priority</h3>
            <p className="text-3xl font-bold text-red-600">
              {tasks.filter(task => task.priority === 'High').length}
            </p>
            <p className="text-sm text-gray-500">Urgent tasks</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientCareTasks;
