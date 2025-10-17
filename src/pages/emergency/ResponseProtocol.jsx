import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
const ResponseProtocol = () => {
  const [activeProtocol, setActiveProtocol] = useState('cardiac');

  const protocols = {
    cardiac: {
      title: 'Cardiac Arrest Protocol',
      code: 'Code Blue',
      priority: 'Critical',
      responseTime: '< 2 minutes',
      team: ['Cardiologist', 'ICU Nurse', 'Respiratory Therapist', 'Pharmacist'],
      steps: [
        'Activate Code Blue and call for crash cart',
        'Start CPR immediately (30:2 ratio)',
        'Apply AED if available and indicated',
        'Establish IV access and administer epinephrine',
        'Intubate if unconscious and not breathing',
        'Continue CPR until ROSC or termination criteria met'
      ],
      equipment: ['Crash Cart', 'AED', 'Defibrillator', 'Airway Kit', 'IV Supplies'],
      medications: ['Epinephrine 1mg IV q3-5min', 'Amiodarone 300mg IV', 'Atropine 1mg IV']
    },
    stroke: {
      title: 'Acute Stroke Protocol',
      code: 'Code Stroke',
      priority: 'High',
      responseTime: '< 10 minutes',
      team: ['Neurologist', 'Stroke Nurse', 'Radiology Tech', 'Lab Tech'],
      steps: [
        'Assess ABCs and stabilize patient',
        'Calculate NIH Stroke Scale score',
        'Order emergent CT brain without contrast',
        'Check glucose and treat if hypoglycemic',
        'Activate stroke team and prepare tPA',
        'Transfer to stroke unit if indicated'
      ],
      equipment: ['CT Scanner', 'NIH Stroke Scale Kit', 'tPA Protocol Kit'],
      medications: ['Alteplase (tPA) if within window', 'Antiplatelets if contraindicated']
    },
    trauma: {
      title: 'Major Trauma Protocol',
      code: 'Code Trauma',
      priority: 'Critical',
      responseTime: '< 5 minutes',
      team: ['Trauma Surgeon', 'ER Physician', 'Trauma Nurse', 'Radiology Tech'],
      steps: [
        'Primary survey (ABCDE assessment)',
        'Secure airway and ensure oxygenation',
        'Control major bleeding',
        'Obtain IV access (2 large bore lines)',
        'Order trauma series imaging (CXR, pelvis, CT)',
        'Prepare for operative intervention if needed'
      ],
      equipment: ['Trauma Bay', 'Rapid Infuser', 'Chest Tubes', 'Pelvic Binder'],
      medications: ['Crystalloid fluids', 'Blood products', 'Analgesics', 'Sedatives']
    },
    sepsis: {
      title: 'Severe Sepsis Protocol',
      code: 'Code Sepsis',
      priority: 'High',
      responseTime: '< 15 minutes',
      team: ['Critical Care Physician', 'ICU Nurse', 'Infectious Disease Consult'],
      steps: [
        'Calculate qSOFA score and assess for sepsis',
        'Draw blood cultures before antibiotics',
        'Administer broad-spectrum antibiotics within 1 hour',
        'Start IV fluids 30mL/kg crystalloid bolus',
        'Monitor lactate levels and repeat if elevated',
        'Transfer to ICU for vasopressor support if needed'
      ],
      equipment: ['Central Venous Catheter Kit', 'Arterial Line Kit', 'Ventilator'],
      medications: ['Broad-spectrum antibiotics', 'IV fluids', 'Vasopressors (norepinephrine)']
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-400';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-400';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-400';
      default: return 'bg-gray-100 text-gray-800 border-gray-400';
    }
  };

  const currentProtocol = protocols[activeProtocol];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Emergency Response Protocols</h1>
          <p className="mt-2 text-gray-600">Standardized protocols for critical emergency situations</p>
        </div>

        {/* Protocol Selection */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {Object.entries(protocols).map(([key, protocol]) => (
              <button
                key={key}
                onClick={() => setActiveProtocol(key)}
                className={`px-4 py-2 rounded-md font-medium capitalize ${
                  activeProtocol === key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {protocol.title}
              </button>
            ))}
          </div>
        </div>

        {/* Active Protocol Display */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{currentProtocol.title}</h2>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-lg font-semibold text-gray-600">{currentProtocol.code}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(currentProtocol.priority)}`}>
                  {currentProtocol.priority} Priority
                </span>
                <span className="text-sm text-gray-600">
                  Response Time: {currentProtocol.responseTime}
                </span>
              </div>
            </div>
            <button className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 font-semibold">
              ACTIVATE PROTOCOL
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Response Steps */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Response Steps</h3>
              <div className="space-y-3">
                {currentProtocol.steps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Team & Equipment */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Response Team</h3>
                <div className="flex flex-wrap gap-2">
                  {currentProtocol.team.map((member, index) => (
                    <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {member}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Required Equipment</h3>
                <div className="flex flex-wrap gap-2">
                  {currentProtocol.equipment.map((item, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Medications</h3>
                <div className="space-y-2">
                  {currentProtocol.medications.map((med, index) => (
                    <div key={index} className="p-2 bg-yellow-50 rounded-lg">
                      <p className="text-sm text-yellow-800">{med}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Protocol Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Object.entries(protocols).map(([key, protocol]) => (
            <div key={key} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{protocol.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(protocol.priority)}`}>
                  {protocol.priority}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{protocol.code}</p>
              <div className="text-xs text-gray-500">
                <p>Response: {protocol.responseTime}</p>
                <p>Team: {protocol.team.length} members</p>
              </div>
              <button
                onClick={() => setActiveProtocol(key)}
                className="mt-3 w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 text-sm"
              >
                View Details
              </button>
            </div>
          ))}
        </div>

        {/* Training & Updates */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Training</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <p className="font-medium">Cardiac Arrest Simulation</p>
                  <p className="text-sm text-gray-500">Completed by 85% of staff</p>
                </div>
                <span className="text-sm text-green-600">✓ Passed</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <p className="font-medium">Stroke Protocol Review</p>
                  <p className="text-sm text-gray-500">Mandatory for all clinical staff</p>
                </div>
                <span className="text-sm text-yellow-600">In Progress</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium">Trauma Team Drills</p>
                  <p className="text-sm text-gray-500">Quarterly assessment</p>
                </div>
                <span className="text-sm text-gray-600">Scheduled</span>
              </div>
            </div>
            <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
              Schedule Training
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Protocol Updates</h2>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-900">Updated ACLS Guidelines</h3>
                <p className="text-sm text-blue-700 mt-1">
                  New 2024 American Heart Association guidelines implemented. All staff must complete updated training by March 2024.
                </p>
                <p className="text-xs text-blue-600 mt-2">Updated: Jan 15, 2024</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-900">Sepsis Protocol Enhancement</h3>
                <p className="text-sm text-green-700 mt-1">
                  Added qSOFA scoring and reduced antibiotic administration time to under 1 hour.
                </p>
                <p className="text-xs text-green-600 mt-2">Updated: Jan 10, 2024</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h3 className="font-medium text-yellow-900">Stroke Protocol Revision</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Extended tPA window for eligible patients. Requires additional training for neurology team.
                </p>
                <p className="text-xs text-yellow-600 mt-2">Updated: Jan 5, 2024</p>
              </div>
            </div>
            <button className="mt-4 w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700">
              View All Updates
            </button>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Emergency Contacts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="font-medium text-gray-900">Code Team Leader</h3>
              <p className="text-lg text-blue-600">Dr. Sarah Johnson</p>
              <p className="text-sm text-gray-600">Ext: 1234</p>
            </div>
            <div className="text-center">
              <h3 className="font-medium text-gray-900">Pharmacy Emergency</h3>
              <p className="text-lg text-blue-600">Dr. Michael Chen</p>
              <p className="text-sm text-gray-600">Ext: 5678</p>
            </div>
            <div className="text-center">
              <h3 className="font-medium text-gray-900">Blood Bank</h3>
              <p className="text-lg text-blue-600">Lisa Wong, RN</p>
              <p className="text-sm text-gray-600">Ext: 9012</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponseProtocol;
