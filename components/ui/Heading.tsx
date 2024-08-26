import React, { Children } from 'react'

interface HeadingI{
    children:React.ReactNode;
}

const Heading = ({ children }: HeadingI) => {
  return (
    <div>
        <h1 className="text-3xl font-bold text-black flex flex-row gap-2 " >
            {children}
        </h1>
    </div>
  )
}

export default Heading