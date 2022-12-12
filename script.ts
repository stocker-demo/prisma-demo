import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	const stock = await prisma.stock.create({
		data: {
			name: "金迪克",
			code: "688670",
			ticker: new Date(),
			price: 100,

			categories: {
				connectOrCreate: {
					create: {
						name: "疫苗",
					},
					where: {
						name: "疫苗",
					},
				},
			},
		},
	});
    
    console.dir(stock, { depth: null });

	const stockInfo = await prisma.stock.findMany({
		include: {
			categories: true,
		},
	});

    console.dir(stockInfo, { depth: null });

	try {
		const category = await prisma.category.create({
			data: {
				name: "煤炭",
			},
		});
		console.dir(category, { depth: null });
	} catch (e) {
		console.log("-----");
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
