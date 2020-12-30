import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/mybooks";

function bookUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getBooks() {
  return http.get(apiEndpoint);
}

export function getBooksId() {
  return http.get(apiEndpoint + "/id");
}

export function saveBook(book) {

    const body = { ...book };
    return http.put(apiEndpoint, body);
  

}

export function newBook(book) {
   
    const body = { ...book };
    
    return http.post(apiEndpoint, body);
  }

export function deleteBook(bookId) {
  return http.delete(bookUrl(bookId));
}
