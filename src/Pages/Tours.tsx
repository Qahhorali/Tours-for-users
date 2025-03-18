import { useEffect, useState } from "react"
import { categoriesService } from "../api/service/category"
import { toursService } from "../api/service/tours"
import useFetch from "../hooks/useFetch"
import Loader from "../utils/Loader"
import { useNavigate } from "react-router-dom"

interface CategoryType {
  id: number
  name: string
  description?: string 
}
interface TourType {
  id: number
  category_id: number
  name: string
  background_image: string
  price: number
  rating: number
  pack_includes: string[];
}
function Tours() {
  const [categoriesData, setCategoriesData] = useState<CategoryType[] | []>([])
  const [toursData, setToursData] = useState<TourType[] | []>([])
  const [filteredTour, setFilteredTour] = useState<TourType[] | []>([])
  const [active, setActive] = useState<string>('all')

  const {data: tours, loading: tourLoad, error: tourErr} = useFetch<TourType[]>(toursService)
  const {data: categories, loading: catLoad, error: catErr} = useFetch<CategoryType[]>(categoriesService)

  const navigate = useNavigate()
  useEffect(() => {
    if(tours ){
      setToursData(tours)
    }
    if(tours){
      setFilteredTour(tours)
    }
    if(categories){
      setCategoriesData(categories)
    }
  }, [tours, categories])


  function calculateRate(rate: number){
    let stars = ''
    for(let i = 0; i < Math.round(rate); i++){
      stars += '⭐️'
    }
    return stars
  }

  function handleCategory(catId: number | 'all'){
    if (!tours) return;

    if (catId === 'all'){
      setFilteredTour(tours)
      setActive('all')
    }else{
      const result = toursData.filter(tour => tour.category_id == catId)
      setFilteredTour(result)
      setActive(String(catId))
    }
  }
    
  return (
    <div className="tours-wrap">
      <div className="container categories" >
        <div className="categories-title">Mashxur sayohatlar</div>

        {
            catLoad ? (
              <Loader/>
            ) : catErr ? (
              <p>{catErr}</p>
            ) : categoriesData.length > 0 ? (
              <div className="items">
                <div onClick={() => handleCategory('all')} className={`name ${active == 'all' ? 'active' : ''}`}>Barchasi</div>
                {categoriesData?.map(category => (
                  <div 
                    onClick={() => handleCategory(category.id)} 
                    key={category.id} 
                    className={`name ${active == String(category.id) ? 'active' : ''}`}
                  >{category.name}</div>
                ))}
              </div>
            ) : <p>Malumot mavjud emas</p> 
            
        }
      </div>

      <div className="tours container">
        {
            tourLoad ? (
              <Loader/>
            ): tourErr ? (
              <p>{tourErr}</p>
            ) : filteredTour.length > 0 ? (
              <div className="tours">
                {
                  filteredTour.map(tour => (
                    <div key={tour.id} className="tour">
                      <img src={tour.background_image} alt={tour.name} />
                      <div className="name">{tour.name}</div>
                      <div className="info">
                        <div className="head">
                          <div className="rating">{calculateRate(tour.rating)}</div>
                          <div className="price">{tour.price} $</div>
                        </div>
                        <div className="pack_includes">
                          {tour.pack_includes?.map((pack, index) => (
                            <li key={index}>✅{pack}</li>
                          ))}
                        </div>
                        <button onClick={() => navigate( `tour/${tour.id}`)}>Read more</button>
                      </div>
                    </div>
                  ))
                }
              </div>
            ) : <p>Malumot mavjud emas</p>
        }
      </div>
    </div>
  )
}

export default Tours