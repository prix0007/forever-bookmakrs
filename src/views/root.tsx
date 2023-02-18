import { Box } from '@chakra-ui/react'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './navbar'

const Root = () => {
  return (
    <Box minH={"100vh"} minW={"100%"}>
        <Navbar />
        <Outlet />
    </Box>
  )
}

export default Root