import test from 'ava';
import { addUser } from '../../userControler.js';
import { User } from '../../userModel.js';
import sinon from 'sinon';


//שתי הטסטים הראשונים עובדים השלישי- לא 
// יכול להיות בגלל ששלחנו בקונטרולרס לפונקציית בדיקה וצריך לעדכן את הטסט למשהו בסגנון
test('addUser - Missing Parameters', async (t) => {
    const req = { body: {} };
    const res = {
        status: (statusCode) => {
            t.is(statusCode, 404);
            return { send: (message) => t.is(message, "missing required parameters") };
        }
    };
    await addUser(req, res);
});


test('addUser - User Already Exists', async (t) => {
    // Mocking User.find() to return a non-empty array to simulate an existing user
    sinon.stub(User, 'find').returns([{ userName: 'existingUser', email: 'existing@example.com', phone: 1234567890 }]);

    const req = { body: { userName: 'existingUser', email: 'existing@example.com', phone: 1234567890 } };
    const res = {
        status: (statusCode) => {
            t.is(statusCode, 409);
            return { send: (message) => t.is(message, "this user already exists") };
        },
        json: (data) => {
            t.fail("User should not be created if already exists");
        }
    };

    await addUser(req, res);

    // Restore the original behavior of User.find() after the test
    User.find.restore();
});



// test('addUser - invalid params', async (t) => {
//     const req = { body: { userName: 'testing', email: 'existingexample.com', phone: 1234567890 } };
//     const res = {
//         status: (statusCode) => {
//             t.is(statusCode, 400);
//             return { send: (message) => t.is(message, "The user contains invalid parameters") };
//         }
//     };
//     await addUser(req, res);
// });


