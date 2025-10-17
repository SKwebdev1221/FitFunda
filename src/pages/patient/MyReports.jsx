import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
const MyReports = () => {
  const [selectedReport, setSelectedReport] = useState(null);

  const reports = [
    {
      id: 1,
      title: 'Annual Physical Examination',
      date: '2024-01-15',
      doctor: 'Dr. Sarah Johnson',
      type: 'Physical Exam',
      status: 'Completed',
      summary: 'All vitals normal. Recommended annual flu shot.'
    },
    {
      id: 2,
      title: 'Blood Work Results',
      date: '2024-01-10',
      doctor: 'Dr. Michael Chen',
      type: 'Lab Results',
      status: 'Completed',
      summary: 'Cholesterol levels slightly elevated. Diet and exercise recommended.'
    },
    {
      id: 3,
      title: 'Cardiology Consultation',
      date: '2023-12-20',
      doctor: 'Dr. Emily Davis',
      type: 'Consultation',
      status: 'Completed',
      summary: 'Heart rhythm normal. Continue current medication regimen.'
    },
    {
      id: 4,
      title: 'X-Ray Results - Chest',
      date: '2023-12-15',
      doctor: 'Dr. Robert Wilson',
      type: 'Imaging',
      status: 'Completed',
      summary: 'Clear chest X-ray. No abnormalities detected.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      <Navbar />
      <div className="w-full px-6 sm:px-8 lg:px-12 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Medical Reports</h1>
          <p className="mt-2 text-gray-600">Access and view your medical records and test results</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Reports List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">Recent Reports</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {reports.map(report => (
                  <div
                    key={report.id}
                    onClick={() => setSelectedReport(report)}
                    className={`w p-4 cursor-pointer hover:bg-gray-50 ${
                      selectedReport?.id === report.id ? 'bg-blue-50 border-r-4 border-blue-500' : ''
                    }`}
                  >
                    <h3 className="w font-medium text-gray-900">{report.title}</h3>
                    <p className="w text-sm text-gray-500">{report.doctor}</p>
                    <p className="text-sm text-gray-400">{new Date(report.date).toLocaleDateString()}</p>
                    <span className="inline-block mt-2 px-2 py-1 text-lg rounded-full bg-green-100 text-green-800">
                      {report.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Report Details */}
          <div className="lg:col-span-2">
            {selectedReport ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedReport.title}</h2>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="w font-medium text-gray-500">Date:</span>
                      <span className="w ml-2">{new Date(selectedReport.date).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="w font-medium text-gray-500">Doctor:</span>
                      <span className="w ml-2">{selectedReport.doctor}</span>
                    </div>
                    <div>
                      <span className="w font-medium text-gray-500">Type:</span>
                      <span className="w ml-2">{selectedReport.type}</span>
                    </div>
                    <div>
                      <span className="w font-medium text-gray-500">Status:</span>
                      <span className="ml-2">
                        <span className="w px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          {selectedReport.status}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Summary</h3>
                  <p className="w text-gray-700">{selectedReport.summary}</p>
                </div>

                {/* Mock Report Content */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Detailed Results</h3>

                  {selectedReport.type === 'Lab Results' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 font-medium text-gray-700 border-b pb-2">
                        <span>Test</span>
                        <span>Result</span>
                        <span>Reference Range</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <span>Total Cholesterol</span>
                        <span>245 mg/dL</span>
                        <span> 200 mg/dL</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <span>HDL Cholesterol</span>
                        <span>55 mg/dL</span>
                        <span> 40 mg/dL</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <span>LDL Cholesterol</span>
                        <span>160 mg/dL</span>
                        <span> 130 mg/dL</span>
                      </div>
                    </div>
                  )}

                  {selectedReport.type === 'Physical Exam' && (
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2">Vital Signs</h4>
                        <div className="w space-y-2 text-sm">
                          <div>Blood Pressure: 120/80 mmHg</div>
                          <div>Heart Rate: 72 bpm</div>
                          <div>Temperature: 98.6°F</div>
                          <div>Weight: 165 lbs</div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Assessment</h4>
                        <div className="w space-y-2 text-sm">
                          <div>General: Well-appearing</div>
                          <div>HEENT: Normal</div>
                          <div>Cardiovascular: Regular rhythm</div>
                          <div>Respiratory: Clear</div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex space-x-3">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                      Download PDF
                    </button>
                    <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">
                      Share with Doctor
                    </button>
                    <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">
                      Print Report
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Report</h3>
                <p className="text-gray-500">Choose a report from the list to view detailed information</p>
              </div>
            )}
          </div>
        </div>

        {/* Request Records */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Older Records?</h3>
          <p className="text-gray-600 mb-4">
            If you need medical records from before our digital system or from another healthcare provider,
            you can request them here.
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
            Request Medical Records
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyReports;
