
export async function getConfig() {
  
  const token = localStorage.getItem('userToken'); // Access the token
  //  console.log("api ici",token);
  return {
      headers: {
          Authorization: `Bearer ${token}`
      }
      
  };
}

export default getConfig;