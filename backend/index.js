const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const serviceAccount = require("./file.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://jobs-99431-default-rtdb.asia-southeast1.firebasedatabase.app/",
});

const db = admin.database();

app.post("/api/vendors", (req, res) => {
  const {
    vendorName,
    bankAccountNo,
    bankName,
    addressLine1,
    addressLine2,
    city,
    country,
    zipCode,
  } = req.body;

  const newVendor = {
    vendorName,
    bankAccountNo,
    bankName,
    addressLine1,
    addressLine2: addressLine2 || "",
    city: city || "",
    country: country || "", // If country is provided by the user, store it, otherwise store an empty string
    zipCode: zipCode || "",
  };

  db.ref("vendors")
    .push(newVendor)
    .then(() => {
      res.status(201).json({ message: "Vendor added successfully" });
    })
    .catch((error) => {
      console.error("Error adding vendor:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.get("/api/vendors", async (req, res) => {
  try {
    // Retrieve and validate pagination parameters (skip and limit)
    const { skip, limit } = validatePaginationParams(req.query);

    // Construct a secure Firebase query
    const query = db.ref("vendors").orderByKey();

    // Fetch vendor data efficiently
    const snapshot = await query.once("value");

    // Process data and handle potential issues
    const vendors = [];
    snapshot.forEach((childSnapshot) => {
      const vendorData = childSnapshot.val();

      // Validate vendor data structure (optional)
      if (!isValidVendorData(vendorData)) {
        console.warn(
          "Skipping vendor with invalid data structure:",
          childSnapshot.key
        );
        return; // Skip to the next child
      }

      vendors.push({ id: childSnapshot.key, ...vendorData });
    });

    // Calculate total number of vendors
    const total = vendors.length;

    // Paginate results and handle edge cases
    const paginatedVendors = vendors.slice(
      skip,
      Math.min(skip + limit, vendors.length)
    );

    res.json({ vendors: paginatedVendors, total });
  } catch (error) {
    console.error("Error getting vendors:", error);

    // Provide more specific error messages for debugging
    let errorMessage = "Internal Server Error";
    if (error.code) {
      errorMessage = `Error code: ${error.code}`;
    }

    res.status(500).json({ error: errorMessage });
  }
});

// Helper functions for validation (optional)
function validatePaginationParams(query) {
  const skip = parseInt(query.skip || "0");
  const limit = parseInt(query.limit || "10");

  if (isNaN(skip) || skip < 0) {
    throw new Error("Invalid 'skip' parameter: Must be a positive integer.");
  }

  if (isNaN(limit) || limit <= 0) {
    throw new Error("Invalid 'limit' parameter: Must be a positive integer.");
  }

  return { skip, limit };
}

function isValidVendorData(data) {
  return true; // Replace with your validation logic
}

app.get("/api/vendors/:vendorId", async (req, res) => {
  try {
    const { vendorId } = req.params;

    // Construct a secure Firebase query
    const query = db.ref(`vendors/${vendorId}`);

    // Fetch vendor data
    const snapshot = await query.once("value");
    const vendorData = snapshot.val();

    if (!vendorData) {
      return res.status(404).json({ error: "Vendor not found" });
    }

    // Validate vendor data structure (optional)
    if (!isValidVendorData(vendorData)) {
      console.warn("Vendor has invalid data structure:", vendorId);
      return res.status(500).json({ error: "Invalid vendor data" });
    }

    res.json({ id: vendorId, ...vendorData });
  } catch (error) {
    console.error("Error getting vendor:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/api/vendors/:id", async (req, res) => {
  try {
    const vendorId = req.params.id;
    const vendorData = req.body;

    await db.ref(`vendors/${vendorId}`).update(vendorData);

    res.status(200).json({ message: "Vendor updated successfully" });
  } catch (error) {
    console.error("Error updating vendor:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/api/vendors/:id", async (req, res) => {
  try {
    const vendorId = req.params.id;

    await db.ref(`vendors/${vendorId}`).remove();

    res.status(200).json({ message: "Vendor deleted successfully" });
  } catch (error) {
    console.error("Error deleting vendor:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 5000; // Use the port provided by Azure or 5000 if running locally

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
