import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkGetSingleSpot, thunkAddSpotImg } from "../../../store/spots";
import { thunkGetSpotReviews } from "../../../store/reviews";
import EditSpotForm from "../EditSpot";
import DeleteSpotForm from "../DeleteSpot";
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import CreateReview from "../../Reviews/CreateReview";
import DeleteReviewForm from "../../Reviews/DeleteReview";
import AddSpotImageForm from "../AddSpotImg";


import "./SpotPage.css"

export default function SpotPage() {
    const { spotId } = useParams()
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user)
    const spot = useSelector(state => state.spots.singleSpot)
    const reviews = useSelector(state => state.reviews.spotReviews)

    let owner
    if (user && spot) {
        spot.ownerId === +user.id ? owner = true : owner = false
    }


    useEffect(() => {
        dispatch(thunkGetSingleSpot(spotId))
        dispatch(thunkGetSpotReviews(spotId))
    }, [dispatch, user, spot.numReviews, owner, spotId])


    if (spot === {}) return null
    if (Object.values(spot).length === 0) return null

    if (spot === undefined) return null;
    if (user === undefined) return null;
    if (reviews === undefined) return null;

    const rating = (rating) => {
        if (typeof rating === "number") {
            return rating;
        } else {
            return "New";
        }
    }

    const images = [
        "https://a0.muscache.com/im/pictures/8fa2e8aa-fecd-440b-91fc-ad97960b92d9.jpg?im_w=960",
        "https://a0.muscache.com/im/pictures/miso/Hosting-48381226/original/88d44ac7-cfa2-432f-8e7e-37fdef42a2e7.jpeg?im_w=1200",
        "https://a0.muscache.com/im/pictures/ab705410-ed9c-428f-b59d-ba6c74e44d74.jpg?im_w=1200",
        "https://a0.muscache.com/im/pictures/7365f11b-8a13-4a71-9403-db9794b84adf.jpg?im_w=1200",
        "https://a0.muscache.com/im/pictures/miso/Hosting-763901226738818596/original/79778ad8-15b2-49b4-a60f-e61e88095ad7.jpeg?im_w=720",
    ];


    if (spot) {
        if (spot.SpotImages !== "No images listed") {
            for (let i = 0; i < spot.SpotImages.length; i++) {
                images[i] = spot.SpotImages[i].url;
            }
        }
    }

    function randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }


    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const convertDate = (date) => {
        const month = monthNames[new Date(date).getMonth()];
        const year = new Date(date).getFullYear();

        return (
            <p className="reviews-date">{month} {year}</p>
        )
    }

    // console.log("reviews......", Object.values(reviews))
    let noUserReview = true;

    if (reviews) {
        console.log("user.....", user)
        console.log("reviews.....", reviews)
        const reviewArr = Object.values(reviews)

        if (user) {
            for (let review of reviewArr) {
                if (review.userId === user.id) noUserReview = false
            }
        }

    }



    return spot && (
        <div className="spotPage-div">
            <h1 className="spot-name-title">{spot.name}</h1>
            <div className="header">
                <div className="header-left">
                    {typeof spot.avgStarRating === "number" ? (
                        <p className="header-left"><i className="solid-star" id="star"></i>   {rating(spot.avgStarRating).toFixed(1)}</p>
                    ) : (
                        <p className="header-left"><i className="solid-star" id="star"></i>   New</p>

                    )}
                    <p className="header-left">|</p>
                    {spot.numReviews === 1 ? (
                        <p className="header-left" id="num-reviews">{spot.numReviews} review</p>

                    ) : (
                        <p className="header-left" id="num-reviews">{spot.numReviews} reviews</p>
                    )}
                    <p className="header-left">|</p>
                    <p className="header-left" id="location">{spot.city}, {spot.state}, {spot.country}</p>
                </div>
                {owner && (
                    <div className="header-right">
                        <div className="add-img-modal">
                            <i class="regular image"></i>
                            <OpenModalMenuItem
                                itemText="+Img"
                                modalComponent={<AddSpotImageForm spot={spot} />}
                            />
                        </div>
                        <div className="edit-modal">
                            <i className="solid pen-to-square"></i>
                            <OpenModalMenuItem
                                itemText="Edit"
                                modalComponent={<EditSpotForm spot={spot} />}
                            />
                        </div>
                        <div className="delete-modal">
                            <i className="solid square-minus"></i>
                            <OpenModalMenuItem
                                itemText="Delete"
                                modalComponent={<DeleteSpotForm spot={spot} />}
                            />
                        </div>
                    </div>
                )}
            </div>
            <div className="img-div">
                <img className="big-picture" src={images[0]} />
                <div className="small-pictures-div">
                    <img className="small-picture" id="pic-1" src={images[1]} />
                    <img className="small-picture" id="pic-2" src={images[2]} />
                    <img className="small-picture" id="pic-3" src={images[3]} />
                    <img className="small-picture" id="pic-4" src={images[4]} />
                </div>
            </div>
            <div className="spot-info">
                <h2 className="owner-info">Hosted by {spot.Owner.firstName}</h2>
                <p className="rooms-etc">{randomNum(2, 9)} guests | {randomNum(2, 9)} bedrooms | {randomNum(2, 9)} beds | {randomNum(2, 9)} baths</p>
                <p className="spot-description">{spot.description}</p>
            </div>
            <div className="spot-page-review-container">
                <div className="spot-reviews-header">
                    <div className="spot-reviews-header-left">
                        {typeof spot.avgStarRating === "number" ? (
                            <h2 className="header-left"><i className="solid-star" id="star"></i>   {rating(spot.avgStarRating).toFixed(1)}</h2>
                        ) : (
                            <h2 className="header-left"><i className="solid-star" id="star"></i>   New</h2>

                        )}
                        <h2 className="header-left-space">|</h2>
                        {spot.numReviews === 1 ? (
                            <h2 className="spot-reviews-number">{spot.numReviews} review</h2>

                        ) : (
                            <h2 className="spot-reviews-number">{spot.numReviews} reviews</h2>
                        )}
                    </div>
                    {
                        user && user.id !== spot.ownerId && noUserReview && (
                            <div className="spot-reviews-header-right">
                                <i className="solid scroll" id="leave-review-icon"></i>
                                <OpenModalMenuItem
                                    itemText="Leave a Review"
                                    modalComponent={<CreateReview spot={spot} />}
                                />
                            </div>
                        )
                    }
                </div>

                <div className="spot-reviews">
                    {reviews && (
                        <div>
                            {spot.numReviews === 0 ? (
                                <div className="spots-review-div">No reviews for this spot yet!</div>
                            ) : (
                                <div className="spots-review-div">
                                    {Object.values(reviews).map((review) => (
                                        review.User && (
                                            <div key={review.id} className="review-spots-card">
                                                <div className="spots-review-card-top-div">
                                                    <div className="spots-review-top-left">
                                                        <i class="solid-user" id="user-logo-review"></i>
                                                        <div className="review-name-date">
                                                            <p className="review-user-name">{review.User.firstName}</p>
                                                            <p className="review-date">{convertDate(review.createdAt)}</p>
                                                        </div>
                                                    </div>
                                                    {user && user.id === review.userId && (
                                                        <div className="spots-review-top-right">
                                                            <i className="solid-square-minus"></i>

                                                            <OpenModalMenuItem
                                                                itemText="Delete"
                                                                modalComponent={<DeleteReviewForm review={review} />}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                                <p className="review-spots-text">{review.review}</p>
                                            </div>
                                        )
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}
