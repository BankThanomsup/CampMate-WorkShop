import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router'

const Logo = () => {
  return (
    <Button asChild >
        <Link to="/">CampMate</Link>
    </Button>
  )
}

export default Logo