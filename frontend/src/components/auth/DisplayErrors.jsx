import React from 'react'

const DisplayErrors = ({ error }) => {
  return (
    <div>
      {
        error.length > 0 && (
          <div className="mb-4 rounded-lg bg-red-100 p-4">
            <h3 className="text-red-700 text-lg font-bold mb-2">Error</h3>
            <ul className="list-disc pl-8">
              {
                error.map((err) => (
                  <li className="text-red-700 text-sm" key={err}>{err}</li>
                ))
              }
            </ul>
          </div>
        )
      }
    </div>
  )
}

export default DisplayErrors
