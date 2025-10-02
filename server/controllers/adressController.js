import Address from "../models/address.js"

// Add Address: /api/address/add
// export const addAddress = async(req, res)=>{
//     try {
//         const { address, userId } = req.body
//         await Address.create({...address, userId})
//         res.json({success: true, message: "Address added successfully"})
//     } catch (error) {
//         console.log(error.message);
//         res.json({ success: false, message: error.message });
//     }
// }
export const addAddress = async (req, res) => {
  try {
    const userId = req.user._id; // ✅ comes from JWT middleware
    const { firstName, lastName, email, street, city, state, zipcode, country, phone } = req.body;

    const newAddress = await Address.create({
      userId,
      firstName,
      lastName,
      email,
      street,
      city,
      state,
      zipcode,
      country,
      phone,
    });

    res.json({ success: true, message: "Address added successfully", address: newAddress });
  } catch (error) {
    console.log("addAddress error:", error.message);
    res.json({ success: false, message: error.message });
  }
};
// Get Address: /api/address/get

export const getAddress = async(req, res)=>{
    try {
        // const { userId } = req.body
        const userId = req.user._id; // ✅ no longer from body
        const addresses = await Address.find({userId})
        res.json({success: true, addresses})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}