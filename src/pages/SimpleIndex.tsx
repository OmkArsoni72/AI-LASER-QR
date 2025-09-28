import { Link } from 'react-router-dom';

const SimpleIndex = () => {
  return (
    <div className="flex-1 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">TrackWise Rail Sync</h1>
        <p className="text-center text-gray-600 mb-8">
          Railway Component Management System
        </p>
        
        <div className="grid gap-4 md:grid-cols-3">
          <Link 
            to="/components" 
            className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow border"
          >
            <h3 className="text-xl font-semibold mb-2">Components</h3>
            <p className="text-gray-600">Manage railway components</p>
          </Link>
          
          <Link 
            to="/vendors" 
            className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow border"
          >
            <h3 className="text-xl font-semibold mb-2">Vendors</h3>
            <p className="text-gray-600">Vendor management</p>
          </Link>
          
          <Link 
            to="/scan" 
            className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow border"
          >
            <h3 className="text-xl font-semibold mb-2">Scanner</h3>
            <p className="text-gray-600">QR Code scanner</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SimpleIndex;