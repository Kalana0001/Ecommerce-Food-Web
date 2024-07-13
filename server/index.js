const express = require("express");
const mysql = require("mysql2");
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/eweb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("Error connecting to MongoDB", err);
});
const UserSchema = new mongoose.Schema({
    name: String,
    disc: String  // Field for description
  });
  
  const UserModel = mongoose.model("users", UserSchema);  // Use collection name 'user'
  
  app.get("/mongo-getUsers", async (req, res) => {
      try {
        const users = await UserModel.find({});
        console.log('Users retrieved:', users);  
        res.json(users);
      } catch (err) {
        console.error('Error retrieving users:', err);
        res.status(500).send("Internal Server Error");
      }
    });
    
  // POST  to add a new user
  app.post("/mongo-addUser", async (req, res) => {
      try {
        const { name, disc } = req.body;
    
        if (!name || !disc) {
          return res.status(400).json({ error: "Name and disc are required fields" });
        }
    
        const newUser = new UserModel({ name, disc });
        await newUser.save();
    
        console.log('User added:', newUser);
        res.status(201).json(newUser); // Respond with the create user 
      } catch (err) {
        console.error('Error adding user:', err);
        res.status(500).send("Internal Server Error");
      }
    });
    
// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "KAlana#23",
    database: "foodweb"
});

// Multer image storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Customer sign-up
app.post("/cussignup", async (req, res) => {
    const sql = "INSERT INTO signn (`name`, `email`, `password`) VALUES (?)";
    const values = [req.body.name, req.body.email, req.body.password];
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json(data);
    });
});

// Login 
app.post("/cussignin", (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT id FROM customer WHERE email = ? AND password = ?";
    db.query(sql, [email, password], (err, result) => {
        if (err) {
            console.error("Error selecting data from signn table:", err);
            return res.status(500).json({ error: "Error logging in user" });
        }
        if (result.length > 0) {
            return res.json({ message: "Success", userId: result[0].id });
        } else {
            return res.status(401).json({ message: "Invalid credentials" });
        }
    });
});


// Admin sign-up
app.post("/adminsignup", async (req, res) => {
    const sql = "INSERT INTO signn (`name`, `email`, `password`) VALUES (?)";
    const values = [req.body.name, req.body.email, req.body.password];
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json(data);
    });
});

// Admin sign-in
app.post("/adminsignin", (req, res) => {
    const sql = "SELECT * FROM signn WHERE `email` = ? AND `password` = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        if (data.length > 0) {
            return res.json("Success");
        } else {
            return res.json("Fail");
        }
    });
});

// API  for select all products
app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM products";
    db.query(sqlGet, (error, result) => {
        if (error) {
            console.log(error);
            return res.json({ Message: "Error" });
        }
        res.json(result);
    });
});

// API  for delete product
app.delete("/api/remove/:id", (req, res) => {
    const { id } = req.params;
    const sqlRemove = "DELETE FROM products WHERE id = ?";
    db.query(sqlRemove, id, (error, result) => {
        if (error) {
            console.log(error);
            return res.json({ Message: "Error" });
        }
        return res.json({ Status: "Success" });
    });
});

// API  for insert product with image
app.post("/api/post", upload.single('image'), (req, res) => {
    const { pname, ptype, price, pstock, pdisc, supid } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!pname || !ptype || !price || !pstock || !pdisc || !supid) {
        return res.status(400).json({ Message: "Please fill all input fields" });
    }

    const sqlInsert = "INSERT INTO products (pname, ptype, price, pstock, pdisc, supid, image) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(sqlInsert, [pname, ptype, price, pstock, pdisc, supid, image], (error, result) => {
        if (error) {
            console.log(error);
            return res.json({ Message: "Error" });
        }
        return res.json({ Status: "Success" });
    });
});

// API  for getting a product by ID
app.get("/api/get/:id", (req, res) => {
    const { id } = req.params;
    const sqlGet = "SELECT * FROM products WHERE id = ?";
    db.query(sqlGet, id, (error, result) => {
        if (error) {
            console.log(error);
            return res.json({ Message: "Error" });
        }
        res.send(result);
    });
});

