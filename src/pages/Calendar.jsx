import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths, startOfWeek, endOfWeek } from 'date-fns';
import { styled } from '@mui/material/styles';
import { Box, Typography, Paper, Grid, IconButton, Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';

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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [homeActive, setHomeActive] = useState(false);
  const [jobActive, setJobActive] = useState(false);

  // Example variables for the button numbers
  const homeCount = 3; // Replace with your dynamic value if needed
  const jobCount = 7;  // Replace with your dynamic value if needed

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Monday
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 }); // Sunday
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const weekDays = ['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'];

  const handleDateClick = (date) => {
    setSelectedDate(date);
    console.log('Selected date:', date);
    console.log('Formatted date:', format(date, 'yyyy-MM-dd'));
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
        <SelectedDateDisplay variant="h5">
          {format(selectedDate, 'EEEE d MMMM yyyy')}
        </SelectedDateDisplay>
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