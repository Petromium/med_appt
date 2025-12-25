# ReportsLayout Integration Guide

## 📁 Project Structure

```
src/
├── ReportsLayout/
│   ├── ReportsLayout.tsx    # Main component
│   └── ReportsLayout.css    # Component styles
├── app/
│   ├── App.tsx              # Main app entry point
│   └── components/
│       ├── Profile.tsx      # Profile page component
│       └── ProfileCard.tsx  # Profile card component
```

## 🎯 Component Overview

### ReportsLayout.tsx
The main component that displays medical reports in a table format with the following features:
- **Serial Number**: Auto-incremented based on array index
- **Doctor Name**: Name of the attending physician
- **Doctor Speciality**: Medical specialization
- **View Report**: Opens report in a new tab
- **Download Report**: Triggers download of the report file

### Key Features:
✅ TypeScript for type safety
✅ React hooks (useState)
✅ Semantic HTML table structure
✅ Accessible buttons with aria-labels
✅ Responsive design
✅ Clean separation of concerns

## 🔧 How to Use

### Option 1: Direct Import (Current Implementation)
```tsx
import ReportsLayout from '../../ReportsLayout/ReportsLayout';

function Profile() {
  return (
    <div>
      <ProfileCard />
      <ReportsLayout />
    </div>
  );
}
```

### Option 2: Standalone Usage
```tsx
import ReportsLayout from '../ReportsLayout/ReportsLayout';

function App() {
  return (
    <div>
      <h1>Medical Reports Dashboard</h1>
      <ReportsLayout />
    </div>
  );
}
```

## 🎨 Customization

### Modifying Sample Data
Edit the `reports` state in `ReportsLayout.tsx`:

```tsx
const [reports] = useState<Report[]>([
  {
    id: 1,
    doctorName: 'Dr. Your Doctor',
    speciality: 'Your Speciality',
    reportUrl: '/path/to/report.pdf'
  }
]);
```

### Styling Customization
Edit `ReportsLayout.css` to change:
- **Colors**: Modify `background-color` values
- **Spacing**: Adjust `padding` and `margin`
- **Button styles**: Change `.report-button` styles
- **Responsive breakpoints**: Modify `@media` queries

### Color Scheme Example:
```css
/* Change primary button color */
.report-button {
  background-color: #your-color; /* Change this */
}

.report-button:hover {
  background-color: #your-hover-color; /* And this */
}
```

## 🔄 Adding Dynamic Data

To connect to a real API, modify ReportsLayout.tsx:

```tsx
import React, { useState, useEffect } from 'react';

const ReportsLayout: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch reports from API
    fetch('/api/medical-reports')
      .then(res => res.json())
      .then(data => {
        setReports(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching reports:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading reports...</div>;
  }

  // ... rest of component
};
```

## 🚀 Adding Routing (Optional)

If you want to add routing to navigate to the Profile page:

### Step 1: Install React Router
```bash
npm install react-router-dom
```

### Step 2: Update App.tsx
```tsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Profile from './components/Profile';

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
      </nav>
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## 📝 Component Props (Future Enhancement)

You can make the component more flexible by accepting props:

```tsx
interface ReportsLayoutProps {
  reports?: Report[];
  onViewReport?: (reportUrl: string) => void;
  onDownloadReport?: (reportUrl: string, doctorName: string) => void;
}

const ReportsLayout: React.FC<ReportsLayoutProps> = ({
  reports: propReports,
  onViewReport,
  onDownloadReport
}) => {
  // Use prop reports or default to sample data
  const defaultReports = [...]; // sample data
  const reports = propReports || defaultReports;
  
  // ... rest of component
};
```

## 🎭 Testing the Component

### Manual Testing:
1. Click "View Report" - Should attempt to open URL in new tab
2. Click "Download Report" - Should trigger download
3. Resize browser - Component should be responsive
4. Hover over buttons - Should show hover effects

### Unit Testing Example (with Jest):
```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import ReportsLayout from './ReportsLayout';

test('renders reports table', () => {
  render(<ReportsLayout />);
  expect(screen.getByText('Dr. John Doe')).toBeInTheDocument();
  expect(screen.getByText('Cardiology')).toBeInTheDocument();
});

test('view report button works', () => {
  window.open = jest.fn();
  render(<ReportsLayout />);
  
  const viewButtons = screen.getAllByText('View Report');
  fireEvent.click(viewButtons[0]);
  
  expect(window.open).toHaveBeenCalled();
});
```

## 🐛 Troubleshooting

### CSS not loading?
- Ensure the import path is correct: `import './ReportsLayout.css';`
- Check that the CSS file is in the same directory as the component

### Component not rendering?
- Verify the import path in Profile.tsx
- Check for console errors in browser DevTools
- Ensure all dependencies are installed

### Buttons not working?
- Check browser console for errors
- Verify reportUrl paths are correct
- Ensure JavaScript is enabled

## 📱 Responsive Design

The component is responsive with breakpoints at:
- **768px**: Tablet devices (reduced padding, smaller fonts)
- **480px**: Mobile devices (further optimizations)

## ✨ Best Practices Implemented

✅ TypeScript for type safety
✅ Semantic HTML (table element)
✅ Accessible buttons (aria-labels)
✅ Proper event handlers
✅ CSS modules/separate styling
✅ Responsive design
✅ Empty state handling
✅ Commented code
✅ Arrow functions
✅ React hooks
✅ Proper key props in lists

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Accessible Tables](https://www.w3.org/WAI/tutorials/tables/)
- [React Best Practices](https://react.dev/learn/thinking-in-react)
