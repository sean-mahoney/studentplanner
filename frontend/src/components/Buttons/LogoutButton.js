import Axios from "axios"; //import axios

function refreshPage() {
  window.location.reload(false);
}
const LogoutButton = () => {
  const logout = () => {
    Axios.post("http://localhost:3001/logout", {
      //post variables to backend *change url when deploying
    }).then((response) => {
      if (!response.data.message) {
        //if message is returned from db
        alert("user logged out");
      } else {
        console.log("an error happened");
      }
    });
  };
  return (
    <button
      onClick={() => {
        logout();
        refreshPage();
      }}
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
