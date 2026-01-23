import React from 'react'
import {PricingTable} from '@clerk/clerk-react'

const Plan = () => {
  return (
    <div className="relative py-24 text-black text-center">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-4xl sm:text-5xl font-semibold text-black mb-4">
          Choose Your Plan
        </h2>
        <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
          Select a plan designed to elevate your content creation process.
        </p>
        <div className="mt-10 h-[1px] bg-gray-400 w-32 mx-auto"></div>
      </div>

        <div className='mt-14 max-sm:mx-8'>
            <PricingTable/>
        </div>

    </div>
  )
}

export default Plan
