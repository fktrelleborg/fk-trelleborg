import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Paper, Typography, Box } from '@mui/material';
import { isWeekend, isToday } from 'date-fns';
import sv from 'date-fns/locale/sv';

const swedishWeekdays = ['Mån', 'Tis', 'Ons', 'Tors', 'Fre'];

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Format weekday labels to hide weekends and show Swedish names
  const formatWeekday = (day) => {
    const days = ['Mån', 'Tis', 'Ons', 'Tors', 'Fre'];
    return day === 0 || day === 6 ? '' : days[day];
  };

  // Filter out weekend dates
  const shouldDisableDate = (date) => {
    return isWeekend(date);
  };

  return (
    <div style={{ overflow: 'hidden' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ pl: 3 }}>
        Calendar
      </Typography>
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          borderRadius: 0,
          boxShadow: 'none',
          overflow: 'hidden',
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={sv}>
          <DateCalendar
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            shouldDisableDate={shouldDisableDate}
            displayWeekNumber={false}
            views={['day']}
            sx={{
              width: '100%',
              '& .MuiPickersCalendarHeader-root': {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '20px',
                pl: 3,
                pr: 3,
              },
              '& .MuiPickersSlideTransition-root': {
                display: 'block',
                position: 'relative',
                overflowX: 'hidden',
                minHeight: '240px',
                overflow: 'hidden',
              },
              '& .MuiPickersSlideTransition-root[disabled]': {
                minHeight: '350px'
              },
              '& .MuiPickersDay-root[disabled]': {
                display: 'none',
              },
              '& .MuiDayCalendar-header': {
                display: 'none',
              },
              '& .MuiDayCalendar-weekContainer': {
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: '8px',
                pl: 3,
                pr: 3,
                height: 'auto',
              },
              '& .MuiDayCalendar-monthContainer': {
                height: 'auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                paddingTop: 0,
              },
              '& .MuiPickersDay-root': {
                width: '40px',
                height: '40px',
                fontSize: '1.1rem',
                margin: '0 auto',
                '&.Mui-selected': {
                  backgroundColor: '#1976d2',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#1565c0',
                  },
                },
                '&.MuiPickersDay-today': {
                  border: '2px solid #1976d2',
                  backgroundColor: 'transparent',
                  color: '#1976d2',
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.04)',
                  },
                  '&.Mui-selected': {
                    backgroundColor: '#1976d2',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#1565c0',
                    },
                  },
                },
              },
            }}
            slots={{
              dayCalendar: (props) => (
                <>
                  {props.children[0]}
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(5, 1fr)',
                      gap: '8px',
                      pl: 3,
                      pr: 3,
                      marginBottom: '8px',
                    }}
                  >
                    {swedishWeekdays.map((day) => (
                      <Typography
                        key={day}
                        sx={{ fontWeight: 600, fontSize: '0.95rem', textAlign: 'center' }}
                      >
                        {day}
                      </Typography>
                    ))}
                  </Box>
                  {props.children[1]}
                </>
              )
            }}
          />
        </LocalizationProvider>
      </Paper>
    </div>
  );
};

export default Calendar; 