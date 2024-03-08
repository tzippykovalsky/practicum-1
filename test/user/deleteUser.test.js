import test from 'ava';
import { deleteUser } from '../../userControler.js';
import { User } from '../../userModel.js';
import sinon from 'sinon';

import { expect } from 'chai';
import { deleteUser } from '../path/to/your/deleteUser.js';


// "test": "mocha --require esm"  כך צריך לשנות בpackage.json
//לא תקין-נופל 
//לפי מה שהבנתי הטסטים באמצעות מוקה צריכים להיות בקובץ שהשם שלו זהה 
//לקובץ ששם נמצאות הפונקציות שעליהן מבצעים את הבדיקות
//בקיצור זה צורה קצת שונה מדף הבדיקות הקודם
//תכלס-לא עובד***************************************
describe('deleteUser function', () => {
    it('should delete a user and return the deleted user', async () => {
        const req = { params: { id: 'user_id_to_be_deleted' } };
        const res = {
            status: function(code) {
                return this;
            },
            send: function(message) {
                return message;
            },
            json: function(data) {
                return data;
            }
        };

        const deletedUser = await deleteUser(req, res);

        expect(deletedUser).to.exist;
        expect(deletedUser).to.have.property('_id'); // Assuming user object has an '_id' property
        // Add more assertions based on the expected response
    });

    it('should return a 404 status if user is not found', async () => {
        const req = { params: { id: 'non_existent_id' } };
        const res = {
            status: function(code) {
                return this;
            },
            send: function(message) {
                return message;
            }
        };

        const response = await deleteUser(req, res);

        expect(response).to.equal('User not found');
        expect(res.status).to.have.been.calledWith(404);
    });

    // Add more test cases as needed
});
