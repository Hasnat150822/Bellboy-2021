export var chartColors: Array<any> = [
    {
      backgroundColor: "rgba(47, 139, 230, 0.7)",
      borderColor: 'rgb(47, 139, 230)',
      pointBackgroundColor: '#FFF',
      pointBorderColor: '#2F8BE6',
      pointHoverBackgroundColor: '#2F8BE6',
      pointHoverBorderColor: '#FFF'
    },
    {
  
      backgroundColor: "rgba(189, 189, 189, 0.3)",
      borderColor: 'rgb(189, 189, 189)',
      pointBackgroundColor: '#FFF',
      pointBorderColor: '#BDBDBD',
      pointHoverBackgroundColor: 'rgba(255, 141, 96,1)',
      pointHoverBorderColor: '#FFF'
    },
    {
      backgroundColor: 'rgba(250, 144,8,0.5)',
      borderColor: '#fc4a1a',
      pointBackgroundColor: '#c42a03',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    },
  
  ];
export var barChartColors:Array<any> = [
  {
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
    }
]
export const barChartOptions = {
  layout:{
    padding:25
  },
  animation: {
    duration: 1000, // general animation time
    easing: 'easeOutBack'
  },
  legend: {
    position: 'top',
  },
  tooltips:{
    callbacks:{
      label:(context)=>{
        if(typeof context.value === 'string' && context.value.includes('.')){
          return +context.value*1000;
        }else{
          return context.value
        }
      }
    }
  },
  hover: {
    mode: 'label',
    animationDuration: 1000, // duration of animations when hovering an item
  },
  responsiveAnimationDuration: 1000, // animation duration after a resize
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    xAxes: [{
      display: true,
      gridLines: {
        color: "#F5F5F5",
        lineWidth: 1
      },
      scaleLabel: {
        display: true
      }
    }],
    yAxes: [{
      display: true,
      gridLines: {
        color: "#F5F5F5",
        lineWidth: 1
      },
      scaleLabel: {
        display: true
      },
      ticks:{
        display: false,
        min:0
      }
    }]
  },
  plugins:{
    datalabels: {
      anchor: 'end',
      align: 'end',
      font: {
        size: 13,
        weight:600
      },
      formatter: (value, ctx) => {
        let valueType = typeof value;
        if(valueType==='string' && value.includes('.')){
          return value+'k'
        }
      }
    }
  }
};
export const lineChartOptions = {
  animation: {
    duration: 1000, // general animation time
    easing: 'easeOutBack'
  },
  legend: {
    position: 'top',
  },
  hover: {
    mode: 'label',
    animationDuration: 1000, // duration of animations when hovering an item
  },
  responsiveAnimationDuration: 1000, // animation duration after a resize
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    xAxes: [{
      display: true,
      gridLines: {
        color: "#F5F5F5",
        lineWidth: 0.5
      },
      scaleLabel: {
        display: true
      }
    }],
    yAxes: [{
      display: true,
      gridLines: {
        color: "#F5F5F5",
        lineWidth: 0
      },
      scaleLabel: {
        display: true,
      },
      ticks:{
        min:0
      }
    }]
  }
};
export const barChartLabels = ["Earning", "Customers", "Bellboys", "Hirings", "Non-Acceptable", "In Progress","Completed", "Cancelled", "Deliveries", "P.A", "Rides", "B2B"];