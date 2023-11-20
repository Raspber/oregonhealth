import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Request from '@/public/assets/request.png'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function Success() {

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const {
        data: { user }
    } = await supabase.auth.getUser()
    return user ? (
        <div className='w-full max-w-5xl h-screen flex flex-col'>
            <Link href={'/request'} className='mt-5 py-2 px-4 rounded-lg no-underline text-sm text-white bg-indigo-900 w-fit'>Back</Link>
            <div className='flex w-full h-full items-center gap-5'>
                <div className='w-full bg-slate-300 text-indigo-500 flex justify-center items-center h-1/2 flex-col rounded-sm'>
                    <Image src={Request} alt='request' className='w-full' />
                </div>
                <div className='w-2/3 bg-indigo-500 flex flex-col justify-center items-center h-1/2 shadow-2xl rounded-sm p-4'>
                    <p className='text-xl font-bold'>Your Request Has Been Submitted!</p>
                    <p className='text-center text-indigo-900 text-sm font-bold'>Lorem ipsum nunc consequat interdum varius sit amet mattis vulputate enim nulla</p>
                </div>
            </div>
        </div>
    ) :

        redirect('/?message=You Must Sign In First And Submit A Request!')


}