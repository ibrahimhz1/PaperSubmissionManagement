import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { listPapers, submitPaper, resubmitPaper, getPaperHistory } from '../../services/papers.js'
import FileUploader from '../../components/FileUploader.jsx'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { listReviews } from '../../services/reviews.js'

export default function AuthorDashboard(){
  const qc = useQueryClient()
  const papersQ = useQuery({ queryKey: ['papers'], queryFn: listPapers })
  const [file, setFile] = useState(null)
  const [title, setTitle] = useState('')
  const [abstract, setAbstract] = useState('')
  const [revFiles, setRevFiles] = useState({}) // { [paperId]: File }
  const [selection, setSelection] = useState(null)
  const [history, setHistory] = useState(null)
  const [historyError, setHistoryError] = useState('')
  const [reviews, setReviews] = useState([])

  const submitMut = useMutation({ mutationFn: submitPaper, onSuccess: ()=>{ toast.success('Submitted'); qc.invalidateQueries({ queryKey: ['papers'] }) }, onError: (e)=> toast.error(e.response?.data?.message || 'Failed') })
  const resubmitMut = useMutation({ mutationFn: ({ paperId, file })=> resubmitPaper(paperId, file), onSuccess: ()=>{ toast.success('Revision submitted'); qc.invalidateQueries({ queryKey: ['papers'] }) }, onError: (e)=> toast.error(e.response?.data?.message || 'Failed to resubmit') })

  function setRevFile(paperId, f){ setRevFiles(prev=> ({ ...prev, [paperId]: f })) }
  function onResubmit(paperId){
    const f = revFiles[paperId]
    if (!f) return toast.error('Please choose a file')
    resubmitMut.mutate({ paperId, file: f })
  }

  async function selectPaper(paperId){
    setSelection(paperId)
    setHistoryError('')
    try {
      const [h, r] = await Promise.all([
        getPaperHistory(paperId),
        listReviews(paperId),
      ])
      setHistory(h)
      setReviews(r.reviews || [])
    } catch{
      setHistory(null); setReviews([]); setHistoryError('Unable to load history. You may not have access or the server is unavailable.')
    }
  }

  return (
    <div className="space-y-6 container">
      <section className="card" style={{maxWidth:'768px'}}>
        <h2 className="section-title" style={{fontSize:'1.25rem'}}>New Submission</h2>
        <div className="space-y-3" style={{marginTop:'0.75rem'}}>
          <input className="w-full border px-3 py-2 rounded" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
          <textarea className="w-full border px-3 py-2 rounded" placeholder="Abstract" rows={4} value={abstract} onChange={e=>setAbstract(e.target.value)} />
          <FileUploader onFile={setFile} />
          <button className="btn btn-primary" onClick={()=> submitMut.mutate({ title, abstract, file })} disabled={submitMut.isPending}>Submit</button>
        </div>
      </section>

      <section className="card">
        <h2 className="section-title" style={{fontSize:'1.25rem'}}>My Papers</h2>
        {papersQ.isLoading ? 'Loading...' : (
          <div className="overflow-auto">
            <table className="min-w-full bg-white rounded">
              <thead>
                <tr className="text-left">
                  <th className="p-2">Paper ID</th>
                  <th className="p-2">Title</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {papersQ.data?.papers?.map(p=> (
                  <tr key={p._id} className={`border-t align-top ${selection===p.paperId? 'bg-blue-50':''}`} onClick={()=> selectPaper(p.paperId)}>
                    <td className="p-2">{p.paperId}</td>
                    <td className="p-2">{p.title}</td>
                    <td className="p-2 whitespace-pre">{p.status}</td>
                    <td className="p-2">
                      {p.status === 'Revisions Requested' ? (
                        <div className="space-y-2">
                          <input type="file" onChange={e=> setRevFile(p.paperId, e.target.files?.[0])} />
                          <button className="btn btn-outline" onClick={()=> onResubmit(p.paperId)} disabled={resubmitMut.isPending}>Submit Revision</button>
                        </div>
                      ) : <span className="text-gray-500 text-sm">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {!!selection && (
        <section className="grid md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="section-title" style={{fontSize:'1.125rem'}}>Version History</h3>
            {!history ? (
              <div className="text-sm text-gray-600">{historyError || 'Loading...'}</div>
            ) : (
              <table className="min-w-full bg-white rounded" style={{marginTop:'0.5rem'}}>
                <thead>
                  <tr className="text-left">
                    <th className="p-2">Version</th>
                    <th className="p-2">Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {(history.versions||[]).slice().sort((a,b)=> b.version-a.version).map(v=> (
                    <tr key={v.version} className="border-t">
                      <td className="p-2">{v.version}</td>
                      <td className="p-2">{new Date(v.submittedAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="card">
            <h3 className="section-title" style={{fontSize:'1.125rem'}}>Reviewer Comments & Requests</h3>
            {reviews.length === 0 ? (
              <div className="text-sm text-gray-600">No reviews yet.</div>
            ) : (
              <ul className="space-y-2">
                {reviews.map(rv=> (
                  <li key={rv._id} className="bg-white rounded border p-2">
                    <div className="text-sm"><b>{rv.recommendation}</b></div>
                    {rv.comments && <div className="text-sm text-gray-700 whitespace-pre-wrap">{rv.comments}</div>}
                    <div className="text-xs text-gray-500">By {rv.reviewer?.email || 'Reviewer'} • {new Date(rv.createdAt).toLocaleString()}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}
    </div>
  )
}
