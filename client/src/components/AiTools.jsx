import React from 'react'
import { AiToolsData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'

const AiTools = () => {
  const navigate = useNavigate()
  const { user } = useUser()

  return (
    <div className="px-4 sm:px-20 xl:px-32 my-24 text-center text-white">
      {/* Heading */}
      <div>
        <h2
          style={{ fontFamily: 'Playfair Display, serif' }}
          className="text-[42px] font-semibold text-white drop-shadow-[0_0_12px_rgba(0,255,100,0.7)]"
        >
          AI Tools
        </h2>
        <p className="text-gray-300">
          Create, optimize and enhance your content.
        </p>
      </div>

      {/* Tools */}
      <div className="flex flex-wrap mt-10 justify-center">
        {AiToolsData.map((tool, index) => (
          <div
            key={index}
            onClick={() => user && navigate(tool.path)}
            className="p-8 m-4 max-w-xs rounded-lg bg-[#0e0e0e] shadow-lg border border-gray-800 hover:-translate-y-2 hover:shadow-[0_0_25px_#00ff7f] hover:border-[#00ff7f] transition-all duration-300 cursor-pointer"
          >
            <tool.Icon
              className="w-12 h-12 p-3 text-white rounded-xl"
              style={{
                background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`,
              }}
            />
            <h3 className="mt-6 mb-3 text-lg font-semibold text-gray-100">
              {tool.title}
            </h3>
            <p className="text-gray-400 text-sm max-w-[95%] mx-auto">
              {tool.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AiTools
