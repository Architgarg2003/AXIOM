// "use client"
// import React, { useState } from 'react'
// import Heading from './ui/Heading'
// import SearchBar from './ui/SearchBar'
// import GeneratedCard from './ui/GeneratedCard'
// import DynamicGrid from './ui/DynamicGrid'
// import { api } from "../convex/_generated/api";
// import { useAction } from "convex/react";

// const cardsData = [
//   { content: <GeneratedCard/> },
//   { content:<GeneratedCard/> },
//   { content:<GeneratedCard/> },
//   { content:<GeneratedCard/> },
//   { content:<GeneratedCard/> },
//   { content:<GeneratedCard/> },
//   { content:<GeneratedCard/> },
//   { content:<GeneratedCard/> },
//   { content:<GeneratedCard/> },
//   { content: <GeneratedCard/> },
//   { content: <GeneratedCard/> },
//   { content: <GeneratedCard/> },
//   { content: <GeneratedCard/> },
//   { content: <GeneratedCard/> },
//   { content: <GeneratedCard/> },
//   { content: <GeneratedCard/> },
//   { content: <GeneratedCard/> },
// ];


// const GeneratedTests = () => {
//   const [search,setSearch] = useState("");
//   const [embeddings, setEmbeddings] = useState(null);

//   const createEmbedding = useAction(api.createEmbedding.createEmbeddings);
  
//   const handleSearch = async () => {
//     if (search.trim()) {
//       try {
//         const result = await createEmbedding({ text: search });
//         setEmbeddings(result);
//         console.log("Embeddings:", result);
//       } catch (error) {
//         console.error("Error creating embeddings:", error);
//       }
//     }
//   };


//   return (
//     <div className="pt-6 pl-[4rem] ">
//         <Heading>Generated Tests</Heading>
//         <div className='flex flex-col gap-10 pt-6 '>
//           <div className='flex items-center justify-center px-5 '>
//             <SearchBar 
//               search={search}
//               setSearch={setSearch}
//               onSearch={handleSearch}
//             />
//           </div>
//           <div className=''>
//            <DynamicGrid cardsData={cardsData} />
//           </div>
//         </div>
//     </div>
//   )
// }

// export default GeneratedTests


// // "use client";
// // import React, { useState } from "react";
// // import Heading from "./ui/Heading";
// // import SearchBar from "./ui/SearchBar";
// // import GeneratedCard from "./ui/GeneratedCard";
// // import DynamicGrid from "./ui/DynamicGrid";
// // import { useQuery } from "convex/react";
// // import { searchItems } from "../convex/items";

// // const cardsData = [
// //   { content: <GeneratedCard /> },
// //   { content: <GeneratedCard /> },
// //   { content: <GeneratedCard /> },
// //   { content: <GeneratedCard /> },
// //   { content: <GeneratedCard /> },
// //   { content: <GeneratedCard /> },
// //   { content: <GeneratedCard /> },
// //   { content: <GeneratedCard /> },
// //   { content: <GeneratedCard /> },
// //   { content: <GeneratedCard /> },
// //   { content: <GeneratedCard /> },
// //   { content: <GeneratedCard /> },
// //   { content: <GeneratedCard /> },
// //   { content: <GeneratedCard /> },
// //   { content: <GeneratedCard /> },
// //   { content: <GeneratedCard /> },
// //   { content: <GeneratedCard /> },
// //   { content: <GeneratedCard /> },
// //   { content: <GeneratedCard /> },
// //   { content: <GeneratedCard /> },
// //   // Add more cards if needed
// // ];

// // const GeneratedTests = () => {

// //   const [search,setSearch] = useState("");
// //   const results = useQuery(searchItems, { search });
  
// //   return (
// //     <div className="pt-6 pl-[4rem]">
// //       <Heading>Generated Tests</Heading>
// //       <div className="flex flex-col gap-10 pt-6">
// //         <div>
// //           <SearchBar search={search} setSearch={setSearch} />
// //         </div>
// //         <div className="w-[91%]">
// //           <DynamicGrid cardsData={cardsData}/>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // export default GeneratedTests;
// // "use client";
// // import React, { useState, useEffect } from "react";
// // import Heading from "./ui/Heading";
// // import SearchBar from "./ui/SearchBar";
// // import GeneratedCard from "./ui/GeneratedCard";
// // import DynamicGrid from "./ui/DynamicGrid";
// // import { useQuery } from "convex/react";
// // import { api } from "../convex/_generated/api";

// // const GeneratedTests = () => {
// //   const [search, setSearch] = useState("");


// //   useEffect(() => {
// //     const timer = setTimeout(() => setSearch(search), 300);
// //     return () => clearTimeout(timer);
// //   }, [search]);

