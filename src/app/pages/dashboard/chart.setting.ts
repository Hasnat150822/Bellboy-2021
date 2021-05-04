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
  export var chartOptions: any = {
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
          display: true
        }
      }]
    }
  };