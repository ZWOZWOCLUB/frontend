const Calendar = tui.Calendar;

const container = document.getElementById('calendar');
const options = {
  defaultView: 'month',
  month: {
    dayNames: ['일', '월', '화', '수', '목', '금', '토'],
  },
  timezone: {
    zones: [
      {
        timezoneName: 'Asia/Seoul',
        displayLabel: 'Seoul',
      },
      {
        timezoneName: 'Europe/London',
        displayLabel: 'London',
      },
    ],
  },
  
  
};


const calendar = new Calendar(container, options);
calendar.setTheme({  //주말 배경색 변경
    month: {
      weekend: {
        backgroundColor: 'aliceblue',
      },
    },
  });

  
document.addEventListener('DOMContentLoaded', function () {
var todayButton = document.querySelector('.today');
var prevButton = document.querySelector('.prev');
var nextButton = document.querySelector('.next');
var range = document.querySelector('.range');

function displayMonth() {
var currentDate = new Date();
var year = currentDate.getFullYear();
var month = currentDate.toLocaleString('ko-KR', { month: 'long' });

range.textContent = year + '년 ' + month;
}

function displayRenderRange() {
range.textContent = getNavbarRange(calendar.getDateRangeStart(), calendar.getDateRangeEnd(), 'month');
}

todayButton.addEventListener('click', function () {
calendar.today();
displayMonth();
displayRenderRange();
});

prevButton.addEventListener('click', function () {
calendar.prev();
displayMonth();
displayRenderRange();
});

nextButton.addEventListener('click', function () {
calendar.next();
displayMonth();
displayRenderRange();
});

displayMonth();
displayRenderRange();
});
