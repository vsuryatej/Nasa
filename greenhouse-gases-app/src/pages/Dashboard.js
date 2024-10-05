import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement, Filler } from 'chart.js';
import axios from 'axios';
import './Dashboard.css'; // Updated CSS file

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler // Register Filler plugin for area fill
);

const Dashboard = () => {
  const [sidebarWidth, setSidebarWidth] = useState(250); // Initial sidebar width
  const [selectedGas, setSelectedGas] = useState(null); // State to store the selected gas
  const [co2Data, setCo2Data] = useState([]); // State for CO2 data
  const [n2oData, setN2oData] = useState([]); // State for N2O data

  // Fetch CO2 data from NOAA URL
  useEffect(() => {
    const fetchCo2Data = async () => {
      try {
        const response = await axios.get('https://api.allorigins.win/get?url=' + encodeURIComponent('https://gml.noaa.gov/aftp/data/trace_gases/co2/flask/surface/txt/co2_mlo_surface-flask_1_ccgg_event.txt'));
        const lines = response.data.contents.split('\n');
        const parsedData = [];

        for (let line of lines) {
          if (line.startsWith("#") || line.trim() === "") continue; // Skip comments and empty lines
          const parts = line.split(/\s+/); // Split by whitespace
          if (parts.length >= 2) {
            const year = parts[0].slice(0, 4); // Extract year
            const co2Concentration = parseFloat(parts[1]); // Extract CO2 concentration
            parsedData.push({ year: year, value: co2Concentration });
          }
        }

        setCo2Data(parsedData);
      } catch (error) {
        console.error('Error fetching CO2 data:', error);
      }
    };

    fetchCo2Data();
  }, []);

  // Fetch N2O data from NOAA URL using cors-anywhere
  useEffect(() => {
    const fetchN2oData = async () => {
      try {
        const response = await axios.get('https://api.allorigins.win/get?url=' + encodeURIComponent('https://gml.noaa.gov/aftp/data/trace_gases/n2o/flask/surface/txt/n2o_mlo_surface-flask_1_ccgg_event.txt'));
        const lines = response.data.split('\n');
        const parsedData = [];

        for (let line of lines) {
          if (line.startsWith("#") || line.trim() === "") continue; // Skip comments and empty lines
          const parts = line.split(/\s+/); // Split by whitespace
          if (parts.length >= 2) {
            const year = parts[0].slice(0, 4); // Extract year
            const n2oConcentration = parseFloat(parts[1]); // Extract N2O concentration
            parsedData.push({ year: year, value: n2oConcentration });
          }
        }

        setN2oData(parsedData);
      } catch (error) {
        console.error('Error fetching N2O data:', error);
      }
    };

    fetchN2oData();
  }, []);

  // Example data for other greenhouse gases
  const gases = [
    {
      name: 'Carbon dioxide (CO2)',
      description: 'CO2 is a significant greenhouse gas that contributes to global warming.',
      data: co2Data // Use fetched CO2 data here
    },
    {
      name: 'Nitrous oxide (N2O)',
      description: 'N2O is released from agriculture and industrial activities and has a potent warming effect.',
      data:  [
        { year: 1960, value: 200 },
        { year: 1965, value: 220 },
        { year: 1970, value: 231 },
        { year: 1976, value: 243 },
        { year: 1980, value: 227 },
        { year: 1985, value: 250 },
        { year: 1987, value: 300 },
        { year: 1992, value: 260 },
        { year: 1994, value: 319 },
        { year: 1996, value: 342 },
        { year: 1999, value: 345 },
        { year: 2000, value: 365 },
        { year: 2002, value: 368 },
        { year: 2004, value: 371 },
        { year: 2006, value: 364 },
        { year: 2008, value: 397 },
        { year: 2010, value: 390 },
        { year: 2012, value: 403 },
        { year: 2014, value: 416 },
        { year: 2016, value: 429 },
        { year: 2018, value: 412 },
        { year: 2020, value: 435 }
      ]
      
    },
    {
      name: 'Methane (CH4)',
      description: 'CH4 is emitted during the production and transport of coal, oil, and natural gas.',
      data: [
        { year: 1920, value: 800 },
        { year: 1921, value: 805 },
        { year: 1922, value: 810 },
        { year: 1923, value: 815 },
        { year: 1924, value: 820 },
        { year: 1925, value: 835 },
        { year: 1926, value: 810 },
        { year: 1927, value: 845 },
        { year: 1928, value: 830 },
        { year: 1929, value: 845 },
        { year: 1930, value: 850 },
        { year: 1931, value: 825 },
        { year: 1932, value: 860 },
        { year: 1933, value: 845 },
        { year: 1934, value: 870 },
        { year: 1935, value: 845 },
        { year: 1936, value: 880 },
        { year: 1937, value: 885 },
        { year: 1938, value: 890 },
        { year: 1939, value: 895 },
        { year: 1940, value: 900 },
        { year: 1941, value: 905 },
        { year: 1942, value: 910 },
        { year: 1943, value: 915 },
        { year: 1944, value: 920 },
        { year: 1945, value: 925 },
        { year: 1946, value: 930 },
        { year: 1947, value: 935 },
        { year: 1948, value: 940 },
        { year: 1949, value: 945 },
        { year: 1950, value: 950 },
        { year: 1951, value: 955 },
        { year: 1952, value: 960 },
        { year: 1953, value: 965 },
        { year: 1954, value: 970 },
        { year: 1955, value: 975 },
        { year: 1956, value: 980 },
        { year: 1957, value: 985 },
        { year: 1958, value: 990 },
        { year: 1959, value: 995 },
        { year: 1960, value:1000},
        {year :1960,value :1000},
        {year :1961,value :1010},
        {year :1962,value :1020},  // Example value for 2020
        {year :2018,value :1000},
        {year :2019,value :1010},
        {year :2020,value :1020}
    ]
    },
    {
      name: 'Hydrofluorocarbons (HFCs)',
      description: 'HFCs are synthetic greenhouse gases used in cooling and refrigeration.',
      data: [
        { year: 2010, value: 100 },
        { year: 2012, value: 150 },
        { year: 2014, value: 200 },
        { year: 2016, value: 250 },
        { year: 2018, value: 300 },
        { year: 2020, value: 350 }
      ]
    },
    {
      name: 'Perfluorocarbons (PFCs)',
      description: 'PFCs are long-lasting greenhouse gases used in electronics and refrigeration.',
      data: [
        { year: 2010, value: 10 },
        { year: 2012, value: 15 },
        { year: 2014, value: 20 },
        { year: 2016, value: 25 },
        { year: 2018, value:30 },
        { year:2020,value :35}
      ]
    },
    {
      name:'Sulfur hexafluoride (SF6)',
      description:'SF6 is used in electrical insulation and has an extremely high global warming potential.',
      data:[
          {year :2010,value :5},
          {year :2011,value :6},
          {year :2014,value :7},
          {year :2015,value :8},
          {year :2018,value :9},
          {year :2020,value :10}
       ]
     }
   ];

  
// Handle click on each card to set the selected gas
const handleCardClick = (gas) => {
    setSelectedGas(gas); // Update the selected gas state when a card is clicked
};

// Handle sidebar resizing
const handleMouseDown = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = sidebarWidth;

    const doDrag = (e) => {
      const newWidth = startWidth + e.clientX - startX;
      if (newWidth >150 && newWidth <600) {
          setSidebarWidth(newWidth);
       }
   };

   const stopDrag = () => {
       document.removeEventListener('mousemove', doDrag);
       document.removeEventListener('mouseup', stopDrag);
   };

   document.addEventListener('mousemove', doDrag);
   document.addEventListener('mouseup', stopDrag);
};

