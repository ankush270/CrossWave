import React from 'react';

const DashboardBackground = () => {
  return (
    <div className="fixed inset-0 z-0">
      {/* Primary Background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 25%),
            radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 25%),
            radial-gradient(circle at 50% 50%, rgba(249, 115, 22, 0.05) 0%, transparent 50%)
          `
        }}
      />

      {/* Circuit Board Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.344 0L13.858 8.485 15.272 9.9l7.9-7.9h-.828zm13.312 0L44.143 8.485 42.728 9.9l-7.9-7.9h.828zm-9.9 0L23.344 2.828 21.93 1.414 19.1 0h6.657zm6.142 0L33.313 2.828 34.727 1.414 37.557 0h-5.657z' fill='%23000000' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }}
      />

      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000" />
      </div>
    </div>
  );
};

export default DashboardBackground; 