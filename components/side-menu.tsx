type Props = {
    children?: React.ReactNode
  }
  
  const SideMenu = ({ children }: Props) => {
    return (
      <div style={{position: "fixed", zIndex: 1}} className="top-2.5 right-2.5 px-2.5 py-2.5 bg-gray-500/10">
        {children}
      </div>
    );
  }
  
  export default SideMenu
  