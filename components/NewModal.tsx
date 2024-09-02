"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { Button } from "./ui/button"
import { api } from "../convex/_generated/api"
import { useAction, useMutation } from "convex/react"
import { useState } from "react"
import { pdfToText } from 'pdf-ts'
import { useAuth } from "@clerk/clerk-react"

const NewModal = () => {
    const {userId} = useAuth();
    const [questions, setQuestions] = useState<any>(null)
    const [jobDescription, setJd] = useState<string>("")
    const [resume, setResume] = useState<string>("")
    const [jobTitle, setJobTitle] = useState<string>("")
    const [companyName, setCompanyName] = useState<string>("")
    const [difficulty, setDifficulty] = useState<string>("")
    const generateMCQ = useAction(api.create_mcq.generateMCQ);
    const pushMCQ = useMutation(api.create_mcq.push_mcq);
    const generateTags = useAction(api.GetTags.getTags);
    const createCards = useMutation(api.CreateCard.Create_card);
    const createEmbedding =  useAction(api.createEmbedding.createEmbeddings)

    const handleGenerateMCQ = async () => {

        try {
            if (!userId) {
                console.error("User ID is not available");
                return;
            }

            const mcqArray = await generateMCQ({ jobTitle, jobDescription, resume, difficulty, companyName })
            setQuestions(mcqArray);
            console.log(mcqArray);

            const tags = await generateTags({ questions: mcqArray });
            console.log(tags);

          
            const testId = await pushMCQ({
                userId: userId,
                mcqArray: mcqArray,
            });
            console.log("testId: ",testId);

            if (!testId) {
                console.error("test not pushed");
                return;
            }
            
            // const jobTitleEmbeddings = await createEmbedding({text:jobTitle})

            let jobTitleEmbedding;
            let embeddingsArray; // Declare embeddingsArray here
            try {
                jobTitleEmbedding = await createEmbedding({ text: jobTitle });
                console.log(jobTitleEmbedding?.values);
                if (!jobTitleEmbedding || !jobTitleEmbedding?.values) {
                    throw new Error('Invalid embedding response');
                }
                embeddingsArray = Array.isArray(jobTitleEmbedding?.values)
                    ? jobTitleEmbedding.values
                    : [jobTitleEmbedding.values];
            } catch (error) {
                console.error("Error creating embedding:", error);
                return;
            }


            const cardId = await createCards({
                tags,
                companyName,
                jobTitle,
                jobDescription,
                userId,
                testId,
                resume,
                difficulty,
                jobTitleEmbeddings: embeddingsArray
            });
            console.log("cardId: ", cardId);

        } catch (error) {
            console.error("Error creating questions:", error)
        }
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
        const file = e.target.files?.[0]
        if (file) {
            try {
                const fileBuffer = await file.arrayBuffer()
                const parsedText = await pdfToText(new Uint8Array(fileBuffer))
                console.log(parsedText)
                setter(parsedText)
            } catch (error) {
                console.error("Error parsing PDF:", error)
            }
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className='bg-black rounded-full text-white capitalize inline-flex'
                    size="lg"
                >
                    create new
                    <Plus />
                </Button>
            </DialogTrigger>
            <DialogContent className="h-max w-[90rem]">
                <DialogHeader>
                    <DialogTitle>Create New Test</DialogTitle>
                    <DialogDescription>
                        Create a custom test tailored just for you using AI.
                    </DialogDescription>
                </DialogHeader>
                <div className='gap-4'>
                    <Label htmlFor="jobTitle" className="text-right">
                        Job Title
                    </Label>
                    <Input
                        id="jobTitle"
                        className="col-span-3"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setJobTitle(e.target.value)}
                    />
                </div>
                <div className='gap-4'>
                    <Label htmlFor="jobTitle" className="text-right">
                        Company Name
                    </Label>
                    <Input
                        id="jobTitle"
                        className="col-span-3"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompanyName(e.target.value)}
                    />
                </div>
                <div>
                    <Label htmlFor="jobDescription" className="text-right">
                        Job Description
                    </Label>
                    <Input
                        accept="application/pdf"
                        id="jobDescription"
                        type="file"
                        onChange={(e) => handleFileUpload(e, setJd)}
                    />
                </div>
                <div>
                    <Label htmlFor="resume" className="text-right">
                        Resume
                    </Label>
                    <Input
                        accept="application/pdf"
                        id="resume"
                        type="file"
                        onChange={(e) => handleFileUpload(e, setResume)}
                    />
                </div>
                <div>
                    <Label htmlFor="difficulty" className="text-right">
                        Difficulty Level
                    </Label>
                    <Select onValueChange={setDifficulty}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="easy">Easy</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="hard">Hard</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <DialogFooter>
                    <Button
                        className="bg-[#141414] rounded-full text-white p-3"
                        size="sm"
                        onClick={handleGenerateMCQ}
                    >
                        Start
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default NewModal