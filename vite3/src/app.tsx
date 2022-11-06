import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './pages/home'
import About from './pages/about'
const router = createBrowserRouter(
  [
    {
      path: '',
      element: <Home />
    },
    {
      path: '/about',
      element: <About />
    }
  ]
)


const App = () => <RouterProvider router={router}></RouterProvider>

export default App