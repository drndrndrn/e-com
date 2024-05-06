const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
    try {
        await database.category.createMany({
            data: [
                { name: "Бази даних" },
                { name: "Математика" },
                { name: "Мережі" },
                { name: "Англійська" },
                { name: "Фізика" },
                { name: "Безпека" },
            ]
        });
        console.log("Success")
    } catch (error) {
        console.log("Error seeding", error);
    } finally {
        await database.$disconnect();
    }
}

main();