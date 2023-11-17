import Image from 'next/image'
import DoctorPatient from '@/public/assets/doctor-patient.png'
import Logo from '@/public/assets/logo.svg'
import { headers, cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'


export default function index({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  const signIn = async (formData: FormData) => {
      'use server'

      const email = formData.get('email') as string
      const password = formData.get('password') as string
      const cookieStore = cookies()
      const supabase = createClient(cookieStore)

      const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
      })

      if (error) {
          return redirect('/?message=Could not authenticate user')
      }

      return redirect('/dashboard')
  }

  const signUp = async (formData: FormData) => {
      'use server'

      const origin = headers().get('origin')
      const email = formData.get('email') as string
      const password = formData.get('password') as string
      const cookieStore = cookies()
      const supabase = createClient(cookieStore)

      const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
              emailRedirectTo: `${origin}/auth/callback`,
          },
      })

      if (error) {
          return redirect('/?message=Could not authenticate user')
      }

      return redirect('/dashboard?message=Check email to continue sign in process')
  }

  return (
    <div className="flex w-full flex max-w-5xl h-screen items-center gap-5">
      <div className='w-2/3 bg-indigo-500 flex justify-center items-center h-1/2 shadow-2xl rounded-sm'>
        <div className='items-center'>
          <div className='flex items-center justify-center mb-5'>
            <Image src={Logo} alt='logo' className='pr-2' />
            <p className='title'>Oregon Health</p>
          </div>
          <p className='text-lg font-bold text-center'>Instant Doctor Visitaion</p>
          <p className='mb-8 text-sm text-center'>Be seen and taken cared for without the wait.</p>
          <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
            <form
                className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
                action={signIn}
            >
                <label className="text-md" htmlFor="email">
                    Email
                </label>
                <input
                    className="rounded-sm px-4 py-2 bg-inherit border mb-6 focus:outline-none"
                    name="email"
                    placeholder="you@example.com"
                    required
                />
                <label className="text-md" htmlFor="password">
                    Password
                </label>
                <input
                    className="rounded-sm px-4 py-2 bg-inherit border mb-6 focus:outline-none"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    required
                />
                <button className="bg-indigo-900 rounded-sm px-4 py-2 text-foreground mb-2">
                    Sign In
                </button>
                <button
                    formAction={signUp}
                    className="border border-foreground/20 rounded-sm px-4 py-2 text-foreground mb-2"
                >
                    Sign Up
                </button>
                {searchParams?.message && (
                    <p className="mt-4 p-4 bg-foreground/10 text-white text-center">
                        {searchParams.message}
                    </p>
                )}
            </form>
        </div>
        </div>
      </div>
      <div className='w-full bg-slate-300 text-indigo-500 flex justify-center items-center h-1/2 flex-col rounded-sm'>
        <Image src={DoctorPatient} alt='graphic image' className='w-full' />
      </div>
    </div>
  )
}
