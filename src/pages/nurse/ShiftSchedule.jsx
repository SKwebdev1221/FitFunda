import React from 'react';
import Navbar from '../../components/common/Navbar';
const ShiftSchedule = () => {
  const currentWeek = [
    {
      day: 'Monday',
      date: 'Jan 15',
      shifts: [
        { time: '7:00 AM - 3:00 PM', type: 'Regular', location: 'Medical Ward' },
        { time: '3:00 PM - 11:00 PM', type: 'Evening', location: 'Emergency' }
      ]
    },
    {
      day: 'Tuesday',
      date: 'Jan 16',
      shifts: [
        { time: '7:00 AM - 3:00 PM', type: 'Regular', location: 'Medical Ward' }
      ]
    },
    {
      day: 'Wednesday',
      date: 'Jan 17',
      shifts: [
        { time: '3:00 PM - 11:00 PM', type: 'Evening', location: 'Surgical Ward' }
      ]
    },
    {
      day: 'Thursday',
      date: 'Jan 18',
      shifts: [
        { time: '11:00 PM - 7:00 AM', type: 'Night', location: 'ICU' }
      ]
    },
    {
      day: 'Friday',
      date: 'Jan 19',
      shifts: [
        { time: '7:00 AM - 3:00 PM', type: 'Regular', location: 'Medical Ward' }
      ]
    },
    {
      day: 'Saturday',
      date: 'Jan 20',
      shifts: [
        { time: 'Off Duty', type: 'Rest', location: '-' }
      ]
    },
    {
      day: 'Sunday',
      date: 'Jan 21',
      shifts: [
        { time: 'Off Duty', type: 'Rest', location: '-' }
      ]
    }
  ];

  const getShiftTypeColor = (type) => {
    switch (type) {
      case 'Regular': return 'bg-blue-100 text-blue-800';
      case 'Evening': return 'bg-yellow-100 text-yellow-800';
      case 'Night': return 'bg-purple-100 text-purple-800';
      case 'Rest': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="w-full  mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shift Schedule</h1>
          <p className="mt-2 text-gray-600">Your upcoming work schedule and assignments</p>
        </div>

        {/* Current Week Overview */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Week of January 15 - 21, 2024</h2>
            <div className="flex space-x-2">
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">
                Previous Week
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Next Week
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {currentWeek.map((day, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="text-center mb-4">
                  <h3 className="font-medium text-gray-900">{day.day}</h3>
                  <p className="text-sm text-gray-500">{day.date}</p>
                </div>

                <div className="space-y-2">
                  {day.shifts.map((shift, shiftIndex) => (
                    <div key={shiftIndex} className="text-center">
                      <div className="text-sm font-medium text-gray-900 mb-1">
                        {shift.time}
                      </div>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-1 ${getShiftTypeColor(shift.type)}`}>
                        {shift.type}
                      </span>
                      <div className="text-xs text-gray-500">
                        {shift.location}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Shift */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Today's Shift</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Morning Shift</h3>
                  <p className="text-sm text-gray-600">Medical Ward - Patient Care</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">7:00 AM - 3:00 PM</p>
                  <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    Regular
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Evening Shift</h3>
                  <p className="text-sm text-gray-600">Emergency Department</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">3:00 PM - 11:00 PM</p>
                  <span className="inline-block mt-1 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                    Evening
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                Clock In/Out
              </button>
            </div>
          </div>

          {/* Shift Statistics */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">This Month's Statistics</h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Hours</span>
                <span className="font-medium">160 hours</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Regular Shifts</span>
                <span className="font-medium">15 shifts</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Evening Shifts</span>
                <span className="font-medium">8 shifts</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Night Shifts</span>
                <span className="font-medium">4 shifts</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Overtime Hours</span>
                <span className="font-medium">8 hours</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Monthly Target</span>
                <span className="font-medium">160 hours</span>
              </div>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">100% of target completed</p>
            </div>
          </div>
        </div>

        {/* Shift Preferences */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Shift Preferences</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Preferred Days</h3>
              <div className="space-y-1">
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="mr-2" />
                  <span className="text-sm">Monday - Friday</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">Weekends</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="mr-2" />
                  <span className="text-sm">Holidays</span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">Preferred Times</h3>
              <div className="space-y-1">
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="mr-2" />
                  <span className="text-sm">Day Shift (7AM-3PM)</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="mr-2" />
                  <span className="text-sm">Evening Shift (3PM-11PM)</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">Night Shift (11PM-7AM)</span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">Availability Notes</h3>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                placeholder="Any special availability notes..."
                defaultValue="Prefer evening shifts. Available for emergency coverage. Family commitments on weekends."
              ></textarea>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
              Update Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShiftSchedule;
