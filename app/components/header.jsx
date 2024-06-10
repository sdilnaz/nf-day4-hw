

// const Header = () => {
  
//   return (
//     <header className="py-4 shadow bg-white text-black">
//       <div className="container mx-auto px-4 flex justify-between items-center">
//         <h1 className="text-2xl font-bold">OLX</h1>
        
//             <button
//             //   onClick={onNewProductClick}
//               className="font-bold py-2 px-4 rounded bg-gray-500 text-white"
//             >
//               Create New Product
//             </button>
          
        
//       </div>
//     </header>
//   );
// };

// export default Header;
import React, { useState } from 'react';
import AddProduct from './ProductCreate';

const Header = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleDialog = () => {
    setIsDialogOpen((prev) => !prev); // Toggle the dialog state
  };

  return (
    <header className="py-4 shadow bg-white text-black">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">OLX</h1>
        {/* Dialog trigger button */}
        <button
          onClick={toggleDialog}
          className="font-bold py-2 px-4 rounded bg-gray-500 text-white"
        >
          Create New Product
        </button>
        {/* Dialog component */}
        {isDialogOpen && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
              <AddProduct onCancel={toggleDialog} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
