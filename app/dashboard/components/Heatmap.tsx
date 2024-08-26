"use client"
import React from 'react'
import ActivityCalendar, { ThemeInput } from 'react-activity-calendar'
import {data} from './data'
import { Tooltip as MuiTooltip } from '@mui/material';
import { Separator } from '@/components/ui/separator';


const GitMap = () => {

  const explicitTheme: ThemeInput = {
    light: ['#E3D0FF', '#BA88FF', '#923FFF', '#7C3AED', '#5D2FB5'],
    dark: ['#E3D0FF', '#BA88FF', '#923FFF', '#7C3AED', '#5D2FB5'],
  };


  return (
    // <div>
    //   <ActivityCalendar 
    //     data={data} 
    //     theme={explicitTheme}
    //     blockSize={23}
    //     blockRadius={5}
    //     renderBlock={(block, activity) => (
    //       <MuiTooltip
    //         title={`${activity.count} activities on ${activity.date}`}
    //       >
    //         {block}
    //       </MuiTooltip>
    //     )}
    //     showWeekdayLabels
    //     weekStart={1}
    //   />
    // </div>

    <div className="bg-white h-max w-full  px-10 p-7 gap-2 rounded-xl flex flex-col">
      <h1 className="font-semibold text-xl">Interactions</h1>
      <div className="text-center flex flex-row gap-[3.2rem]">
        <div className=" p-2 rounded-xl">
          <p className="font-semibold text-4xl text-black">2</p>
          <Separator />
          <p className=" text-sm">Todays Interactions</p>
        </div>
        <div className=" p-2 rounded-xl">
          <p className="font-semibold text-4xl text-black">33</p>
          <Separator />
          <p className=" text-sm">Total Interactions</p>
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