// //   const results = useQuery(api.search.searchItems, { searchTerm: search });
// //   console.log(results)
// //   const cardsData = results?.map((result) => ({
// //     content: <GeneratedCard key={result._id} {...result} />,
// //   })) || [];

// //   return (
// //     <div className="pt-6 pl-[4rem]">
// //       <Heading>Generated Tests</Heading>
// //       <div className="flex flex-col gap-10 pt-6">
// //         <div>
// //           <SearchBar search={search} setSearch={setSearch} />
// //         </div>
// //         <div className="w-[91%]">
// //           {results === undefined ? (
// //             <div>Loading...</div>
// //           ) : results.length === 0 ? (
// //             <div>No results found</div>
// //           ) : (
// //             <DynamicGrid cardsData={cardsData} />
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default GeneratedTests;








// // "use client";
// // import React, { useState, useEffect } from "react";
// // import Heading from "./ui/Heading";
// // import SearchBar from "./ui/SearchBar";
// // import GeneratedCard from "./ui/GeneratedCard";
// // import DynamicGrid from "./ui/DynamicGrid";
// // import { useQuery } from "convex/react";
// // import { api } from "../convex/_generated/api";

// // const GeneratedTests = () => {
// //   const [searchTerm, setSearchTerm] = useState("");

// //   // Debounce the search input to prevent rapid API calls
// //   useEffect(() => {
// //     const timer = setTimeout(() => {
// //       setSearchTerm(searchTerm);
// //     }, 300); // Adjust the debounce delay as needed
// //     return () => clearTimeout(timer);
// //   }, [searchTerm]);

// //   // Fetch the results based on the search term
// //   const results = useQuery(api.search.searchItems, { searchTerm });

// //   // Map the results to card data for display
// //   const cardsData = results?.map((result:any) => ({
// //     content: <GeneratedCard key={result._id} {...result} />,
// //   })) || [];

// //   return (
// //     <div className="pt-6 pl-[4rem]">
// //       <Heading>Generated Tests</Heading>
// //       <div className="flex flex-col gap-10 pt-6">
// //         <div>
// //           <SearchBar search={searchTerm} setSearch={setSearchTerm} />
// //         </div>
// //         <div className="w-[91%]">
// //           {results === undefined ? (
// //             <div>Loading...</div>
// //           ) : results.length === 0 ? (
// //             <div>No results found</div>
// //           ) : (
// //             <DynamicGrid cardsData={cardsData} />
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default GeneratedTests;



"use client"
import React, { useState, useEffect } from 'react'
import Heading from './ui/Heading'
import SearchBar from './ui/SearchBar'
import GeneratedCard from './ui/GeneratedCard'
import DynamicGrid from './ui/DynamicGrid'
import { api } from "../convex/_generated/api";
import { useAction, useQuery } from "convex/react";

const GeneratedTests = () => {
  const [search, setSearch] = useState("");
  const [embeddings, setEmbeddings] = useState(null);

  // const createEmbedding = useAction(api.createEmbedding.createEmbeddings);
  const allCards = useQuery(api.getAllGeneratedCards.getAllGeneratedCards);
  console.log(allCards);

  const handleSearch = async () => {
    // if (search.trim()) {
    //   try {
    //     // const result = await createEmbedding({ text: search });
    //     // setEmbeddings(result);
    //     // console.log("Embeddings:", result);
    //     // TODO: Use these embeddings to filter or sort the cards
    //   } catch (error) {
    //     console.error("Error creating embeddings:", error);
    //   }
    // }
  };

  // Map the fetched cards to the format expected by DynamicGrid
  const cardsData = allCards?.map(card => ({
    content: (
      <GeneratedCard
        key={card._id}
        user ={card.userId}
        companyName={card.companyName}
        jobTitle={card.jobTitle}
        createdAt={card.createdAt}
        starsCount={Number(card.starsCount)}
        upvoteCount={Number(card.upvoteCount)}
        tags={card.tags}
      />
    )
  })) || [];

  return (
    <div className="pt-6 pl-[4rem] ">
      <Heading>Generated Tests</Heading>
      <div className='flex flex-col gap-10 pt-6 '>
        <div className='flex items-center justify-center px-5 '>
          <SearchBar
            search={search}
            setSearch={setSearch}
            onSearch={handleSearch}
          />
        </div>
        <div className=''>
          {/* {allCards === undefined ? (
            <div>Loading...</div>
          ) : allCards.length === 0 ? (
            <div>No generated tests found</div>
          ) : ( */}
            <DynamicGrid cardsData={cardsData} />
          {/* )} */}
        </div>
      </div>
    </div>
  )
}

export default GeneratedTests