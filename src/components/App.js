import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Weather from './Weather'

const App = () => {
  return (
    <div>
      <Weather/>
    </div>
  )
}

 const appRouter= createBrowserRouter([{
    path: '/',
    element : <App/>
}])
const root=ReactDOM.createRoot(document.getElementById('root'))

root.render(<RouterProvider router={appRouter} />)
