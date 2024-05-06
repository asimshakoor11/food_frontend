import React from 'react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Card } from '../components/Card'
import { useState, useEffect } from 'react'

export const Home = () => {

  const [search, setSearch] = useState("")


  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([])

  const loadData = async () => {
    let response = await fetch('https://food-backend-ten.vercel.app/api/foodData', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    })

    response = await response.json();
    setFoodItem(response[0])
    setFoodCat(response[1])
  }

  useEffect(() => {
    loadData()
  }, [])


  return (
    <div>
      <div><Navbar /></div>
      <div>
        <div id="carouselExampleFade" class="carousel slide carousel-fade">
          <div class="carousel-inner" id=''>
            <div class="carousel-caption d-none d-md-block" style={{zIndex: "10"}}>
              <div class="d-flex justify-content-center">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
              </div>
            </div>
            <div class="carousel-item active">
              <img src="https://source.unsplash.com/random/900x350/?burger" class="d-block w-100" alt="..." />

            </div>
            <div class="carousel-item">
              <img src="https://source.unsplash.com/random/900x350/?pastery" class="d-block w-100" alt="..." />
              
            </div>
            <div class="carousel-item">
              <img src="https://source.unsplash.com/random/900x350/?pizza" class="d-block w-100" alt="..." />
              
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='container'>
        {
          foodCat != []
            ? foodCat.map((data) => {
              return (
                <div className='row mb-3'>
                  <div key={data._id} className='fs-3 m-3'>
                    {data.CategoryName}
                  </div>
                  <hr />
                  {foodItem != [] ?
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
