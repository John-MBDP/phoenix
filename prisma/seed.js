const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const createManyFirmMembers = await prisma.lawfirm_members.createMany({
    data: [
      {
        lawyer_id: 1,
        lawfirm_id: 5,
        joined_on: "1997-07-16T19:20:30.451Z"
      },
      {
        lawyer_id: 2,
        lawfirm_id: 5,
        joined_on: "1997-07-16T19:20:30.451Z"
      },
      {
        lawyer_id: 3,
        lawfirm_id: 4,
        joined_on: "1997-07-16T19:20:30.451Z"
      },
      {
        lawyer_id: 4,
        lawfirm_id: 4,
        joined_on: "1997-07-16T19:20:30.451Z"
      },
      {
        lawyer_id: 5,
        lawfirm_id: 3,
        joined_on: "1997-07-16T19:20:30.451Z"
      },
      {
        lawyer_id: 6,
        lawfirm_id: 2,
        joined_on: "1997-07-16T19:20:30.451Z"
      },
      {
        lawyer_id: 7,
        lawfirm_id: 1,
        joined_on: "1997-07-16T19:20:30.451Z"
      },
      {
        lawyer_id: 8,
        lawfirm_id: 1,
        joined_on: "1997-07-16T19:20:30.451Z"
      },
      {
        lawyer_id: 9,
        lawfirm_id: 1,
        joined_on: "1997-07-16T19:20:30.451Z"
      },
      {
        lawyer_id: 10,
        lawfirm_id: 1,
        joined_on: "1997-07-16T19:20:30.451Z"
      }
    ]
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
