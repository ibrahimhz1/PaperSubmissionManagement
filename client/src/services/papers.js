import api from './api.js'

export function submitPaper({ title, abstract, file }){
  const fd = new FormData()
  fd.append('title', title)
  fd.append('abstract', abstract)
  fd.append('file', file)
  return api.post('/papers', fd).then(r=>r.data)
}

export function listPapers(params){
  return api.get('/papers', { params }).then(r=> r.data)
}

export function assignReviewers(paperId, reviewerIds){
  return api.post(`/papers/${paperId}/assign`, { reviewerIds }).then(r=> r.data)
}

export function resubmitPaper(paperId, file){
  const fd = new FormData()
  fd.append('file', file)
  return api.post(`/papers/${paperId}/resubmit`, fd).then(r=> r.data)
}

export function getPaperHistory(paperId){
  return api.get(`/papers/${paperId}/history`).then(r=> r.data)
}