// Chart.js Line Chart Data Configuration
const lineChartData = selectedGas
? {
     labels : selectedGas.data.map((entry) => entry.year),
     datasets : [
         {
             label : `${selectedGas.name} (ppm)`,
             data : selectedGas.data.map((entry) => entry.value),
             borderColor : 'rgba(75 ,192 ,192 ,1)',
             backgroundColor : 'rgba(75 ,192 ,192 ,0.2)',
             fill : true,
             tension :0.4,
         },
     ],
}
:null;

// Chart.js Bar Chart Data Configuration


return (
<div className="dashboard-container">
<nav className="navbar">
<div className="navbar-brand">
<a href="/">Greenhouse Gases</a>
</div>
<div className="navbar-links">
<a href="/home">Home</a>
<a href="/about">About</a>
<a href="/contact">Contact</a>
</div>
</nav>

<div className="dashboard-content">
<div className="sidebar" style={{ width:`${sidebarWidth}px` }}>
{gases.map((gas,index) => (
<div key={index} className="card" onClick={() => handleCardClick(gas)}>
<h3>{gas.name}</h3>
</div>
))}
</div>

<div className="divider" onMouseDown={handleMouseDown}></div>

<div className="content-area">
{selectedGas ? (
<>
<h1 className="content-title">{selectedGas.name}</h1>
<p className="content-paragraph">{selectedGas.description}</p>

{/* Line Chart */}
<div style={{ width:'80%', margin:'0 auto' }}>
{lineChartData && <Line data={lineChartData} options={{ responsive:true }} />}
</div>


</>
) : (
<h1 className="content-title">Select a Greenhouse Gas</h1>
)}
</div>
</div>
</div>
);
};

export default Dashboard;