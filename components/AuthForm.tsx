'use client'

import { useState } from 'react'
import Tab from './Tab'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

export default function AuthForm() {
  const [selected, setSelected] = useState('login')

  return (
    <div>
      <div className="py-6">
        <Tab title="로그인" selected={selected === 'login'} onClick={() => setSelected('login')} />
        <Tab
          title="회원가입"
          selected={selected === 'signup'}
          onClick={() => setSelected('signup')}
        />
      </div>
      {selected === 'login' && <LoginForm />}
      {selected === 'signup' && <SignupForm />}
    </div>
  )
}
