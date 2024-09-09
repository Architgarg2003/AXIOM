// "use client"
// import React, { useEffect, useState } from 'react'
// import ActivityCalendar, { ThemeInput } from 'react-activity-calendar'
// import {data1} from './data'
// import { Tooltip as MuiTooltip } from '@mui/material';
// import { Separator } from '@/components/ui/separator';
// import { useQuery } from 'convex/react';
// import { api } from '@/convex/_generated/api';
// import { useAuth } from '@clerk/clerk-react';

// interface GitMapI{
//   totalInteractions:any,
//   dailyInteractions:any
// }


// const GitMap = ({ totalInteractions, dailyInteractions }: GitMapI) => {

//   // const { userId } = useAuth() || {userId:''}
//   // console.log(userId)  // Provide a default value
//   // if(!userId){
//   //   console.log('userId NotPresent')
//   // }
//   // const TotalInteractions = useQuery(api.TotalInteractions.Get_TotalInteraction, { userId: userId! });
//   // console.log(TotalInteractions);
//   const [data,setData] = useState<any>();

//   if(dailyInteractions){
//     const transformData = (dailyInteractions: any[]) => {
//       return dailyInteractions.map(interaction => ({
//         date: interaction.date,
//         count: interaction.count,
//         level: interaction.level
//       }));
//     }
//     setData(transformData(dailyInteractions)); // Call transformData with dailyInteractions
//   }
  
  
 

//   const explicitTheme: ThemeInput = {
//     light: ['#E3D0FF', '#BA88FF', '#923FFF', '#7C3AED', '#5D2FB5'],
//     dark: ['#E3D0FF', '#BA88FF', '#923FFF', '#7C3AED', '#5D2FB5'],
//   };


//   return (
//     // <div>
//     //   <ActivityCalendar 
//     //     data={data} 
//     //     theme={explicitTheme}
//     //     blockSize={23}
//     //     blockRadius={5}
//     //     renderBlock={(block, activity) => (
//     //       <MuiTooltip
//     //         title={`${activity.count} activities on ${activity.date}`}
//     //       >
//     //         {block}
//     //       </MuiTooltip>
//     //     )}
//     //     showWeekdayLabels
//     //     weekStart={1}
//     //   />
//     // </div>

//     <div className="bg-white h-max w-full  px-10 p-7 gap-2 rounded-xl flex flex-col">
//       <h1 className="font-semibold text-xl">Interactions</h1>
//       <div className="text-center flex flex-row gap-[3.2rem]">
//         <div className=" p-2 rounded-xl">
//           <p className="font-semibold text-4xl text-black">{dailyInteractions?dailyInteractions[0].count:0}</p>
//           <Separator />
//           <p className=" text-sm">Todays Interactions</p>
//         </div>
//         <div className=" p-2 rounded-xl">
//           <p className="font-semibold text-4xl text-black">{totalInteractions?.InteractionNumber}</p>
//           <Separator />
//           <p className=" text-sm">Total Interactions</p>
//         </div>
//       </div>
//         <ActivityCalendar
//         data={data?data:data1} 
//         theme={explicitTheme}
//         blockSize={23}
//         blockRadius={5}
//         renderBlock={(block, activity) => (
//           <MuiTooltip
//             title={`${activity.count} activities on ${activity.date}`}
//           >
//             {block}
//           </MuiTooltip>
//         )}
//         showWeekdayLabels
//         weekStart={1}
//         hideColorLegend 
//         hideTotalCount
//       />
//     </div>
//   )
// }

// export default GitMap







"use client"

import React, { useEffect, useMemo } from 'react'
import ActivityCalendar, { ThemeInput } from 'react-activity-calendar'
import { Tooltip as MuiTooltip } from '@mui/material';
import { Separator } from '@/components/ui/separator';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useAuth } from '@clerk/clerk-react';

interface GitMapI {
  totalInteractions: any,
  dailyInteractions: any[]
}

const transformData = (dailyInteractions: any[]): any[] => {
  return dailyInteractions?.map(interaction => ({
    date: interaction.date,
    count: interaction.count,
    level: interaction.level
  }));
};

const GitMap = ({ totalInteractions, dailyInteractions }: GitMapI) => {
  const [data, setData] = React.useState<any>([]);
  const transformedDailyInteractions = useMemo(() => transformData(dailyInteractions), [dailyInteractions]);

  useEffect(() => {
    if (dailyInteractions && transformedDailyInteractions.length > 0) {
      setData(transformedDailyInteractions);
    }
  }, [dailyInteractions, transformedDailyInteractions]);

  const explicitTheme: ThemeInput = {
    light: ['#E3D0FF', '#BA88FF', '#923FFF', '#7C3AED', '#5D2FB5'],
    dark: ['#E3D0FF', '#BA88FF', '#923FFF', '#7C3AED', '#5D2FB5'],
  };

  return (
    <div className="bg-white h-max w-full px-10 p-7 gap-2 rounded-xl flex flex-col">
      <h1 className="font-semibold text-xl">Interactions</h1>
      <div className="text-center flex flex-row gap-[3.2rem]">
        <div className="p-2 rounded-xl">
          <p className="font-semibold text-4xl text-black">{dailyInteractions ? dailyInteractions[0]?.count : 0}</p>
          <Separator />
          <p className="text-sm">Today's Interactions</p>
        </div>
        <div className="p-2 rounded-xl">
          <p className="font-semibold text-4xl text-black">{totalInteractions?.InteractionNumber}</p>
          <Separator />
          <p className="text-sm">Total Interactions</p>
        </div>
      </div>
      <ActivityCalendar
        data={data}
        theme={explicitTheme}
        blockSize={23}
        blockRadius={5}
        renderBlock={(block, activity) => (
          <MuiTooltip
            title={`${activity.count} activities on ${activity.date}`}
          >
            {block}
          </MuiTooltip>
        )}
        showWeekdayLabels
        weekStart={1}
        hideColorLegend
        hideTotalCount
      />
    </div>
  )
}

export default GitMap
