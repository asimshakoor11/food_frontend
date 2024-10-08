import React from 'react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Card } from '../components/Card'
import { useState, useEffect } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

export const Home = () => {
  const navigate = useNavigate()

  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  if (!localStorage.getItem('authtoken')) {
    navigate('/login')
  }

  const loadData = async () => {
    return (
      await axios.get('https://food-backend-ten.vercel.app/api/foodData')
        .then((response) => {
          setFoodItem(response.data[0] || []); // Use empty array if response.data[0] is undefined
          setFoodCat(response.data[1] || []);
        })
        .catch(err => {
          console.error(err);
        }));
  }

  useEffect(() => {
    loadData()
    console.log(foodCat)
    console.log(foodItem)
  }, [])


  return (
    <div>
      <div><Navbar /></div>
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade">
          <div className="carousel-inner" id=''>
            <div className="carousel-caption d-none d-md-block" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
              </div>
            </div>
            <div className="carousel-item active">
              <img src="/img1.png" className="d-block w-100" alt="..." />

            </div>
            <div className="carousel-item">
              <img src="/img2.jpg" className="d-block w-100" alt="..." />

            </div>
            <div className="carousel-item">
              <img src="/img3.jpg" className="d-block w-100" alt="..." />

            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='container'>
        {
          foodCat.length > 0
            ? foodCat.map((data) => {
              return (
                <div className='row mb-3'>
                  <div key={data._id} className='fs-3 m-3'>
                    {data.CategoryName}
                  </div>
                  <hr />
                  {foodItem.length > 0 ?
                    foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                      .map(filteritems => {
                        return (
                          <div key={filteritems._id} className='col-12 col-md-6 col-lg-3'>
                            <Card foodItem={filteritems}
                              options={filteritems.options[0]}
                            />
                          </div>
                        )
                      })
                    : <div> No Such Data </div>}
                </div>
              )
            }) : ""
        }
      </div>
      <div><Footer /></div>
    </div>
  )
}
