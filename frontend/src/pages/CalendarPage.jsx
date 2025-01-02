import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Draggable from 'react-draggable'; // Ensure this is imported

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: '#f4f4f4',
        minHeight: '100vh',
      }}
    >
      <h2>Main Content Area</h2>
      <p>This is the main content area. The calendar below is draggable.</p>

      {/* Draggable Component */}
      <Draggable handle=".calendar-header">  {/* Make the header the handle */}
        <div
          style={{
            position: 'absolute',  // Allow movement
            top: '20px',
            left: '50px',
            padding: '10px',
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            zIndex: '100', // Ensure it's above other content
          }}
        >
          {/* Calendar Header - Draggable Handle */}
          <div
            className="calendar-header"
            style={{
              cursor: 'move', // Make header draggable
              textAlign: 'center',
              fontWeight: 'bold',
              marginBottom: '10px',
              padding: '5px 0', // Added padding for header
              backgroundColor: '#ddd', // Header background color
              borderRadius: '5px', // Rounded header
            }}
          >
            Calendar
          </div>
          {/* Calendar Component */}
          <Calendar onChange={setSelectedDate} value={selectedDate} />
          <p style={{ marginTop: '10px', textAlign: 'center' }}>
            Selected Date: <strong>{selectedDate.toDateString()}</strong>
          </p>
        </div>
      </Draggable>
    </div>
  );
};

export default CalendarPage;
