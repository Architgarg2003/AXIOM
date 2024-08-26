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
import { useAction } from "convex/react"
import { useState } from "react"
import { pdfToText } from 'pdf-ts'

const NewModal = () => {
    const [questions, setQuestions] = useState<any>(null)
    const [jd, setJd] = useState<string>("")
    const [resume, setResume] = useState<string>("")
    const [jobTitle, setJobTitle] = useState<string>("")
    const [companyName, setCompanyName] = useState<string>("")
    const [difficulty, setDifficulty] = useState<string>("")
    const createQuestions = useAction(api.create_mcq.get_mcq)

    const generateMCQ = async () => {
        try {
            const result = await createQuestions({ jobTitle, jobDescription: jd, resume, difficulty, companyName })
            setQuestions(result)
            console.log("questions:", result)
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
                        onClick={generateMCQ}
                    >
                        Start
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default NewModal