import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const {
        data: { user },
    } = await supabase.auth.getUser()

    const signOut = async () => {
        'use server'

        const cookieStore = cookies()
        const supabase = createClient(cookieStore)
        await supabase.auth.signOut()
        return redirect('/')
    }

    return user ? (
        <div className="flex w-full max-w-5xl h-screen items-center gap-5">
            <div className='w-full bg-white justify-center items-center h-1/2 shadow-2xl rounded-md '>
                <div className='flex gap-5 w-full justify-end p-6'>
                    <p className='text-indigo-500'>Welcome, {user.email}!</p>
                    <form action={signOut}>
                        <button className="py-2 px-4 rounded-md no-underline bg-indigo-300 hover:bg-indigo-900">
                            Logout
                        </button>
                    </form>
                </div>
                <div className='w-full mb-6'>
                    <p className='text-3xl font-bold text-indigo-500 px-12'>Request A Doctor</p>
                    <p className='text-indigo-500 px-12'>Please submit all required information to set appointment</p>
                </div>
                <div className='w-11/12 mx-auto  bg-indigo-100 h-1/6 items-center mb-6'>
                    <p className='text-indigo-500 w-full font-medium p-2'>Basic Patien Information</p>
                    <p className='text-indigo-500 text-sm px-2'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>
                <main className='w-full px-12 text-indigo-500 mx-auto'>
                    <form action="">
                        <section className=''>
                            <div className='flex'>
                                <div>
                                    <label htmlFor="" className='text-sm'>Category</label>
                                    <input type="text" className='border border-indigo-500 rounded' />
                                </div>
                                <div>
                                    <label htmlFor="" className='text-sm'>Patient Number</label>
                                    <input type="text" className='border border-indigo-500 rounded' />
                                </div>
                                <div>
                                    <label htmlFor="" className='text-sm'>Patient Full Name</label>
                                    <input type="text" className='border border-indigo-500 rounded' />
                                </div>
                                <div>
                                    <label htmlFor="" className='text-sm'>Date</label>
                                    <input type="text" className='border border-indigo-500 rounded' />
                                </div>
                            </div>
                        </section>
                        <section>
                            <div className='flex'>
                                <div>
                                    <label htmlFor="" className='text-sm'>Category</label>
                                    <input type="text" className='border border-indigo-500 rounded' />
                                </div>
                                <div>
                                    <label htmlFor="" className='text-sm'>Patient Number</label>
                                    <input type="text" className='border border-indigo-500 rounded' />
                                </div>
                                <div>
                                    <label htmlFor="" className='text-sm'>Patient Full Name</label>
                                    <input type="text" className='border border-indigo-500 rounded' />
                                </div>
                                <div>
                                    <label htmlFor="" className='text-sm'>Date</label>
                                    <input type="text" className='border border-indigo-500 rounded' />
                                </div>
                            </div>
                        </section>
                        <section className='mb-5'>
                            <div className='flex'>
                                <div>
                                    <label htmlFor="" className='text-sm'>Category</label>
                                    <input type="text" className='border border-indigo-500 rounded' />
                                </div>
                                <div>
                                    <label htmlFor="" className='text-sm'>Patient Number</label>
                                    <input type="text" className='border border-indigo-500 rounded' />
                                </div>
                                <div>
                                    <label htmlFor="" className='text-sm'>Patient Full Name</label>
                                    <input type="text" className='border border-indigo-500 rounded' />
                                </div>
                                <div>
                                    <label htmlFor="" className='text-sm'>Date</label>
                                    <input type="text" className='border border-indigo-500 rounded' />
                                </div>
                            </div>
                        </section>
                        <button className='bg-indigo-900 w-24 rounded p-2 text-white'>Submit</button>
                    </form>
                </main>
            </div>
        </div>
    ) : (
        redirect('/?message=You Must Sign In First')
    )
}