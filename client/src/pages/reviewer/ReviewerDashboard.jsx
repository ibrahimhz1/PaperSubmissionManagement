import { useQuery } from '@tanstack/react-query'
import { listPapers } from '../../services/papers.js'
import { createReview } from '../../services/reviews.js'
import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { getToken } from '../../services/authStore.js'
import { getPaperHistory } from '../../services/papers.js'
import { listReviews } from '../../services/reviews.js'

export default function ReviewerDashboard(){
  const [statusFilter, setStatusFilter] = useState('All')
  const [authorFilter, setAuthorFilter] = useState('')
  const params = useMemo(()=> ({
    ...(statusFilter? { status: statusFilter } : {}),
    ...(authorFilter? { author: authorFilter } : {}),
  }), [statusFilter, authorFilter])
  const papersQ = useQuery({ queryKey: ['papers', params], queryFn: ()=> listPapers(params) })
  const [selection, setSelection] = useState(null)
  const [comments, setComments] = useState('')
  const [recommendation, setRecommendation] = useState('Accept')
  const [history, setHistory] = useState(null)
  const [reviews, setReviews] = useState([])

  useEffect(()=>{
    let active = true
    async function load(){
      if (!selection){ setHistory(null); return }
      try {
        const [h, r] = await Promise.all([
          getPaperHistory(selection),
          listReviews(selection),
        ])
        if (active){
          setHistory(h)
          setReviews(r.reviews || [])
        }
      } catch {
        setHistory(null); setReviews([])
      }
    }
    load();
    return ()=>{ active = false }
  }, [selection])

  // Clear selection if it is filtered out or no longer present
  useEffect(()=>{
    const list = papersQ.data?.papers || []
    if (!selection) return
    if (!list.find(p=> p.paperId === selection)){
      setSelection(null)
    }
  }, [papersQ.data, selection])

  async function submitReview(){
    try {
      await createReview(selection, { comments, recommendation })
      toast.success('Review submitted')
    } catch(e){ toast.error('Failed to submit review') }
  }

  async function downloadPaper(){
    try {
      if (!selection) return
      const url = `${import.meta.env.VITE_API_URL}/files/${selection}/download`
      const res = await fetch(url, { headers: { Authorization: `Bearer ${getToken()?.access || ''}` } })
      if (!res.ok) throw new Error('Download failed')
      const blob = await res.blob()
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = 'paper'
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch(e){ toast.error('Download failed') }
  }

  return (
    <div className="space-y-6 container">
      <section className="card">
        <h2 className="section-title" style={{fontSize:'1.25rem'}}>Assigned Papers</h2>
        <div className="flex gap-3" style={{marginTop:'0.75rem'}}>
          <select className="border px-2 py-1 rounded" value={statusFilter} onChange={e=> setStatusFilter(e.target.value)}>
            <option value="All">All Statuses</option>
            <option>Under Review</option>
            <option>Revisions Requested</option>
            <option>Revisions Submitted</option>
            <option>Accepted</option>
            <option>Rejected</option>
          </select>
          <input className="border px-2 py-1 rounded" placeholder="Author email contains" value={authorFilter} onChange={e=> setAuthorFilter(e.target.value)} />
        </div>
        {papersQ.isLoading ? 'Loading...' : (
          <ul className="space-y-2" style={{marginTop:'0.75rem'}}>
            {papersQ.data?.papers?.map(p=> (
              <li key={p._id} className={`p-3 bg-white rounded border cursor-pointer ${selection===p.paperId? 'ring-2 ring-blue-500':''}`} onClick={()=> setSelection(p.paperId)}>
                <div className="font-medium">{p.title}</div>
                <div className="text-xs text-gray-600">{p.paperId}</div>
                <div className="text-xs text-gray-600">Author: {p.author?.email || '-'}</div>
                <div className="text-xs text-gray-600">Status: {p.status}</div>
              </li>
            ))}
          </ul>
        )}
      </section>
      <section className="card" style={{maxWidth:'768px'}}>
        <h2 className="section-title" style={{fontSize:'1.25rem'}}>Review Form</h2>
        <div className="mb-2" style={{marginTop:'0.5rem'}}>
          <button className="btn btn-outline" disabled={!selection} onClick={downloadPaper}>Download Paper</button>
        </div>
        <textarea className="w-full border px-3 py-2 rounded" rows={4} placeholder="Comments" value={comments} onChange={e=>setComments(e.target.value)} />
        <select className="w-full border px-3 py-2 rounded my-2" value={recommendation} onChange={e=>setRecommendation(e.target.value)}>
          <option>Accept</option>
          <option>Minor Revision</option>
          <option>Major Revision</option>
          <option>Reject</option>
        </select>
        <button className="btn btn-primary" disabled={!selection} onClick={submitReview}>Submit Review</button>
      </section>
      {selection && (
        <section className="card" style={{maxWidth:'768px'}}>
          <h2 className="section-title" style={{fontSize:'1.25rem'}}>Version History</h2>
          {!history ? (
            <div className="text-sm text-gray-600">Loading...</div>
          ) : (
            <table className="min-w-full bg-white rounded">
              <thead>
                <tr className="text-left">
                  <th className="p-2">Version</th>
                  <th className="p-2">File</th>
                  <th className="p-2">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {(history.versions||[]).slice().sort((a,b)=> b.version-a.version).map(v=> (
                  <tr key={v.version} className="border-t">
                    <td className="p-2">{v.version}</td>
                    <td className="p-2">{v.fileName || '-'}</td>
                    <td className="p-2">{new Date(v.submittedAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      )}
      {selection && (
        <section className="card" style={{maxWidth:'768px'}}>
          <h2 className="section-title" style={{fontSize:'1.25rem'}}>Reviews</h2>
          {reviews.length===0 ? (
            <div className="text-sm text-gray-600">No reviews yet.</div>
          ) : (
            <table className="min-w-full bg-white rounded">
              <thead>
                <tr className="text-left">
                  <th className="p-2">Recommendation</th>
                  <th className="p-2">Comments</th>
                  <th className="p-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map(rv=> (
                  <tr key={rv._id} className="border-t">
                    <td className="p-2">{rv.recommendation}</td>
                    <td className="p-2 whitespace-pre-wrap">{rv.comments || '-'}</td>
                    <td className="p-2">{new Date(rv.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      )}
    </div>
  )
}
