import React, { useState } from 'react'
import Markdown from 'react-markdown'

const CreationItem = ({item}) => {
    const [expanded, setExpanded] = useState(false)
  return (
    <div onClick={()=> setExpanded(!expanded)} className='p-4 max-w-5xl text-sm  border border-gray-200 rounded-lg cursor-pointer'>
        <div  className='w-full bg-[#1a1a1a] text-gray-100 border border-gray-700 rounded-xl p-4 flex justify-between items-center shadow-md hover:border-[#00ff88] hover:shadow-[0_0_12px_#00ff88]   transition-all duration-300'>
           <div>
           <h2>{item.prompt}</h2>
           <p className='px-4 py-2 text-sm text-white bg-gradient-to-r from-[#113e29] to-[#00b894] rounded-lg hover:scale-105 transition'>{item.type} - {new Date(item.created_at).toLocaleDateString()}</p>
           </div>
           <button className='bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] px-4 py-1 rounded-full'>{item.type}</button>
        </div>

        {
            expanded && (
                <div cla>
                    {item.type === 'image' ? (
                        <div cla>
                            <img src={item.content} alt="image"  className='mt-3 w-full max-w-md'/>
                        </div>
                    ):(
                        <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-700'>
                            <div className='reset-tw'> 
                                <Markdown>
                                {item.content}
                                </Markdown>
                            </div>
                        </div>
                    )}
                </div>
            )
        }
      
    </div>
  )
}

export default CreationItem