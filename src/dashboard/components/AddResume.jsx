import { Loader2, PlusSquare } from 'lucide-react'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { v4 as uuidv4 } from 'uuid';
import GlobalApi from './../../../service/GlobalApi'
import { useUser } from '@clerk/clerk-react'
import { Navigate, useNavigate } from 'react-router-dom'



function AddResume() {

    const [openDialog,setOpenDialog]=useState(false)
    const [resumeTitle,setResumeTitle]=useState();
    const {user}=useUser();
    const [loading,setLoading]=useState(false);
    const navigation=useNavigate();
    const onCreate=async()=>{
        setLoading(true)
        const uuid=uuidv4();

        const data={
            data:{
                title:resumeTitle,
                resumeid:uuid,
                userName:user?.fullName,
                userEmail:user?.primaryEmailAddress?.emailAddress
            }
        }


        GlobalApi.CreateNewResume(data).then(resp=>{
            if(resp)
            {
                setLoading(false);
                navigation('/dashboard/resume/'+resp.data.data.documentId+"/edit");
            }
        },(error)=>{
            console.log('Galat hai')
            setLoading(false);
        })

    }
  return (
    <div >
        <div className='p-14 py-24 border 
        items-center flex 
        justify-center bg-secondary
        rounded-lg h-[280px]
        hover:scale-105 transition-all hover:shadow-md
        cursor-pointer border-dashed'
        onClick={()=>setOpenDialog(true)}
        >
            <PlusSquare  />
        </div>

        <Dialog open={openDialog}>
       
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            
                <p className='text-gray-500 pb-2'>Add a title for your new resume</p>
                <Input className="my-2" 
                placeholder="Ex.Full Stack resume"
                onChange={(e)=>setResumeTitle(e.target.value)}
                />
            
            <div className='flex justify-end gap-5 pt-4'>
                <Button onClick={()=>setOpenDialog(false)} variant="ghost">Cancel</Button>
                <Button 
                    disabled={!resumeTitle||loading}
                onClick={()=>onCreate()}>
                    {loading?
                    <Loader2 className='animate-spin' /> :'Create'   
                }
                    </Button>
            </div>
            </DialogHeader>
        </DialogContent>
        </Dialog>

    </div>
  )
}

export default AddResume