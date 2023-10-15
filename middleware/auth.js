export default function ({ store, redirect }) {
  if (store.state.auth.isAuthenticated === false) {
    return redirect('/login')
  }
}
