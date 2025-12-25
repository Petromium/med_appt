import React, { useState } from 'react';
import './ReportsLayout.css';

// Interface for Report data structure
interface Report {
  id: number;
  doctorName: string;
  speciality: string;
  reportUrl: string;
}

// ReportsLayout Component - Displays medical reports in a table format
const ReportsLayout: React.FC = () => {
  // Sample data state - containing doctor reports
  const [reports] = useState<Report[]>([
    {
      id: 1,
      doctorName: 'Dr. John Doe',
      speciality: 'Cardiology',
      reportUrl: '/sample-reports/cardiology-report.pdf'
    },
    {
      id: 2,
      doctorName: 'Dr. Jane Smith',
      speciality: 'Dermatology',
      reportUrl: '/sample-reports/dermatology-report.pdf'
    }
  ]);

  // Handle View Report - Opens report in new tab
  const handleViewReport = (reportUrl: string) => {
    window.open(reportUrl, '_blank', 'noopener,noreferrer');
  };

  // Handle Download Report - Triggers file download
  const handleDownloadReport = (reportUrl: string, doctorName: string) => {
    const link = document.createElement('a');
    link.href = reportUrl;
    link.download = `${doctorName.replace(/\s+/g, '_')}_Report.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="reports-layout-container">
      <h2 className="reports-title">Medical Reports</h2>
      
      {/* Reports Table */}
      <table className="reports-table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>View Report</th>
            <th>Download Report</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={report.id}>
              {/* Serial Number Column */}
              <td>{index + 1}</td>
              
              {/* Doctor Name Column */}
              <td>{report.doctorName}</td>
              
              {/* Doctor Speciality Column */}
              <td>{report.speciality}</td>
              
              {/* View Report Button Column */}
              <td>
                <button
                  className="report-button view-button"
                  onClick={() => handleViewReport(report.reportUrl)}
                  aria-label={`View report from ${report.doctorName}`}
                >
                  View Report
                </button>
              </td>
              
              {/* Download Report Button Column */}
              <td>
                <button
                  className="report-button download-button"
                  onClick={() => handleDownloadReport(report.reportUrl, report.doctorName)}
                  aria-label={`Download report from ${report.doctorName}`}
                >
                  Download Report
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Empty State - Shows when no reports available */}
      {reports.length === 0 && (
        <div className="empty-state">
          <p>No medical reports available.</p>
        </div>
      )}
    </div>
  );
};

export default ReportsLayout;
