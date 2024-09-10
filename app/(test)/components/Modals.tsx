import React from 'react'

interface ModalI{
    head:string,
    alert:string,
    action:()=>void,
    button:string
}

const Modals = ({ head, alert, action,button }: ModalI) => {
  return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">{head}</h2>
              <p className="mb-4">{alert}</p>
              <button
                  onClick={action}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                  {button}
              </button>
          </div>
      </div>
  )
}

export default Modals