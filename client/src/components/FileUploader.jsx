import { useRef, useState } from 'react'

export default function FileUploader({ onFile }) {
  const inputRef = useRef()
  const [drag, setDrag] = useState(false)
  const [fileName, setFileName] = useState('')

  function onDrop(e){
    e.preventDefault();
    setDrag(false);
    const f = e.dataTransfer.files[0]
    if (f) { setFileName(f.name); onFile(f) }
  }

  return (
    <div className="border-2 border-dashed rounded p-6 text-center" onDragOver={e=>{e.preventDefault(); setDrag(true)}} onDragLeave={()=>setDrag(false)} onDrop={onDrop}>
      <p className="mb-2">Drag and drop PDF/DOC here or</p>
      <button type="button" className="px-3 py-1 bg-blue-600 text-white rounded" onClick={()=>inputRef.current.click()}>Browse</button>
      <input ref={inputRef} type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={(e)=>{ const f = e.target.files?.[0]; if (f){ setFileName(f.name); onFile(f) } }} />
      {fileName && <p className="mt-2 text-sm text-gray-600">Selected: {fileName}</p>}
    </div>
  )
}
