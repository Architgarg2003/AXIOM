"use client"
import React, { useState, useEffect } from 'react'
import Heading from './ui/Heading'
import SearchBar from './ui/SearchBar'
import GeneratedCard from './ui/GeneratedCard'
import DynamicGrid from './ui/DynamicGrid'
import { api } from "../convex/_generated/api";
import { useAction, useQuery } from "convex/react";

interface GeneratedTestsI{
  allCards?:any
}

const GeneratedTests = ({ allCards }: GeneratedTestsI) => {
  const [search, setSearch] = useState("");
  const [embeddings, setEmbeddings] = useState(null);

  // const createEmbedding = useAction(api.createEmbedding.createEmbeddings);
  

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
  const cardsData = allCards?.map((card: { _id: string; userId: string; companyName: string; jobTitle: string; createdAt: string; starsCount: number; upvoteCount: number; tags: string[]; testId:string }) => ({
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
        testId={card.testId}
        cardId ={card._id}
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