import React from 'react'

const ImageContainer = ({image,name}) => {
  return (
    <section className='h-[300px] md:h-[500px] mt-2'>
        <img 
        className='w-full h-full object-cover rounded-md'
        src={image} 
        alt={name} />
    </section>
  )
}

export default ImageContainer