// // import React from 'react'
// // import Heading from './ui/Heading'
// // import Cards from './ui/Card'
// // import {
// //     Carousel,
// //     CarouselContent,
// //     CarouselItem,
// //     CarouselNext,
// //     CarouselPrevious,
// // } from "@/components/ui/carousel"

// // const Featured = () => {
// //   return (
// //       <div className='pt-6 pl-[4rem]'>
// //         <Heading>
// //             Featured
// //         </Heading>
// //         {/* <div  className='pt-5 grid grid-flow-col w-[95%] overflow-hidden'> */}
// //             {/* <Cards/> */}

// //         {/* </div> */}
// //           <Carousel
// //               opts={{
// //                   align: "start",
// //               }}
// //               className="w-full max-w-[78rem]"
// //           >
// //               <CarouselContent>
// //                   {Array.from({ length: 5 }).map((_, index) => (
// //                       <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/5">
// //                           <div className="gap-4">
// //                               <Cards/>
// //                           </div>
// //                       </CarouselItem>
// //                   ))}
// //               </CarouselContent>
// //               <CarouselPrevious />
// //               <CarouselNext />
// //           </Carousel>

// //     </div>
// //   )
// // }

// // export default Featured



// import React from 'react';
// import Heading from './ui/Heading';
// import Cards from './ui/Card';
// import {
//     Carousel,
//     CarouselContent,
//     CarouselItem,
//     CarouselNext,
//     CarouselPrevious,
// } from "@/components/ui/carousel";

// const Featured = () => {
//     return (
//         <div className="pt-6 pl-[4rem]">
//             <Heading>Featured</Heading>
//             <Carousel
//                 opts={{
//                     align: "start",
//                 }}
//                 className="w-full max-w-[78rem]"
//             >
//                 <CarouselContent className="flex gap-4" >
//                     {Array.from({ length: 5 }).map((_, index) => (
//                         <CarouselItem
//                             key={index}
//                             className=" w-full ">
//                             <div>
//                             <Cards />
//                             </div>

//                         </CarouselItem>
//                     ))}
//                 </CarouselContent>
//                 <CarouselPrevious />
//                 <CarouselNext />
//             </Carousel>
//         </div>
//     );
// };

// export default Featured;



import React from 'react';
import Heading from './ui/Heading';
import Cards from './ui/Card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

interface FeaturedI{
    allFeaturedCards?:any
    isInterview?:boolean
}

const Featured = ({ allFeaturedCards, isInterview }: FeaturedI) => {
    return (
        <div className="md:pt-6 p-2 md:pl-[4rem] md:pr-20">
            <Heading>Featured</Heading>
            {/* <Carousel
                opts={{
                    align: "start",
                    slidesToScroll: 4,
                }}
                className="w-full max-w-[78rem]"
            >
                <CarouselContent className="flex gap-4 -ml-4">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index} className="flex sm:basis-1/2 md:basis-1/3 lg:basis-1/8 xl:basis-1/4">
                            <div className="p-4 ">
                                <Cards />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel> */}

            <div className='w-full flex flex-row overflow-x-scroll h-max overflow-hidden '>
                {allFeaturedCards?.map((data:any, index:any) => (
                        <div key={index} className="p-5 flex-row inline-flex p">
                            <Cards  data={data} isInterview={isInterview}/>
                        </div>
                ))}
            </div>
        </div>
    );
};

export default Featured;