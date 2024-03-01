// // __tests__/userController.test.ts
// import request from 'supertest';
// import express, { response } from 'express';
// import main from '../App';
// import { userController } from '../controllers/UserController';
// import { prismaMock } from '../../singleton';
// // const port: number = 2022;


// // describe('User API', () => {
// //     let app: express.Application;

// //     beforeAll(() => {
// //         const mockMorganStream = { write: jest.fn() };
// //         // main({ prisma: prismaMock, morganStream: mockMorganStream, port });
// //         app = express();
// //         app.use('/api/users', require('../routes/user.routes').default);
// //     });

// //     afterAll(async () => {
// //     });

// //     it('should create a new user', async () => {
// //         const userData = {
// //             email: 'test@example.com',
// //             username: 'testuser',
// //             password: 'password123',
// //             fullName: 'Test User',
// //         };
// //         const response = await request(app)
// //             .post('/api/users')
// //             .send(userData)
// //             // .expect(201); 

// //         expect(response.body).toEqual({  email: userData.email, username: userData.username, fullName: userData.fullName });
// //     });
// // });

// test('should create new user ', async () => {
//     // const user = {
//     //     id: 1,
//     //     name: 'Rich',
//     //     email: 'hello@prisma.io',
//     // }
//     const user = {
//         id: "e0f945b3-9072-4bba-b834-361a74e87e96",
//         email: 'test@example.com',
//         username: 'testuser',
//         password: 'password123',
//         fullName: 'Test User',
//     };

//     prismaMock.user.create.mockResolvedValue(user)

//     await expect(userController.createUser(request,response)).resolves.toEqual({
//         id: "e0f945b3-9072-4bba-b834-361a74e87e96",
//         email: 'test@example.com',
//         username: 'testuser',
//         password: 'password123',
//         fullName: 'Test User',
//     })
// })

// test('should update a users name ', async () => {
//     const user = {
//         id: 1,
//         name: 'Rich Haines',
//         email: 'hello@prisma.io',
//         acceptTermsAndConditions: true,
//     }

//     prismaMock.user.update.mockResolvedValue(user)

//     await expect(userController.updateUser(user)).resolves.toEqual({
//         id: 1,
//         name: 'Rich Haines',
//         email: 'hello@prisma.io',
//         acceptTermsAndConditions: true,
//     })
// })

// test('should fail if user does not accept terms', async () => {
//     const user = {
//         id: 1,
//         name: 'Rich Haines',
//         email: 'hello@prisma.io',
//         acceptTermsAndConditions: false,
//     }

//     prismaMock.user.create.mockImplementation()

//     await expect(createUser(user)).resolves.toEqual(
//         new Error('User must accept terms!')
//     )
// })