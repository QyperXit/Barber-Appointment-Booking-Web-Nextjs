import React,{ useState }  from 'react'
import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Send} from "lucide-react";

const Note = ({note, setNote}) => {
    const [open, setOpen] = useState(false);
    const close = () => setOpen(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button  variant="automatic" onClick={() => setOpen(true)}><Send className="scale-75" />Message</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Leave a note for your barber</DialogTitle>
                    <DialogDescription>
                        Leave a message for your barber so they know what you need
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-2">
                    <div className="grid grid-cols-4 items-center gap-4">
            <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="col-span-4 p-1.5 border"
            />
                    </div>
                </div>
                <DialogFooter>
                    <Button  type="submit" onClick={() => {setOpen(false); }}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default Note