import React, { useState } from 'react';
import PersonForm from './components/PersonForm';
import PersonList from './components/PersonList';
import PersonDetail from './components/PersonDetail';

function App() {
  const [currentView, setCurrentView] = useState('list');
  const [selectedPersonId, setSelectedPersonId] = useState(null);

  const handleSelectPerson = (personId) => {
    setSelectedPersonId(personId);
    setCurrentView('detail');
  };

  const handlePersonCreated = () => {
    setCurrentView('list');
  };

  const handleBackToList = () => {
    setSelectedPersonId(null);
    setCurrentView('list');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold">Insurance Web Application</h1>
              <p className="text-blue-100 mt-2 text-lg">Person & Address Management System</p>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-blue-700 px-4 py-2 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">Phase 1</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-2 py-4">
            <button
              onClick={() => setCurrentView('list')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                currentView === 'list'
                  ? 'bg-blue-600 text-white shadow-md transform scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Person Lookup
            </button>
            <button
              onClick={() => setCurrentView('create')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                currentView === 'create'
                  ? 'bg-blue-600 text-white shadow-md transform scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Create Person
            </button>
            {currentView === 'detail' && (
              <button
                onClick={handleBackToList}
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Back to List
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Home</span>
          <span>/</span>
          <span className="font-semibold text-gray-900">
            {currentView === 'list' && 'Person Lookup'}
            {currentView === 'create' && 'Create Person'}
            {currentView === 'detail' && 'Person Details'}
          </span>
        </div>

        {/* Views */}
        <div className="transition-all duration-300">
          {currentView === 'list' && (
            <PersonList onSelectPerson={handleSelectPerson} />
          )}
          {currentView === 'create' && (
            <PersonForm onSuccess={handlePersonCreated} />
          )}
          {currentView === 'detail' && selectedPersonId && (
            <PersonDetail
              personId={selectedPersonId}
              onBack={handleBackToList}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              <p>&copy; 2024 Insurance Web Application. All rights reserved.</p>
            </div>
            <div className="flex gap-4 text-sm text-gray-600">
              <a href="#" className="hover:text-blue-600 transition-colors">Documentation</a>
              <span>•</span>
              <a href="#" className="hover:text-blue-600 transition-colors">Support</a>
              <span>•</span>
              <a href="#" className="hover:text-blue-600 transition-colors">API Reference</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;