import SearchNews from '@/components/pages/Searchpage'
import { Loader } from 'lucide-react'
import React, { Suspense } from 'react'

const NewsPageSearch = () => {
  return (
    <div>
      <Suspense fallback={<Loader className='w-10 h-10 animate-spin'/>}>
        <SearchNews />
      </Suspense>
    </div>
  )
}

export default NewsPageSearch