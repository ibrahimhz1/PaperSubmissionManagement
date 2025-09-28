import api from './api.js'

export function createReview(paperId, payload){ return api.post(`/papers/${paperId}/reviews`, payload).then(r=>r.data) }
export function listReviews(paperId){ return api.get(`/papers/${paperId}/reviews`).then(r=>r.data) }
