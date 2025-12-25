import React, { useState } from 'react';
import './ReportsLayout.css';

// ReportsLayout Component - Displays medical reports in a table format
const ReportsLayout = () => {
    // Sample data state - containing doctor reports
    const [reports] = useState([
        {
            id: 1,
            doctorName: 'Dr. John Doe',
            speciality: 'Cardiology'
        },
        {
            id: 2,
            doctorName: 'Dr. Jane Smith',
            speciality: 'Dermatology'
        }
    ]);

    const escapePdfText = (text) => {
        return String(text)
            .replace(/\\/g, '\\\\')
            .replace(/\(/g, '\\(')
            .replace(/\)/g, '\\)');
    };

    // Creates a minimal valid 1-page PDF (no external libraries).
    const createMockPdfBytes = ({ title, lines }) => {
        const encoder = new TextEncoder();

        const safeTitle = escapePdfText(title);
        const safeLines = (lines || []).map(escapePdfText);

        const streamLines = [
            'BT',
            '/F1 20 Tf',
            '72 720 Td',
            `(${safeTitle}) Tj`,
            '/F1 12 Tf',
            '0 -24 Td',
            ...safeLines.flatMap((line) => [`(${line}) Tj`, '0 -16 Td']),
            'ET',
        ];

        const stream = `${streamLines.join('\n')}\n`;
        const streamLength = encoder.encode(stream).length;

        const parts = [];
        const offsets = [];

        const push = (s) => parts.push(s);

        // PDF header
        push('%PDF-1.4\n');
        // Binary marker line (recommended by spec for binary content)
        push('%\u00E2\u00E3\u00CF\u00D3\n');

        const addObj = (objNumber, body) => {
            offsets[objNumber] = encoder.encode(parts.join('')).length;
            push(`${objNumber} 0 obj\n${body}\nendobj\n`);
        };

        addObj(1, '<< /Type /Catalog /Pages 2 0 R >>');
        addObj(2, '<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
        addObj(
            3,
            '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] ' +
                '/Resources << /Font << /F1 5 0 R >> >> ' +
                '/Contents 4 0 R >>'
        );
        addObj(4, `<< /Length ${streamLength} >>\nstream\n${stream}endstream`);
        addObj(5, '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');

        const xrefOffset = encoder.encode(parts.join('')).length;

        // xref table
        push('xref\n');
        push('0 6\n');
        push('0000000000 65535 f \n');
        for (let i = 1; i <= 5; i++) {
            const off = String(offsets[i] || 0).padStart(10, '0');
            push(`${off} 00000 n \n`);
        }

        // trailer
        push('trailer\n');
        push('<< /Size 6 /Root 1 0 R >>\n');
        push('startxref\n');
        push(`${xrefOffset}\n`);
        push('%%EOF\n');

        return encoder.encode(parts.join(''));
    };

    const makePdfUrlForReport = (report) => {
        const pdfBytes = createMockPdfBytes({
            title: 'Medical Report',
            lines: [
                `Doctor: ${report.doctorName}`,
                `Speciality: ${report.speciality}`,
                `Generated: ${new Date().toLocaleString()}`,
            ],
        });
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        return URL.createObjectURL(blob);
    };

    // Handle View Report - Opens report in new tab
    const handleViewReport = (report) => {
        const url = makePdfUrlForReport(report);
        window.open(url, '_blank', 'noopener,noreferrer');

        // Keep the Blob URL alive long enough for the new tab to load it.
        setTimeout(() => URL.revokeObjectURL(url), 60_000);
    };

    // Handle Download Report - Triggers file download
    const handleDownloadReport = (report) => {
        const url = makePdfUrlForReport(report);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${report.doctorName.replace(/\s+/g, '_')}_Report.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setTimeout(() => URL.revokeObjectURL(url), 5_000);
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
                                            onClick={() => handleViewReport(report)}
                                            aria-label={`View report from ${report.doctorName}`}
                                        >
                                            View Report
                                        </button>
                                    </td>

                                    {/* Download Report Button Column */}
                                    <td>
                                        <button
                                            className="report-button download-button"
                                            onClick={() => handleDownloadReport(report)}
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
