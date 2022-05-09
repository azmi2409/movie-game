const Container = ({children,dataTheme}) => {
  return (
    <div data-theme={dataTheme} className="min-h-screen w-screen p-5 bg-gradient-to-br from-secondary to-accent text-secondary-content drawer drawer-mobile">
    <input id="drawer" type="checkbox" className="drawer-toggle"></input>
      {children}
      </div>
  )
}

export default Container