// API  for update product by ID
app.put("/api/update/:id", upload.single('image'), (req, res) => {
    const { id } = req.params;
    const { pname, ptype, price, pstock, pdisc, supid } = req.body;
    let image = req.file ? req.file.filename : req.body.existingImage;

    const sqlUpdate = "UPDATE products SET pname = ?, ptype = ?, price = ?, pstock = ?, pdisc = ?, supid = ?, image = ? WHERE id = ?";
    db.query(sqlUpdate, [pname, ptype, price, pstock, pdisc, supid, image, id], (error, result) => {
        if (error) {
            console.log(error);
            return res.json({ Message: "Error" });
        }
        return res.json({ Status: "Success" });
    });
});

// API for select all users
app.get("/selectusers", (req, res) => {
    const sqlGet = "SELECT * FROM supplier";
    db.query(sqlGet, (error, result) => {
        if (error) {
            console.log(error);
            return res.json({ Message: "Error" });
        }
        res.send(result);
    });
});

// API for insert user
app.post("/insertusers", (req, res) => {
    const {  name, email, contact, address, password  } = req.body;
    const sqlInsert = "INSERT INTO supplier (name, email, contact, address, password) VALUES (?, ?, ?, ?, ?)";
    db.query(sqlInsert, [name, email, contact, address, password], (error, result) => {
        if (error) {
            console.log(error);
            return res.json({ Message: "Error" });
        }
        return res.json({ Status: "Success" });
    });
});

// API for delete user
app.delete("/api/userremove/:id", (req, res) => {
    const { id } = req.params;
    const sqlRemove = "DELETE FROM supplier WHERE id = ?";
    db.query(sqlRemove, id, (error, result) => {
        if (error) {
            console.log(error);
            return res.json({ Message: "Error" });
        }
        return res.json({ Status: "Success" });
    });
});

// API for get user by ID
app.get("/getuser/:id", (req, res) => {
    const { id } = req.params;
    const sqlGet = "SELECT * FROM supplier WHERE id = ?";
    db.query(sqlGet, id, (error, result) => {
        if (error) {
            console.log(error);
            return res.json({ Message: "Error" });
        }
        res.send(result);
    });
});

// API for update user by ID
app.put("/userupdate/:id", (req, res) => {
    const { id } = req.params;
    const { name, email, contact, address, password } = req.body;
    const sqlUpdate = "UPDATE supplier SET name = ?, email = ?, contact = ?, address = ?, password = ? WHERE id = ?";
    db.query(sqlUpdate, [name, email, contact, address, password,id], (error, result) => {
        if (error) {
            console.log(error);
            return res.json({ Message: "Error" });
        }
        return res.json({ Status: "Success" });
    });
});




// Add product to cart 
app.post("/cart/add", (req, res) => {
    const { usid, pid } = req.body;
    const checkCartSql = "SELECT * FROM cart WHERE usid = ? AND pid = ?";
    db.query(checkCartSql, [usid, pid], (err, result) => {
        if (err) {
            console.error("Error checking cart:", err);
            return res.status(500).json({ error: "Error checking cart" });
        }
        if (result.length > 0) {
            const updateCartSql = "UPDATE cart SET quantity = quantity + 1 WHERE usid = ? AND pid = ?";
            db.query(updateCartSql, [usid, pid], (err, result) => {
                if (err) {
                    console.error("Error updating cart:", err);
                    return res.status(500).json({ error: "Error updating cart" });
                }
                return res.json({ message: "Product quantity updated in cart" });
            });
        } else {
            const insertCartSql = "INSERT INTO cart (usid, pid, quantity) VALUES (?, ?, 1)";
            db.query(insertCartSql, [usid, pid], (err, result) => {
                if (err) {
                    console.error("Error inserting into cart:", err);
                    return res.status(500).json({ error: "Error inserting into cart" });
                }
                return res.json({ message: "Product added to cart" });
            });
        }
    });
});

// Remove product from cart 
app.post("/cart/remove", (req, res) => {
    const { usid, pid } = req.body;
    const sql = "DELETE FROM cart WHERE usid = ? AND pid = ?";
    db.query(sql, [usid, pid], (err, result) => {
        if (err) {
            console.error("Error deleting from cart:", err);
            return res.status(500).json({ error: "Error deleting from cart" });
        }
        return res.json({ message: "Product removed from cart" });
    });
});

