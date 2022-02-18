const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const createManyFirmMembers = await prisma.lawfirm_members.createMany({
    data: [
      {
        lawyer_id: 1,
        lawfirm_id: 5,
        joined_on: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyer_id: 2,
        lawfirm_id: 5,
        joined_on: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyer_id: 3,
        lawfirm_id: 4,
        joined_on: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyer_id: 4,
        lawfirm_id: 4,
        joined_on: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyer_id: 5,
        lawfirm_id: 3,
        joined_on: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyer_id: 6,
        lawfirm_id: 2,
        joined_on: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyer_id: 7,
        lawfirm_id: 1,
        joined_on: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyer_id: 8,
        lawfirm_id: 1,
        joined_on: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyer_id: 9,
        lawfirm_id: 1,
        joined_on: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyer_id: 10,
        lawfirm_id: 1,
        joined_on: "1997-07-16T19:20:30.451Z",
      },
    ],
  });
  const createFieldsOfLaw = await prisma.fields_of_law.createMany({
    data: [
      { field: "Injury" },
      { field: "Immigration" },
      { field: "Criminal" },
      { field: "Legal Assistance" },
      { field: "NFT's" },
    ],
  });
  const createlawyerFieldData = await prisma.lawyer_fields.createMany({
    data: [
      {
        lawyers_id: 1,
        fields_of_law_id: 1,
        date_added: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyers_id: 1,
        fields_of_law_id: 2,
        date_added: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyers_id: 1,
        fields_of_law_id: 3,
        date_added: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyers_id: 2,
        fields_of_law_id: 1,
        date_added: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyers_id: 2,
        fields_of_law_id: 2,
        date_added: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyers_id: 2,
        fields_of_law_id: 5,
        date_added: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyers_id: 3,
        fields_of_law_id: 3,
        date_added: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyers_id: 3,
        fields_of_law_id: 4,
        date_added: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyers_id: 3,
        fields_of_law_id: 5,
        date_added: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyers_id: 4,
        fields_of_law_id: 3,
        date_added: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyers_id: 4,
        fields_of_law_id: 4,
        date_added: "1997-07-16T19:20:30.451Z",
      },
      ,
      {
        lawyers_id: 5,
        fields_of_law_id: 4,
        date_added: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyers_id: 6,
        fields_of_law_id: 5,
        date_added: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyers_id: 6,
        fields_of_law_id: 4,
        date_added: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyers_id: 6,
        fields_of_law_id: 1,
        date_added: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyers_id: 7,
        fields_of_law_id: 4,
        date_added: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyers_id: 7,
        fields_of_law_id: 2,
        date_added: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyers_id: 7,
        fields_of_law_id: 1,
        date_added: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyers_id: 8,
        fields_of_law_id: 3,
        date_added: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyers_id: 8,
        fields_of_law_id: 4,
        date_added: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyers_id: 9,
        fields_of_law_id: 4,
        date_added: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyers_id: 9,
        fields_of_law_id: 2,
        date_added: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyers_id: 9,
        fields_of_law_id: 5,
        date_added: "1997-07-16T19:20:30.451Z",
      },
      {
        lawyers_id: 10,
        fields_of_law_id: 3,
        date_added: "1997-07-16T19:20:30.451Z",
      },
    ],
  });
  const createManyLawyers = await prisma.lawyers.createMany({
    data: [
      {
        first_name: "Dusty",
        last_name: "Luck",
        email: "goingdust@gmail.com",
        description: "I'll make sure you and your dog see justice served.",
        location: "Toronto",
        education: "Herverd Law",
        date_certified: "04/11/2014",
        phone_number: "705-739-5555",
        address: "55 Yonge St, Toronto, ON M6E 5A5",
        rating: 40,
        profile_pic: "/images/lawyers/dusty-profile.jpg",
      },
    ],
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
