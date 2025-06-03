import axios from "axios";
import express from "express"

const app = express();
const port = 3000;
app.use(express.static("public"));

// 4. When the user goes to the home page it should render the index.ejs file.
app.get("/", async (req,res) => {
  try {
    // 5. Use axios to get a random secret and pass it to index.ejs to display the
    const response = await axios.get("https://secrets-api.appbrewery.com/random");
    // secret and the username of the secret.
    const content = {
      secret:response.data.secret,
      user:response.data.username
    }
    // res.render("index.ejs", {
    //   secret: result.data.secret, 
    //   user: result.data.username,
    // }); αυτο ειναι σε μεσα στο res.render
    res.render("index.ejs",{content});
  } catch (error) {
    if (error.response && error.response.data) {
    console.log("Server error:", error.response.data);
  } else {
    console.log("General error:", error.message);
  }
  }
})

// 6. Listen on your predefined port and start the server.
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
