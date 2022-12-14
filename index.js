const express = require('express');
const dotenv = require('dotenv');
//Database connection
const DbConnection = require("./databaseConnection");
//importing routes
// there is no need to write js extension
const userRouter = require("./routes/users");
const booksRouter = require("./routes/books");

dotenv.config();

const app = express();

DbConnection();

const PORT = 8081;
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Server is up and running",
    });
});

app.use('/users',userRouter);
app.use('/books',booksRouter);

/**
 * Route:/users
 * Method:GET
 * Description:Get all the users
 * Access:Public
 * Parameters:None
 */
app.get('/users', (req, res) => {
    res.status(200).json({
        success: true,
        data: users,
    });
});
/**
 * Route:/users/:id
 * Method:GET
 * Description:Get the single user by id
 * Access:Public
 * Parameters:id
 */

app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find((each) => each.id === id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }
    return res.status(200).json({
        success: true,
        data: user,
    });
});

/**
 * Route:/users
 * Method:POST
 * Description:Create all users
 * Access:Public
 * Parameters:none
 */
app.post("/users", (req, res) => {
    const { id, name, surname, email, subscriptionType, subscriptionDate } = req.body;
    const user = users.find((each) => each.id === id);

    if (user) {
        return res.status(404).json({
            success: false,
            message: "user exists with this id",
        });
    }
    users.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate,

    });

    return res.status(201).json({
        success: true,
        data: users,
    });
});

/**
 * Route:/users/:id
 * Method:PUT
 * Description:Updating user data
 * Access:Public
 * Parameters:id
 */
app.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    const user = users.find((each) => each.id === id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    const updateUser = users.map((each) => {
        if (each.id === id) {
            return {
                ...each,
                ...data,
            };
        }
        return each;

    });
    return res.status(200).json({
        success: true,
        data: updateUser,
    });
});

/**
 * Route:/users/:id
 * Method:DELETE
 * Description:Deleting user by id
 * Access:Public
 * Parameters:id
 */
app.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    const user = users.find((each) => each.id === id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User to be deleted not found",
        });
    }
    const index = users.indexOf(user);
    users.splice(index, 1);

    return res.status(202).json({
        success: true,
        data: users
    });
});

app.get("*", (req, res) => {
    res.status(500).json
        ({
            message: "This route doesn't exist",
        });
});


app.listen(PORT, () => {

    console.log(`Server is running at port ${PORT}`)
})


