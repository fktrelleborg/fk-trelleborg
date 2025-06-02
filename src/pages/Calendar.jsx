import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths } from 'date-fns';
import { styled } from '@mui/material/styles';
import { Box, Typography, Paper, Grid, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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

const CalendarDay = styled(Box)(({ theme, isCurrentMonth, isToday, isSelected }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
  cursor: 'pointer',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: isSelected ? theme.palette.primary.main : 'transparent',
  color: isSelected ? theme.palette.primary.contrastText : 
         isToday ? theme.palette.primary.main :
         isCurrentMonth ? theme.palette.text.primary : theme.palette.text.disabled,
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

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const weekDays = ['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'];

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
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
    </CalendarContainer>
  );
};

export default Calendar; 