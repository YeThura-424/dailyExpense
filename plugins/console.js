export default defineNuxtPlugin(() => {
  if (process.client) {
    const activeConsole = localStorage.getItem('active_console') === 'true'

    if (!activeConsole) {
      console.log = () => {}
    }
  }
})