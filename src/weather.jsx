import React, { useState } from "react";
import axios from "axios";
import "./weather.css"
export default function Weather()
{
    const key="d02d37fdc5fb6b0261219d0fe75bd26f";
    const [query,setQuery]=useState("");
    const[weather,setWeather]=useState([]);
    const[next,setNext]=useState([]);
    
    const Build=(d)=>
    {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let date = d.getDate();
        let month = months[d.getMonth()];

        return `${date} ${month}`
    }

    const getDay=(d)=>{
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let day = days[d.getDay()];

        return `${day}`;
    }


    const getWeather=async (query)=>
    { 
        try{
            const data=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${key}&units=metric`)
            setWeather(data);
            setQuery('');
            const nextDays=await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${key}`)
            setNext(nextDays);
        } catch(err){
            setQuery("No Such City");
        }
    }

    const getIcon=(i)=>{
        try{
            const img="https://openweathermap.org/img/wn/"+`${next.data.list[i].weather[0].icon}`+"@2x.png";
            return img;  
        }catch(err){
            console.log(err);
        }  
    }

    return(
    <div className='app'>
        <div className={(typeof weather.data !="undefined")?((weather.data.main.temp<20)?((weather.data.main.temp<9)?'top cold':'top chill'):((weather.data.main.temp<35)?'top warm':'top hot')):'empty'}>
            <div className="overlay"> 
                <div className={(typeof weather.data !="undefined")?'search':'empty-search'}>
                    <input type="text" placeholder="Search Your City" onChange={e=>setQuery(e.target.value)} value={query}  className="inputBox" />
                    <button id="btn" onClick={()=>getWeather(query)}><i className="fa-solid fa-cloud-sun-rain"></i></button>
                </div> 
                <div className="current">
                {(typeof weather.data !="undefined")?(
                    <div className="day-date">
                        <i className="fa-solid fa-calendar-days fa-2xl" style={{color:"#fff"}}></i>
                        <div className="inner-day-date">
                            <span>{getDay(new Date())}</span>
                            <span>{Build(new Date())}</span>
                        </div>
                </div>
                ) : ('')}
                {(typeof weather.data !="undefined")?(
                <div className="temp">
                    <img className="temp-img" src={"https://openweathermap.org/img/wn/"+`${weather.data.weather[0].icon}`+"@2x.png"} alt="" />
                    <h1>{Math.ceil(weather.data.main.temp)}°C</h1>
                    <h3>
                        <i className="fa-solid fa-temperature-low" style={{color:"rgb(64,160,101)", textShadow:"0"}}></i>
                        {Math.ceil(weather.data.main.temp_min)}°C/ 
                        <i className="fa-solid fa-temperature-high fa" style={{color:"rgb(150,54,54)",textShadow:"0"}}></i>
                        {Math.ceil(weather.data.main.temp_max)}°C
                    </h3>
                </div>
                ) : ('')}
                {(typeof weather.data !="undefined")?(
                <div className="location">
                    <div className="inner-location">
                        <span>{weather.data.name}</span>
                        <span>{weather.data.sys.country}</span>
                    </div>
                    <i className="fa-solid fa-location-dot fa-2xl" style={{color:"#fff"}}></i>
                </div>
                ) : ('')}
                </div>
            </div>
        </div>
        {(typeof next.data !="undefined")?(
            <div className="bottom">
                <div className="next">
                    <span className="next-date">{Build(new Date(next.data.list[7].dt_txt))}</span>
                    <img src={getIcon(7)}></img>
                    <span className="temperature">{Math.ceil(next.data.list[7].main.temp -273.15)}°C</span>
                </div>
                <hr />
                <div className="next">
                    <span className="next-date">{Build(new Date(next.data.list[15].dt_txt))}</span>
                    <img src={getIcon(15)}></img>
                    <span className="temperature">{Math.floor(next.data.list[15].main.temp -273.15)}°C</span>
                </div>
                <hr />
                <div className="next">
                    <span className="next-date">{Build(new Date(next.data.list[23].dt_txt))}</span>
                    <img src={getIcon(23)}></img>
                    <span className="temperature">{Math.floor(next.data.list[23].main.temp -273.15)}°C</span>
                </div>
                <hr />
                <div className="next">
                    <span className="next-date">{Build(new Date(next.data.list[31].dt_txt))}</span>
                    <img src={getIcon(31)}></img>
                    <span className="temperature">{Math.floor(next.data.list[31].main.temp -273.15)}°C</span>
                </div>
                <hr />
                <div className="next">
                    <span className="next-date">{Build(new Date(next.data.list[39].dt_txt))}</span>
                    <img src={getIcon(39)}></img>
                    <span className="temperature">{Math.floor(next.data.list[39].main.temp -273.15)}°C</span>
                </div>
            </div>
            ) : ('')}
    </div>
    )
}