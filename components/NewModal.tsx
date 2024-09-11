// // "use client"
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog"

// import {
//     Select,
//     SelectContent,
//     SelectGroup,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"

// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Plus } from "lucide-react"
// import { Button } from "./ui/button"
// import { pdfToText } from 'pdf-ts'
// import { useRef, useState } from "react"
// import { api } from "@/convex/_generated/api"
// import { useMutation } from "convex/react"
// // import { useDialog } from "@/components/ui/dialog"

// interface NewModalI{
//     setJd:(e:any)=>void,
//     setResume: (e: any)=>void,
//     setJobTitle: (e: any)=>void,
//     setDifficulty: (e: any)=>void,
//     setCompanyName: (e: any)=>void,
//     handleGenerateMCQ:()=>void,

// } 

// const NewModal = ({ handleGenerateMCQ, setJd, setResume, setJobTitle, setDifficulty, setCompanyName }: NewModalI) => {
//     // const { open, setOpen } = useDialog();
//     const [open, setOpen] = useState(false);


//     const handleStart = ()=>{
//         handleGenerateMCQ();
//         setOpen(false)
//     }

//     const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
//         const file = e.target.files?.[0]
//         if (file) {
//             try {
//                 const fileBuffer = await file.arrayBuffer()
//                 const parsedText = await pdfToText(new Uint8Array(fileBuffer))
//                 console.log(parsedText)
//                 setter(parsedText)
//             } catch (error) {
//                 console.error("Error parsing PDF:", error)
//             }
//         }
//     }

//     return (
//         <Dialog open={open} onOpenChange={setOpen}>
//             <DialogTrigger asChild>
//                 <Button
//                     className='bg-black rounded-full text-white capitalize inline-flex'
//                     size="lg"
//                 >
//                     create new
//                     <Plus />
//                 </Button>
//             </DialogTrigger>
//             <DialogContent className="h-max w-[90rem]">
//                 <DialogHeader>
//                     <DialogTitle>Create New Test</DialogTitle>
//                     <DialogDescription>
//                         Create a custom test tailored just for you using AI.
//                     </DialogDescription>
//                 </DialogHeader>
//                 <div className='gap-4'>
//                     <Label htmlFor="jobTitle" className="text-right">
//                         Job Title
//                     </Label>
//                     <Input
//                         id="jobTitle"
//                         className="col-span-3"
//                         onChange={(e: React.ChangeEvent<HTMLInputElement>) => setJobTitle(e.target.value)}
//                     />
//                 </div>
//                 <div className='gap-4'>
//                     <Label htmlFor="jobTitle" className="text-right">
//                         Company Name
//                     </Label>
//                     <Input
//                         id="jobTitle"
//                         className="col-span-3"
//                         onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompanyName(e.target.value)}
//                     />
//                 </div>
//                 <div>
//                     <Label htmlFor="jobDescription" className="text-right">
//                         Job Description
//                     </Label>
//                     <Input
//                         accept="application/pdf"
//                         id="jobDescription"
//                         type="file"
//                         onChange={(e) => handleFileUpload(e, setJd)}
//                     />
//                 </div>
//                 <div>
//                     <Label htmlFor="resume" className="text-right">
//                         Resume
//                     </Label>
//                     <Input
//                         accept="application/pdf"
//                         id="resume"
//                         type="file"
//                         onChange={(e) => handleFileUpload(e, setResume)}
//                     />
//                 </div>
//                 <div>
//                     <Label htmlFor="difficulty" className="text-right">
//                         Difficulty Level
//                     </Label>
//                     <Select onValueChange={setDifficulty}>
//                         <SelectTrigger className="w-[180px]">
//                             <SelectValue placeholder="Select" />
//                         </SelectTrigger>
//                         <SelectContent>
//                             <SelectGroup>
//                                 <SelectItem value="easy">Easy</SelectItem>
//                                 <SelectItem value="medium">Medium</SelectItem>
//                                 <SelectItem value="hard">Hard</SelectItem>
//                             </SelectGroup>
//                         </SelectContent>
//                     </Select>
//                 </div>
//                 <DialogFooter>
//                     <Button
//                         className="bg-[#141414] rounded-full text-white p-3"
//                         size="sm"
//                         onClick={handleStart}
//                     >
//                         Start
//                     </Button>
//                 </DialogFooter>
//             </DialogContent>
//         </Dialog>
//     )
// }

// export default NewModal






"use client"

import { useState, useRef, FormEvent } from 'react'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
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
import { pdfToText } from 'pdf-ts'
import { useAuth } from '@clerk/clerk-react'

interface NewModalI {
    setJd: (e: any) => void,
    setResume: (e: any) => void,
    setJobTitle: (e: any) => void,
    setDifficulty: (e: any) => void,
    setCompanyName: (e: any) => void,
    handleGenerateMCQ: () => void,
}

const NewModal = ({ handleGenerateMCQ, setJd, setResume, setJobTitle, setDifficulty, setCompanyName }: NewModalI) => {
    const{userId}= useAuth() as {userId : string};
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const generateUploadUrl = useMutation(api.uploadPdF.generateUploadUrl)
    const saveFile = useMutation(api.uploadPdF.saveFile)

    const handleStart = () => {
        handleGenerateMCQ();
        setOpen(false)
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
        const file = e.target.files?.[0]
        if (file) {
            try {
                const fileBuffer = await file.arrayBuffer()
                const parsedText = await pdfToText(new Uint8Array(fileBuffer))
                console.log(parsedText)
                setter(parsedText)
                setFile(file)
            } catch (error) {
                console.error("Error parsing PDF:", error)
            }
        }
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        if (!file) return
        setUploading(true)
        try {
            const postUrl = await generateUploadUrl()
            const result = await fetch(postUrl, {
                method: 'POST',
                headers: { 'Content-Type': file.type },
                body: file,
            })
            const { storageId } = await result.json();
            await saveFile({ storageId,userId, fileName: file.name, fileType: file.type })
            // alert('File uploaded successfully!')
            // setFile(null)
            if (fileInputRef.current) fileInputRef.current.value = ''
            handleStart();
        } catch (error) {
            console.error('Error uploading file:', error)
            alert('Error uploading file. Please try again.')
        } finally {
            setUploading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
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
                <form onSubmit={handleSubmit}>
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
                        <Label htmlFor="companyName" className="text-right">
                            Company Name
                        </Label>
                        <Input
                            id="companyName"
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
                            ref={fileInputRef}
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
                            type="submit"
                            className="bg-[#141414] rounded-full text-white p-3"
                            size="sm"
                            disabled={uploading}
                        >
                            {uploading ? 'Uploading...' : 'Upload and Start'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default NewModal