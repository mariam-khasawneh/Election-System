const express = require("express");
const cors = require("cors"); // Import cors middleware
const app = express();
const cronJobs = require("./models/cronJobs");
// db config
const db = require("./config/knexfile");

// Import routes
const faqRoutes = require("./routes/faqRoutes");
const listsRoutes = require("./routes/listRoutes");
const candidatesRoutes = require("./routes/candidatesRoutes");
const adminRoutes = require("./routes/adminRoutes");
const usersRoutes = require("./routes/userRoutes");
const circleRoutes = require("./routes/circleRoutes");
const localListRoutes = require("./routes/localListRoutes");
const LocalListCandidatesRoutes = require("./routes/localListCandidateRoutes");
const PartyListRoute = require("./routes/partyListRoutes");
const winnersRoute = require("./routes/localWinnersRoutes");
const overviewRoutes = require("./routes/overviewRoutes");
// Use CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// Use JSON middleware
app.use(express.json());

// Use routes
app.use("/api", faqRoutes);
app.use("/api", listsRoutes);
app.use("/api", candidatesRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", usersRoutes);
app.use("/api", circleRoutes);
app.use("/api", localListRoutes);
app.use("/api", LocalListCandidatesRoutes);
app.use("/api", PartyListRoute);
app.use("/api", winnersRoute);
app.use("/api", overviewRoutes);

// Basic route
app.get("/", (req, res) => {
  res.send("Elecation");
});

const AdsRoutes = require("./routes/chatAdminRoutes");
app.use("/api", AdsRoutes);

const countdownRoutes = require("./routes/countdownRoutes");
app.use("/api", countdownRoutes);


const Orders = require('./routes/OrdersRoutes'); 
app.use('/api', Orders);



// Set the port to listen on
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
