import { Oval } from "react-loader-spinner"

function Loader() {
  return (
    <>
        <Oval visible={true} height="30" width={30} color="#252525" ariaLabel="oval-loading" wrapperClass="loader"/>
    </>
  )
}

export default Loader
