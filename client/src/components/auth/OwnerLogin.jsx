import { useState } from 'react'
import { KeyRound, LoaderCircle } from 'lucide-react'
import { loginOwner } from '../../services/authService'

function OwnerLogin({ onLogin }) {
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    setMessage('')
    setLoading(true)

    try {
      const result = await loginOwner(password)
      window.sessionStorage.setItem('ownerToken', result.token)
      onLogin()
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to sign in. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-4 py-10">
      <section className="w-full max-w-md rounded-3xl border border-brand-line bg-[#fffefa] p-7 shadow-xl sm:p-9">
        <img src="/ganesha-mark.png" alt="" className="mx-auto mb-5 h-12 w-24 object-contain" />
        <p className="text-center text-xs font-semibold tracking-[0.2em] text-brand">PRIVATE OWNER ACCESS</p>
        <h1 className="mt-2 text-center text-2xl font-semibold text-brand-dark">Manage your biodata</h1>
        <p className="mt-2 text-center text-sm leading-6 text-stone-500">
          Sign in to edit your details and manage your shareable profile.
        </p>

        <form className="mt-7 space-y-4" onSubmit={submit}>
          <label className="block text-sm font-medium text-stone-700" htmlFor="owner-password">
            Owner password
          </label>
          <input
            id="owner-password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 outline-none"
          />
          {message && (
            <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
              {message}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 font-medium text-white disabled:opacity-60"
          >
            {loading ? <LoaderCircle size={18} className="animate-spin" /> : <KeyRound size={18} />}
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </section>
    </main>
  )
}

export default OwnerLogin