// Get cart items 
app.get("/cart/:usid", (req, res) => {
    const { usid } = req.params;
    const sql = `
        SELECT p.id, p.pname, p.price, c.quantity
        FROM cart c
        JOIN products p ON c.pid = p.id
        WHERE c.usid = ?
    `;
    db.query(sql, [usid], (err, results) => {
        if (err) {
            console.error("Error fetching cart items:", err);
            return res.status(500).json({ error: "Error fetching cart items" });
        }
        // Calculate total price
        const totalPrice = results.reduce((total, item) => total + item.price * item.quantity, 0);
        return res.json({ items: results, totalPrice: totalPrice });
    });
});


// Fetch all products 
app.get("/products", (req, res) => {
    const sql = "SELECT id, pname, price FROM products";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching products:", err);
            return res.status(500).json({ error: "Error fetching products" });
        }
        return res.json(results);
    });
});
// Get cart item count 
app.get("/cart/count/:usid", (req, res) => {
    const { usid } = req.params;
    const sql = "SELECT COUNT(*) AS count FROM cart WHERE usid = ?";
    db.query(sql, [usid], (err, result) => {
        if (err) {
            console.error("Error fetching cart item count:", err);
            return res.status(500).json({ error: "Error fetching cart item count" });
        }
        return res.json(result[0]);
    });
});

//  to place an order
app.post("/orders/place", (req, res) => {
    const { usid, items } = req.body; 
    
 
    db.beginTransaction((err) => {
        if (err) {
            console.error("Error beginning transaction:", err);
            return res.status(500).json({ error: "Error placing order" });
        }

        // Step 1: Insert to `orders` table
        const orderSql = "INSERT INTO orders (usid, tprice) VALUES (?, ?)";
        const totalPrice = items.reduce((total, item) => total + (item.quantity * item.uprice), 0);
        
        db.query(orderSql, [usid, totalPrice], (err, result) => {
            if (err) {
                db.rollback(() => {
                    console.error("Error inserting data into ordes table:", err);
                    return res.status(500).json({ error: "Error placing order" });
                });
            } else {
                const orderId = result.insertId;

                // Step 2: Insert to `orderitems` table
                const orderItemsSql = "INSERT INTO orderitems (oid, pid, quantity, uprice) VALUES ?";
                const values = items.map(item => [orderId, item.pid, item.quantity, item.uprice]);

                db.query(orderItemsSql, [values], (err, result) => {
                    if (err) {
                        db.rollback(() => {
                            console.error("Error inserting data into orderitems table:", err);
                            return res.status(500).json({ error: "Error placing order" });
                        });
                    } else {
                        
                        db.commit((err) => {
                            if (err) {
                                db.rollback(() => {
                                    console.error("Error committing transaction:", err);
                                    return res.status(500).json({ error: "Error placing order" });
                                });
                            } else {
                                return res.json({ message: "Order placed successfully", orderId: orderId });
                            }
                        });
                    }
                });
            }
        });
    });
});

//  fetch orders for a specific user
app.get("/orders/:userId", (req, res) => {
    const userId = req.params.userId;
    const sql = `
        SELECT o.id AS orderId, o.tprice AS totalPrice, oi.quantity, oi.uprice, p.pname
        FROM orders o
        JOIN orderitems oi ON o.id = oi.oid
        JOIN products p ON oi.pid = p.id
        WHERE o.usid = ?
    `;
    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error("Error fetching orders:", err);
            return res.status(500).json({ error: "Error fetching orders" });
        }
        return res.json(result);
    });
});


// Route to fetch product details by ID
app.get("/products/:pid", (req, res) => {
    const productId = req.params.pid;
    const sql = "SELECT * FROM products WHERE id = ?";
    db.query(sql, [productId], (err, result) => {
        if (err) {
            console.error("Error fetching product:", err);
            return res.status(500).json({ error: "Error fetching product" });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "Product not found" });
        }
        return res.json(result[0]); // Assuming single product is returned
    });
});

//  to handle payment data insertion
app.post('/api/payment', (req, res) => {
    const { orderId, amount } = req.body;

    // Insert payment data into the database
    const insertQuery = `INSERT INTO payment (oid, amount) VALUES (?, ?)`;
    db.query(insertQuery, [orderId, amount], (err, result) => {
        if (err) {
            console.error('Error inserting payment:', err);
            res.status(500).json({ error: 'Error inserting payment' });
            return;
        }

        console.log('Payment inserted successfully');
        res.status(201).json({ message: 'Payment inserted successfully' });
    });
});

// Server running confirmation
app.listen(8089, () => {
    console.log("Server is running on port 8089");
});
