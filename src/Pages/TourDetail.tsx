import { useParams } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import { toursService } from "../api/service/tours"
import { useEffect, useState } from "react"
import { reviewsService } from "../api/service/reviews";

interface Tour {
  id: number;
  name: string;
  background_img: string[];
  price: number
  rating: number
  pack_includes: string[];
  duration: string;
  description: string;
  available_dates: string[];
  max_people: number;
}
interface Reviews {
  id: number;
  tour_id: number;
  rating: number;
  date: string;
  comment: string;
}

function TourDetail() {
  const {id} = useParams()
  const [tourDetailsData, setTourDetailData] = useState<Tour | undefined>(undefined)
  const [reviewsData, setReviewsData] = useState<Reviews[] | []>([])

  const {data} = useFetch<Tour[]>(toursService)
  const {data: reviews} = useFetch<Reviews[]>(reviewsService)

  useEffect(() => {
    if (!data) return;
    const result = data?.find(item => item.id == Number(id))
    setTourDetailData(result)
  }, [id, data])

  useEffect(() => {
    if(reviews){
      setReviewsData(reviews)
    }
  }, [reviews])

  const result = reviewsData.find(item => item.tour_id === Number(id))
  console.log(result)
  return (
    <div className="tour-detail">
      {/* {tourDetailsData?.name}
      {tourDetailsData?.description} */}
      <p>Sayohat nomi : {tourDetailsData?.name}</p>
      <p>{tourDetailsData?.description}</p>
      <p>{tourDetailsData?.pack_includes}</p>
      <h3>Sharhlar:</h3>
      <ul>
        {reviewsData
          .filter(review => review.tour_id === Number(id))
          .map(review => (
            <li key={review.id}>
              <p><strong>Reyting:</strong> {review.rating}</p>
              <p><strong>Izoh:</strong> {review.comment}</p>
              <p><strong>Kun:</strong> {review.date}</p>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default TourDetail
