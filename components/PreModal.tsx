"use client"
import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogDescription,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


const PreModal = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>

                <div className="bg-[#141414] rounded-full text-white px-3 py-1 cursor-pointer">
                    Details
                </div>
                {/* <Button variant="outline">Edit Profile</Button> */}
            </DialogTrigger>
            <DialogContent className=" h-max w-[90rem]">
                <DialogHeader>
                    <DialogTitle>Description</DialogTitle>
                    <DialogDescription>
                        Read the details carefully before starting the test.
                    </DialogDescription>
                </DialogHeader>
                <div className="text-wrap overflow-hidden w-auto">
                    <Table>
                        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                        {/* <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Invoice</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Method</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader> */}

                        <TableBody>
                            <TableRow>
                                <TableHead className="w-[100px]">Job Title</TableHead>
                                <TableCell className="font-medium">INV001</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead className="w-[100px]">Company</TableHead>
                                <TableCell className="font-medium">djlflskdfkdsljfskdjflksdjfjlskdjfjsdkfksldjf</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead className="w-[100px]">Job Description</TableHead>
                                <TableCell className="font-medium ">INsjlfkjsdlkfjlkdsjfldsjflsdlkfdsllfdskfdslfjdsfdkfdljkfklsdkjkfsjdklfjldskfV001</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <DialogFooter>
                    {/* <Button className="rounded-full" type="submit">Start</Button> */}
                    <Button
                        className="bg-[#141414] text-white p-3 rounded-full"
                        size="sm"
                    >
                        Start
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default PreModal;