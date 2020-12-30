import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/reviews";

function reviewUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getReviews() {
  return http.get(apiEndpoint);
}

export function getReview(bookId) {
  return http.get(reviewUrl(bookId));
}

export function saveReview(review) {
//   if (review._id) {
//     const body = { ...review };
//     delete body._id;
//     return http.put(reviewUrl(review._id), body);
//   }

  return http.post(apiEndpoint, review);
}

export function deleteReview(reviewId) {
  return http.delete(reviewUrl(reviewId));
}
