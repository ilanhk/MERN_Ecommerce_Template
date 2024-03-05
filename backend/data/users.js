import bcrypt from 'bcryptjs'; //to hash passwords
// first param of function hashSync is the password and second is the 'salt'

const users = [
    {
        name: 'Admin User',
        email: 'admin@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true  
    },
    {
        name: 'Johnny Blaze',
        email: 'ghostrider@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false  
    },
    {
        name: 'Peter Parker',
        email: 'spiderman@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false  
    },
];

export default users;