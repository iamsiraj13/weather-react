import React, { useEffect, useState } from "react";

const SearchWeather = () => {

    const [search, setSearch ] = useState("london");

    const [data , setData] = useState([])
    const [input, setInput] = useState("");
    const api_key = "013e35396b656fc82e49dd83dad7e048";
console.log(data)
    let componentMounted = true;

    useEffect(()=>{
        const fetchWeather= async()=>{
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${api_key}`);

            if( componentMounted ){
                setData( await res.json())
            }
            return ()=>{
                componentMounted = false;
            }
        }

        fetchWeather();
    },[search]);
 
    let emoji = null;

    if( typeof data.main != 'undefined'){
        if( data.weather[0].main == 'Clouds'){
            emoji = "fa-cloud"
        }else if(data.weather[0].main == 'Thunderstorm'){
            emoji = "fa-bolt"
        } else if(data.weather[0].main == 'Drizzle'){
            emoji = "fa-cloud-rain"
        } else if(data.weather[0].main == 'Rain'){
            emoji = "fa-cloud-shower-heavy"
        }else if(data.weather[0].main == 'Snow'){
            emoji = "fa-snow-flake"
        }else{
            emoji = "fa-smog"
        }
    } else{
        return <div>....loading</div>
    }



    let temparature = (data.main.temp - 273.15).toFixed(2)

    let temparature_min = (data.main.temp_min - 275.15).toFixed(2);
    let temparature_max = (data.main.temp_max - 275.15).toFixed(2);


    // date

    let d = new Date();
    let date = d.getDate();
    let year = d.getFullYear();
    let month = d.toLocaleString("default", {month:'long'})
    let day = d.toLocaleString("default", {weekday:'long'})

    // time
    let time = d.toLocaleString([],{
        hour: '2-digit',
        minute:'2-digit',
        second:'2-digit'
    })

    const handleSubmit =(e)=>{
        e.preventDefault();
        setSearch(input)

    }
  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-4">
            <div className="card bg-dark text-white text-center border-0">
              <img
                src={`https://source.unsplash.com/600x600/?${data.weather[0].main}`}
                alt=""
                className="img-fluid"
              />
              <div className="card-img-overlay">
                <form onSubmit={handleSubmit}>
                  <div className="input-group mb-4 w-75 mx-auto">
                    <input
                      type="search"
                      placeholder="Search City"
                      className="form-control"
                      value={input}
                      name="search"
                      required
                      onChange={(e)=>setInput(e.target.value)}
                    />
                    <button type="submit" className="input-group-text">
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </form>
                <div className="bg-dark bg-opacity-50 py-3">
                  <h5 className="card-title">{data.name}</h5>
                  <p className="card-text lead">
                    {day}, {month} {date}, {year}
                    <br/> 
                    {time}
                  </p>
                  <hr />
                  <i className={`fas ${emoji} fa-4x`}></i>
                  <h1 className="fw-bolder mb-5"> {temparature}&deg; c</h1>
                  <p className="lead fw-bolder">{data.weather[0].main}</p>
                  <p className="lead">{temparature_min}&deg;C | {temparature_max}&deg;C</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchWeather;

// PoYGE0M0_t4D9psarQKDdKxANvn8rn79Yhd2iu4Ntxg

// gMxYkNmylP15uG0dY7JyuECCxF0ZKyAonOzy1I98kuQ
