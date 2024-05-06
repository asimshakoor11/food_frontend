import React from 'react'

export const Carousel = () => {

    // <form class="d-flex">
    //     <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
    //     <button class="btn btn-outline-success" type="submit">Search</button>
    // </form>
    // https://source.unsplash.com/random/900x500/?burger
    return (
        <div>
            <div id="carouselExampleFade" class="carousel slide carousel-fade">
                <div class="carousel-inner" id=''>
                    <div class="carousel-item active">
                        <img src="https://source.unsplash.com/random/900x350/?burger" class="d-block w-100" alt="..." />
                        <div class="carousel-caption d-none d-md-block">
                            <form class="d-flex">
                                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button class="btn btn-outline-success bg-success text-white" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src="https://source.unsplash.com/random/900x350/?pastery" class="d-block w-100" alt="..." />
                        <div class="carousel-caption d-none d-md-block">
                            <form class="d-flex">
                                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button class="btn btn-outline-success bg-success text-white" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src="https://source.unsplash.com/random/900x350/?pizza" class="d-block w-100" alt="..." />
                        <div class="carousel-caption d-none d-md-block">
                            <form class="d-flex">
                                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button class="btn btn-outline-success bg-success text-white" type="submit">Search</button>
                            </form>
                        </div>
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
    )
}
