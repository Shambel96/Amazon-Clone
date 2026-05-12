import {ClipLoader} from "react-spinners";
function Loader() {
  return (
    <div style={{
      display:"center",
      alignItems: "center",
      justifyContent:"center",
      height: "50vh"
    }}>
      <ClipLoader />
    </div>
  )
}

export default Loader
