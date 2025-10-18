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
      summary: 'All vitals normal. Recommended annual flu shot.',
      details: {
        vitals: { bloodPressure: '120/80', heartRate: 72, temperature: '98.6°F', weight: '165 lbs' },
        assessment: 'Patient appears well-nourished and in no acute distress.',
        recommendations: ['Annual flu vaccination', 'Continue current exercise regimen', 'Follow-up in 1 year']
      }
    },
    {
      id: 2,
      title: 'Blood Work Results',
      date: '2024-01-10',
      doctor: 'Dr. Michael Chen',
      type: 'Lab Results',
      status: 'Completed',
      summary: 'Cholesterol levels slightly elevated. Diet and exercise recommended.',
      details: {
        tests: [
          { name: 'Total Cholesterol', value: '245 mg/dL', range: '125-200 mg/dL', status: 'High' },
          { name: 'HDL Cholesterol', value: '55 mg/dL', range: '40-60 mg/dL', status: 'Normal' },
          { name: 'LDL Cholesterol', value: '160 mg/dL', range: '0-100 mg/dL', status: 'High' },
          { name: 'Triglycerides', value: '150 mg/dL', range: '0-150 mg/dL', status: 'Normal' }
        ],
        recommendations: ['Low-cholesterol diet', 'Regular exercise (30 min/day)', 'Follow-up lipid panel in 3 months']
      }
    },
    {
      id: 3,
      title: 'Cardiology Consultation',
      date: '2023-12-20',
      doctor: 'Dr. Emily Davis',
      type: 'Consultation',
      status: 'Completed',
      summary: 'Heart rhythm normal. Continue current medication regimen.',
      details: {
        findings: 'Normal sinus rhythm, no arrhythmias detected.',
        medications: ['Aspirin 81mg daily', 'Lisinopril 10mg daily', 'Metoprolol 25mg daily'],
        recommendations: ['Continue current medications', 'Regular follow-up every 6 months', 'Holter monitor if symptoms recur']
      }
    },
    {
      id: 4,
      title: 'X-Ray Results - Chest',
      date: '2023-12-15',
      doctor: 'Dr. Robert Wilson',
      type: 'Imaging',
      status: 'Completed',
      summary: 'Clear chest X-ray. No abnormalities detected.',
      details: {
        findings: 'Lungs are clear bilaterally. Heart size and contour normal. No pleural effusion or pneumothorax.',
        impression: 'No acute cardiopulmonary disease.',
        recommendations: ['No follow-up imaging required unless symptoms develop']
      }
    },
    {
      id: 5,
      title: 'COVID-19 Test Results',
      date: '2024-01-05',
      doctor: 'Dr. Lisa Park',
      type: 'Lab Results',
      status: 'Completed',
      summary: 'Negative for SARS-CoV-2. No evidence of current infection.',
      details: {
        testType: 'RT-PCR',
        result: 'Negative',
        collectionDate: '2024-01-05',
        recommendations: ['Continue standard precautions', 'Vaccination recommended if not up to date']
      }
    },
    {
      id: 6,
      title: 'Dermatology Consultation',
      date: '2023-11-28',
      doctor: 'Dr. James Brown',
      type: 'Consultation',
      status: 'Completed',
      summary: 'Benign skin lesion. No malignancy suspected.',
      details: {
        findings: 'Small pigmented lesion on left forearm, regular borders, uniform color.',
        diagnosis: 'Seborrheic keratosis',
        treatment: 'No treatment required, monitor for changes',
        recommendations: ['Monthly self-examination', 'Return if lesion changes in size, color, or shape']
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      <Navbar />
      <div className="w-full px-6 sm:px-8 lg:px-12 py-12">
        <div className="mb-8">
          <h1 className="c h-font text-3xl font-bold text-gray-900">My Medical Reports</h1>
          <p className="w c mt-2 text-gray-600">Access and view your medical records and test results</p>
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

                {/* Detailed Report Content */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Detailed Results</h3>

                  {selectedReport.type === 'Lab Results' && selectedReport.details?.tests && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-4 gap-4 font-medium text-gray-700 border-b pb-2">
                        <span>Test</span>
                        <span>Result</span>
                        <span>Reference Range</span>
                        <span>Status</span>
                      </div>
                      {selectedReport.details.tests.map((test, index) => (
                        <div key={index} className="grid grid-cols-4 gap-4 text-sm">
                          <span>{test.name}</span>
                          <span className={test.status === 'High' ? 'text-red-600 font-medium' : 'text-gray-900'}>{test.value}</span>
                          <span>{test.range}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            test.status === 'High' ? 'bg-red-100 text-red-800' :
                            test.status === 'Low' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {test.status}
                          </span>
                        </div>
                      ))}
                      {selectedReport.details.recommendations && (
                        <div className="mt-4">
                          <h4 className="font-medium mb-2">Recommendations:</h4>
                          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                            {selectedReport.details.recommendations.map((rec, index) => (
                              <li key={index}>{rec}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {selectedReport.type === 'Physical Exam' && selectedReport.details && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2">Vital Signs</h4>
                        <div className="space-y-2 text-sm">
                          <div><span className="font-medium">Blood Pressure:</span> {selectedReport.details.vitals.bloodPressure}</div>
                          <div><span className="font-medium">Heart Rate:</span> {selectedReport.details.vitals.heartRate} bpm</div>
                          <div><span className="font-medium">Temperature:</span> {selectedReport.details.vitals.temperature}</div>
                          <div><span className="font-medium">Weight:</span> {selectedReport.details.vitals.weight}</div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Assessment</h4>
                        <p className="text-sm text-gray-700">{selectedReport.details.assessment}</p>
                      </div>
                      <div className="md:col-span-2">
                        <h4 className="font-medium mb-2">Recommendations:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          {selectedReport.details.recommendations.map((rec, index) => (
                            <li key={index}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {selectedReport.type === 'Consultation' && selectedReport.details && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Findings</h4>
                        <p className="text-sm text-gray-700">{selectedReport.details.findings}</p>
                      </div>
                      {selectedReport.details.medications && (
                        <div>
                          <h4 className="font-medium mb-2">Current Medications</h4>
                          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                            {selectedReport.details.medications.map((med, index) => (
                              <li key={index}>{med}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div>
                        <h4 className="font-medium mb-2">Recommendations</h4>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          {selectedReport.details.recommendations.map((rec, index) => (
                            <li key={index}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {selectedReport.type === 'Imaging' && selectedReport.details && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Findings</h4>
                        <p className="text-sm text-gray-700">{selectedReport.details.findings}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Impression</h4>
                        <p className="text-sm text-gray-700">{selectedReport.details.impression}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Recommendations</h4>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          {selectedReport.details.recommendations.map((rec, index) => (
                            <li key={index}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {selectedReport.details?.testType && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Test Type:</span> {selectedReport.details.testType}
                        </div>
                        <div>
                          <span className="font-medium">Result:</span> <span className={selectedReport.details.result === 'Negative' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>{selectedReport.details.result}</span>
                        </div>
                        <div>
                          <span className="font-medium">Collection Date:</span> {new Date(selectedReport.details.collectionDate).toLocaleDateString()}
                        </div>
                      </div>
                      {selectedReport.details.recommendations && (
                        <div>
                          <h4 className="font-medium mb-2">Recommendations:</h4>
                          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                            {selectedReport.details.recommendations.map((rec, index) => (
                              <li key={index}>{rec}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {selectedReport.details?.diagnosis && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Findings</h4>
                        <p className="text-sm text-gray-700">{selectedReport.details.findings}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Diagnosis</h4>
                        <p className="text-sm text-gray-700">{selectedReport.details.diagnosis}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Treatment</h4>
                        <p className="text-sm text-gray-700">{selectedReport.details.treatment}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Recommendations</h4>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          {selectedReport.details.recommendations.map((rec, index) => (
                            <li key={index}>{rec}</li>
                          ))}
                        </ul>
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
