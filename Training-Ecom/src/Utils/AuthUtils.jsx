const getUserProfile = async (token) => {
  try {

    const response = await fetch(
      "https://api.escuelajs.co/api/v1/auth/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const userData = await response.json();

    //console.log(userData);

    localStorage.setItem("user", JSON.stringify(userData));

    return userData;

  } catch (error) {
    console.error(error);
  }
};

export default getUserProfile;