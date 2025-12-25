import React, { useState } from 'react';
import './ReportsLayout.css';

// ReportsLayout Component - Displays medical reports in a table format
const ReportsLayout = () => {
    // Sample data state - containing doctor reports
    const [reports] = useState([
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
    const handleViewReport = (reportUrl) => {
        window.open(reportUrl, '_blank', 'noopener,noreferrer');
    };

    // Handle Download Report - Triggers file download
    const handleDownloadReport = (reportUrl, doctorName) => {
        const link = document.createElement('a');
        link.href = reportUrl;
        link.download = `${doctorName.replace(/\s+/g, '_')}_Report.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="reports-page">
            <div className="reports-container">
                <h1>Medical Reports</h1>

                {/* Reports Table */}
                <div className="reports-table-container">
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
                </div>

                {/* Empty State - Shows when no reports available */}
                {reports.length === 0 && (
                    <div className="empty-state">
                        No reports available.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReportsLayout;
