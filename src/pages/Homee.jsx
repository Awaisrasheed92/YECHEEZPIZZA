import React from 'react'
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill,BsCart3}
 from 'react-icons/bs';
 import 
 { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';

 
 import { useSelector } from 'react-redux';
 import '../styles/main.css';
 
function Home() {
  const cart = useSelector(state => state.cart);
  const  {orders} = useSelector((state) => state.Userorder);

  // Corrected the variable used for calculating total
  const total = orders?.length

    const data = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];
      function totalQuantity(items) {
       
        if (!Array.isArray(items) || items.length === 0) {
          return 0; 
        }
        return items.reduce((total, item) => total + item.quantity, 0);
        
      }
      console.log(cart,'khannnn');
     

  return (
    <main className='main-container'>
        <div className='main-title'>
            <h3 style={{color:'#263043'}}>DASHBOARD</h3>
        </div>

        <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                    <h3 style={{fontSize:'18px'}}>PRODUCTS</h3>
                    <BsFillArchiveFill className='card_icon'/>
                </div>
                <h1 style={{fontSize:'18px'}}>300</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3 style={{fontSize:'18px'}}>CATEGORIES</h3>
                    <BsFillGrid3X3GapFill className='card_icon'/>
                </div>
                <h1 style={{fontSize:'18px'}}>12</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3 style={{fontSize:'18px'}}>CUSTOMERS</h3>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h1 style={{fontSize:'18px'}}>33</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3 style={{fontSize:'18px'}}>ALERTS</h3>
                    <BsFillBellFill className='card_icon'/>
                </div>
                <h1 style={{fontSize:'18px'}}>42</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3 style={{fontSize:'18px'}}>Order</h3>
                    <BsCart3  className='card_icon'/>
                </div>
                <h1 style={{fontSize:'18px'}}>{total}</h1>
            </div>
        </div>

        <div className='charts'>
            <ResponsiveContainer width="100%" height="100%">
            <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>

        </div>
    </main>
  )
}

export default Home