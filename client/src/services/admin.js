import api from './api.js'

export function searchReviewers(query){
  return api.get('/admin/reviewers', { params: { q: query } }).then(r=>r.data)
}
