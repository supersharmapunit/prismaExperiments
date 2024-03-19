import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface UpdateParams {
    firstName: string;
    lastName: string;
}

async function insertUser(email: string, password: string, firstName: string, lastName: string) {
    try {
        const res = await prisma.user.create({
            data: {
                email,
                password,
                firstName,
                lastName
            },
            select: {
                id: true,
                email: true,
                firstName: true
            },
        });
        console.log(res);
    } catch (error) {
        console.log("something went wrong with db insertion", error);
    }
}

// insertUser("abc@gmail.com", "1234", "john", "doe");

async function updateUser(email: string, {
    firstName,
    lastName
}: UpdateParams) {
    try {
        const res = await prisma.user.update({
            where: {
                email
            },
            data: {
                firstName,
                lastName
            }
        });
        console.log(res);
    } catch (error) {
        console.log("something went wrong with db updation", error);
    }
}

// updateUser("abc@gmail.com", { firstName: "john", lastName: "don" });

async function deleteUser(email: string) {
    try {
        const res = await prisma.user.delete({
            where:{
                email
            }
        });
        console.log(res);
    } catch (error) {
        console.log("something went wrong with db deletion", error);
    }
}

// deleteUser("abc@gmail.com");

async function getAllUsers() {
    try {
        const res = await prisma.user.findMany({
            select: {
                email: true,
                firstName: true,
                lastName: true
            }
        });
        console.log(res);
    } catch (error) {
        console.log("something went wrong fetching users", error);
    }
}

async function getUserById(email :string) {
    try {
        const res = await prisma.user.findUnique({
            where: {
                email
            },
            select: {
                email: true,
                firstName: true,
                lastName: true
            }
        })
        if(!res) {
            console.log("user not found");
            return;
        }
        console.log(res);
    } catch (error) {
        console.log("something went wrong fetching user", error);
    }
}

// getAllUsers();
getUserById("abc@gmail.com")