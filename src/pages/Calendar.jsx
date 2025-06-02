import { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths, startOfWeek, endOfWeek } from 'date-fns';
import { styled } from '@mui/material/styles';
import { Box, Typography, Paper, Grid, IconButton, Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import { getAllBookingMonths } from '../services/bookingService';
import { useAuth } from '../contexts/AuthContextProvider';

const CalendarContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2),
}));

const CalendarHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const CalendarGrid = styled(Grid)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: theme.spacing(1),
}));

const CalendarDay = styled(
  Box,
  {
    shouldForwardProp: (prop) =>
      prop !== 'isCurrentMonth' && prop !== 'isToday' && prop !== 'isSelected'
  }
)(({ theme, isCurrentMonth, isToday, isSelected }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
  cursor: 'pointer',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: isSelected ? theme.palette.primary.main : 'transparent',
  color: isSelected
    ? theme.palette.primary.contrastText
    : isToday
    ? theme.palette.primary.main
    : isCurrentMonth
    ? theme.palette.text.primary
    : theme.palette.text.disabled,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const NavigationButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const ActionButtonsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
}));

const SelectedDateDisplay = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  textAlign: 'center',
  fontWeight: 'bold',
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  justifyContent: 'center',
}));

const Calendar = () => {
  const { currentUser } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [homeActive, setHomeActive] = useState(false);
  const [jobActive, setJobActive] = useState(false);
  const [bookingMonths, setBookingMonths] = useState([]);
  const [homeCount, setHomeCount] = useState(0);
  const [jobCount, setJobCount] = useState(0);

  useEffect(() => {
    const fetchMonths = async () => {
      try {
        const months = await getAllBookingMonths();
        setBookingMonths(months);
      } catch (error) {
        console.error('Failed to fetch booking months:', error);
      }
    };
    fetchMonths();
  }, []);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Monday
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 }); // Sunday
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const weekDays = ['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'];

  const handleDateClick = (date) => {
    setSelectedDate(date);

    // Extract year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const monthKey = `${year}-${month}`;
    const dateKey = `${year}-${month}-${day}`;

    // Find the month object
    const monthObj = bookingMonths.find((m) => m.month === monthKey);

    // Find the booking for the selected date
    let atHomeCount = 0;
    let atOfficeCount = 0;
    let userIsAtOffice = false;
    let userIsAtHome = false;
    if (monthObj) {
      const booking = monthObj.bookings.find((b) => b.id === dateKey);
      if (booking && Array.isArray(booking.at_home)) {
        atHomeCount = booking.at_home.length;
        if (currentUser && booking.at_home.includes(currentUser.uid)) {
          userIsAtHome = true;
        }
      }
      if (booking && Array.isArray(booking.at_office)) {
        atOfficeCount = booking.at_office.length;
        if (currentUser && booking.at_office.includes(currentUser.uid)) {
          userIsAtOffice = true;
        }
      }
    }
    setHomeCount(atHomeCount);
    setJobCount(atOfficeCount);
    setHomeActive(userIsAtHome);
    setJobActive(userIsAtOffice);
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleHomeClick = () => {
    setHomeActive((prev) => {
      if (!prev) setJobActive(false); // If turning ON, turn the other OFF
      return !prev;
    });
  };

  const handleJobClick = () => {
    setJobActive((prev) => {
      if (!prev) setHomeActive(false); // If turning ON, turn the other OFF
      return !prev;
    });
  };

  return (
    <CalendarContainer elevation={3}>
      <CalendarHeader>
        <NavigationButton onClick={handlePreviousMonth}>
          <ArrowBackIosNewIcon />
        </NavigationButton>
        <Typography variant="h4">
          {format(currentMonth, 'MMMM yyyy')}
        </Typography>
        <NavigationButton onClick={handleNextMonth}>
          <ArrowForwardIosIcon />
        </NavigationButton>
      </CalendarHeader>
      
      <CalendarGrid>
        {weekDays.map((day) => (
          <Typography key={day} variant="subtitle2" align="center">
            {day}
          </Typography>
        ))}
        
        {days.map((day) => (
          <CalendarDay
            key={day.toString()}
            isCurrentMonth={isSameMonth(day, currentMonth)}
            isToday={isToday(day)}
            isSelected={selectedDate && format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')}
            onClick={() => handleDateClick(day)}
          >
            {format(day, 'd')}
          </CalendarDay>
        ))}
      </CalendarGrid>

      <ActionButtonsContainer>
        <br />
        <ButtonContainer>
          <Button 
            variant={homeActive ? 'contained' : 'outlined'} 
            color={homeActive ? 'primary' : 'inherit'}
            onClick={handleHomeClick} 
            startIcon={<HomeIcon />}>
            {homeCount}
          </Button>
          <Button 
            variant={jobActive ? 'contained' : 'outlined'} 
            color={jobActive ? 'primary' : 'inherit'}
            onClick={handleJobClick} 
            startIcon={<WorkIcon />}>
            {jobCount}
          </Button>
        </ButtonContainer>
      </ActionButtonsContainer>
    </CalendarContainer>
  );
};

export default Calendar; 