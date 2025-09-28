import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { listPapers, assignReviewers } from '../../services/papers.js'
import { getPaperHistory } from '../../services/papers.js'
import { listReviews } from '../../services/reviews.js'
import { searchReviewers } from '../../services/admin.js'
import toast from 'react-hot-toast'

export default function AdminDashboard(){
  const [statusFilter, setStatusFilter] = useState('')
  const [authorFilter, setAuthorFilter] = useState('')
  const [reviewerFilter, setReviewerFilter] = useState('')
  const params = useMemo(()=> ({
    ...(statusFilter? { status: statusFilter } : {}),
    ...(authorFilter? { author: authorFilter } : {}),
    ...(reviewerFilter? { reviewer: reviewerFilter } : {}),
  }), [statusFilter, authorFilter, reviewerFilter])
  const papersQ = useQuery({ queryKey: ['papers', params], queryFn: ()=> listPapers(params) })
  const papers = papersQ.data?.papers || []

  const totalSubmissions = papers.length
  const inReviewCount = papers.filter(p=> p.status === 'Under Review').length

  const [selectedPaperId, setSelectedPaperId] = useState('')
  const [reviewerQuery, setReviewerQuery] = useState('')
  const [reviewerResults, setReviewerResults] = useState([])
  const [selectedReviewers, setSelectedReviewers] = useState([]) // array of {_id,name,email}
  const [searchOpen, setSearchOpen] = useState(false)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [historyData, setHistoryData] = useState(null)
  const [historyReviews, setHistoryReviews] = useState([])

  useEffect(()=>{
    let active = true
    const q = reviewerQuery.trim()
    if (!q){ setReviewerResults([]); return }
    const handler = setTimeout(async ()=>{
      try {
        const { reviewers } = await searchReviewers(q)
        if (active) setReviewerResults(reviewers)
      } catch(e){ /* noop */ }
    }, 250)
    return ()=>{ active = false; clearTimeout(handler) }
  }, [reviewerQuery])

  function addReviewer(r){
    if (!selectedReviewers.find(x=> x._id === r._id)) setSelectedReviewers(prev=> [...prev, r])
    setSearchOpen(false)
    setReviewerQuery('')
  }
  function removeReviewer(id){ setSelectedReviewers(prev=> prev.filter(x=> x._id !== id)) }

  async function onAssign(){
    try {
      if (!selectedPaperId) return toast.error('Select a paper')
      if (selectedReviewers.length === 0) return toast.error('Select at least one reviewer')
      await assignReviewers(selectedPaperId, selectedReviewers.map(r=> r._id))
      toast.success('Reviewers assigned')
    } catch(e){ toast.error(e.response?.data?.message || 'Failed to assign') }
  }

  return (
    <div className="space-y-6 container">
      <section className="card">
        <h2 className="section-title" style={{fontSize:'1.25rem'}}>Overview</h2>
        <div className="flex gap-4" style={{marginTop:'0.75rem'}}>
          <div className="card" style={{padding:'1rem'}}>
            <div className="text-sm" style={{color:'var(--gray-600)'}}>Total Submissions</div>
            <div className="text-2xl font-semibold">{totalSubmissions}</div>
          </div>
          <div className="card" style={{padding:'1rem'}}>
            <div className="text-sm" style={{color:'var(--gray-600)'}}>In Review</div>
            <div className="text-2xl font-semibold">{inReviewCount}</div>
          </div>
        </div>
      </section>

      <section className="card">
        <h2 className="section-title" style={{fontSize:'1.125rem'}}>Assign Reviewers</h2>
        <div className="grid md:grid-cols-3 gap-3">
          <div>
            <label className="text-sm text-gray-600">Select Paper</label>
            <select className="w-full border px-3 py-2 rounded" value={selectedPaperId} onChange={e=> setSelectedPaperId(e.target.value)}>
              <option value="">-- Choose a paper --</option>
              {papers.map(p=> (
                <option key={p._id} value={p.paperId}>{p.paperId} - {p.title}</option>
              ))}
            </select>
          </div>
          <div className="relative">
            <label className="text-sm text-gray-600">Search Reviewer</label>
            <input className="w-full border px-3 py-2 rounded" placeholder="Type name or email" value={reviewerQuery} onChange={e=>{ setReviewerQuery(e.target.value); setSearchOpen(true) }} />
            {searchOpen && reviewerResults.length>0 && (
              <div className="absolute z-10 bg-white border rounded w-full max-h-56 overflow-auto mt-1">
                {reviewerResults.map(r=> (
                  <div key={r._id} className="px-3 py-2 hover:bg-gray-100 cursor-pointer" onClick={()=> addReviewer(r)}>
                    {(r.name || r.email)} ({r._id})
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <label className="text-sm text-gray-600">Selected Reviewers</label>
            <div className="flex flex-wrap gap-2 border rounded p-2 min-h-[42px]">
              {selectedReviewers.length === 0 && <span className="text-gray-500 text-sm">None</span>}
              {selectedReviewers.map(r=> (
                <span key={r._id} className="text-sm bg-blue-50 border border-blue-300 text-blue-800 px-2 py-1 rounded">
                  {(r.name || r.email)} ({r._id})
                  <button className="ml-2 text-blue-700" onClick={()=> removeReviewer(r._id)}>x</button>
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-3">
          <button className="btn btn-primary" onClick={onAssign}>Submit Assignment</button>
        </div>
      </section>

      <section className="card">
        <h2 className="section-title" style={{fontSize:'1.25rem'}}>All Submissions</h2>
        <div className="flex flex-wrap gap-3 mb-3">
          <select className="border px-2 py-1 rounded" value={statusFilter} onChange={e=> setStatusFilter(e.target.value)}>
            <option value="">All Statuses</option>
            <option>Submitted</option>
            <option>Under Review</option>
            <option>Revisions Requested</option>
            <option>Revisions Submitted</option>
            <option>Accepted</option>
            <option>Rejected</option>
          </select>
          <input className="border px-2 py-1 rounded" placeholder="Author email contains" value={authorFilter} onChange={e=> setAuthorFilter(e.target.value)} />
          <input className="border px-2 py-1 rounded" placeholder="Reviewer ID" value={reviewerFilter} onChange={e=> setReviewerFilter(e.target.value)} />
        </div>
        {papersQ.isLoading ? 'Loading...' : (
          <div className="overflow-auto">
            <table className="min-w-full bg-white rounded">
              <thead>
                <tr className="text-left">
                  <th className="p-2">Paper ID</th>
                  <th className="p-2">Title</th>
                  <th className="p-2">Author</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Reviewers</th>
                  <th className="p-2">History</th>
                </tr>
              </thead>
              <tbody>
                {papers.map(p=> (
                  <tr key={p._id} className={`border-t ${selectedPaperId===p.paperId? 'bg-blue-50':''}`}>
                    <td className="p-2">{p.paperId}</td>
                    <td className="p-2">{p.title}</td>
                    <td className="p-2">{p.author?.email}</td>
                    <td className="p-2">{p.status}</td>
                    <td className="p-2">
                      <div className="flex flex-wrap gap-1">
                        {(p.assignedReviewers||[]).length===0 && <span className="text-gray-500 text-sm">None</span>}
                        {(p.assignedReviewers||[]).map(r=> (
                          <span key={r._id} className="text-xs bg-gray-100 border px-2 py-1 rounded">
                            {(r.name || r.email)} ({r._id})
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-2">
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={async ()=>{
                          try {
                            const [data, rev] = await Promise.all([
                              getPaperHistory(p.paperId),
                              listReviews(p.paperId)
                            ])
                            setHistoryData(data)
                            setHistoryReviews((rev.reviews||[]).map(r=> ({
                              _id: r._id,
                              recommendation: r.recommendation,
                              createdAt: r.createdAt,
                              reviewer: r.reviewer,
                            })))
                            setHistoryOpen(true)
                          } catch(e){ toast.error('Failed to load history') }
                        }}
                      >View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* History Modal */}
      {historyOpen && (
        <HistoryModal data={historyData} reviews={historyReviews} onClose={()=> setHistoryOpen(false)} />
      )}
    </div>
  )
}

function HistoryModal({ data, reviews, onClose }){
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          maxWidth: '48rem',
          width: '100%',
          padding: '1rem',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-lg">{data?.paperId} — {data?.title}</h3>
          <button onClick={onClose}>✕</button>
        </div>
        <div className="text-sm text-gray-700 mb-3">Current Status: <b>{data?.status}</b></div>
        <div style={{ display: 'grid', gap: '1rem', maxHeight: '70vh', overflow: 'auto' }}>
          <div>
            <div className="font-semibold mb-2">Versions</div>
            <table className="min-w-full bg-white rounded border">
              <thead>
                <tr className="text-left">
                  <th className="p-2">Version</th>
                  <th className="p-2">File</th>
                  <th className="p-2">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {(data?.versions||[]).slice().sort((a,b)=> (b.version-a.version)).map(v=> (
                  <tr key={v.version} className="border-t">
                    <td className="p-2">{v.version}</td>
                    <td className="p-2">{v.fileName || '-'}</td>
                    <td className="p-2">{new Date(v.submittedAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <div className="font-semibold mb-2">Reviews</div>
            {(!reviews || reviews.length===0) ? (
              <div className="text-sm text-gray-600">No reviews yet.</div>
            ) : (
              <table className="min-w-full bg-white rounded border">
                <thead>
                  <tr className="text-left">
                    <th className="p-2">Reviewer</th>
                    <th className="p-2">Recommendation</th>
                    <th className="p-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map(rv=> (
                    <tr key={rv._id} className="border-t">
                      <td className="p-2">{rv.reviewer?.name || rv.reviewer?.email || 'Reviewer'}</td>
                      <td className="p-2">{rv.recommendation}</td>
                      <td className="p-2">{new Date(rv.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        <footer className="mt-3 text-right">
          <button className="bg-gray-700 text-white px-3 py-1 rounded" onClick={onClose}>Close</button>
        </footer>
      </div>
    </div>
  )
}
